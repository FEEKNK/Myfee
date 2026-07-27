// FILE: js/features/dashboard.js
// --- Life Dashboard & Analytics ---

function updateDashboard() {
    // 1. Streak & Flashcards Summary
    const streakEl = document.getElementById('dashStreak');
    const learnedEl = document.getElementById('dashLearned');
    const totalCardsEl = document.getElementById('dashTotalCards');
    const flashProgressEl = document.getElementById('dashFlashProgress');

    if (streakEl) streakEl.textContent = state.streak ? state.streak.count : 0;
    if (learnedEl) learnedEl.textContent = state.learned ? state.learned.length : 0;
    if (totalCardsEl && state.allData) totalCardsEl.textContent = state.allData.length;
    if (flashProgressEl && state.allData && state.allData.length > 0) {
        const pct = Math.round((state.learned.length / state.allData.length) * 100);
        flashProgressEl.style.width = `${pct}%`;
    }

    // 2. To-Do Summary
    const todoDoneEl = document.getElementById('dashTodoDone');
    const todoTotalEl = document.getElementById('dashTodoTotal');
    const todoProgressEl = document.getElementById('dashTodoProgress');

    const totalTodos = state.todos ? state.todos.length : 0;
    const completedTodos = state.todos ? state.todos.filter(t => t.completed).length : 0;

    if (todoDoneEl) todoDoneEl.textContent = completedTodos;
    if (todoTotalEl) todoTotalEl.textContent = totalTodos;
    if (todoProgressEl) {
        const pct = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
        todoProgressEl.style.width = `${pct}%`;
    }

    // 3. Water Summary
    const waterMlEl = document.getElementById('dashWaterMl');
    const waterGoalEl = document.getElementById('dashWaterGoal');
    const waterProgressEl = document.getElementById('dashWaterProgress');

    if (state.water) {
        const currentWater = state.water.current || 0;
        const goalWater = state.water.goal || 2000;
        if (waterMlEl) waterMlEl.textContent = currentWater.toLocaleString();
        if (waterGoalEl) waterGoalEl.textContent = goalWater.toLocaleString();
        if (waterProgressEl) {
            const pct = Math.min(100, Math.round((currentWater / goalWater) * 100));
            waterProgressEl.style.width = `${pct}%`;
        }
    }

    // 4. Finance Summary
    const dashExpenseEl = document.getElementById('dashExpenseTotal');
    if (dashExpenseEl && state.finance) {
        const todayStr = new Date().toISOString().split('T')[0];
        let todayExpense = 0;
        state.finance.forEach(item => {
            if (item.type === 'expense' && item.date && item.date.startsWith(todayStr)) {
                todayExpense += item.amount;
            }
        });
        dashExpenseEl.textContent = `฿${todayExpense.toLocaleString()}`;
    }

    // 5. Habit Summary
    const habitDoneEl = document.getElementById('dashHabitDone');
    const habitTotalEl = document.getElementById('dashHabitTotal');
    const habitProgressEl = document.getElementById('dashHabitProgress');

    if (state.habits) {
        const today = new Date().toLocaleDateString();
        const totalHabits = state.habits.length;
        const doneHabits = state.habits.filter(h => h.lastCompleted === today).length;

        if (habitDoneEl) habitDoneEl.textContent = doneHabits;
        if (habitTotalEl) habitTotalEl.textContent = totalHabits;
        if (habitProgressEl) {
            const pct = totalHabits > 0 ? Math.round((doneHabits / totalHabits) * 100) : 0;
            habitProgressEl.style.width = `${pct}%`;
        }
    }
}

window.updateDashboard = updateDashboard;
