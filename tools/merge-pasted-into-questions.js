#!/usr/bin/env node

/**
 * Merge questions from pasted.txt into questions.js with deduplication
 * 
 * This tool parses questions from pasted.txt in two formats:
 * 1. Classic format:
 *    Question: <text>
 *    1) <option>
 *    2) <option>
 *    3) <option>
 *    4) <option>
 *    Answer: <number>
 *    Explanation: <text>
 * 
 * 2. Compact format:
 *    Q: <text> | A: <opt1>, B: <opt2>, C: <opt3>, D: <opt4> | Correct: <letter> | Exp: <text>
 */

const fs = require('fs');
const path = require('path');

// File paths
const PASTED_FILE = path.join(__dirname, '..', 'pasted.txt');
const QUESTIONS_FILE = path.join(__dirname, '..', 'questions.js');

/**
 * Parse questions from pasted.txt
 */
function parsePastedFile(content) {
  const questions = [];
  
  // Split by double newlines to separate question blocks
  const blocks = content.split(/\n\s*\n/).filter(b => b.trim());
  
  for (const block of blocks) {
    try {
      // Try compact format first (single line with pipes)
      if (block.includes('|')) {
        const compactQuestion = parseCompactFormat(block);
        if (compactQuestion) {
          questions.push(compactQuestion);
          continue;
        }
      }
      
      // Try classic format
      const classicQuestion = parseClassicFormat(block);
      if (classicQuestion) {
        questions.push(classicQuestion);
      }
    } catch (err) {
      console.warn(`Warning: Failed to parse block:\n${block.substring(0, 100)}...\nError: ${err.message}`);
    }
  }
  
  return questions;
}

/**
 * Parse classic format:
 * Question: ...
 * 1) ...
 * Answer: ...
 * Explanation: ...
 */
function parseClassicFormat(block) {
  const lines = block.split('\n').map(l => l.trim()).filter(l => l);
  
  let question = '';
  let options = [];
  let answer = -1;
  let explanation = '';
  
  for (const line of lines) {
    if (line.match(/^Question:\s*/i)) {
      question = line.replace(/^Question:\s*/i, '').trim();
    } else if (line.match(/^[1-4]\)\s*/)) {
      const option = line.replace(/^[1-4]\)\s*/, '').trim();
      options.push(option);
    } else if (line.match(/^Answer:\s*/i)) {
      const answerText = line.replace(/^Answer:\s*/i, '').trim();
      // Support both 1-4 (1-based) and 0-3 (0-based)
      const answerNum = parseInt(answerText, 10);
      if (answerNum >= 1 && answerNum <= 4) {
        answer = answerNum - 1; // Convert to 0-based
      } else if (answerNum >= 0 && answerNum <= 3) {
        answer = answerNum;
      }
    } else if (line.match(/^Explanation:\s*/i)) {
      explanation = line.replace(/^Explanation:\s*/i, '').trim();
    }
  }
  
  // Validate
  if (!question || options.length !== 4 || answer < 0 || answer > 3 || !explanation) {
    return null;
  }
  
  return { question, options, correctAnswer: answer, explanation };
}

/**
 * Parse compact format:
 * Q: ... | A: ..., B: ..., C: ..., D: ... | Correct: <A-D> | Exp: ...
 */
function parseCompactFormat(block) {
  // Extract each section
  const parts = block.split('|').map(p => p.trim());
  if (parts.length < 4) return null;
  
  let question = '';
  let options = [];
  let answer = -1;
  let explanation = '';
  
  for (const part of parts) {
    if (part.match(/^Q:\s*/i)) {
      question = part.replace(/^Q:\s*/i, '').trim();
    } else if (part.match(/^A:\s*/i)) {
      // Parse options in format: A: opt1, B: opt2, C: opt3, D: opt4
      // Note: The "A:" is a section label, and options are comma-separated with letters
      const optionsText = part.trim();
      
      // Split by commas and parse each option
      const optionParts = optionsText.split(',').map(p => p.trim());
      const optMap = {};
      
      for (const opt of optionParts) {
        // Check if it starts with a letter and colon
        const match = opt.match(/^([A-D]):\s*(.+)$/i);
        if (match) {
          optMap[match[1].toUpperCase()] = match[2].trim();
        }
      }
      
      // Ensure we have all 4 options
      if (optMap['A'] && optMap['B'] && optMap['C'] && optMap['D']) {
        options = [optMap['A'], optMap['B'], optMap['C'], optMap['D']];
      }
    } else if (part.match(/^Correct:\s*/i)) {
      const correctLetter = part.replace(/^Correct:\s*/i, '').trim().toUpperCase();
      const letterMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
      if (letterMap.hasOwnProperty(correctLetter)) {
        answer = letterMap[correctLetter];
      }
    } else if (part.match(/^Exp(lanation)?:\s*/i)) {
      explanation = part.replace(/^Exp(lanation)?:\s*/i, '').trim();
    }
  }
  
  // Validate
  if (!question || options.length !== 4 || answer < 0 || answer > 3 || !explanation) {
    return null;
  }
  
  return { question, options, correctAnswer: answer, explanation };
}

/**
 * Read existing questions from questions.js
 */
function readExistingQuestions() {
  if (!fs.existsSync(QUESTIONS_FILE)) {
    return [];
  }
  
  const content = fs.readFileSync(QUESTIONS_FILE, 'utf8');
  
  // Extract the array from the JavaScript file
  const match = content.match(/const\s+quizQuestions\s*=\s*(\[[\s\S]*\]);/);
  if (!match) {
    console.warn('Warning: Could not find quizQuestions array in questions.js');
    return [];
  }
  
  try {
    // Use eval in a safe context (we control the input)
    // Alternative: use a proper JS parser, but this is simpler for our use case
    const questions = eval(`(${match[1]})`);
    return Array.isArray(questions) ? questions : [];
  } catch (err) {
    console.error('Error parsing questions.js:', err.message);
    return [];
  }
}

/**
 * Create a signature for a question for deduplication
 */
function createQuestionSignature(q) {
  // Normalize text: lowercase, remove extra whitespace
  const normalize = (text) => text.toLowerCase().replace(/\s+/g, ' ').trim();
  
  const questionText = normalize(q.question);
  const optionsText = q.options.map(o => normalize(o)).sort().join('|');
  const answerText = String(q.correctAnswer);
  
  return {
    byQuestion: questionText,
    bySignature: `${questionText}::${optionsText}::${answerText}`
  };
}

/**
 * Deduplicate questions
 */
function deduplicateQuestions(existing, newQuestions) {
  const seenByQuestion = new Set();
  const seenBySignature = new Set();
  
  // Mark existing questions
  for (const q of existing) {
    const sig = createQuestionSignature(q);
    seenByQuestion.add(sig.byQuestion);
    seenBySignature.add(sig.bySignature);
  }
  
  // Filter new questions
  const unique = [];
  const duplicates = [];
  
  for (const q of newQuestions) {
    const sig = createQuestionSignature(q);
    
    // Check both deduplication methods
    if (seenByQuestion.has(sig.byQuestion) || seenBySignature.has(sig.bySignature)) {
      duplicates.push(q);
    } else {
      unique.push(q);
      seenByQuestion.add(sig.byQuestion);
      seenBySignature.add(sig.bySignature);
    }
  }
  
  return { unique, duplicates };
}

/**
 * Write questions to questions.js
 */
function writeQuestionsFile(questions) {
  // Add timestamp and user info at the top
  const now = new Date();
  const utcDate = now.toISOString().replace('T', ' ').substring(0, 19);
  
  // Get git user if available
  let gitUser = 'unknown';
  try {
    const { execSync } = require('child_process');
    gitUser = execSync('git config user.name', { encoding: 'utf8' }).trim();
  } catch (err) {
    // Git not available or not configured
  }
  
  const header = `// Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): ${utcDate}
// Current User's Login: ${gitUser}
`;
  
  const jsonContent = JSON.stringify(questions, null, 2);
  const content = `${header}
const quizQuestions = ${jsonContent};`;
  
  fs.writeFileSync(QUESTIONS_FILE, content, 'utf8');
}

/**
 * Main function
 */
function main() {
  console.log('Starting merge process...\n');
  
  // Check if pasted.txt exists
  if (!fs.existsSync(PASTED_FILE)) {
    console.log('No pasted.txt file found. Nothing to import.');
    return;
  }
  
  // Read pasted.txt
  const pastedContent = fs.readFileSync(PASTED_FILE, 'utf8');
  if (!pastedContent.trim()) {
    console.log('pasted.txt is empty. Nothing to import.');
    return;
  }
  
  // Parse new questions
  console.log('Parsing pasted.txt...');
  const newQuestions = parsePastedFile(pastedContent);
  console.log(`Found ${newQuestions.length} questions in pasted.txt`);
  
  if (newQuestions.length === 0) {
    console.log('No valid questions found in pasted.txt.');
    return;
  }
  
  // Read existing questions
  console.log('\nReading existing questions.js...');
  const existingQuestions = readExistingQuestions();
  console.log(`Found ${existingQuestions.length} existing questions`);
  
  // Deduplicate
  console.log('\nDeduplicating questions...');
  const { unique, duplicates } = deduplicateQuestions(existingQuestions, newQuestions);
  console.log(`- ${unique.length} unique questions to add`);
  console.log(`- ${duplicates.length} duplicate questions skipped`);
  
  if (duplicates.length > 0) {
    console.log('\nDuplicate questions (first 3):');
    duplicates.slice(0, 3).forEach(q => {
      console.log(`  - ${q.question.substring(0, 60)}...`);
    });
  }
  
  // Merge
  const mergedQuestions = [...existingQuestions, ...unique];
  console.log(`\nTotal questions after merge: ${mergedQuestions.length}`);
  
  // Write to questions.js
  console.log('\nWriting to questions.js...');
  writeQuestionsFile(mergedQuestions);
  console.log('✓ questions.js updated successfully');
  
  // Clear pasted.txt
  console.log('\nClearing pasted.txt...');
  fs.writeFileSync(PASTED_FILE, '', 'utf8');
  console.log('✓ pasted.txt cleared');
  
  console.log('\n=== Merge complete ===');
  console.log(`Added ${unique.length} new questions`);
  console.log(`Skipped ${duplicates.length} duplicates`);
  console.log(`Total questions: ${mergedQuestions.length}`);
}

// Run if executed directly
if (require.main === module) {
  try {
    main();
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

// Export for testing
module.exports = {
  parsePastedFile,
  parseClassicFormat,
  parseCompactFormat,
  createQuestionSignature,
  deduplicateQuestions
};
