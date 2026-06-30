// FILE: js/flashcards.js
// --- Flashcards Logic ---

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
