// FILE: js/features/breathing.js
// --- Wim Hof Method Breathing Guide ---

let wimHofRound = 1;
const MAX_ROUNDS = 3;
let currentPhase = 0; // 0=Intro, 1=Deep Breathing, 2=Retention, 3=Recovery, 4=Finished
let breathCount = 0;
const MAX_BREATHS = 30;

let breathingInterval = null;
let retentionTimer = null;
let retentionSeconds = 0;
let recoveryTimer = null;
let recoverySeconds = 15;

function renderBreathing() {
    const container = document.getElementById('view-breathing');
    if (!container) return;

    // reset state
    wimHofRound = 1;
    currentPhase = 0;
    breathCount = 0;
    clearAllTimers();

    let html = `
        <header class="bg-white dark:bg-gray-800 shadow-sm p-4 z-20 sticky top-0 transition-colors duration-300">
            <div class="max-w-md mx-auto flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <button onclick="switchTab('home'); clearAllTimers();" class="p-2 text-gray-400 hover:text-cyan-500 transition-colors" title="Back to Home">
                        <i class="fa-solid fa-arrow-left text-xl"></i>
                    </button>
                    <h1 class="text-xl font-bold text-gray-800 dark:text-white font-thai">ฝึกหายใจ Wim Hof</h1>
                </div>
            </div>
        </header>
        
        <main class="max-w-md mx-auto w-full p-4 flex flex-col items-center justify-center space-y-6 py-6 pb-28">
            
            <div class="text-center">
                <h2 id="whRoundText" class="text-xl font-bold font-thai text-gray-800 dark:text-white mb-1">รอบที่ 1 / 3</h2>
                <p id="whDescText" class="text-xs text-gray-500 dark:text-gray-400 font-thai px-4">เตรียมตัวหายใจลึกๆ 30 ครั้ง</p>
            </div>

            <div class="relative w-64 h-64 flex items-center justify-center my-4">
                <!-- Background Pulse -->
                <div id="whPulse" class="absolute inset-0 rounded-full bg-cyan-100 dark:bg-cyan-900/30 opacity-0 scale-50 transition-all duration-[1500ms] ease-in-out"></div>
                
                <!-- Main Circle -->
                <div id="whCircle" class="w-48 h-48 rounded-full bg-cyan-50 dark:bg-gray-700 border-4 border-cyan-400 shadow-xl transition-all duration-[1500ms] ease-in-out flex flex-col items-center justify-center relative z-10 scale-100">
                    <div id="whCenterText" class="text-5xl font-black text-cyan-600 dark:text-cyan-400 mb-2">🧘</div>
                    <div id="whSubText" class="text-sm font-bold text-gray-500 dark:text-gray-300 font-thai">พร้อมไหม?</div>
                </div>
            </div>

            <button id="whActionBtn" onclick="handleWimHofAction()" class="w-full max-w-xs py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-2xl shadow-lg transition-all font-thai text-lg">
                เริ่มรอบที่ 1
            </button>
            
        </main>
    `;
    
    container.innerHTML = html;
}

function clearAllTimers() {
    if (breathingInterval) clearInterval(breathingInterval);
    if (retentionTimer) clearInterval(retentionTimer);
    if (recoveryTimer) clearInterval(recoveryTimer);
    breathingInterval = null;
    retentionTimer = null;
    recoveryTimer = null;
}

function handleWimHofAction() {
    if (currentPhase === 0) {
        // Start Deep Breathing
        startDeepBreathing();
    } else if (currentPhase === 2) {
        // Stop Retention, Start Recovery
        startRecovery();
    } else if (currentPhase === 4) {
        // Restart all
        renderBreathing();
    }
}

function updateUI(desc, center, sub, btnText, btnColor = 'bg-cyan-500', btnDisabled = false) {
    document.getElementById('whRoundText').textContent = `รอบที่ ${wimHofRound} / ${MAX_ROUNDS}`;
    document.getElementById('whDescText').textContent = desc;
    document.getElementById('whCenterText').textContent = center;
    document.getElementById('whSubText').textContent = sub;
    
    const btn = document.getElementById('whActionBtn');
    btn.textContent = btnText;
    btn.className = `w-full max-w-xs py-4 text-white font-bold rounded-2xl shadow-lg transition-all font-thai text-lg ${btnColor} ${btnDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'}`;
    btn.disabled = btnDisabled;
}

function setCircleState(scale, color, pulseOpacity) {
    const circle = document.getElementById('whCircle');
    const pulse = document.getElementById('whPulse');
    
    // Explicit scale classes for Tailwind CDN parsing
    const scaleClass = scale === '125' ? 'scale-125' : 'scale-100';
    const pulseScaleClass = scale === '125' ? 'scale-150' : 'scale-50';
    const pulseOpacityClass = pulseOpacity === '50' ? 'opacity-50' : 'opacity-0';
    
    circle.className = `w-48 h-48 rounded-full ${color} shadow-xl transition-all duration-[1500ms] ease-in-out flex flex-col items-center justify-center relative z-10 ${scaleClass}`;
    pulse.className = `absolute inset-0 rounded-full bg-cyan-200 dark:bg-cyan-800 ${pulseOpacityClass} ${pulseScaleClass} transition-all duration-[1500ms] ease-in-out`;
}

function startDeepBreathing() {
    currentPhase = 1;
    breathCount = 0;
    
    updateUI('หายใจเข้าลึกๆ ทางปาก/จมูก และปล่อยออกสบายๆ', '1', 'หายใจเข้า...', 'กำลังฝึกหายใจ...', 'bg-gray-400', true);
    
    let isInhale = true;
    
    breathingInterval = setInterval(() => {
        if (isInhale) {
            breathCount++;
            document.getElementById('whCenterText').textContent = breathCount;
            document.getElementById('whSubText').textContent = 'หายใจเข้า...';
            setCircleState('125', 'bg-cyan-100 dark:bg-cyan-900 border-4 border-cyan-400', '50');
        } else {
            document.getElementById('whSubText').textContent = 'หายใจออก...';
            setCircleState('100', 'bg-white dark:bg-gray-800 border-4 border-gray-300', '0');
        }
        
        if (!isInhale && breathCount >= MAX_BREATHS) {
            clearInterval(breathingInterval);
            setTimeout(() => {
                startRetention();
            }, 1500);
            return;
        }
        
        isInhale = !isInhale;
    }, 1500); // 1.5s Inhale, 1.5s Exhale
}

function startRetention() {
    currentPhase = 2;
    retentionSeconds = 0;
    
    setCircleState('100', 'bg-indigo-50 dark:bg-indigo-900/50 border-4 border-indigo-400', '0');
    updateUI('หายใจออกจนสุด แล้วกลั้นไว้ให้นานที่สุดเท่าที่ทำได้', '00:00', 'กลั้นหายใจ', 'ฉันต้องการหายใจ (Inhale)', 'bg-indigo-500 hover:bg-indigo-600', false);
    
    retentionTimer = setInterval(() => {
        retentionSeconds++;
        const m = Math.floor(retentionSeconds / 60).toString().padStart(2, '0');
        const s = (retentionSeconds % 60).toString().padStart(2, '0');
        document.getElementById('whCenterText').textContent = `${m}:${s}`;
    }, 1000);
}

function startRecovery() {
    currentPhase = 3;
    clearInterval(retentionTimer);
    recoverySeconds = 15;
    
    setCircleState('125', 'bg-emerald-100 dark:bg-emerald-900/50 border-4 border-emerald-400', '50');
    updateUI('หายใจเข้าลึกๆ และกลั้นไว้ 15 วินาที', '15', 'พักฟื้น...', 'กลั้นไว้!', 'bg-emerald-500', true);
    
    recoveryTimer = setInterval(() => {
        recoverySeconds--;
        document.getElementById('whCenterText').textContent = recoverySeconds;
        
        if (recoverySeconds <= 0) {
            clearInterval(recoveryTimer);
            finishRound();
        }
    }, 1000);
}

function finishRound() {
    setCircleState('100', 'bg-cyan-50 dark:bg-gray-700 border-4 border-cyan-400', '0');
    
    if (wimHofRound < MAX_ROUNDS) {
        wimHofRound++;
        currentPhase = 0;
        updateUI(`ยอดเยี่ยม! เตรียมตัวสำหรับรอบที่ ${wimHofRound}`, '🧘', 'พร้อมไหม?', `เริ่มรอบที่ ${wimHofRound}`, 'bg-cyan-500 hover:bg-cyan-600', false);
    } else {
        currentPhase = 4;
        document.getElementById('whRoundText').textContent = 'เสร็จสมบูรณ์! 🎉';
        updateUI('คุณเก่งมาก ร่างกายได้รับออกซิเจนเต็มที่แล้ว', '✨', 'ยินดีด้วย', 'กลับไปหน้าแรก', 'bg-blue-500 hover:bg-blue-600', false);
        
        // Override button behavior to go home
        const btn = document.getElementById('whActionBtn');
        btn.onclick = () => switchTab('home');
    }
}

window.renderBreathing = renderBreathing;
window.handleWimHofAction = handleWimHofAction;
window.clearAllTimers = clearAllTimers;
