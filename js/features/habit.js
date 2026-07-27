// FILE: js/features/habit.js
// --- Habit Tracker ---

function saveHabitData() {
    localStorage.setItem('habitData', JSON.stringify(state.habits));
    renderHabits();
    if (typeof updateDashboard === 'function') updateDashboard();
}

function addHabit(name) {
    if (!name || !name.trim()) return;
    const icons = ['fa-bolt', 'fa-heart', 'fa-book', 'fa-person-running', 'fa-brain', 'fa-bed', 'fa-apple-whole'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];

    const habit = {
        id: Date.now(),
        name: name.trim(),
        icon: randomIcon,
        streak: 0,
        lastCompleted: null
    };

    state.habits.push(habit);
    saveHabitData();
}

function deleteHabit(id) {
    state.habits = state.habits.filter(h => h.id !== id);
    saveHabitData();
}

function toggleHabitCheckIn(id) {
    const today = new Date().toLocaleDateString();
    const habit = state.habits.find(h => h.id === id);
    if (!habit) return;

    if (habit.lastCompleted === today) {
        // Uncheck
        habit.lastCompleted = null;
        habit.streak = Math.max(0, habit.streak - 1);
    } else {
        // Check-in
        habit.lastCompleted = today;
        habit.streak += 1;
    }

    saveHabitData();
}

function renderHabits() {
    const listEl = document.getElementById('habitList');
    if (!listEl) return;

    const today = new Date().toLocaleDateString();

    if (state.habits.length === 0) {
        listEl.innerHTML = `
            <div class="text-center py-8 text-gray-400 dark:text-gray-500 font-thai">
                <i class="fa-solid fa-list-check text-4xl mb-2"></i>
                <p>ยังไม่มีรายการนิสัยที่ติดตาม</p>
            </div>
        `;
        return;
    }

    listEl.innerHTML = state.habits.map(habit => {
        const isDoneToday = habit.lastCompleted === today;
        return `
            <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all ${isDoneToday ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800' : ''}">
                <div class="flex items-center gap-3">
                    <button onclick="toggleHabitCheckIn(${habit.id})" class="w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDoneToday ? 'bg-green-500 text-white shadow-md shadow-green-500/30' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-green-500'}">
                        <i class="fa-solid ${isDoneToday ? 'fa-check' : habit.icon || 'fa-bolt'}"></i>
                    </button>
                    <div>
                        <div class="font-bold text-gray-800 dark:text-gray-200 font-thai text-sm ${isDoneToday ? 'line-through opacity-75' : ''}">${habit.name}</div>
                        <div class="text-xs text-orange-500 font-bold flex items-center gap-1 mt-0.5">
                            <i class="fa-solid fa-fire text-xs"></i> Streak: ${habit.streak} วัน
                        </div>
                    </div>
                </div>
                <button onclick="deleteHabit(${habit.id})" class="text-gray-300 hover:text-red-500 transition-colors p-1">
                    <i class="fa-solid fa-trash-can text-sm"></i>
                </button>
            </div>
        `;
    }).join('');
}

window.renderHabits = renderHabits;
window.addHabit = addHabit;
window.deleteHabit = deleteHabit;
window.toggleHabitCheckIn = toggleHabitCheckIn;
