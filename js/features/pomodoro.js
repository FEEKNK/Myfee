// FILE: js/features/pomodoro.js
// --- Pomodoro Timer ---

let pomoInterval = null;
let pomoTimeLeft = 25 * 60;
let pomoMode = 'work'; // work, break
let pomoSessions = 0;
let isPomoRunning = false;

function formatPomoTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function updatePomoDisplay() {
    const disp = document.getElementById('pomoDisplay');
    const title = document.getElementById('pomoTitle');
    const sess = document.getElementById('pomoSessions');
    
    if (disp) disp.textContent = formatPomoTime(pomoTimeLeft);
    if (title) title.textContent = pomoMode === 'work' ? '🧠 โฟกัสทำงาน' : '☕ พักผ่อน';
    if (sess) sess.textContent = `รอบที่สำเร็จ: ${pomoSessions}`;
}

function setPomoMode(mode) {
    if (isPomoRunning) togglePomoTimer(); // pause if switching
    pomoMode = mode;
    pomoTimeLeft = mode === 'work' ? 25 * 60 : 5 * 60;
    updatePomoDisplay();
    renderPomodoro(); // Re-render to update active tab colors
}

function togglePomoTimer() {
    const btn = document.getElementById('pomoToggleBtn');
    const icon = document.getElementById('pomoToggleIcon');
    
    if (isPomoRunning) {
        clearInterval(pomoInterval);
        isPomoRunning = false;
        if (icon) { icon.classList.remove('fa-pause'); icon.classList.add('fa-play'); }
        if (btn) btn.innerHTML = '<i class="fa-solid fa-play" id="pomoToggleIcon"></i> เริ่ม';
    } else {
        isPomoRunning = true;
        if (btn) btn.innerHTML = '<i class="fa-solid fa-pause" id="pomoToggleIcon"></i> พัก';
        
        pomoInterval = setInterval(() => {
            if (pomoTimeLeft > 0) {
                pomoTimeLeft--;
                updatePomoDisplay();
            } else {
                clearInterval(pomoInterval);
                isPomoRunning = false;
                
                if ("vibrate" in navigator) navigator.vibrate([200, 100, 200]);
                
                if (pomoMode === 'work') {
                    alert("ทำได้ดีมาก! ได้เวลาพักแล้ว ☕");
                    pomoSessions++;
                    setPomoMode('break');
                } else {
                    alert("พักเสร็จแล้ว! กลับมาโฟกัสกันต่อ 🧠");
                    setPomoMode('work');
                }
            }
        }, 1000);
    }
}

function renderPomodoro() {
    const container = document.getElementById('view-pomodoro');
    if (!container) return;

    const bgClass = pomoMode === 'work' ? 'from-red-500 to-rose-600' : 'from-teal-500 to-emerald-600';
    
    let html = `
        <header class="bg-white dark:bg-gray-800 shadow-sm p-4 z-20 sticky top-0 transition-colors duration-300">
            <div class="max-w-md mx-auto flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <button onclick="switchTab('home')" class="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Back to Home">
                        <i class="fa-solid fa-arrow-left text-xl"></i>
                    </button>
                    <h1 class="text-xl font-bold text-gray-800 dark:text-white font-thai">Pomodoro</h1>
                </div>
            </div>
        </header>
        
        <main class="max-w-md mx-auto w-full p-6 flex flex-col items-center justify-center flex-1 h-[calc(100vh-160px)]">
            
            <div class="flex gap-2 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-full shadow-inner">
                <button onclick="setPomoMode('work')" class="px-6 py-2 rounded-full font-thai text-sm font-bold transition-colors ${pomoMode === 'work' ? 'bg-white dark:bg-gray-700 text-red-500 shadow-sm' : 'text-gray-400'}">โฟกัส 25 นาที</button>
                <button onclick="setPomoMode('break')" class="px-6 py-2 rounded-full font-thai text-sm font-bold transition-colors ${pomoMode === 'break' ? 'bg-white dark:bg-gray-700 text-teal-500 shadow-sm' : 'text-gray-400'}">พัก 5 นาที</button>
            </div>

            <div class="w-64 h-64 rounded-full bg-gradient-to-br ${bgClass} shadow-2xl flex flex-col items-center justify-center text-white relative mb-8">
                <div class="absolute inset-2 border-4 border-white/20 rounded-full border-dashed"></div>
                <h2 id="pomoTitle" class="text-lg font-bold font-thai mb-2">${pomoMode === 'work' ? '🧠 โฟกัสทำงาน' : '☕ พักผ่อน'}</h2>
                <div id="pomoDisplay" class="text-6xl font-black font-mono tracking-widest leading-none">${formatPomoTime(pomoTimeLeft)}</div>
            </div>

            <div class="flex gap-4">
                <button id="pomoToggleBtn" onclick="togglePomoTimer()" class="w-32 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-2xl shadow-lg font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
                    ${isPomoRunning ? '<i class="fa-solid fa-pause" id="pomoToggleIcon"></i> พัก' : '<i class="fa-solid fa-play" id="pomoToggleIcon"></i> เริ่ม'}
                </button>
                <button onclick="setPomoMode(pomoMode)" class="w-16 py-4 bg-white dark:bg-gray-800 text-gray-400 rounded-2xl shadow-lg hover:text-gray-800 dark:hover:text-white transition-colors flex items-center justify-center">
                    <i class="fa-solid fa-rotate-right text-xl"></i>
                </button>
            </div>

            <p id="pomoSessions" class="mt-8 font-thai text-gray-400 dark:text-gray-500 font-bold">รอบที่สำเร็จ: ${pomoSessions}</p>
        </main>
    `;
    
    container.innerHTML = html;
}

window.renderPomodoro = renderPomodoro;
window.setPomoMode = setPomoMode;
window.togglePomoTimer = togglePomoTimer;
