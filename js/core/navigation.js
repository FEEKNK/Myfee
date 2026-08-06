// FILE: js/navigation.js
// --- Navigation ---
function switchTab(tabId) {
    const views = ['home', 'flashcards', 'settings', 'todo', 'finance', 'habit', 'projects', 'notes', 'pomodoro', 'countdown', 'goals', 'breathing'];
    views.forEach(v => {
        const viewEl = document.getElementById(`view-${v}`);
        if (viewEl) viewEl.classList.add('hidden');

        const tabEl = document.getElementById(`tab-${v}`);
        if (tabEl) {
            tabEl.classList.remove('text-blue-600', 'dark:text-blue-400', 'bg-blue-50', 'dark:bg-blue-900/30');
            tabEl.classList.add('text-gray-400');
        }
    });

    const activeView = document.getElementById(`view-${tabId}`);
    if (activeView) activeView.classList.remove('hidden');

    const activeTab = document.getElementById(`tab-${tabId}`);
    if (activeTab) {
        activeTab.classList.remove('text-gray-400');
        activeTab.classList.add('text-blue-600', 'dark:text-blue-400', 'bg-blue-50', 'dark:bg-blue-900/30');
    }

    // Trigger tab specific renderers
    if (tabId === 'home' && typeof updateDashboard === 'function') {
        updateDashboard();
    } else if (tabId === 'todo' && typeof renderTodos === 'function') {
        renderTodos();
    } else if (tabId === 'finance' && typeof renderFinance === 'function') {
        renderFinance();
    } else if (tabId === 'habit' && typeof renderHabits === 'function') {
        renderHabits();
    } else if (tabId === 'settings' && typeof renderDatabaseStats === 'function') {
        renderDatabaseStats();
    } else if (tabId === 'projects' && typeof renderProjects === 'function') {
        renderProjects();
    } else if (tabId === 'notes' && typeof renderNotes === 'function') {
        renderNotes();
    } else if (tabId === 'pomodoro' && typeof renderPomodoro === 'function') {
        renderPomodoro();
    } else if (tabId === 'countdown' && typeof renderCountdown === 'function') {
        renderCountdown();
    } else if (tabId === 'goals' && typeof renderGoals === 'function') {
        renderGoals();
    } else if (tabId === 'breathing' && typeof renderBreathing === 'function') {
        renderBreathing();
    }
}
window.switchTab = switchTab;
