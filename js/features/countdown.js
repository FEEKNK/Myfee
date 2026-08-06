// FILE: js/features/countdown.js
// --- Countdown Events ---

function saveCountdownData() {
    localStorage.setItem('countdownData', JSON.stringify(state.countdown));
    renderCountdown();
}

function addCountdown(name, dateStr) {
    if (!name || !name.trim() || !dateStr) return;
    const item = {
        id: Date.now(),
        name: name.trim(),
        date: dateStr // YYYY-MM-DD
    };
    state.countdown.push(item);
    // Sort by closest date
    state.countdown.sort((a, b) => new Date(a.date) - new Date(b.date));
    saveCountdownData();
}

function deleteCountdown(id) {
    state.countdown = state.countdown.filter(c => c.id !== id);
    saveCountdownData();
}

function renderCountdown() {
    const container = document.getElementById('view-countdown');
    if (!container) return;

    let html = `
        <header class="bg-white dark:bg-gray-800 shadow-sm p-4 z-20 sticky top-0 transition-colors duration-300">
            <div class="max-w-md mx-auto flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <button onclick="switchTab('home')" class="p-2 text-gray-400 hover:text-purple-500 transition-colors" title="Back to Home">
                        <i class="fa-solid fa-arrow-left text-xl"></i>
                    </button>
                    <h1 class="text-xl font-bold text-gray-800 dark:text-white font-thai">นับถอยหลัง</h1>
                </div>
            </div>
        </header>
        
        <main class="max-w-md mx-auto w-full p-4 space-y-4">
            
            <form onsubmit="event.preventDefault(); addCountdown(document.getElementById('cdName').value, document.getElementById('cdDate').value); document.getElementById('cdName').value='';" class="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-3">
                <h3 class="font-bold text-sm text-gray-700 dark:text-gray-300 font-thai">เพิ่มเหตุการณ์สำคัญ</h3>
                <input type="text" id="cdName" placeholder="เช่น วันเกิด, สอบกลางภาค..." required class="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl text-sm font-thai focus:outline-none">
                <input type="date" id="cdDate" required class="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl text-sm font-thai focus:outline-none text-gray-500">
                <button type="submit" class="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl shadow-md transition-all font-thai text-sm">
                    + เพิ่มกำหนดการ
                </button>
            </form>

            <div class="space-y-3 pb-6">
    `;

    if (state.countdown.length === 0) {
        html += `
            <div class="text-center py-8 text-gray-400 dark:text-gray-500 font-thai">
                <i class="fa-solid fa-calendar-days text-4xl mb-2"></i>
                <p>ยังไม่มีกำหนดการเลย เพิ่มได้ด้านบนเลย!</p>
            </div>
        `;
    } else {
        const today = new Date();
        today.setHours(0,0,0,0);

        state.countdown.forEach(c => {
            const targetDate = new Date(c.date);
            const diffTime = targetDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            const displayDate = targetDate.toLocaleDateString('th-TH', {day:'numeric', month:'long', year:'numeric'});
            
            let badgeHtml = '';
            let cardStyle = '';
            
            if (diffDays < 0) {
                badgeHtml = `<span class="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-xs font-bold font-thai">ผ่านมาแล้ว</span>`;
                cardStyle = 'opacity-60';
            } else if (diffDays === 0) {
                badgeHtml = `<span class="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold font-thai animate-pulse">วันนี้! 🎉</span>`;
                cardStyle = 'border-2 border-pink-400 dark:border-pink-500';
            } else {
                badgeHtml = `
                    <div class="text-center">
                        <div class="text-3xl font-black text-purple-600 dark:text-purple-400 leading-none">${diffDays}</div>
                        <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-thai">วัน</div>
                    </div>
                `;
            }

            html += `
                <div class="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between relative overflow-hidden ${cardStyle}">
                    ${diffDays === 0 ? '<div class="absolute -right-6 -top-6 w-24 h-24 bg-pink-500/20 rounded-full blur-xl"></div>' : ''}
                    <div>
                        <h3 class="font-bold text-lg text-gray-800 dark:text-white font-thai">${c.name}</h3>
                        <p class="text-xs text-gray-500 dark:text-gray-400 font-thai mt-1"><i class="fa-regular fa-calendar mr-1"></i> ${displayDate}</p>
                    </div>
                    <div class="flex items-center gap-4 z-10">
                        ${badgeHtml}
                        <button onclick="deleteCountdown(${c.id})" class="text-gray-300 hover:text-red-500 transition-colors p-2"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
            `;
        });
    }

    html += `</div></main>`;
    container.innerHTML = html;
}

window.renderCountdown = renderCountdown;
window.addCountdown = addCountdown;
window.deleteCountdown = deleteCountdown;
