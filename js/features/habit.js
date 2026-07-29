// FILE: js/features/habit.js
// --- Habit Tracker ---

function saveHabitData() {
    localStorage.setItem('habitData', JSON.stringify(state.habits));
    renderHabits();
    if (typeof updateDashboard === 'function') updateDashboard();
}

function addHabit(name, routine) {
    if (!name || !name.trim()) return;
    const icons = ['fa-bolt', 'fa-heart', 'fa-book', 'fa-person-running', 'fa-brain', 'fa-bed', 'fa-apple-whole'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];

    const habit = {
        id: Date.now(),
        name: name.trim(),
        icon: randomIcon,
        routine: routine || 'morning', // morning, afternoon, evening
        streak: 0,
        history: [], // array of YYYY-MM-DD
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
    // We should use ISO strings for consistency in history
    const todayStr = new Date().toISOString().split('T')[0];
    
    const habit = state.habits.find(h => h.id === id);
    if (!habit) return;
    
    if (!habit.history) habit.history = [];

    // Check if already checked in today (using history array or lastCompleted)
    const isDone = habit.history.includes(todayStr) || habit.lastCompleted === new Date().toLocaleDateString();

    if (isDone) {
        // Uncheck
        habit.history = habit.history.filter(d => d !== todayStr);
        habit.lastCompleted = null;
        habit.streak = Math.max(0, habit.streak - 1);
    } else {
        // Check-in
        habit.history.push(todayStr);
        habit.lastCompleted = new Date().toLocaleDateString(); // keep for backward compatibility
        habit.streak += 1;
    }

    saveHabitData();
}

function renderHabits() {
    const listEl = document.getElementById('habitList');
    if (!listEl) return;

    const todayStr = new Date().toISOString().split('T')[0];

    if (state.habits.length === 0) {
        listEl.innerHTML = `
            <div class="text-center py-8 text-gray-400 dark:text-gray-500 font-thai">
                <i class="fa-solid fa-list-check text-4xl mb-2"></i>
                <p>ยังไม่มีรายการนิสัยที่ติดตาม</p>
            </div>
        `;
        return;
    }

    // Group habits by routine
    const routines = {
        'morning': { label: '🌅 กิจวัตรยามเช้า', habits: [] },
        'afternoon': { label: '☀️ ระหว่างวัน', habits: [] },
        'evening': { label: '🌙 ก่อนนอน', habits: [] }
    };

    state.habits.forEach(habit => {
        if (!habit.history) habit.history = [];
        const r = habit.routine || 'morning';
        if (routines[r]) {
            routines[r].habits.push(habit);
        } else {
            routines['morning'].habits.push(habit); // fallback
        }
    });

    let html = '';

    // Helper for 7-day heatmap
    const renderHeatmap = (habit) => {
        let blocks = '';
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dStr = d.toISOString().split('T')[0];
            const isCompleted = habit.history.includes(dStr);
            blocks += `<div class="w-2.5 h-2.5 rounded-sm ${isCompleted ? 'bg-amber-400' : 'bg-gray-200 dark:bg-gray-700'}" title="${dStr}"></div>`;
        }
        return `<div class="flex gap-1 mt-2">${blocks}</div>`;
    };

    for (const [key, routineData] of Object.entries(routines)) {
        if (routineData.habits.length === 0) continue;
        
        html += `
            <div class="mb-4">
                <h4 class="font-bold text-xs text-gray-500 dark:text-gray-400 font-thai mb-2 flex items-center">${routineData.label}</h4>
                <div class="space-y-2">
        `;
        
        html += routineData.habits.map(habit => {
            const isDoneToday = habit.history.includes(todayStr) || habit.lastCompleted === new Date().toLocaleDateString();
            
            return `
                <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all ${isDoneToday ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800' : ''}">
                    <div class="flex items-start gap-3 w-full">
                        <button onclick="toggleHabitCheckIn(${habit.id})" class="w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all ${isDoneToday ? 'bg-green-500 text-white shadow-md shadow-green-500/30' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-green-500'}">
                            <i class="fa-solid ${isDoneToday ? 'fa-check' : habit.icon || 'fa-bolt'}"></i>
                        </button>
                        <div class="flex-1">
                            <div class="flex justify-between items-start">
                                <div>
                                    <div class="font-bold text-gray-800 dark:text-gray-200 font-thai text-sm ${isDoneToday ? 'line-through opacity-75' : ''}">${habit.name}</div>
                                    <div class="text-[10px] text-orange-500 font-bold flex items-center gap-1 mt-0.5">
                                        <i class="fa-solid fa-fire text-[10px]"></i> Streak: ${habit.streak} วัน
                                    </div>
                                </div>
                                <button onclick="deleteHabit(${habit.id})" class="text-gray-300 hover:text-red-500 transition-colors p-1 shrink-0">
                                    <i class="fa-solid fa-trash-can text-sm"></i>
                                </button>
                            </div>
                            ${renderHeatmap(habit)}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        html += `</div></div>`;
    }
    
    listEl.innerHTML = html;
}

window.renderHabits = renderHabits;
window.addHabit = addHabit;
window.deleteHabit = deleteHabit;
window.toggleHabitCheckIn = toggleHabitCheckIn;
