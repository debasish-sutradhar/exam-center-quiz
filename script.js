let currentQuestionIndex = 0;
let score = 0;
let timer;
let secondsLeft = 30; // 30 seconds timer
let quizStarted = false;
let selectedAnswers = []; // For tracking multi-select answers

const STORAGE_KEY = 'examCenterQuestions';

// Timestamp display - update every second
function updateTimestamp() {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    
    const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    document.getElementById('timestamp').textContent = `UTC: ${timestamp}`;
}

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
const totalQuestions = QUESTIONS.length;

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
const questionProgress = document.getElementById('question-progress');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Set up timestamp display
    updateTimestamp();
    setInterval(updateTimestamp, 1000);
});
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    quizStarted = true;
    currentQuestionIndex = 0;
    score = 0;

    startButton.classList.add('hidden');
    resultsContainer.classList.add('hidden');

    totalQuestionsElement.textContent = totalQuestions;
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
    
    // Update progress indicator
    questionProgress.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
    
    // Check if this is a multi-select question
    const isMultiSelect = Array.isArray(currentQuestion.correctAnswer);
    
    // Create options
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('div');
        button.classList.add('option');
        button.textContent = option;
        button.dataset.index = index;
        
        // For multi-select questions, we need a different event handler
        if (isMultiSelect) {
            button.addEventListener('click', toggleMultiSelectOption);
            // Add visual indicator for multi-select
            button.classList.add('multi-select');
        } else {
            button.addEventListener('click', selectOption);
        }
        
        optionsContainer.appendChild(button);
    });
    
    // If multi-select, add a submit button and instruction
    if (isMultiSelect) {
        const instruction = document.createElement('div');
        instruction.className = 'multi-select-instruction';
        instruction.textContent = 'Select all that apply and click Submit';
        optionsContainer.appendChild(instruction);
        
        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Submit Answers';
        submitBtn.id = 'submit-multi';
        submitBtn.addEventListener('click', submitMultiSelectAnswers);
        optionsContainer.appendChild(submitBtn);
        
        // Initialize empty array for selected answers
        selectedAnswers = [];
    }

    // Start timer
    startTimer();
}

function resetState() {
    clearInterval(timer);
    secondsLeft = 30; // Reset to 30 seconds for each question
    timerElement.textContent = secondsLeft;
    timerElement.className = '';

    explanationContainer.classList.add('hidden');

    // Clear options
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
    
    // Reset selected answers array for multi-select
    selectedAnswers = [];
}

function startTimer() {
    timerElement.textContent = secondsLeft;

    timer = setInterval(() => {
        secondsLeft--;
        timerElement.textContent = secondsLeft;

        // Warning at 10 seconds
        if (secondsLeft <= 10 && secondsLeft > 5) {
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
    const isMultiSelect = Array.isArray(currentQuestion.correctAnswer);

    // Disable all options
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        if (isMultiSelect) {
            option.removeEventListener('click', toggleMultiSelectOption);
        } else {
            option.removeEventListener('click', selectOption);
        }

        // Mark correct answers
        const optionIndex = parseInt(option.dataset.index);
        if (isMultiSelect) {
            if (currentQuestion.correctAnswer.includes(optionIndex)) {
                option.classList.add('correct');
            }
        } else {
            if (optionIndex === currentQuestion.correctAnswer) {
                option.classList.add('correct');
            }
        }
    });

    // Hide submit button if present
    const submitBtn = document.getElementById('submit-multi');
    if (submitBtn) submitBtn.remove();

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

        // Show explanation
        explanationText.textContent = currentQuestion.explanation;
        explanationContainer.classList.remove('hidden');

        // Automatically go to next question after 1 second
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1000);
    } else {
        selectedOption.classList.add('incorrect');
        // Show explanation
        explanationText.textContent = currentQuestion.explanation;
        explanationContainer.classList.remove('hidden');
        // User can manually click "Next Question" to proceed
    }
}

function toggleMultiSelectOption(e) {
    const option = e.target;
    const optionIndex = parseInt(option.dataset.index);
    
    // Toggle selection status
    if (option.classList.contains('selected-multi')) {
        option.classList.remove('selected-multi');
        selectedAnswers = selectedAnswers.filter(idx => idx !== optionIndex);
    } else {
        option.classList.add('selected-multi');
        selectedAnswers.push(optionIndex);
    }
}

function submitMultiSelectAnswers() {
    clearInterval(timer);
    
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const correctAnswers = currentQuestion.correctAnswer;
    
    // Sort arrays for comparison
    selectedAnswers.sort((a, b) => a - b);
    const sortedCorrectAnswers = [...correctAnswers].sort((a, b) => a - b);
    
    // Disable all options and mark correct ones
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.removeEventListener('click', toggleMultiSelectOption);
        const optionIndex = parseInt(option.dataset.index);
        
        if (correctAnswers.includes(optionIndex)) {
            option.classList.add('correct');
        }
    });
    
    // Remove submit button
    document.getElementById('submit-multi').remove();
    
    // Check if all answers are correct
    let isAllCorrect = true;
    
    // Arrays must be same length
    if (selectedAnswers.length !== sortedCorrectAnswers.length) {
        isAllCorrect = false;
    } else {
        // Each element must match
        for (let i = 0; i < selectedAnswers.length; i++) {
            if (selectedAnswers[i] !== sortedCorrectAnswers[i]) {
                isAllCorrect = false;
                break;
            }
        }
    }
    
    if (isAllCorrect) {
        score++;
        // Show explanation
        explanationText.textContent = currentQuestion.explanation;
        explanationContainer.classList.remove('hidden');
        
        // Auto-advance after correct multi-select
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1500); // Slightly longer delay for multi-select
    } else {
        // Show explanation for incorrect answers
        explanationText.textContent = currentQuestion.explanation;
        explanationContainer.classList.remove('hidden');
        // No auto-advance for incorrect answers
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function showResults() {
    scoreElement.textContent = score;
    totalQuestionsElement.textContent = totalQuestions;
    resultsContainer.classList.remove('hidden');
}

function restartQuiz() {
    startQuiz();
}
