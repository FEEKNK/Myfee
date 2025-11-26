// FILE: app.js
import { flashcards as allCards } from './data.js';

// --- State Management ---
let state = {
    cards: [],           // Cards to show (filtered)
    allData: allCards,   // All raw data
    index: 0,
    flipped: false,
    activeCat: 'All',
    // LocalStorage Data
    learned: JSON.parse(localStorage.getItem('learnedCards')) || [],
    settings: JSON.parse(localStorage.getItem('appSettings')) || {
        darkMode: false,
        autoPlay: false,
    },
    // Quiz State
    quizScore: 0,
    currentQuizAnswer: null
};

// --- DOM Elements ---
const els = {
    container: document.getElementById('cardContainer'),
    inner: document.getElementById('cardInner'),
    // Card Text
    word: document.getElementById('cardWord'),
    ipa: document.getElementById('cardIpa'),
    pos: document.getElementById('cardPos'),
    level: document.getElementById('cardLevel'),
    thai: document.getElementById('cardThai'),
    ex: document.getElementById('cardExample'),
    exMean: document.getElementById('cardExampleMeaning'),
    // Counters & Status
    idx: document.getElementById('currentIndex'),
    total: document.getElementById('totalCards'),
    learnedCount: document.getElementById('learnedCount'),
    msgContainer: document.getElementById('msgContainer'),
    msgText: document.getElementById('msgText'),
    resetLearnedBtn: document.getElementById('resetLearnedBtn'),
    // Buttons
    btnMark: document.getElementById('markLearnedBtn'),
    btnNext: document.getElementById('nextBtn'),
    btnPrev: document.getElementById('prevBtn'),
    // Settings
    settingsModal: document.getElementById('settingsModal'),
    toggleDark: document.getElementById('toggleDark'),
    toggleAudio: document.getElementById('toggleAudio'),
    // Quiz
    quizModal: document.getElementById('quizModal'),
    quizWord: document.getElementById('quizWord'),
    quizOptions: document.getElementById('quizOptions'),
    quizScore: document.getElementById('quizScore'),
    quizFeedback: document.getElementById('quizFeedback'),
    quizNextBtn: document.getElementById('quizNextBtn'),
};

// --- Initialization ---
function init() {
    applySettings();
    renderCategories();
    filterCards();
    updateUI();
}

// --- Core Logic ---

// 1. Filter & Data Prep
function filterCards() {
    // กรองคำที่เรียนรู้แล้วออก (Exclude Learned)
    let filtered = state.allData.filter(c => !state.learned.includes(c.id));

    // กรองตามหมวดหมู่ (Category)
    if (state.activeCat !== 'All') {
        filtered = filtered.filter(c => c.word.charAt(0).toUpperCase() === state.activeCat);
    }

    // กรองตามคำค้นหา (Search)
    const term = document.getElementById('searchInput').value.toLowerCase().trim();
    if (term) {
        filtered = filtered.filter(c => c.word.toLowerCase().includes(term) || c.thai.includes(term));
    }

    state.cards = filtered;
    state.index = 0; // Reset index
    renderCard();
}

// 2. Render Card
function renderCard() {
    const hasCards = state.cards.length > 0;
    
    // Toggle View (Card vs Message)
    els.container.style.display = hasCards ? 'block' : 'none';
    els.msgContainer.style.display = hasCards ? 'none' : 'flex';
    
    if (!hasCards) {
        // Show appropriate empty message
        if (state.learned.length === state.allData.length) {
            els.msgText.textContent = "Congratulations! You've learned all words.";
            els.resetLearnedBtn.style.display = 'block';
        } else {
            els.msgText.textContent = "No words found in this category.";
            els.resetLearnedBtn.style.display = 'none';
        }
        updateCounters();
        return;
    }

    // Reset Flip
    if (state.flipped) flipCard(false);

    // Update Content (delay slightly for smooth flip reset if needed)
    const data = state.cards[state.index];
    
    els.word.textContent = data.word;
    els.ipa.textContent = data.ipa;
    els.pos.textContent = data.pos;
    els.level.textContent = data.level || 'N/A';
    els.thai.textContent = data.thai;
    els.ex.textContent = `"${data.example}"`;
    els.exMean.textContent = `"${data.example_meaning}"`;

    // POS Color Logic
    const posColors = { 'verb': 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30', 'noun': 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30', 'adj': 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/30' };
    let colorClass = 'text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-700';
    Object.keys(posColors).forEach(k => { if(data.pos.includes(k)) colorClass = posColors[k]; });
    els.btnMark.className = `p-2 transition-colors ${state.learned.includes(data.id) ? 'text-green-500' : 'text-gray-300 hover:text-green-500'}`;
    
    els.pos.className = `inline-block mt-3 text-sm font-semibold px-3 py-1 rounded-full ${colorClass}`;

    updateCounters();
}

function updateCounters() {
    els.idx.textContent = state.cards.length > 0 ? state.index + 1 : 0;
    els.total.textContent = state.cards.length;
    els.learnedCount.textContent = state.learned.length;
}

// 3. Interaction
function flipCard(forceState = null) {
    state.flipped = forceState !== null ? forceState : !state.flipped;
    state.flipped ? els.inner.classList.add('is-flipped') : els.inner.classList.remove('is-flipped');
    
    // Auto Audio
    if (state.flipped && state.settings.autoPlay) {
        speak(state.cards[state.index].word);
    }
}

function nextCard() {
    if (state.cards.length === 0) return;
    state.index = (state.index + 1) % state.cards.length;
    renderCard();
}

function prevCard() {
    if (state.cards.length === 0) return;
    state.index = (state.index - 1 + state.cards.length) % state.cards.length;
    renderCard();
}

function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = 0.9;
        window.speechSynthesis.speak(u);
    }
}

// 4. Feature: Mark as Learned
function toggleLearned() {
    if (state.cards.length === 0) return;
    
    const currentId = state.cards[state.index].id;
    if (!state.learned.includes(currentId)) {
        // Mark as learned
        state.learned.push(currentId);
        localStorage.setItem('learnedCards', JSON.stringify(state.learned));
        
        // Remove from current view gracefully
        els.inner.classList.add('scale-0', 'opacity-0'); // Add vanish animation
        setTimeout(() => {
            filterCards(); // Re-filter (this will remove the card)
            els.inner.classList.remove('scale-0', 'opacity-0');
        }, 300);
    }
}

function resetProgress() {
    if(confirm('Reset all learned words?')) {
        state.learned = [];
        localStorage.setItem('learnedCards', JSON.stringify([]));
        filterCards();
        
        // แก้ไข: ใช้ฟังก์ชัน toggleSettings() เพื่อปิดหน้าต่างให้สนิท (ซ่อน Overlay)
        toggleSettings(); 
    }
}

// 5. Feature: Settings & Dark Mode
function toggleSettings() {
    els.settingsModal.classList.toggle('open');
    els.settingsModal.classList.toggle('hidden');
}

function applySettings() {
    // Dark Mode
    if (state.settings.darkMode) {
        document.documentElement.classList.add('dark');
        els.toggleDark.classList.add('bg-blue-600');
        els.toggleDark.firstElementChild.classList.add('translate-x-6');
    } else {
        document.documentElement.classList.remove('dark');
        els.toggleDark.classList.remove('bg-blue-600');
        els.toggleDark.firstElementChild.classList.remove('translate-x-6');
    }
    
    // Auto Play
    if (state.settings.autoPlay) {
        els.toggleAudio.classList.add('bg-green-500');
        els.toggleAudio.firstElementChild.classList.add('translate-x-6');
    } else {
        els.toggleAudio.classList.remove('bg-green-500');
        els.toggleAudio.firstElementChild.classList.remove('translate-x-6');
    }
}

function saveSettings() {
    localStorage.setItem('appSettings', JSON.stringify(state.settings));
    applySettings();
}

// 6. Feature: Quiz Mode
function startQuiz() {
    els.quizModal.classList.remove('hidden');
    state.quizScore = 0;
    els.quizScore.textContent = `Score: 0`;
    generateQuizQuestion();
}

function generateQuizQuestion() {
    // Reset UI
    els.quizFeedback.textContent = '';
    els.quizFeedback.className = 'mt-6 h-8 text-center font-bold';
    els.quizNextBtn.classList.add('hidden');
    
    // 1. Pick Correct Answer
    const pool = state.allData; // Use all data for quiz
    const correct = pool[Math.floor(Math.random() * pool.length)];
    state.currentQuizAnswer = correct;
    
    els.quizWord.textContent = correct.word;
    
    // 2. Pick 3 Distractors
    const distractors = [];
    while (distractors.length < 3) {
        const r = pool[Math.floor(Math.random() * pool.length)];
        if (r.id !== correct.id && !distractors.includes(r)) {
            distractors.push(r);
        }
    }
    
    // 3. Shuffle Options
    const options = [correct, ...distractors].sort(() => Math.random() - 0.5);
    
    // 4. Render Options
    els.quizOptions.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'w-full p-4 text-left bg-gray-100 dark:bg-gray-800 dark:text-gray-200 rounded-xl border-2 border-transparent hover:border-blue-300 transition-all font-thai text-lg';
        btn.textContent = opt.thai; // Show Thai meaning
        btn.onclick = () => checkQuizAnswer(opt, btn);
        els.quizOptions.appendChild(btn);
    });
}

function checkQuizAnswer(selected, btnElement) {
    // Disable all buttons
    Array.from(els.quizOptions.children).forEach(b => b.disabled = true);
    
    if (selected.id === state.currentQuizAnswer.id) {
        // Correct
        state.quizScore++;
        els.quizScore.textContent = `Score: ${state.quizScore}`;
        btnElement.classList.remove('bg-gray-100', 'dark:bg-gray-800');
        btnElement.classList.add('bg-green-100', 'border-green-500', 'text-green-800', 'pop-anim');
        els.quizFeedback.textContent = "Correct! 🎉";
        els.quizFeedback.classList.add('text-green-600');
        speak("Correct");
    } else {
        // Wrong
        btnElement.classList.remove('bg-gray-100', 'dark:bg-gray-800');
        btnElement.classList.add('bg-red-100', 'border-red-500', 'text-red-800', 'shake-anim');
        els.quizFeedback.textContent = `Wrong! It means "${state.currentQuizAnswer.thai}"`;
        els.quizFeedback.classList.add('text-red-600');
        
        // Highlight correct one
        Array.from(els.quizOptions.children).forEach(b => {
            if (b.textContent === state.currentQuizAnswer.thai) {
                b.classList.add('bg-green-100', 'border-green-500');
            }
        });
        speak("Wrong");
    }
    
    els.quizNextBtn.classList.remove('hidden');
}

// --- Event Listeners ---

// Core
els.container.addEventListener('click', () => flipCard());
els.btnNext.addEventListener('click', nextCard);
els.btnPrev.addEventListener('click', prevCard);
document.getElementById('speakBtnFront').onclick = (e) => { e.stopPropagation(); speak(state.cards[state.index].word); };
document.getElementById('speakBtnBack').onclick = (e) => { e.stopPropagation(); speak(state.cards[state.index].word); };

// Learned
els.btnMark.onclick = (e) => { e.stopPropagation(); toggleLearned(); };
els.resetLearnedBtn.onclick = resetProgress;
document.getElementById('resetProgressBtn').onclick = resetProgress;

// Search & Categories
document.getElementById('searchInput').oninput = () => { state.activeCat = 'All'; renderCategories(); filterCards(); };

function renderCategories() {
    const list = document.getElementById('categoryList');
    list.innerHTML = '';
    ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].forEach(char => {
        const b = document.createElement('button');
        b.textContent = char;
        const isActive = char === state.activeCat;
        b.className = `px-4 py-1.5 rounded-full text-sm font-bold snap-start transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`;
        b.onclick = () => { 
            state.activeCat = char; 
            document.getElementById('searchInput').value = '';
            renderCategories(); 
            filterCards(); 
        };
        list.appendChild(b);
        if(isActive) b.scrollIntoView({block: 'nearest', inline: 'center'});
    });
}

// Settings Modal
document.getElementById('settingsBtn').onclick = toggleSettings;
document.getElementById('closeSettings').onclick = toggleSettings;
els.toggleDark.parentElement.onclick = () => { state.settings.darkMode = !state.settings.darkMode; saveSettings(); };
els.toggleAudio.parentElement.onclick = () => { state.settings.autoPlay = !state.settings.autoPlay; saveSettings(); };

// Quiz Modal
document.getElementById('quizModeBtn').onclick = startQuiz;
document.getElementById('closeQuiz').onclick = () => els.quizModal.classList.add('hidden');
document.getElementById('quizSpeakBtn').onclick = () => speak(state.currentQuizAnswer.word);
els.quizNextBtn.onclick = generateQuizQuestion;

// Swipe Logic
let tX = 0;
document.querySelector('main').ontouchstart = e => tX = e.changedTouches[0].screenX;
document.querySelector('main').ontouchend = e => {
    if (e.changedTouches[0].screenX < tX - 50) nextCard();
    if (e.changedTouches[0].screenX > tX + 50) prevCard();
};

// Keyboard
document.onkeydown = e => {
    if (e.key === 'ArrowRight') nextCard();
    if (e.key === 'ArrowLeft') prevCard();
    if (e.key === ' ' || e.key === 'Enter') flipCard();
};

init();