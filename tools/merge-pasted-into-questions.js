#!/usr/bin/env node
/**
 * Merge unique questions from pasted.txt into questions.js, avoiding duplicates.
 * Dedupe logic:
 *  - exact duplicate by normalized question text (case/spacing/punctuation-insensitive)
 *  - same-MCQ duplicate: same normalized options array + same answer(s), even if the wording differs
 *
 * Usage:
 *   node tools/merge-pasted-into-questions.js
 *
 * Requirements:
 *   - pasted.txt at repo root
 *   - questions.js at repo root defining const quizQuestions = [ ... ]
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = process.cwd();
const PASTED = path.join(ROOT, "pasted.txt");
const QUESTIONS = path.join(ROOT, "questions.js");

if (!fs.existsSync(PASTED)) {
  console.error("pasted.txt not found at repo root.");
  process.exit(1);
}
if (!fs.existsSync(QUESTIONS)) {
  console.error("questions.js not found at repo root.");
  process.exit(1);
}

const txt = fs.readFileSync(PASTED, "utf8");
const qsrc = fs.readFileSync(QUESTIONS, "utf8");

// Evaluate questions.js in a sandbox to read quizQuestions
const context = vm.createContext({ console, globalThis: {} });
const wrapped = `${qsrc}\n;globalThis.__QQ__ = (typeof quizQuestions !== 'undefined' ? quizQuestions : undefined);`;
try {
  vm.runInContext(wrapped, context, { filename: "questions.js" });
} catch (e) {
  console.error("Failed to execute questions.js:", e.message);
  process.exit(1);
}
const quizQuestions = context.globalThis.__QQ__;
if (!Array.isArray(quizQuestions)) {
  console.error("quizQuestions not found or not an array in questions.js");
  process.exit(1);
}

const normalize = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/[\s\W_]+/g, " ")
    .trim();

// Signature for same-MCQ duplicates
const optSig = (q) =>
  JSON.stringify({
    o: (q.options || []).map(normalize),
    a: Array.isArray(q.correctAnswer)
      ? [...q.correctAnswer].sort((a, b) => a - b)
      : q.correctAnswer,
  });

// Build de-dupe maps from existing questions
const byText = new Map();
const bySig = new Map();

quizQuestions.forEach((q, i) => {
  const t = normalize(q.question);
  if (!byText.has(t)) byText.set(t, []);
  byText.get(t).push(i);

  const s = optSig(q);
  if (!bySig.has(s)) bySig.set(s, []);
  bySig.get(s).push(i);
});

// Parser robust enough for both “Question:” blocks and “NEW QUESTION …” blocks
function parsePasted(text) {
  const lines = text.split(/\r?\n/);

  const blocks = [];
  let cur = [];

  const pushBlock = () => {
    if (cur.length) blocks.push(cur.join("\n"));
    cur = [];
  };

  for (const line of lines) {
    if (/^\s*$/.test(line)) {
      // blank line separating blocks
      pushBlock();
      continue;
    }
    cur.push(line);
  }
  pushBlock();

  const parsed = [];

  // Helpers
  const stripPrefix = (s) =>
    s.replace(/^[A-D]\)\s*|^[A-D]\.\s*|^\d+\)\s*|^-\s*/, "").trim();

  const isOptionLine = (s) => {
    // starts with A), A., 1), -, or looks like an option item (heuristic)
    return /^[A-D]\)|^[A-D]\.||^\d+\)|^-\s/.test(s.trim());
  };

  for (const block of blocks) {
    // Require “Answer:” to qualify as a QA block
    if (!/^\s*Answer\s*:/mi.test(block)) continue;

    const blines = block.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

    // Extract Answer line (letters A-D or numbers, possibly comma-separated)
    let answerRaw = null;
    let answerLineIndex = blines.findIndex((l) => /^Answer\s*:/i.test(l));
    if (answerLineIndex >= 0) {
      answerRaw = blines[answerLineIndex].replace(/^Answer\s*:\s*/i, "").trim();
    }
    if (!answerRaw) continue;

    // Determine if answer letters or numbers
    let correctAnswer;
    if (/^[A-D](?:\s*,\s*[A-D])*$/.test(answerRaw)) {
      // Letter(s)
      const toIndex = (ch) => "ABCD".indexOf(ch);
      const idxs = answerRaw.split(/\s*,\s*/).map((a) => toIndex(a));
      correctAnswer = idxs.length > 1 ? idxs : idxs[0];
    } else if (/^\d+(?:\s*,\s*\d+)*$/.test(answerRaw)) {
      const idxs = answerRaw
        .split(/\s*,\s*/)
        .map((n) => Math.max(0, parseInt(n, 10) - 1)); // 1-based → 0-based
      correctAnswer = idxs.length > 1 ? idxs : idxs[0];
    } else {
      // unknown format → skip
      continue;
    }

    // Explanation (optional)
    let explanation = "";
    const expIdx = blines.findIndex((l) => /^Explanation\s*:/i.test(l));
    if (expIdx >= 0) {
      explanation = blines.slice(expIdx).join("\n").replace(/^Explanation\s*:\s*/i, "");
    }

    // Find question text
    let question = "";
    const qLineIdx = blines.findIndex((l) => /^Question\s*:/i.test(l));
    if (qLineIdx >= 0) {
      // Everything after "Question:" on that line
      question = blines[qLineIdx].replace(/^Question\s*:\s*/i, "").trim();
    } else {
      // Heuristic: find start line (skip “NEW QUESTION …” / numbering)
      let start = 0;
      while (start < blines.length && /^NEW QUESTION/i.test(blines[start])) start++;
      const qParts = [];
      for (let i = start; i < blines.length; i++) {
        const l = blines[i];
        if (/^Answer\s*:/i.test(l) || /^Explanation\s*:/i.test(l)) break;
        if (isOptionLine(l)) break;
        qParts.push(l);
        if (i + 1 < blines.length && isOptionLine(blines[i + 1])) break;
      }
      question = qParts.join(" ").trim();
    }
    if (!question) continue;

    // Extract options between question and Answer
    const options = [];
    let optStart = blines.findIndex((l) => isOptionLine(l));
    if (optStart === -1) {
      // Fallback: after the question line(s), pick next 4 lines before Answer/Explanation
      const start = qLineIdx >= 0 ? qLineIdx + 1 : 0;
      for (let i = start; i < blines.length && options.length < 4; i++) {
        if (/^Answer\s*:/i.test(blines[i]) || /^Explanation\s*:/i.test(blines[i])) break;
        if (blines[i]) options.push(stripPrefix(blines[i]));
      }
    } else {
      for (let i = optStart; i < blines.length; i++) {
        const l = blines[i];
        if (/^Answer\s*:/i.test(l) || /^Explanation\s*:/i.test(l)) break;
        if (!l) continue;
        if (isOptionLine(l)) {
          options.push(stripPrefix(l));
        } else {
          // If options overflow into wrapped lines, append
          if (options.length) {
            const last = options.pop();
            options.push((last + " " + l).trim());
          }
        }
      }
    }

    if (!options || options.length < 2) continue;

    parsed.push({
      question,
      options,
      correctAnswer,
      explanation: (explanation || "").trim(),
    });
  }

  return parsed;
}

const incoming = parsePasted(txt);

const uniques = [];
incoming.forEach((q) => {
  const t = normalize(q.question);
  const s = optSig(q);
  const isTextDup = byText.has(t);
  const isSigDup = bySig.has(s);

  if (!isTextDup && !isSigDup) {
    uniques.push(q);
    byText.set(t, [quizQuestions.length + uniques.length - 1]);
    bySig.set(s, [quizQuestions.length + uniques.length - 1]);
  }
});

if (uniques.length === 0) {
  console.log("No new unique questions to add. ✅");
  process.exit(0);
}

const updated = [...quizQuestions, ...uniques];

// Rebuild questions.js with stable formatting (no ES module export to keep browser compatibility)
const banner = `// Auto-generated by tools/merge-pasted-into-questions.js\n// Do not edit this section by hand when using pasted.txt import. Update pasted.txt and re-run the tool.\n// Last update: ${new Date().toISOString()}\n`;

const body =
  "const quizQuestions = " +
  JSON.stringify(updated, null, 2) +
  ";\n";

const final = `${banner}\n${body}`;

fs.writeFileSync(QUESTIONS, final, "utf8");
console.log(`Added ${uniques.length} new question(s) ✅`);
