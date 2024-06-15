const quizData = [
    {
        question: "Which of the following are programming languages?",
        a: "HTML",
        b: "Python",
        c: "CSS",
        d: "JavaScript",
        correct: ["b", "d"]
    },
    {
        question: "Which of the following are input devices?",
        a: "Mouse",
        b: "Monitor",
        c: "Keyboard",
        d: "Microphone",
        correct: ["c", "a", "d"]
    },
    {
        question: "Which country has two names in the World?",
        a: "England",
        b: "America",
        c: "China",
        d: "india",
        correct: ["d"]
    },
    {
        question: "The iPhone was created by which company?",
        a: "Apple",
        b: "Intel",
        c: "Amazon",
        d: "Microsoft",
        correct: ["a"]
    }
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    resetAnswerStyles();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function resetAnswerStyles() {
    document.querySelectorAll('label').forEach(label => {
        label.classList.remove('correct', 'wrong');
    });
}

function getSelected() {
    const selectedAnswers = [];
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            selectedAnswers.push(answerEl.id);
        }
    });
    return selectedAnswers;
}

function showAnswers() {
    const correctAnswers = quizData[currentQuiz].correct;
    answerEls.forEach(answerEl => {
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
