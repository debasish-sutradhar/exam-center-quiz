let currentQuestionIndex = 0;
let score = 0;
let timer;
let secondsLeft = 45;
let quizStarted = false;

const STORAGE_KEY = 'examCenterQuestions';

// Determine questions source: prefer imported (localStorage), else questions.js
function getQuestions() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length) return parsed;
        }
    } catch (_) {}
    if (typeof quizQuestions !== 'undefined' && Array.isArray(quizQuestions)) return quizQuestions;
    return [];
}

const QUESTIONS = getQuestions();

// DOM Elements
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const explanationContainer = document.getElementById('explanation-container');
const explanationText = document.getElementById('explanation-text');
const resultsContainer = document.getElementById('results-container');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const timerElement = document.getElementById('timer');
const quizContainer = document.getElementById('quiz-container');

// Event Listeners
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    quizStarted = true;
    currentQuestionIndex = 0;
    score = 0;

    startButton.classList.add('hidden');
    resultsContainer.classList.add('hidden');

    totalQuestionsElement.textContent = QUESTIONS.length;
    loadQuestion();
}

function loadQuestion() {
    resetState();

    if (currentQuestionIndex >= QUESTIONS.length) {
        showResults();
        return;
    }

    const currentQuestion = QUESTIONS[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    // Create options
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('div');
        button.classList.add('option');
        button.textContent = option;
        button.dataset.index = index;
        button.addEventListener('click', selectOption);
        optionsContainer.appendChild(button);
    });

    // Start timer
    startTimer();
}

function resetState() {
    clearInterval(timer);
    secondsLeft = 45;
    timerElement.textContent = secondsLeft;
    timerElement.className = '';

    explanationContainer.classList.add('hidden');

    // Clear options
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function startTimer() {
    timerElement.textContent = secondsLeft;

    timer = setInterval(() => {
        secondsLeft--;
        timerElement.textContent = secondsLeft;

        // Warning at 15 seconds
        if (secondsLeft <= 15 && secondsLeft > 5) {
            timerElement.className = 'warning';
        }

        // Danger at 5 seconds
        if (secondsLeft <= 5) {
            timerElement.className = 'danger';
        }

        if (secondsLeft <= 0) {
            clearInterval(timer);
            timeUp();
        }
    }, 1000);
}

function timeUp() {
    const currentQuestion = QUESTIONS[currentQuestionIndex];

    // Disable all options
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.removeEventListener('click', selectOption);

        if (parseInt(option.dataset.index) === currentQuestion.correctAnswer) {
            option.classList.add('correct');
        }
    });

    // Show explanation
    explanationText.textContent = currentQuestion.explanation;
    explanationContainer.classList.remove('hidden');
}

function selectOption(e) {
    clearInterval(timer);

    const selectedOption = e.target;
    const selectedIndex = parseInt(selectedOption.dataset.index);
    const currentQuestion = QUESTIONS[currentQuestionIndex];

    // Disable all options
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.removeEventListener('click', selectOption);

        if (parseInt(option.dataset.index) === currentQuestion.correctAnswer) {
            option.classList.add('correct');
        }
    });

    // Check if answer is correct
    if (selectedIndex === currentQuestion.correctAnswer) {
        selectedOption.classList.add('selected');
        score++;
    } else {
        selectedOption.classList.add('incorrect');
    }

    // Show explanation
    explanationText.textContent = currentQuestion.explanation;
    explanationContainer.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function showResults() {
    scoreElement.textContent = score;
    totalQuestionsElement.textContent = QUESTIONS.length;
    resultsContainer.classList.remove('hidden');
}

function restartQuiz() {
    startQuiz();
}
