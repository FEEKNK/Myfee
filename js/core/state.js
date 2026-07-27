// FILE: js/state.js
// --- State Management ---
let state = {
    cards: [],           // Cards to show (filtered)
    allData: window.flashcardsData || [], // Access global data
    index: 0,
    flipped: false,
    activeCat: 'All',
    activeLevel: 'All',
    isShuffled: false,
    // LocalStorage Data
    learned: JSON.parse(localStorage.getItem('learnedCards')) || [],
    favorites: JSON.parse(localStorage.getItem('favCards')) || [],
    settings: JSON.parse(localStorage.getItem('appSettings')) || {
        darkMode: false,
        autoPlay: false,
    },
    // Quiz State
    quizScore: 0,
    currentQuizAnswer: null,
    // Streak State
    streak: JSON.parse(localStorage.getItem('streakData')) || { count: 0, lastDate: null, cardsFlippedToday: 0 },
    // Todo State
    todos: JSON.parse(localStorage.getItem('todoData')) || [],
    // Finance State
    finance: JSON.parse(localStorage.getItem('financeData')) || [],
    // Habit State
    habits: JSON.parse(localStorage.getItem('habitData')) || [
        { id: 1, name: 'อ่านหนังสือ 15 นาที', icon: 'fa-book', streak: 0, lastCompleted: null },
        { id: 2, name: 'ออกกำลังกาย 20 นาที', icon: 'fa-person-running', streak: 0, lastCompleted: null },
        { id: 3, name: 'นั่งสมาธิ 5 นาที', icon: 'fa-brain', streak: 0, lastCompleted: null }
    ]
};

