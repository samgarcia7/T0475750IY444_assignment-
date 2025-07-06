
document.addEventListener('DOMContentLoaded', function() {

    // Questions and Answers //
    const quizData = [
        {
            question: "When you're honest with yourself, what's the #1 thing holding your game back?",
            answers: [
                { text: "My touch is inconsistent, or my shooting is off.", program: 'Individual Plan' },
                { text: "I get outpaced or outmuscled in key moments.", program: 'Strength and Conditioning' },
                { text: "I sometimes feel lost or make the wrong decision.", program: 'In Game Intelligence' }
            ]
        },
        {
            question: "It's full-time after a tough loss. What's nagging at you the most?",
            answers: [
                { text: "I didn't have the legs for the last 20 minutes.", program: 'Strength and Conditioning' },
                { text: "I feel like I was reading the game a step too slow.", program: 'In Game Intelligence' },
                { text: "A single bad touch or missed pass cost us.", program: 'Individual Plan' }
            ]
        },
        {
            question: "When you watch the pros, what makes you say 'I want to do that'?",
            answers: [
                { text: "A pinpoint pass that no one else saw.", program: 'In Game Intelligence' },
                { text: "Exploding past a defender with pure speed.", program: 'Strength and Conditioning' },
                { text: "A piece of skill that leaves a player for dead.", program: 'Individual Plan' }
            ]
        },
        {
            question: "You've got a free pitch. What session are you most excited to do?",
            answers: [
                { text: "Running drills. I want to be the fittest on the pitch.", program: 'Strength and Conditioning' },
                { text: "Walking through formations and analyzing plays.", program: 'In Game Intelligence' },
                { text: "Just me and a bag of balls, working on technique.", program: 'Individual Plan' }
            ]
        },
        {
            question: "You have one season to transform one part of your game. What do you choose?",
            answers: [
                { text: "My raw athleticism - speed, strength, and stamina.", program: 'Strength and Conditioning' },
                { text: "My ability on the ball - dribbling, passing, shooting.", program: 'Individual Plan' },
                { text: "My football brain - decision making and awareness.", program: 'In Game Intelligence' }
            ]
        },
        {
            question: "What's the one piece of feedback you hear most from coaches?",
            answers: [
                { text: "'Your technique needs to be cleaner under pressure.'", program: 'Individual Plan' },
                { text: "'You need to improve your positioning and awareness.'", program: 'In Game Intelligence' },
                { text: "'You need to be stronger to win your physical battles.'", program: 'Strength and Conditioning' }
            ]
        },
        {
            question: "It's a high-pressure moment in a match. What's the biggest challenge?",
            answers: [
                { text: "Knowing where to be when my team doesn't have the ball.", program: 'In Game Intelligence' },
                { text: "Holding off a strong opponent to keep possession.", program: 'Strength and Conditioning' },
                { text: "Bringing a difficult pass under control instantly.", program: 'Individual Plan' }
            ]
        }
    ];

    const programDetails = {
        'Individual Plan': { name: 'Individual Plan', description: 'You focus on perfecting the details. This program is designed to sharpen your specific technical skills with personalized one-on-one coaching.', link: 'Individual_plan.html' },
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
});