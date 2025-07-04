const quizData = [
    { question: "When you think about improving, what's your top priority?", answers: [{ text: "Perfecting a specific skill, like my first touch or shooting.", program: 'Individual Plan' },{ text: "Getting faster and stronger to dominate my opponent.", program: 'Strength and Conditioning' },{ text: "Understanding where to be on the pitch and when.", program: 'In Game Intelligence' }] },
    { question: "After a tough match, what are you most likely to be frustrated with?", answers: [{ text: "I felt a step too slow or got pushed off the ball too easily.", program: 'Strength and Conditioning' },{ text: "I felt like the game was happening too fast for me to read it.", program: 'In Game Intelligence' },{ text: "My technique let me down at a crucial moment.", program: 'Individual Plan' }] },
    { question: "Which elite player attribute do you admire most?", answers: [{ text: "The vision and passing range of a player like Kevin De Bruyne.", program: 'In Game Intelligence' },{ text: "The raw speed and power of a player like Kylian Mbappé.", program: 'Strength and Conditioning' },{ text: "The flawless dribbling technique of a player like Lionel Messi.", program: 'Individual Plan' }] },
    { question: "What type of training session gets you most excited?", answers: [{ text: "A high-intensity gym or track session that pushes my physical limits.", program: 'Strength and Conditioning' },{ text: "A 'chalk talk' session, analyzing game film and tactical setups.", program: 'In Game Intelligence' },{ text: "A one-on-one session with a coach, repeating a drill until it's perfect.", program: 'Individual Plan' }] },
    { question: "If you had a magic wand, what would you instantly improve?", answers: [{ text: "My top speed and overall athleticism.", program: 'Strength and Conditioning' },{ text: "My ability with my weaker foot.", program: 'Individual Plan' },{ text: "My ability to read the opponent's next move.", program: 'In Game Intelligence' }] },
    { question: "What feedback do you most often get from coaches?", answers: [{ text: "'You need to be cleaner and more consistent with your technique.'", program: 'Individual Plan' },{ text: "'You need to work on your positioning and awareness.'", program: 'In Game Intelligence' },{ text: "'You need to be stronger on the ball to handle duels.'", program: 'Strength and Conditioning' }] },
    { question: "In a game, which situation gives you the most trouble?", answers: [{ text: "Finding space when the opponent's defence is tightly packed.", program: 'In Game Intelligence' },{ text: "Losing the ball when a strong player challenges me.", program: 'Strength and Conditioning' },{ text: "Controlling a difficult pass under pressure.", program: 'Individual Plan' }] }
];

const programDetails = {
    'Individual Plan': { name: 'Individual Plan', description: 'You focus on perfecting the details. This program is designed to sharpen your specific technical skills with personalized one-on-one coaching.', link: 'individual plan.html' },
    'In Game Intelligence': { name: 'In-Game Intelligence', description: 'You see the bigger picture. This program will elevate your tactical awareness and decision making, turning you into the smartest player on the pitch.', link: 'In_Game.html' },
    'Strength and Conditioning': { name: 'Strength & Conditioning', description: 'You are an athlete who wants a physical edge. This program is built to increase your speed, power, and endurance to dominate your opponents.', link: 'SAC.html' }
};

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

const startBtn = document.getElementById('start-btn');
const retakeBtn = document.getElementById('retake-btn');

const questionCounterEl = document.getElementById('question-counter');
const questionTextEl = document.getElementById('question-text');
const answerButtonsEl = document.getElementById('answer-buttons');
const progressBarEl = document.getElementById('progress-bar');

const scoresContainerEl = document.getElementById('scores-container');
const recommendationTitleEl = document.getElementById('recommendation-title');
const recommendationTextEl = document.getElementById('recommendation-text');
const recommendationLinkEl = document.getElementById('recommendation-link');

let currentQuestionIndex;
let scores;

function startQuiz() {
    currentQuestionIndex = 0;
    scores = { 'Individual Plan': 0, 'In Game Intelligence': 0, 'Strength and Conditioning': 0 };
    startScreen.classList.add('d-none');
    resultsScreen.classList.add('d-none');
    quizScreen.classList.remove('d-none');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    questionCounterEl.innerText = `Question ${questionNumber} of ${quizData.length}`;
    questionTextEl.innerText = currentQuestion.question;
    progressBarEl.style.width = `${(questionNumber / quizData.length) * 100}%`;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'btn-outline-dark', 'p-3', 'answer-btn');
        button.addEventListener('click', () => selectAnswer(answer.program));
        answerButtonsEl.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

function selectAnswer(program) {
    scores[program]++;
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.add('d-none');
    resultsScreen.classList.remove('d-none');

    let maxScore = -1;
    let winningProgram = '';
    for (const program in scores) {
        if (scores[program] > maxScore) {
            maxScore = scores[program];
            winningProgram = program;
        }
    }

    scoresContainerEl.innerHTML = '';
    for (const program in scores) {
        const scoreEl = document.createElement('div');
        scoreEl.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <strong>${programDetails[program].name}</strong>
                <span>${scores[program]} / ${quizData.length}</span>
            </div>
            <div class="progress" style="height: 5px;">
                <div class="progress-bar bg-dark" role="progressbar" style="width: ${(scores[program] / quizData.length) * 100}%"></div>
            </div>
        `;
        scoresContainerEl.appendChild(scoreEl);
    }

    recommendationTitleEl.innerText = programDetails[winningProgram].name;
    recommendationTextEl.innerText = programDetails[winningProgram].description;
    recommendationLinkEl.href = programDetails[winningProgram].link;
}

startBtn.addEventListener('click', startQuiz);
retakeBtn.addEventListener('click', startQuiz);