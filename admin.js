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
  questions = Array.isArray(quizQuestions) ? [...quizQuestions] : [];
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
      // ignore parse errors
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

// Import events
importBtn?.addEventListener('click', async () => {
  if (!importFileInput?.files?.length) {
    return setStatus('Please choose a file to import.', 'error');
  }
  const file = importFileInput.files[0];
  const mode = importModeSelect?.value || 'merge';

  try {
    const imported = await parseFileToQuestions(file);
    if (!Array.isArray(imported) || imported.length === 0) {
      return setStatus('No valid questions found in the file.', 'error');
    }

    if (mode === 'replace') {
      questions = imported;
    } else {
      questions = questions.concat(imported);
    }

    saveQuestions();
    renderQuestions();
    setStatus(`Imported ${imported.length} question(s) successfully.`, 'success');
  } catch (err) {
    console.error(err);
    setStatus(`Import failed: ${err.message || err}`, 'error');
  }
});

// Functions
function addQuestion() {
  const question = (questionInput.value || '').trim();
  const options = [
    (option1Input.value || '').trim(),
    (option2Input.value || '').trim(),
    (option3Input.value || '').trim(),
    (option4Input.value || '').trim()
  ];
  const correctAnswer = parseInt(correctAnswerSelect.value, 10);
  const explanation = (explanationInput.value || '').trim();

  if (!question || options.some(o => !o) || !(correctAnswer >= 0 && correctAnswer <= 3) || !explanation) {
    alert('Please fill all fields correctly.');
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
    questionsList.innerHTML = '<p>No questions yet. Add one using the form above, or import from a file.</p>';
    return;
  }

  questions.forEach((q, index) => {
    const questionItem = document.createElement('div');
    questionItem.classList.add('question-item');

    const questionHeader = document.createElement('h3');
    questionHeader.textContent = `Question ${index + 1}: ${q.question}`;
    questionItem.appendChild(questionHeader);

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('question-options');

    q.options.forEach((option, optIndex) => {
      const optionElement = document.createElement('div');
      optionElement.classList.add('question-option');
      if (optIndex === q.correctAnswer) optionElement.classList.add('correct');
      optionElement.textContent = `${optIndex + 1}. ${option}${optIndex === q.correctAnswer ? ' ✓' : ''}`;
      optionsContainer.appendChild(optionElement);
    });
    questionItem.appendChild(optionsContainer);

    const explanationElement = document.createElement('div');
    explanationElement.classList.add('question-explanation');
    explanationElement.innerHTML = `<strong>Explanation:</strong> ${q.explanation}`;
    questionItem.appendChild(explanationElement);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-question');
    deleteButton.textContent = '×';
    deleteButton.addEventListener('click', () => deleteQuestion(index));
    questionItem.appendChild(deleteButton);

    questionsList.appendChild(questionItem);
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
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    zIndex: '1000',
    width: '80%',
    maxWidth: '800px'
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

function setupTemplateDownloads() {
  downloadJsonTemplateBtn?.addEventListener('click', () => {
    const tpl = [
      {
        question: "What is 2 + 2?",
        options: ["3","4","5","6"],
        correctAnswer: 1,
        explanation: "2 + 2 equals 4."
      }
    ];
    const blob = new Blob([JSON.stringify(tpl, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, 'quiz-template.json');
  });

  downloadCsvTemplateBtn?.addEventListener('click', () => {
    const csv = [
      'question,option1,option2,option3,option4,correctAnswer,explanation',
      '"What is 2 + 2?",3,4,5,6,2,"2 + 2 equals 4."'
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, 'quiz-template.csv');
  });
}

function triggerDownload(url, filename) {
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

function setStatus(msg, type = 'info') {
  if (!importStatus) return;
  importStatus.textContent = msg;
  importStatus.style.color = type === 'error' ? '#d32f2f' : (type === 'success' ? '#2e7d32' : '#333');
}

// Parse helpers
async function parseFileToQuestions(file) {
  const ext = (file.name.split('.').pop() || '').toLowerCase();

  if (ext === 'json') return await parseJSON(file);
  if (ext === 'csv') return await parseCSVorExcel(file, 'csv');
  if (ext === 'xlsx' || ext === 'xls') return await parseCSVorExcel(file, 'excel');
  if (ext === 'docx') return await parseDOCX(file);
  if (ext === 'pdf') return await parsePDF(file);

  // Fallback by MIME type
  if (file.type === 'application/json') return await parseJSON(file);
  if (file.type === 'text/csv') return await parseCSVorExcel(file, 'csv');

  throw new Error('Unsupported file type. Please use .json, .csv, .xlsx, .xls, .docx, or .pdf');
}

async function parseJSON(file) {
  const text = await file.text();
  const data = JSON.parse(text);
  const arr = Array.isArray(data) ? data : Array.isArray(data?.quizQuestions) ? data
