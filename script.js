const quizData = [
    {
        question: "Which of the following are programming languages?",
        options: {
            a: "HTML",
            b: "Python",
            c: "CSS",
            d: "JavaScript"
        },
        correct: ["b", "d"]
    },
    {
        question: "What is the capital of France?",
        options: {
            a: "Berlin",
            b: "Madrid",
            c: "Paris",
            d: "Lisbon"
        },
        correct: ["c"]
    },
    {
        question: "Who is the CEO of Tesla?",
        options: {
            a: "Bill Gates",
            b: "Elon Musk",
            c: "Jeff Bezos",
            d: "Warren Buffet"
        },
        correct: ["b"]
    },
    {
        question: "The iPhone was created by which company?",
        options: {
            a: "Apple",
            b: "Intel",
            c: "Amazon",
            d: "Microsoft"
        },
        correct: ["a"]
    }
];

const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    resetQuiz();

    const currentQuizData = quizData[currentQuiz];
    const answerType = currentQuizData.correct.length > 1 ? 'checkbox' : 'radio';

    questionEl.innerText = currentQuizData.question;

    const answersContainer = document.createElement('ul');

    Object.keys(currentQuizData.options).forEach(key => {
        const answerItem = document.createElement('li');
        
        const input = document.createElement('input');
        input.type = answerType;
        input.name = 'answer';
        input.id = key;
        input.classList.add('answer');
        
        const label = document.createElement('label');
        label.htmlFor = key;
        label.id = `${key}_text`;
        label.innerText = currentQuizData.options[key];
        
        answerItem.appendChild(input);
        answerItem.appendChild(label);
        
        answersContainer.appendChild(answerItem);
    });

    const quizHeader = document.querySelector('.quiz-header');
    quizHeader.appendChild(answersContainer);
}

function resetQuiz() {
    const answersContainer = document.querySelector('.quiz-header ul');
    if (answersContainer) {
        answersContainer.remove();
    }
    resetAnswerStyles();
}

function resetAnswerStyles() {
    document.querySelectorAll('label').forEach(label => {
        label.classList.remove('correct', 'wrong');
    });
}

function getSelected() {
    const selectedAnswers = [];
    document.querySelectorAll('.answer').forEach(answerEl => {
        if (answerEl.checked) {
            selectedAnswers.push(answerEl.id);
        }
    });
    return selectedAnswers;
}

function showAnswers() {
    const correctAnswers = quizData[currentQuiz].correct;
    document.querySelectorAll('.answer').forEach(answerEl => {
        const label = document.getElementById(answerEl.id + '_text');
        if (correctAnswers.includes(answerEl.id)) {
            label.classList.add('correct');
        } else if (answerEl.checked) {
            label.classList.add('wrong');
        }
    });
}

submitBtn.addEventListener('click', () => {
    const selectedAnswers = getSelected();

    if (selectedAnswers.length > 0) {
        showAnswers();

        const correctAnswers = quizData[currentQuiz].correct;
        if (correctAnswers.length === selectedAnswers.length && selectedAnswers.every(val => correctAnswers.includes(val))) {
            score++;
        }

        currentQuiz++;

        setTimeout(() => {
            if (currentQuiz < quizData.length) {
                loadQuiz();
            } else {
                quiz.innerHTML = `
                    <h2>You answered ${score}/${quizData.length} questions correctly</h2>
                    <button onclick="location.reload()">Reload</button>
                `;
            }
        }, 2000);
    }
});
