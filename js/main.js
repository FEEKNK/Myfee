// FILE: js/main.js
// --- Initialization & Events ---

function init() {
    getElements();
    
    // Safety check
    if (!els.cardContainer || !els.cardInner) {
        console.error('Core elements missing');
        return;
    }

    checkStreak();
    applySettings();
    renderCategories();
    initFilters();
    setupEventListeners();
    filterCards();

    switchTab('home');

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
    
    if (els.quizModeBtn) els.quizModeBtn.onclick = startQuiz;
    if (els.closeQuiz) els.closeQuiz.onclick = () => els.quizModal.classList.add('hidden');
    if (els.quizNextBtn) els.quizNextBtn.onclick = generateQuizQuestion;
    if (els.quizSpeakBtn) els.quizSpeakBtn.onclick = () => speak(state.currentQuizAnswer.word);
    if (els.quizSubmitBtn) els.quizSubmitBtn.onclick = checkQuizSpelling;
    if (els.quizInput) els.quizInput.onkeydown = (e) => { if (e.key === 'Enter') checkQuizSpelling(); };

    if (els.searchInput) els.searchInput.oninput = () => { state.activeCat = 'All'; renderCategories(); filterCards(); };

    if (els.todoForm) {
        els.todoForm.onsubmit = (e) => {
            e.preventDefault();
            addTodo();
        };
    }

    // Swipe
    let tX = 0;
    const mainEl = document.querySelector('main');
    if (mainEl) {
        mainEl.ontouchstart = e => tX = e.changedTouches[0].screenX;
        mainEl.ontouchend = e => {
            if (e.changedTouches[0].screenX < tX - 50) nextCard();
            if (e.changedTouches[0].screenX > tX + 50) prevCard();
        };
    }

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

// Run init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
