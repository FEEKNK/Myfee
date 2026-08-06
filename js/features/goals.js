// FILE: js/features/goals.js
// --- Savings Goals ---

function saveGoalsData() {
    localStorage.setItem('goalsData', JSON.stringify(state.goals));
    renderGoals();
}

function addGoal(name, targetAmount) {
    if (!name || !name.trim() || !targetAmount || targetAmount <= 0) return;
    const goal = {
        id: Date.now(),
        name: name.trim(),
        target: parseFloat(targetAmount),
        current: 0
    };
    state.goals.unshift(goal);
    saveGoalsData();
}

function depositGoal(id) {
    const amountStr = prompt("💵 ใส่จำนวนเงินที่ต้องการออมเพิ่ม:");
    if (!amountStr) return;
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) {
        alert("กรุณาใส่จำนวนเงินที่ถูกต้อง");
        return;
    }

    const goal = state.goals.find(g => g.id === id);
    if (goal) {
        goal.current += amount;
        if (goal.current > goal.target) goal.current = goal.target;
        saveGoalsData();
        
        if (goal.current === goal.target) {
            setTimeout(() => alert(`🎉 ยินดีด้วย! คุณเก็บเงินเป้าหมาย "${goal.name}" สำเร็จแล้ว!`), 100);
        }
    }
}

function deleteGoal(id) {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบเป้าหมายการออมนี้?")) {
        state.goals = state.goals.filter(g => g.id !== id);
        saveGoalsData();
    }
}

function formatMoney(amount) {
    return amount.toLocaleString('th-TH', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function renderGoals() {
    const container = document.getElementById('view-goals');
    if (!container) return;

    let html = `
        <header class="bg-white dark:bg-gray-800 shadow-sm p-4 z-20 sticky top-0 transition-colors duration-300">
            <div class="max-w-md mx-auto flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <button onclick="switchTab('home')" class="p-2 text-gray-400 hover:text-emerald-500 transition-colors" title="Back to Home">
                        <i class="fa-solid fa-arrow-left text-xl"></i>
                    </button>
                    <h1 class="text-xl font-bold text-gray-800 dark:text-white font-thai">เป้าหมายออมเงิน</h1>
                </div>
            </div>
        </header>
        
        <main class="max-w-md mx-auto w-full p-4 space-y-4">
            
            <form onsubmit="event.preventDefault(); addGoal(document.getElementById('goalName').value, document.getElementById('goalTarget').value); document.getElementById('goalName').value=''; document.getElementById('goalTarget').value='';" class="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-3">
                <h3 class="font-bold text-sm text-gray-700 dark:text-gray-300 font-thai">ตั้งเป้าหมายออมเงินใหม่</h3>
                <input type="text" id="goalName" placeholder="เช่น ซื้อกระเป๋า, เที่ยวญี่ปุ่น..." required class="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl text-sm font-thai focus:outline-none">
                <input type="number" id="goalTarget" placeholder="จำนวนเงินที่ต้องการ (บาท)" required min="1" step="any" class="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl text-sm font-thai focus:outline-none">
                <button type="submit" class="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-md transition-all font-thai text-sm">
                    + เพิ่มเป้าหมาย
                </button>
            </form>

            <div class="space-y-4 pb-6">
    `;

    if (state.goals.length === 0) {
        html += `
            <div class="text-center py-8 text-gray-400 dark:text-gray-500 font-thai">
                <i class="fa-solid fa-piggy-bank text-4xl mb-2"></i>
                <p>ยังไม่มีเป้าหมายการออมเลย เริ่มเก็บเงินกันเถอะ!</p>
            </div>
        `;
    } else {
        state.goals.forEach(g => {
            const progress = (g.current / g.target) * 100;
            const progressClamped = Math.min(100, Math.max(0, progress));
            const isDone = g.current >= g.target;
            
            html += `
                <div class="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border ${isDone ? 'border-emerald-400 dark:border-emerald-500' : 'border-gray-100 dark:border-gray-700'} relative overflow-hidden">
                    ${isDone ? '<div class="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>' : ''}
                    
                    <div class="flex justify-between items-start mb-3 relative z-10">
                        <h3 class="font-bold text-lg text-gray-800 dark:text-white font-thai">${g.name} ${isDone ? '🎉' : ''}</h3>
                        <button onclick="deleteGoal(${g.id})" class="text-gray-300 hover:text-red-500 transition-colors"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                    
                    <div class="flex justify-between items-end mb-2 relative z-10">
                        <div>
                            <div class="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight font-sans">฿${formatMoney(g.current)}</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400 font-thai">จากเป้าหมาย ฿${formatMoney(g.target)}</div>
                        </div>
                        <div class="text-sm font-bold text-gray-400 font-sans">${progressClamped.toFixed(1)}%</div>
                    </div>
                    
                    <div class="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-4 relative z-10">
                        <div class="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out" style="width: ${progressClamped}%"></div>
                    </div>
                    
                    ${!isDone ? `
                        <button onclick="depositGoal(${g.id})" class="w-full py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold rounded-xl border border-emerald-100 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors font-thai text-sm relative z-10">
                            <i class="fa-solid fa-plus mr-1"></i> เพิ่มเงินออม
                        </button>
                    ` : `
                        <div class="text-center text-sm font-bold text-emerald-500 font-thai bg-emerald-50 dark:bg-emerald-900/20 py-2 rounded-xl relative z-10">
                            เก็บสำเร็จแล้ว ยอดเยี่ยมมาก!
                        </div>
                    `}
                </div>
            `;
        });
    }

    html += `</div></main>`;
    container.innerHTML = html;
}

window.renderGoals = renderGoals;
window.addGoal = addGoal;
window.depositGoal = depositGoal;
window.deleteGoal = deleteGoal;
