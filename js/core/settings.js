// FILE: js/settings.js
// --- Settings & Streak Management ---

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
    
    // Budget
    const dailyInput = document.getElementById('settingDailyBudget');
    if (dailyInput && state.settings.dailyBudget) dailyInput.value = state.settings.dailyBudget;
    const monthlyInput = document.getElementById('settingMonthlyBudget');
    if (monthlyInput && state.settings.monthlyBudget) monthlyInput.value = state.settings.monthlyBudget;
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
