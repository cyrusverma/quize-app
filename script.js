let currentQuestion = 0;
let score = 0;
let timer;

const questions = [
    {
        question: "What does DBMS stand for?",
        options: ["Database Management System", "Data Business Management System", "Digital Base Management System", "Database Modeling System"],
        answer: "Database Management System"
    },
    {
        question: "Which of the following is an example of an operating system?",
        options: ["Microsoft Word", "Linux", "Adobe Photoshop", "Google Chrome"],
        answer: "Linux"
    },
    {
        question: "What is the main purpose of the Python 'for' loop?",
        options: ["Database querying", "Iteration", "Conditional statements", "File I/O"],
        answer: "Iteration"
    },
    {
        question: "In C programming, how do you declare a pointer?",
        options: ["&", "*", "#", "$"],
        answer: "*"
    },
    {
        question: "What does SQL stand for?",
        options: ["Structured Query Language", "Simple Question Language", "Sequential Query Language", "Structured Quality Language"],
        answer: "Structured Query Language"
    },
    {
        question: "Which operating system is not based on UNIX?",
        options: ["Linux", "macOS", "Windows", "Ubuntu"],
        answer: "Windows"
    },
    {
        question: "What is the purpose of the 'else' statement in Python?",
        options: ["Error handling", "Conditional execution", "Loop control", "Function definition"],
        answer: "Conditional execution"
    },
    {
        question: "In C programming, what is the 'sizeof' operator used for?",
        options: ["Determine size of a variable", "Calculate the square root", "Find the remainder", "Convert data types"],
        answer: "Determine size of a variable"
    },
    {
        question: "Which data model represents data as entities, relationships, and attributes?",
        options: ["Hierarchical model", "Network model", "Relational model", "Entity-Relationship model"],
        answer: "Entity-Relationship model"
    },
    {
        question: "What is the primary purpose of an operating system?",
        options: ["Manage hardware resources", "Create graphics", "Run Python scripts", "Edit text documents"],
        answer: "Manage hardware resources"
    },
];


const timerDuration = 30;

function startQuiz() {
    document.querySelector('.info-box').style.display = 'none';
    document.querySelector('.quiz-content').style.display = 'block';
    showQuestion();
    startTimer();
}

function showQuestion() {
    const questionText = document.querySelector('.question-text');
    const optionsContainer = document.querySelector('.options-container');
    const currentQ = questions[currentQuestion];

    questionText.textContent = currentQ.question;
    optionsContainer.innerHTML = '';

    currentQ.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.setAttribute('onclick', `checkAnswer(${index})`);
        optionsContainer.appendChild(optionElement);
    });
}

function checkAnswer(optionIndex) {
    const selectedOption = questions[currentQuestion].options[optionIndex];
    const correctAnswer = questions[currentQuestion].answer;

    if (selectedOption === correctAnswer) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    let timeLeft = timerDuration;
    timer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
        document.querySelector('.timer-sec').textContent = timeLeft;
        document.querySelector('.timer-bar').style.width = `${(timeLeft / timerDuration) * 100}%`;
        timeLeft--;
    }, 1000);
}

function endQuiz() {
    document.querySelector('.quiz-content').style.display = 'none';
    document.querySelector('.result-box').style.display = 'block';
    showResult();
}

function showResult() {
    const scoreText = document.querySelector('.score');
    scoreText.textContent = `${score} out of ${questions.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    clearInterval(timer);
    document.querySelector('.quiz-content').style.display = 'block';
    document.querySelector('.result-box').style.display = 'none';
    showQuestion();
    startTimer();
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        endQuiz();
    }
}

// Call startQuiz when the page loads
document.addEventListener('DOMContentLoaded', startQuiz);

