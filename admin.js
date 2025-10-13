// DOM Elements
const questionForm = document.getElementById('question-form');
const questionInput = document.getElementById('question');
const option1Input = document.getElementById('option1');
const option2Input = document.getElementById('option2');
const option3Input = document.getElementById('option3');
const option4Input = document.getElementById('option4');
const correctAnswerSelect = document.getElementById('correct-answer');
const explanationInput = document.getElementById('explanation');
const questionsList = document.getElementById('questions-list');
const exportQuestionsBtn = document.getElementById('export-questions');
const saveToFileBtn = document.getElementById('save-to-file');

// Import elements
const importFileInput = document.getElementById('import-file');
const importModeSelect = document.getElementById('import-mode');
const importBtn = document.getElementById('import-questions-btn');
const downloadJsonTemplateBtn = document.getElementById('download-json-template');
const downloadCsvTemplateBtn = document.getElementById('download-csv-template');
const importStatus = document.getElementById('import-status');

// Local storage key
const STORAGE_KEY = 'examCenterQuestions';

// Initialize questions from storage or use default
let questions = [];

// Load questions from questions.js if available
if (typeof quizQuestions !== 'undefined') {
    questions = [...quizQuestions];
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Load questions from local storage (overriding if needed)
    const storedQuestions = localStorage.getItem(STORAGE_KEY);
    if (storedQuestions) {
        try {
            const parsed = JSON.parse(storedQuestions);
            if (Array.isArray(parsed)) questions = parsed;
        } catch {
            // ignore parse errors, fallback to current "questions"
        }
    }

    // Display questions
    renderQuestions();
    // Setup template downloads
    setupTemplateDownloads();
});

questionForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    addQuestion();
});

exportQuestionsBtn?.addEventListener('click', exportQuestions);
saveToFileBtn?.addEventListener('click', saveToFile);
importBtn?.addEventListener('click', handleImport);

// Functions
function addQuestion() {
    const question = questionInput.value.trim();
    const options = [
        option1Input.value.trim(),
        option2Input.value.trim(),
        option3Input.value.trim(),
        option4Input.value.trim(),
    ];
    const correctAnswer = parseInt(correctAnswerSelect.value);
    const explanation = explanationInput.value.trim();

    if (!question || options.some(o => !o) || Number.isNaN(correctAnswer) || explanation.length === 0) {
        alert('Please fill in all fields.');
        return;
    }

    const newQuestion = { question, options, correctAnswer, explanation };
    questions.push(newQuestion);
    saveQuestions();
    renderQuestions();
    questionForm.reset();
    alert('Question added successfully!');
}

function renderQuestions() {
    questionsList.innerHTML = '';
    if (!questions.length) {
        questionsList.innerHTML = '<p>No questions yet. Add one using the form above.</p>';
        return;
    }

    questions.forEach((q, index) => {
        const item = document.createElement('div');
        item.className = 'question-item';

        const h3 = document.createElement('h3');
        h3.textContent = `Question ${index + 1}: ${q.question}`;
        item.appendChild(h3);

        const opts = document.createElement('div');
        opts.className = 'question-options';
        q.options.forEach((opt, i) => {
            const d = document.createElement('div');
            d.className = 'question-option' + (i === q.correctAnswer ? ' correct' : '');
            d.textContent = `${i + 1}. ${opt}${i === q.correctAnswer ? ' ✓' : ''}`;
            opts.appendChild(d);
        });
        item.appendChild(opts);

        const exp = document.createElement('div');
        exp.className = 'question-explanation';
        exp.innerHTML = `<strong>Explanation:</strong> ${q.explanation}`;
        item.appendChild(exp);

        const del = document.createElement('button');
        del.className = 'delete-question';
        del.textContent = '×';
        del.addEventListener('click', () => deleteQuestion(index));
        item.appendChild(del);

        questionsList.appendChild(item);
    });
}

function deleteQuestion(index) {
    if (confirm('Are you sure you want to delete this question?')) {
        questions.splice(index, 1);
        saveQuestions();
        renderQuestions();
    }
}

function saveQuestions() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
}

function exportQuestions() {
    const codeContainer = document.createElement('div');
    codeContainer.id = 'export-container';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => codeContainer.remove());

    const codeHeader = document.createElement('h3');
    codeHeader.textContent = 'Copy this code to your questions.js file:';

    const codeArea = document.createElement('textarea');
    codeArea.id = 'export-code';
    codeArea.readOnly = true;

    const code = `// This file was generated by the admin panel at ${new Date().toLocaleString()}
const quizQuestions = ${JSON.stringify(questions, null, 4)};`;

    codeArea.value = code;

    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy to Clipboard';
    copyButton.addEventListener('click', () => {
        codeArea.select();
        document.execCommand('copy');
        alert('Code copied to clipboard!');
    });

    codeContainer.appendChild(codeHeader);
    codeContainer.appendChild(codeArea);
    codeContainer.appendChild(copyButton);
    codeContainer.appendChild(closeButton);

    Object.assign(codeContainer.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: '1000',
        width: '80%',
        maxWidth: '800px',
    });

    document.body.appendChild(codeContainer);
}

function saveToFile() {
    const code = `// This file was generated by the admin panel at ${new Date().toLocaleString()}
const quizQuestions = ${JSON.stringify(questions, null, 4)};`;

    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'questions.js';
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);
}

// IMPORT HANDLERS
async function handleImport() {
    try {
        importStatus.textContent = '';
        const file = importFileInput?.files?.[0];
        if (!file) {
            showStatus('Please choose a file to import.', 'error');
            return;
        }
        const mode = importModeSelect?.value || 'merge';
        const ext = file.name.split('.').pop().toLowerCase();

        let imported = [];
        if (ext === 'json') {
            imported = await importFromJSON(file);
        } else if (ext === 'csv') {
            imported = await importFromCSVorExcel(file, 'csv');
        } else if (ext === 'xlsx' || ext === 'xls') {
            imported = await importFromCSVorExcel(file, 'excel');
        } else if (ext === 'docx') {
            imported = await importFromDocx(file);
        } else if (ext === 'pdf') {
            imported = await importFromPDF(file);
        } else {
            showStatus('Unsupported file type. Please use .json, .csv, .xlsx, .xls, .docx, or .pdf', 'error');
            return;
        }

        if (!Array.isArray(imported) || imported.length === 0) {
            showStatus('No valid questions found in the file.', 'error');
            return;
        }

        // normalize and validate
        const normalized = normalizeQuestions(imported);
        if (!normalized.length) {
            showStatus('Imported data did not contain valid questions.', 'error');
            return;
        }

        if (mode === 'replace') {
            questions = normalized;
        } else {
            questions = questions.concat(normalized);
        }
        saveQuestions();
        renderQuestions();
        showStatus(`Imported ${normalized.length} question(s) successfully.`, 'success');
    } catch (e) {
        console.error(e);
        showStatus('An error occurred while importing. See console for details.', 'error');
    }
}

function showStatus(msg, type = 'info') {
    if (!importStatus) return;
    importStatus.textContent = msg;
    importStatus.style.color = type === 'success' ? '#2e7d32' : type === 'error' ? '#c62828' : '#333';
}

function setupTemplateDownloads() {
    downloadJsonTemplateBtn?.addEventListener('click', () => {
        const sample = [
            {
                question: 'What is 2 + 2?',
                options: ['3', '4', '5', '6'],
                correctAnswer: 1,
                explanation: '2 + 2 equals 4.'
            }
        ];
        const blob = new Blob([JSON.stringify(sample, null, 2)], { type: 'application/json' });
        triggerDownload(blob, 'questions-template.json');
    });

    downloadCsvTemplateBtn?.addEventListener('click', () => {
        const csv = 'question,option1,option2,option3,option4,correctAnswer,explanation\n"What is 2 + 2?",3,4,5,6,2,"2 + 2 equals 4."\n';
        const blob = new Blob([csv], { type: 'text/csv' });
        triggerDownload(blob, 'questions-template.csv');
    });
}

function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);
}

// JSON importer
async function importFromJSON(file) {
    const text = await file.text();
    let data = JSON.parse(text);
    if (!Array.isArray(data) && data && Array.isArray(data.quizQuestions)) {
        data = data.quizQuestions;
    }
    return data;
}

// CSV/Excel importer using SheetJS
async function importFromCSVorExcel(file, kind) {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

    // Expect headers: question, option1..option4, correctAnswer, explanation
    const out = [];
    for (const r of rows) {
        const q = String(r.question || '').trim();
        const options = [r.option1, r.option2, r.option3, r.option4].map(v => String(v ?? '').trim()).filter(Boolean);
        let ca = r.correctAnswer;
        const explanation = String(r.explanation || '').trim();

        if (typeof ca === 'string' && ca.trim() !== '') ca = Number(ca);
        if (typeof ca === 'number') {
            // normalize 1-4 => 0-3
            if (ca >= 1 && ca <= 4) ca = ca - 1;
        }

        if (q && options.length >= 4 && typeof ca === 'number' && ca >= 0 && ca < 4 && explanation) {
            out.push({ question: q, options: options.slice(0, 4), correctAnswer: ca, explanation });
        }
    }
    return out;
}

// DOCX importer via mammoth -> raw text, then parse
async function importFromDocx(file) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await window.mammoth.convertToRawText({ arrayBuffer });
    const text = result.value || '';
    return parseBlocksText(text);
}

// PDF importer via pdf.js -> text, then parse
async function importFromPDF(file) {
    const data = new Uint8Array(await file.arrayBuffer());
    const pdf = await pdfjsLib.getDocument({ data }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(it => it.str).join(' ');
        fullText += '\n' + pageText;
    }
    return parseBlocksText(fullText);
}

// Parse free-text blocks into questions
function parseBlocksText(text) {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const blocks = [];
    let buf = [];
    for (const line of lines) {
        if (/^question\s*:/i.test(line) && buf.length) {
            blocks.push(buf.join('\n'));
            buf = [line];
        } else {
            buf.push(line);
        }
    }
    if (buf.length) blocks.push(buf.join('\n'));

    const out = [];
    for (const b of blocks) {
        const qMatch = b.match(/question\s*:\s*(.+)/i);
        if (!qMatch) continue;
        const q = qMatch[1].trim();

        // options (support A)/B)/C)/D) or 1./2./3./4.)
        const optPatterns = [
            /\bA\)\s*(.+)/i,
            /\bB\)\s*(.+)/i,
            /\bC\)\s*(.+)/i,
            /\bD\)\s*(.+)/i
        ];
        const numPatterns = [
            /\b1[\).]\s*(.+)/,
            /\b2[\).]\s*(.+)/,
            /\b3[\).]\s*(.+)/,
            /\b4[\).]\s*(.+)/
        ];
        let options = [];
        for (let i = 0; i < 4; i++) {
            const m = b.match(optPatterns[i]) || b.match(numPatterns[i]);
            options.push(m ? m[1].trim() : '');
        }
        options = options.filter(Boolean);
        if (options.length < 4) continue;

        // correct: letter or number
        let ca = -1;
        const cMatch = b.match(/correct\s*:\s*([A-D1-4])/i);
        if (cMatch) {
            const v = cMatch[1].toUpperCase();
            if (/[A-D]/.test(v)) ca = v.charCodeAt(0) - 'A'.charCodeAt(0);
            else ca = Number(v) - 1;
        }
        if (ca < 0 || ca > 3) continue;

        // explanation
        const eMatch = b.match(/explanation\s*:\s*(.+)/i);
        const explanation = eMatch ? eMatch[1].trim() : '';
        if (!explanation) continue;

        out.push({ question: q, options: options.slice(0, 4), correctAnswer: ca, explanation });
    }
    return out;
}

function normalizeQuestions(arr) {
    const out = [];
    for (const q of arr) {
        if (!q || typeof q !== 'object') continue;
        const question = String(q.question || '').trim();
        const options = Array.isArray(q.options) ? q.options.map(o => String(o || '').trim()) : [];
        let ca = q.correctAnswer;
        const explanation = String(q.explanation || '').trim();
        if (typeof ca === 'string' && ca.trim() !== '') ca = Number(ca);
        if (typeof ca === 'number' && ca >= 1 && ca <= 4) ca = ca - 1; // normalize 1-4 to 0-3
        if (question && options.length >= 4 && typeof ca === 'number' && ca >= 0 && ca < 4 && explanation) {
            out.push({ question, options: options.slice(0, 4), correctAnswer: ca, explanation });
        }
    }
    return out;
}