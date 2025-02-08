const questions = [ 
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Lisbon", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },
    {
        question: "What is the capital of Nigeria?",
        answers: [
            { text: "Benin", correct: false },
            { text: "Maduguri", correct: false },
            { text: "Abuja", correct: true },
            { text: "Enugu", correct: false }
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "Mark Twain", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Jane Austen", correct: false }
        ]
    },
    {
        question: "What is the smallest prime number?",
        answers: [
            { text: "0", correct: false },
            { text: "1", correct: false },
            { text: "2", correct: true },
            { text: "3", correct: false }
        ]
    },
    {
        question: "What is the biggest prime number?",
        answers: [
            { text: "10", correct: true },
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "1", correct: false }
        ]
    }
 ];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const progressElement = document.getElementById('progress');
const resultElement = document.getElementById('result');

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    resultElement.style.display = 'none';
    questionContainer.style.display = 'block';
    progressElement.style.display = 'block';
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtons.innerHTML = '';
    
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', (e) => selectAnswer(e, answer.correct));
        if (answer.correct) button.dataset.correct = true;
        answerButtons.appendChild(button);
    });
    
    progressElement.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function selectAnswer(e, correct) {
    const selectedButton = e.target;
    if (correct) score++;
    
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
    });
    
    if (!correct) selectedButton.classList.add('wrong');
    
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    questionContainer.style.display = 'none';
    progressElement.style.display = 'none';
    resultElement.style.display = 'block';
    
    const restartButton = document.createElement('button');
    restartButton.className = 'btn restart-btn';
    restartButton.textContent = 'Restart Quiz';
    restartButton.addEventListener('click', startGame);
    
    resultElement.innerHTML = `Your Score: <strong>${score}</strong> out of ${questions.length}`;
    resultElement.appendChild(restartButton);
}
document.addEventListener('DOMContentLoaded', startGame);
