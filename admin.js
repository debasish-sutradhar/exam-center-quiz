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

// Local storage key
const STORAGE_KEY = 'examCenterQuestions';

// Initialize questions from storage or use default
let questions = [];

// Load questions from questions.js if available
if (typeof quizQuestions !== 'undefined') {
    questions = [...quizQuestions];
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load questions from local storage (overriding if needed)
    const storedQuestions = localStorage.getItem(STORAGE_KEY);
    if (storedQuestions) {
        questions = JSON.parse(storedQuestions);
    }
    
    // Display questions
    renderQuestions();
});

questionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addQuestion();
});

exportQuestionsBtn.addEventListener('click', exportQuestions);
saveToFileBtn.addEventListener('click', saveToFile);

// Functions
function addQuestion() {
    // Get values from form
    const question = questionInput.value;
    const options = [
        option1Input.value,
        option2Input.value,
        option3Input.value,
        option4Input.value
    ];
    const correctAnswer = parseInt(correctAnswerSelect.value);
    const explanation = explanationInput.value;
    
    // Create new question object
    const newQuestion = {
        question: question,
        options: options,
        correctAnswer: correctAnswer,
        explanation: explanation
    };
    
    // Add to questions array
    questions.push(newQuestion);
    
    // Save to local storage
    saveQuestions();
    
    // Render questions
    renderQuestions();
    
    // Reset form
    questionForm.reset();
    
    // Show confirmation
    alert('Question added successfully!');
}

function renderQuestions() {
    // Clear existing questions
    questionsList.innerHTML = '';
    
    // If no questions, show message
    if (questions.length === 0) {
        questionsList.innerHTML = '<p>No questions yet. Add one using the form above.</p>';
        return;
    }
    
    // Loop through questions and create elements
    questions.forEach((question, index) => {
        const questionItem = document.createElement('div');
        questionItem.classList.add('question-item');
        
        const questionHeader = document.createElement('h3');
        questionHeader.textContent = `Question ${index + 1}: ${question.question}`;
        questionItem.appendChild(questionHeader);
        
        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('question-options');
        
        question.options.forEach((option, optIndex) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('question-option');
            if (optIndex === question.correctAnswer) {
                optionElement.classList.add('correct');
            }
            optionElement.textContent = `${optIndex + 1}. ${option}${optIndex === question.correctAnswer ? ' ✓' : ''}`;
            optionsContainer.appendChild(optionElement);
        });
        questionItem.appendChild(optionsContainer);
        
        const explanationElement = document.createElement('div');
        explanationElement.classList.add('question-explanation');
        explanationElement.innerHTML = `<strong>Explanation:</strong> ${question.explanation}`;
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
    
    codeContainer.style.position = 'fixed';
    codeContainer.style.top = '50%';
    codeContainer.style.left = '50%';
    codeContainer.style.transform = 'translate(-50%, -50%)';
    codeContainer.style.backgroundColor = 'white';
    codeContainer.style.padding = '20px';
    codeContainer.style.borderRadius = '10px';
    codeContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    codeContainer.style.zIndex = '1000';
    codeContainer.style.width = '80%';
    codeContainer.style.maxWidth = '800px';
    
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