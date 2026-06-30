// FILE: js/navigation.js
// --- Navigation ---
function switchTab(tabId) {
    if (els['view-home']) els['view-home'].classList.add('hidden');
    if (els['view-flashcards']) els['view-flashcards'].classList.add('hidden');
    if (els['view-settings']) els['view-settings'].classList.add('hidden');
    if (els['view-todo']) els['view-todo'].classList.add('hidden');
    
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
    if (tabId === 'todo') {
        renderTodos();
    }
}
window.switchTab = switchTab;
