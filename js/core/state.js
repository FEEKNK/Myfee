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
    // Flashcard state
    learned: JSON.parse(localStorage.getItem('learnedCards')) || [],
    favorites: JSON.parse(localStorage.getItem('favCards')) || [],
    review: JSON.parse(localStorage.getItem('reviewCards')) || [],
    customCards: JSON.parse(localStorage.getItem('customCards')) || [],
    
    settings: JSON.parse(localStorage.getItem('appSettings')) || {
        darkMode: false,
        autoPlay: false,
        dailyBudget: 0,
        monthlyBudget: 0,
        lastBackupDate: null
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
        { id: 1, name: 'อ่านหนังสือ 15 นาที', icon: 'fa-book', streak: 0, lastCompleted: null, routine: 'morning', history: [] },
        { id: 2, name: 'ออกกำลังกาย 20 นาที', icon: 'fa-person-running', streak: 0, lastCompleted: null, routine: 'afternoon', history: [] },
        { id: 3, name: 'นั่งสมาธิ 5 นาที', icon: 'fa-brain', streak: 0, lastCompleted: null, routine: 'evening', history: [] }
    ],
    // Roadmap Features State
    projects: JSON.parse(localStorage.getItem('projectsData')) || [],
    notes: JSON.parse(localStorage.getItem('notesData')) || [],
    countdown: JSON.parse(localStorage.getItem('countdownData')) || [],
    goals: JSON.parse(localStorage.getItem('goalsData')) || []
};

// Combine allData with customCards immediately
if (state.customCards.length > 0) {
    state.allData = [...state.allData, ...state.customCards];
}

