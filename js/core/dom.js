// FILE: js/dom.js
// --- DOM Elements ---
const els = {};

function getElements() {
    const ids = [
        'cardContainer', 'cardInner', 'cardWord', 'cardIpa', 'cardPos', 'cardLevel',
        'cardThai', 'cardExample', 'cardExampleMeaning', 'currentIndex', 'totalCards',
        'learnedCount', 'progressPercent', 'progressBar', 'msgContainer', 'msgText',
        'resetLearnedBtn', 'markLearnedBtn', 'starBtn', 'shuffleBtn', 'nextBtn',
        'prevBtn', 'settingsModal', 'toggleDark', 'toggleAudio', 'quizModal',
        'quizWord', 'quizOptions', 'quizScore', 'quizFeedback', 'quizNextBtn',
        'searchInput', 'settingsBtn', 'closeSettings', 'quizModeBtn', 'closeQuiz',
        'quizSpeakBtn', 'speakBtnFront', 'speakBtnBack', 'resetProgressBtn',
        'streakCount', 'micBtnFront', 'pronunciationFeedback', 'quizInputContainer', 'quizInput', 'quizSubmitBtn',
        'reviewBtn',
        'view-home', 'view-flashcards', 'view-settings', 'view-todo', 'tab-home', 'tab-flashcards', 'tab-settings',
        'homeCardsFlipped', 'homeStreak', 'todoList', 'todoForm', 'todoInput'
    ];
    ids.forEach(id => {
        els[id] = document.getElementById(id);
    });
    els.levelBtns = document.querySelectorAll('.lvl-btn');
}
