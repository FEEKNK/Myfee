// FILE: app.js
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
    streak: JSON.parse(localStorage.getItem('streakData')) || { count: 0, lastDate: null, cardsFlippedToday: 0 }
};

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
        'view-home', 'view-flashcards', 'view-settings', 'tab-home', 'tab-flashcards', 'tab-settings',
        'homeCardsFlipped', 'homeStreak'
    ];
    ids.forEach(id => {
        els[id] = document.getElementById(id);
    });
    els.levelBtns = document.querySelectorAll('.lvl-btn');
}

// --- Initialization ---
function init() {
    getElements();
    
    // Safety check: if core elements are missing, something is wrong with HTML
    if (!els.cardContainer || !els.cardInner) {
        console.error('Core elements missing');
        return;
    }

    window.switchTab = switchTab;

    checkStreak();

    applySettings();
    renderCategories();
    initFilters();
    setupEventListeners();
    filterCards();

    switchTab('home');

    // If data didn't load
    if (state.allData.length === 0) {
        alert("Wait, data.js is not loaded! Please make sure you have all files in the same folder.");
    }
}

function initFilters() {
    if (els.levelBtns) {
        els.levelBtns.forEach(btn => {
            btn.onclick = () => {
                els.levelBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.activeLevel = btn.dataset.level;
                filterCards();
            };
        });
    }

    if (els.shuffleBtn) {
        els.shuffleBtn.onclick = () => {
            state.isShuffled = !state.isShuffled;
            els.shuffleBtn.classList.toggle('text-orange-500', state.isShuffled);
            els.shuffleBtn.classList.toggle('border-orange-200', state.isShuffled);
            filterCards();
        };
    }
}

// --- Core Logic ---

function filterCards() {
    let filtered = state.allData;

    if (state.activeLevel !== 'Fav') {
        filtered = filtered.filter(c => !state.learned.includes(c.id));
    }

    if (state.activeLevel === 'Fav') {
        filtered = filtered.filter(c => state.favorites.includes(c.id));
    } else if (state.activeLevel !== 'All') {
        filtered = filtered.filter(c => c.level === state.activeLevel);
    }

    if (state.activeCat !== 'All') {
        filtered = filtered.filter(c => c.word.charAt(0).toUpperCase() === state.activeCat);
    }

    const term = els.searchInput ? els.searchInput.value.toLowerCase().trim() : '';
    if (term) {
        filtered = filtered.filter(c => c.word.toLowerCase().includes(term) || c.thai.includes(term));
    }

    if (state.isShuffled) {
        filtered = [...filtered].sort(() => Math.random() - 0.5);
    }

    state.cards = filtered;
    state.index = 0;
    renderCard();
}

function renderCard() {
    const hasCards = state.cards.length > 0;
    
    if (els.cardContainer) els.cardContainer.style.display = hasCards ? 'block' : 'none';
    if (els.msgContainer) els.msgContainer.style.display = hasCards ? 'none' : 'flex';
    
    if (!hasCards) {
        if (state.activeLevel === 'Fav') {
            els.msgText.textContent = "No starred words yet.";
        } else if (state.learned.length === state.allData.length && state.allData.length > 0) {
            els.msgText.textContent = "Congratulations! You've learned everything.";
            if (els.resetLearnedBtn) els.resetLearnedBtn.style.display = 'block';
        } else {
            els.msgText.textContent = "No words found.";
            if (els.resetLearnedBtn) els.resetLearnedBtn.style.display = 'none';
        }
        updateCounters();
        return;
    }

    if (state.flipped) flipCard(false);

    const data = state.cards[state.index];
    
    if (els.cardWord) els.cardWord.textContent = data.word;
    if (els.cardIpa) els.cardIpa.textContent = data.ipa;
    if (els.cardPos) els.cardPos.textContent = data.pos;
    if (els.cardLevel) els.cardLevel.textContent = data.level || 'N/A';
    if (els.cardThai) els.cardThai.textContent = data.thai;
    if (els.cardExample) els.cardExample.textContent = `"${data.example}"`;
    if (els.cardExampleMeaning) els.cardExampleMeaning.textContent = `"${data.example_meaning}"`;

    const posColors = { 'verb': 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30', 'noun': 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30', 'adj': 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/30' };
    let colorClass = 'text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-700';
    Object.keys(posColors).forEach(k => { if(data.pos.includes(k)) colorClass = posColors[k]; });
    
    if (els.markLearnedBtn) els.markLearnedBtn.className = `p-2 transition-colors ${state.learned.includes(data.id) ? 'text-green-500' : 'text-gray-300 hover:text-green-500'}`;
    if (els.starBtn) els.starBtn.className = `p-2 transition-colors ${state.favorites.includes(data.id) ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'}`;
    if (els.cardPos) els.cardPos.className = `inline-block mt-3 text-sm font-semibold px-3 py-1 rounded-full ${colorClass}`;

    updateCounters();
}

function updateCounters() {
    const totalAll = state.allData.length;
    const learnedCount = state.learned.length;
    const percent = totalAll > 0 ? Math.round((learnedCount / totalAll) * 100) : 0;

    if (els.currentIndex) els.currentIndex.textContent = state.cards.length > 0 ? state.index + 1 : 0;
    if (els.totalCards) els.totalCards.textContent = state.cards.length;
    if (els.learnedCount) els.learnedCount.textContent = learnedCount;
    if (els.progressPercent) els.progressPercent.textContent = percent;
    if (els.progressBar) els.progressBar.style.width = `${percent}%`;
}

function flipCard(forceState = null) {
    if (state.cards.length === 0) return;
    
    if (forceState === null && !state.flipped) incrementCardsFlipped();
    
    state.flipped = forceState !== null ? forceState : !state.flipped;
    if (els.cardInner) {
        state.flipped ? els.cardInner.classList.add('is-flipped') : els.cardInner.classList.remove('is-flipped');
    }
    
    if (state.flipped && state.settings.autoPlay) {
        speak(state.cards[state.index].word);
    }
}

function nextCard() {
    if (state.cards.length <= 1) return;
    state.index = (state.index + 1) % state.cards.length;
    renderCard();
}

function prevCard() {
    if (state.cards.length <= 1) return;
    state.index = (state.index - 1 + state.cards.length) % state.cards.length;
    renderCard();
}

function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = 0.85;
        window.speechSynthesis.speak(u);
    }
}

function toggleLearned() {
    if (state.cards.length === 0) return;
    const currentId = state.cards[state.index].id;
    if (!state.learned.includes(currentId)) {
        state.learned.push(currentId);
        localStorage.setItem('learnedCards', JSON.stringify(state.learned));
        if (els.cardInner) els.cardInner.classList.add('scale-0', 'opacity-0');
        setTimeout(() => {
            filterCards();
            if (els.cardInner) els.cardInner.classList.remove('scale-0', 'opacity-0');
        }, 300);
    }
}

function toggleFavorite() {
    if (state.cards.length === 0) return;
    const currentId = state.cards[state.index].id;
    const idx = state.favorites.indexOf(currentId);
    if (idx === -1) { state.favorites.push(currentId); } 
    else { state.favorites.splice(idx, 1); if (state.activeLevel === 'Fav') filterCards(); }
    localStorage.setItem('favCards', JSON.stringify(state.favorites));
    renderCard();
}

function resetProgress() {
    if(confirm('Reset all learned words?')) {
        state.learned = [];
        localStorage.setItem('learnedCards', JSON.stringify([]));
        filterCards();
    }
}

function switchTab(tabId) {
    if (els['view-home']) els['view-home'].classList.add('hidden');
    if (els['view-flashcards']) els['view-flashcards'].classList.add('hidden');
    if (els['view-settings']) els['view-settings'].classList.add('hidden');
    
    if (els['tab-home']) els['tab-home'].classList.replace('text-blue-600', 'text-gray-400');
    if (els['tab-flashcards']) els['tab-flashcards'].classList.replace('text-blue-600', 'text-gray-400');
    if (els['tab-settings']) els['tab-settings'].classList.replace('text-blue-600', 'text-gray-400');
    
    if (els[`view-${tabId}`]) els[`view-${tabId}`].classList.remove('hidden');
    if (els[`tab-${tabId}`]) {
        els[`tab-${tabId}`].classList.replace('text-gray-400', 'text-blue-600');
    }
    
    // Update home stats if navigating to home
    if (tabId === 'home') {
        if (els.homeCardsFlipped) els.homeCardsFlipped.textContent = state.streak.cardsFlippedToday;
        if (els.homeStreak) els.homeStreak.textContent = state.streak.count;
    }
}

function applySettings() {
    if (state.settings.darkMode) {
        document.documentElement.classList.add('dark');
        if (els.toggleDark) {
            els.toggleDark.firstElementChild.classList.add('translate-x-6');
            els.toggleDark.classList.add('bg-blue-600');
        }
    } else {
        document.documentElement.classList.remove('dark');
        if (els.toggleDark) {
            els.toggleDark.firstElementChild.classList.remove('translate-x-6');
            els.toggleDark.classList.remove('bg-blue-600');
        }
    }
    
    if (els.toggleAudio) {
        if (state.settings.autoPlay) {
            els.toggleAudio.classList.add('bg-green-500');
            els.toggleAudio.firstElementChild.classList.add('translate-x-6');
        } else {
            els.toggleAudio.classList.remove('bg-green-500');
            els.toggleAudio.firstElementChild.classList.remove('translate-x-6');
        }
    }
}

function saveSettings() {
    localStorage.setItem('appSettings', JSON.stringify(state.settings));
    applySettings();
}

function checkStreak() {
    const today = new Date().toDateString();
    if (state.streak.lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (state.streak.lastDate !== yesterday.toDateString() && state.streak.lastDate !== null) {
            state.streak.count = 0; // Missed a day
        }
        state.streak.cardsFlippedToday = 0;
    }
    if (els.streakCount) els.streakCount.textContent = state.streak.count;
}

function incrementCardsFlipped() {
    const today = new Date().toDateString();
    if (state.streak.lastDate !== today) {
        state.streak.cardsFlippedToday++;
        if (state.streak.cardsFlippedToday >= 10) {
            state.streak.count++;
            state.streak.lastDate = today;
            if (els.streakCount) els.streakCount.textContent = state.streak.count;
            if (els.streakCount && els.streakCount.parentElement) {
                els.streakCount.parentElement.classList.add('animate-bounce');
                setTimeout(() => els.streakCount.parentElement.classList.remove('animate-bounce'), 2000);
            }
        }
        localStorage.setItem('streakData', JSON.stringify(state.streak));
    }
}

let recognition = null;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
}

function startPronunciationCheck() {
    if (!recognition) {
        alert("Speech recognition is not supported in this browser. Try Google Chrome.");
        return;
    }
    if (state.cards.length === 0) return;
    
    if (els.micBtnFront) els.micBtnFront.classList.add('text-red-500', 'animate-pulse');
    if (els.pronunciationFeedback) els.pronunciationFeedback.classList.add('opacity-0');
    
    recognition.onresult = (event) => {
        const spokenWord = event.results[0][0].transcript.toLowerCase().trim().replace(/[.,!?]/g, '');
        const targetWord = state.cards[state.index].word.toLowerCase().trim();
        
        if (els.pronunciationFeedback) els.pronunciationFeedback.classList.remove('opacity-0');
        
        if (spokenWord === targetWord) {
            if (els.pronunciationFeedback) {
                els.pronunciationFeedback.textContent = "Perfect! 🎉";
                els.pronunciationFeedback.className = "absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-bold opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap bg-green-100 text-green-700 px-3 py-1 rounded-full shadow-md z-50";
            }
        } else {
            if (els.pronunciationFeedback) {
                els.pronunciationFeedback.textContent = `Heard: "${spokenWord}"`;
                els.pronunciationFeedback.className = "absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-bold opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap bg-red-100 text-red-700 px-3 py-1 rounded-full shadow-md z-50";
            }
        }
        
        setTimeout(() => { if (els.pronunciationFeedback) els.pronunciationFeedback.classList.add('opacity-0'); }, 2500);
    };
    
    recognition.onend = () => {
        if (els.micBtnFront) els.micBtnFront.classList.remove('text-red-500', 'animate-pulse');
    };
    
    recognition.onerror = (event) => {
        console.error("Speech error:", event.error);
        if (els.micBtnFront) els.micBtnFront.classList.remove('text-red-500', 'animate-pulse');
    };
    
    try { recognition.start(); } catch (e) {}
}

function setupEventListeners() {
    if (els.cardContainer) els.cardContainer.onclick = () => flipCard();
    if (els.nextBtn) els.nextBtn.onclick = nextCard;
    if (els.prevBtn) els.prevBtn.onclick = prevCard;
    
    if (els.speakBtnFront) els.speakBtnFront.onclick = (e) => { e.stopPropagation(); speak(state.cards[state.index].word); };
    if (els.micBtnFront) els.micBtnFront.onclick = (e) => { e.stopPropagation(); startPronunciationCheck(); };
    if (els.speakBtnBack) els.speakBtnBack.onclick = (e) => { e.stopPropagation(); speak(state.cards[state.index].word); };
    if (els.markLearnedBtn) els.markLearnedBtn.onclick = (e) => { e.stopPropagation(); toggleLearned(); };
    if (els.starBtn) els.starBtn.onclick = (e) => { e.stopPropagation(); toggleFavorite(); };
    
    if (els.resetLearnedBtn) els.resetLearnedBtn.onclick = resetProgress;
    if (els.resetProgressBtn) els.resetProgressBtn.onclick = resetProgress;
    
    if (els.toggleDark) els.toggleDark.parentElement.onclick = () => { state.settings.darkMode = !state.settings.darkMode; saveSettings(); };
    if (els.toggleAudio) els.toggleAudio.parentElement.onclick = () => { state.settings.autoPlay = !state.settings.autoPlay; saveSettings(); };
    
    if (els.toggleDark) els.toggleDark.parentElement.onclick = () => { state.settings.darkMode = !state.settings.darkMode; saveSettings(); };
    if (els.toggleAudio) els.toggleAudio.parentElement.onclick = () => { state.settings.autoPlay = !state.settings.autoPlay; saveSettings(); };
    
    if (els.quizModeBtn) els.quizModeBtn.onclick = startQuiz;
    if (els.closeQuiz) els.closeQuiz.onclick = () => els.quizModal.classList.add('hidden');
    if (els.quizNextBtn) els.quizNextBtn.onclick = generateQuizQuestion;
    if (els.quizSpeakBtn) els.quizSpeakBtn.onclick = () => speak(state.currentQuizAnswer.word);
    if (els.quizSubmitBtn) els.quizSubmitBtn.onclick = checkQuizSpelling;
    if (els.quizInput) els.quizInput.onkeydown = (e) => { if (e.key === 'Enter') checkQuizSpelling(); };

    if (els.searchInput) els.searchInput.oninput = () => { state.activeCat = 'All'; renderCategories(); filterCards(); };

    // Swipe
    let tX = 0;
    document.querySelector('main').ontouchstart = e => tX = e.changedTouches[0].screenX;
    document.querySelector('main').ontouchend = e => {
        if (e.changedTouches[0].screenX < tX - 50) nextCard();
        if (e.changedTouches[0].screenX > tX + 50) prevCard();
    };

    document.onkeydown = e => {
        if (e.key === 'ArrowRight') nextCard();
        if (e.key === 'ArrowLeft') prevCard();
        if (e.key === ' ' || e.key === 'Enter') flipCard();
    };

    setupDragScroll(document.getElementById('categoryList'));
    setupDragScroll(document.getElementById('levelFilterBar'));
}

function setupDragScroll(el) {
    if (!el) return;
    let isDown = false;
    let startX;
    let scrollLeft;

    el.addEventListener('mousedown', (e) => {
        isDown = true;
        el.style.cursor = 'grabbing';
        startX = e.pageX - el.offsetLeft;
        scrollLeft = el.scrollLeft;
    });
    el.addEventListener('mouseleave', () => {
        isDown = false;
        el.style.cursor = 'grab';
    });
    el.addEventListener('mouseup', () => {
        isDown = false;
        el.style.cursor = 'grab';
    });
    el.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startX) * 2; 
        el.scrollLeft = scrollLeft - walk;
    });
    el.style.cursor = 'grab';
}

function renderCategories() {
    const list = document.getElementById('categoryList');
    if (!list) return;
    list.innerHTML = '';
    ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].forEach(char => {
        const b = document.createElement('button');
        b.textContent = char;
        const isActive = char === state.activeCat;
        b.className = `px-4 py-1.5 rounded-full text-sm font-bold snap-start transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300'}`;
        b.onclick = () => { 
            state.activeCat = char; 
            if (els.searchInput) els.searchInput.value = '';
            renderCategories(); 
            filterCards(); 
        };
        list.appendChild(b);
        if(isActive) b.scrollIntoView({block: 'nearest', inline: 'center'});
    });
}

// Quiz Functions (Simplified for reliability)
function startQuiz() {
    if (els.quizModal) {
        els.quizModal.classList.remove('hidden');
        state.quizScore = 0;
        els.quizScore.textContent = `Score: 0`;
        generateQuizQuestion();
    }
}

function generateQuizQuestion() {
    els.quizFeedback.textContent = '';
    els.quizNextBtn.classList.add('hidden');
    
    if (els.quizInputContainer) els.quizInputContainer.classList.add('hidden');
    if (els.quizOptions) els.quizOptions.classList.add('hidden');
    
    const correct = state.allData[Math.floor(Math.random() * state.allData.length)];
    state.currentQuizAnswer = correct;
    
    const quizType = Math.floor(Math.random() * 3); // 0: Meaning, 1: Listening, 2: Spelling

    if (quizType === 0) {
        els.quizWord.textContent = correct.word;
        els.quizWord.classList.remove('text-transparent', 'bg-clip-text', 'bg-gray-200');
        setupMultipleChoice(correct, 'thai');
    } else if (quizType === 1) {
        els.quizWord.textContent = "🔊 Listen & Choose";
        els.quizWord.classList.add('text-transparent', 'bg-clip-text', 'bg-gray-200');
        speak(correct.word);
        setupMultipleChoice(correct, 'word');
    } else {
        els.quizWord.textContent = correct.thai;
        els.quizWord.classList.remove('text-transparent', 'bg-clip-text', 'bg-gray-200');
        if (els.quizInputContainer) els.quizInputContainer.classList.remove('hidden');
        if (els.quizInput) {
            els.quizInput.value = '';
            els.quizInput.disabled = false;
            els.quizInput.className = 'w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 dark:text-white border-2 border-transparent focus:border-blue-500 rounded-xl outline-none text-center text-xl font-bold';
            setTimeout(() => els.quizInput.focus(), 100);
        }
        if (els.quizSubmitBtn) els.quizSubmitBtn.disabled = false;
    }
}

function setupMultipleChoice(correct, field) {
    if (els.quizOptions) els.quizOptions.classList.remove('hidden');
    const distractors = [];
    while (distractors.length < 3) {
        const r = state.allData[Math.floor(Math.random() * state.allData.length)];
        if (r.id !== correct.id && !distractors.some(d => d.id === r.id)) distractors.push(r);
    }
    const options = [correct, ...distractors].sort(() => Math.random() - 0.5);
    if (els.quizOptions) els.quizOptions.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'w-full p-4 text-left bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-transparent hover:border-blue-300 text-lg font-bold';
        if (field === 'thai') btn.classList.add('font-thai');
        btn.textContent = opt[field];
        btn.onclick = () => {
            Array.from(els.quizOptions.children).forEach(b => b.disabled = true);
            if (opt.id === correct.id) {
                state.quizScore++;
                els.quizScore.textContent = `Score: ${state.quizScore}`;
                btn.classList.add('bg-green-100', 'border-green-500', 'text-green-800');
                els.quizFeedback.textContent = "Correct! 🎉";
            } else {
                btn.classList.add('bg-red-100', 'border-red-500', 'text-red-800');
                els.quizFeedback.textContent = `Wrong! It's "${correct[field]}"`;
                Array.from(els.quizOptions.children).forEach(b => { if (b.textContent === correct[field]) b.classList.add('bg-green-100', 'border-green-500'); });
            }
            els.quizNextBtn.classList.remove('hidden');
        };
        if (els.quizOptions) els.quizOptions.appendChild(btn);
    });
}

function checkQuizSpelling() {
    if (!els.quizInput || els.quizInput.disabled) return;
    const userInput = els.quizInput.value.toLowerCase().trim();
    const correctWord = state.currentQuizAnswer.word.toLowerCase().trim();
    
    els.quizInput.disabled = true;
    els.quizSubmitBtn.disabled = true;
    
    if (userInput === correctWord) {
        state.quizScore++;
        els.quizScore.textContent = `Score: ${state.quizScore}`;
        els.quizInput.classList.add('border-green-500', 'bg-green-50');
        els.quizFeedback.textContent = "Correct! 🎉";
    } else {
        els.quizInput.classList.add('border-red-500', 'bg-red-50', 'dark:bg-red-900/50');
        els.quizFeedback.textContent = `Wrong! It's "${state.currentQuizAnswer.word}"`;
    }
    els.quizNextBtn.classList.remove('hidden');
}

// Run init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}