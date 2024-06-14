// Function to generate dummy questions (for illustration purposes)
function generateQuestions(count) {
    const generatedQuestions = [];
    for (let i = 1; i <= count; i++) {
        generatedQuestions.push({
            question: `Which answers are correct for question ${i}?`,
            answers: [
                { text: 'This is the first of three correct answers.', correct: true },
                { text: 'This answer is incorrect.', correct: false },
                { text: 'This is the third of three correct answers', correct: true },
                { text: 'This is the second of three correct answers.', correct: true }
            ]
        });
    }
    return generatedQuestions;
}

const questions = generateQuestions(200); // Generate 200 questions

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    submitButton.classList.add('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, answer));
        answerButtonsElement.appendChild(button);
    });
    submitButton.classList.remove('hide');
}

function resetState() {
    nextButton.classList.add('hide');
    submitButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(button, answer) {
    if (answer.correct) {
        button.classList.add('correct');
    } else {
        button.classList.add('wrong');
    }
    button.disabled = true;
}

function submitAnswers() {
    Array.from(answerButtonsElement.children).forEach(button => {
        const correct = questions[currentQuestionIndex].answers.find(answer => answer.text === button.innerText).correct;
        if (correct) {
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }
        button.disabled = true;
    });
    nextButton.classList.remove('hide');
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = 'Restart';
    nextButton.classList.remove('hide');
}

submitButton.addEventListener('click', submitAnswers);
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        showNextQuestion();
    } else {
        startQuiz();
    }
});

startQuiz();
