// FILE: js/features/dashboard.js
// --- Life Dashboard & Analytics ---

let focusTimer = null;
let focusTimeLeft = 25 * 60; // 25 mins

function updateDashboard() {
    const today = new Date();
    const hour = today.getHours();
    
    // 0. Smart Greeting
    const dashGreeting = document.getElementById('dashGreeting');
    const dashGreetingSub = document.getElementById('dashGreetingSub');
    const dashGreetingIcon = document.getElementById('dashGreetingIcon');
    
    if (dashGreeting && dashGreetingIcon) {
        let greeting = "สวัสดี";
        let icon = "☀️";
        if (hour >= 5 && hour < 12) { greeting = "สวัสดียามเช้า"; icon = "🌅"; }
        else if (hour >= 12 && hour < 17) { greeting = "สวัสดีตอนบ่าย"; icon = "☀️"; }
        else if (hour >= 17 && hour < 22) { greeting = "สวัสดีตอนเย็น"; icon = "🌇"; }
        else { greeting = "ราตรีสวัสดิ์"; icon = "🌙"; }
        
        dashGreeting.textContent = `${greeting}, วันนี้เป็นยังไงบ้าง?`;
        dashGreetingIcon.textContent = icon;
    }

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
    const pendingHighTodos = state.todos ? state.todos.filter(t => !t.completed && t.priority === 'high').length : 0;

    if (todoDoneEl) todoDoneEl.textContent = completedTodos;
    if (todoTotalEl) todoTotalEl.textContent = totalTodos;
    if (todoProgressEl) {
        const pct = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
        todoProgressEl.style.width = `${pct}%`;
    }
    
    // Todo Badge
    const navTodoBadge = document.getElementById('navTodoBadge');
    if (navTodoBadge) {
        navTodoBadge.style.display = (totalTodos - completedTodos > 0 || pendingHighTodos > 0) ? 'block' : 'none';
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

    let doneHabits = 0;
    let totalHabits = 0;
    
    if (state.habits) {
        const todayStr = new Date().toISOString().split('T')[0];
        totalHabits = state.habits.length;
        
        state.habits.forEach(h => {
            if (h.history && h.history.includes(todayStr)) doneHabits++;
            else if (h.lastCompleted === new Date().toLocaleDateString()) doneHabits++;
        });

        if (habitDoneEl) habitDoneEl.textContent = doneHabits;
        if (habitTotalEl) habitTotalEl.textContent = totalHabits;
        if (habitProgressEl) {
            const pct = totalHabits > 0 ? Math.round((doneHabits / totalHabits) * 100) : 0;
            habitProgressEl.style.width = `${pct}%`;
        }
    }
    
    // Habit Badge
    const navHabitBadge = document.getElementById('navHabitBadge');
    if (navHabitBadge) {
        navHabitBadge.style.display = (totalHabits - doneHabits > 0) ? 'block' : 'none';
    }
    
    // Sub-greeting
    if (dashGreetingSub) {
        let tasksLeft = (totalTodos - completedTodos) + (totalHabits - doneHabits);
        if (tasksLeft > 0) {
            dashGreetingSub.textContent = `คุณมีเป้าหมายที่ต้องทำอีก ${tasksLeft} อย่าง สู้ๆ!`;
        } else {
            dashGreetingSub.textContent = "เก่งมาก! วันนี้คุณทำเป้าหมายสำเร็จหมดแล้ว 🎉";
        }
    }
}

// Focus Timer Logic
function updateFocusDisplay() {
    const disp = document.getElementById('focusTimerDisplay');
    if (!disp) return;
    const m = Math.floor(focusTimeLeft / 60).toString().padStart(2, '0');
    const s = (focusTimeLeft % 60).toString().padStart(2, '0');
    disp.textContent = `${m}:${s}`;
}

function toggleFocusTimer() {
    const icon = document.getElementById('focusPlayIcon');
    if (focusTimer) {
        clearInterval(focusTimer);
        focusTimer = null;
        if (icon) { icon.classList.remove('fa-pause'); icon.classList.add('fa-play'); }
    } else {
        if (icon) { icon.classList.remove('fa-play'); icon.classList.add('fa-pause'); }
        focusTimer = setInterval(() => {
            if (focusTimeLeft > 0) {
                focusTimeLeft--;
                updateFocusDisplay();
            } else {
                clearInterval(focusTimer);
                focusTimer = null;
                if (icon) { icon.classList.remove('fa-pause'); icon.classList.add('fa-play'); }
                // Notification (Vibration/Alert)
                if ("vibrate" in navigator) navigator.vibrate([200, 100, 200]);
                alert("หมดเวลา Focus แล้ว! พักสายตาหน่อยนะ");
                focusTimeLeft = 25 * 60;
                updateFocusDisplay();
            }
        }, 1000);
    }
}

function resetFocusTimer() {
    if (focusTimer) {
        clearInterval(focusTimer);
        focusTimer = null;
        const icon = document.getElementById('focusPlayIcon');
        if (icon) { icon.classList.remove('fa-pause'); icon.classList.add('fa-play'); }
    }
    focusTimeLeft = 25 * 60;
    updateFocusDisplay();
}

window.updateDashboard = updateDashboard;
window.toggleFocusTimer = toggleFocusTimer;
window.resetFocusTimer = resetFocusTimer;
