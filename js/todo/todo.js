// FILE: js/todo/todo.js
// --- To-Do Functions with Everyday / Specific Days Support ---

const DAY_SHORT_NAMES = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

function getTodayStr() {
    return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

function getTodayDayIndex() {
    return new Date().getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
}

function isTodoDoneToday(todo) {
    const todayStr = getTodayStr();
    if (todo.repeat === 'daily' || todo.repeat === 'days') {
        return todo.lastCompletedDate === todayStr;
    }
    return !!todo.completed;
}

window.toggleTodo = function(id) {
    const todayStr = getTodayStr();
    const todo = state.todos.find(t => t.id === id);
    if (!todo) return;

    if (todo.repeat === 'daily' || todo.repeat === 'days') {
        if (todo.lastCompletedDate === todayStr) {
            todo.lastCompletedDate = null;
            todo.completed = false;
        } else {
            todo.lastCompletedDate = todayStr;
            todo.completed = true;
        }
    } else {
        todo.completed = !todo.completed;
        if (todo.completed) todo.lastCompletedDate = todayStr;
        else todo.lastCompletedDate = null;
    }

    saveTodos();
    renderTodos();
    if (typeof updateDashboard === 'function') updateDashboard();
};

window.deleteTodo = function(id) {
    state.todos = state.todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
    if (typeof updateDashboard === 'function') updateDashboard();
};

function saveTodos() {
    localStorage.setItem('todoData', JSON.stringify(state.todos));
}

function renderTodos() {
    const listEl = document.getElementById('todoList');
    if (!listEl) return;
    listEl.innerHTML = '';

    const todayDay = getTodayDayIndex();

    // Migrate legacy array items if needed
    state.todos.forEach((todo, idx) => {
        if (!todo.id) todo.id = Date.now() + idx;
        if (!todo.repeat) todo.repeat = 'none';
        if (!todo.repeatDays) todo.repeatDays = [];
    });

    const activeFilter = window.currentTodoFilter || 'today';

    let filteredTodos = state.todos;
    if (activeFilter === 'today') {
        filteredTodos = state.todos.filter(todo => {
            if (todo.repeat === 'none') return true;
            if (todo.repeat === 'daily') return true;
            if (todo.repeat === 'days') {
                return todo.repeatDays && todo.repeatDays.includes(todayDay);
            }
            return true;
        });
    }

    if (filteredTodos.length === 0) {
        listEl.innerHTML = `
            <div class="text-center py-12 text-gray-400 dark:text-gray-500 font-thai">
                <i class="fa-solid fa-calendar-check text-4xl mb-2"></i>
                <p>ไม่มีงานที่ต้องทำในวันนี้ 🎉</p>
            </div>
        `;
        return;
    }

    filteredTodos.forEach((todo) => {
        const item = document.createElement('div');
        const isDone = isTodoDoneToday(todo);
        
        item.className = `flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all ${isDone ? 'bg-green-50/40 dark:bg-green-900/10 border-green-200 dark:border-green-800/50' : ''}`;
        
        const textClass = isDone ? 'line-through text-gray-400 dark:text-gray-500 font-normal' : 'text-gray-800 dark:text-gray-100 font-bold';
        const iconClass = isDone ? 'fa-solid fa-circle-check text-green-500 text-2xl' : 'fa-regular fa-circle text-gray-300 dark:text-gray-600 text-2xl hover:text-green-500';
        
        let repeatBadge = '';
        if (todo.repeat === 'daily') {
            repeatBadge = `<span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"><i class="fa-solid fa-rotate"></i> ทุกวันตลอดไป</span>`;
        } else if (todo.repeat === 'days' && todo.repeatDays && todo.repeatDays.length > 0) {
            const sortedDays = [...todo.repeatDays].sort((a,b)=>a-b);
            const daysText = sortedDays.map(d => DAY_SHORT_NAMES[d]).join(', ');
            repeatBadge = `<span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"><i class="fa-solid fa-calendar-days"></i> วัน${daysText}</span>`;
        } else {
            repeatBadge = `<span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">ครั้งเดียว</span>`;
        }

        item.innerHTML = `
            <div class="flex items-center gap-3 flex-1 cursor-pointer" onclick="toggleTodo(${todo.id})">
                <i class="${iconClass} transition-all shrink-0"></i>
                <div class="flex flex-col">
                    <span class="${textClass} font-thai text-sm leading-snug">${todo.text}</span>
                    <div class="mt-1 font-thai">${repeatBadge}</div>
                </div>
            </div>
            <button onclick="deleteTodo(${todo.id})" class="w-9 h-9 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors shrink-0 ml-2">
                <i class="fa-solid fa-trash-can text-sm"></i>
            </button>
        `;
        listEl.appendChild(item);
    });
}

function addTodoFromForm() {
    const inputEl = document.getElementById('todoInput');
    const repeatTypeEl = document.getElementById('todoRepeatType');
    if (!inputEl) return;

    const text = inputEl.value.trim();
    if (!text) return;

    const repeatType = repeatTypeEl ? repeatTypeEl.value : 'none';
    let selectedDays = [];

    if (repeatType === 'days') {
        const dayBtns = document.querySelectorAll('.todo-day-btn.selected');
        dayBtns.forEach(btn => {
            selectedDays.push(parseInt(btn.dataset.day));
        });
        if (selectedDays.length === 0) {
            alert('กรุณาเลือกอย่างน้อย 1 วันในสัปดาห์');
            return;
        }
    }

    const newTodo = {
        id: Date.now(),
        text: text,
        repeat: repeatType, // 'none', 'daily', 'days'
        repeatDays: selectedDays, // e.g. [1, 3, 5]
        completed: false,
        lastCompletedDate: null
    };

    state.todos.push(newTodo);
    saveTodos();
    inputEl.value = '';
    renderTodos();
    if (typeof updateDashboard === 'function') updateDashboard();
}

window.addTodoFromForm = addTodoFromForm;
window.renderTodos = renderTodos;
