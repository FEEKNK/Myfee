// FILE: js/todo.js
// --- To-Do Functions ---

window.toggleTodo = function(index) {
    state.todos[index].completed = !state.todos[index].completed;
    saveTodos();
    renderTodos();
};

window.deleteTodo = function(index) {
    state.todos.splice(index, 1);
    saveTodos();
    renderTodos();
};

function renderTodos() {
    if (!els.todoList) return;
    els.todoList.innerHTML = '';
    
    if (state.todos.length === 0) {
        els.todoList.innerHTML = `<div class="flex-1 flex flex-col items-center justify-center text-gray-400 h-40 font-thai">ไม่มีงานในวันนี้ 🎉</div>`;
        return;
    }
    
    state.todos.forEach((todo, index) => {
        const item = document.createElement('div');
        item.className = `flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors`;
        
        const isDone = todo.completed;
        const textClass = isDone ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-200 font-bold';
        const iconClass = isDone ? 'fa-solid fa-circle-check text-green-500' : 'fa-regular fa-circle text-gray-300 dark:text-gray-600';
        
        item.innerHTML = `
            <div class="flex items-center gap-3 flex-1 cursor-pointer" onclick="toggleTodo(${index})">
                <i class="${iconClass} text-2xl transition-colors"></i>
                <span class="${textClass} font-thai flex-1">${todo.text}</span>
            </div>
            <button onclick="deleteTodo(${index})" class="w-10 h-10 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors ml-2">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        els.todoList.appendChild(item);
    });
}

function addTodo() {
    if (!els.todoInput) return;
    const text = els.todoInput.value.trim();
    if (!text) return;
    
    state.todos.push({ text: text, completed: false });
    saveTodos();
    els.todoInput.value = '';
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('todoData', JSON.stringify(state.todos));
}
