// FILE: js/features/breathing.js
// --- Mindfulness & Breathing Guide ---

let breathingInterval = null;
let breathingPhase = 0; // 0=Inhale, 1=Hold, 2=Exhale, 3=Hold
let isBreathingActive = false;

const PHASES = [
    { text: 'สูดหายใจเข้าลึกๆ...', duration: 4000, scale: 'scale-150', color: 'bg-cyan-400' },
    { text: 'กลั้นหายใจ...', duration: 4000, scale: 'scale-150', color: 'bg-cyan-500' },
    { text: 'ค่อยๆ ผ่อนหายใจออก...', duration: 4000, scale: 'scale-100', color: 'bg-blue-400' },
    { text: 'กลั้นหายใจ...', duration: 4000, scale: 'scale-100', color: 'bg-blue-500' }
];

function toggleBreathing() {
    isBreathingActive = !isBreathingActive;
    const btn = document.getElementById('breatheToggleBtn');
    const circle = document.getElementById('breatheCircle');
    const text = document.getElementById('breatheText');
    
    if (isBreathingActive) {
        btn.innerHTML = 'หยุดพัก (Stop)';
        btn.classList.replace('bg-cyan-500', 'bg-gray-300');
        btn.classList.replace('hover:bg-cyan-600', 'hover:bg-gray-400');
        btn.classList.replace('text-white', 'text-gray-700');
        
        breathingPhase = 0;
        runBreathingCycle(circle, text);
        
    } else {
        btn.innerHTML = 'เริ่มฝึกหายใจ (Start)';
        btn.classList.replace('bg-gray-300', 'bg-cyan-500');
        btn.classList.replace('hover:bg-gray-400', 'hover:bg-cyan-600');
        btn.classList.replace('text-gray-700', 'text-white');
        
        clearTimeout(breathingInterval);
        if (circle) {
            circle.className = 'w-48 h-48 rounded-full bg-gray-200 dark:bg-gray-700 shadow-xl transition-all duration-[4000ms] ease-in-out flex items-center justify-center relative scale-100';
        }
        if (text) text.textContent = 'พร้อมหรือยัง?';
    }
}

function runBreathingCycle(circle, text) {
    if (!isBreathingActive) return;

    const phase = PHASES[breathingPhase];
    
    if (text) text.textContent = phase.text;
    if (circle) {
        circle.className = `w-48 h-48 rounded-full ${phase.color} shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all duration-[4000ms] ease-in-out flex items-center justify-center relative ${phase.scale}`;
    }

    breathingInterval = setTimeout(() => {
        breathingPhase = (breathingPhase + 1) % 4;
        runBreathingCycle(circle, text);
    }, phase.duration);
}

function renderBreathing() {
    const container = document.getElementById('view-breathing');
    if (!container) return;

    // reset state when re-rendering
    isBreathingActive = false;
    clearTimeout(breathingInterval);

    let html = `
        <header class="bg-white dark:bg-gray-800 shadow-sm p-4 z-20 sticky top-0 transition-colors duration-300">
            <div class="max-w-md mx-auto flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <button onclick="switchTab('home')" class="p-2 text-gray-400 hover:text-cyan-500 transition-colors" title="Back to Home">
                        <i class="fa-solid fa-arrow-left text-xl"></i>
                    </button>
                    <h1 class="text-xl font-bold text-gray-800 dark:text-white font-thai">ฝึกหายใจลดเครียด</h1>
                </div>
            </div>
        </header>
        
        <main class="max-w-md mx-auto w-full p-6 flex flex-col items-center justify-center flex-1 h-[calc(100vh-160px)]">
            
            <div class="text-center mb-16">
                <h2 class="text-2xl font-bold font-thai text-gray-800 dark:text-white mb-2">Box Breathing</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400 font-thai">เทคนิคการหายใจแบบ 4-4-4-4 เพื่อลดความเครียดและเพิ่มสมาธิ</p>
            </div>

            <div class="relative w-64 h-64 flex items-center justify-center mb-16">
                <div id="breatheCircle" class="w-48 h-48 rounded-full bg-gray-200 dark:bg-gray-700 shadow-inner transition-all duration-[4000ms] ease-in-out flex items-center justify-center relative z-10">
                    <i class="fa-solid fa-lungs text-4xl text-white/50"></i>
                </div>
            </div>

            <h3 id="breatheText" class="text-xl font-bold text-cyan-600 dark:text-cyan-400 font-thai h-8 mb-8 transition-opacity duration-500">พร้อมหรือยัง?</h3>

            <button id="breatheToggleBtn" onclick="toggleBreathing()" class="w-64 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-2xl shadow-lg transition-all font-thai text-lg">
                เริ่มฝึกหายใจ (Start)
            </button>
            
        </main>
    `;
    
    container.innerHTML = html;
}

window.renderBreathing = renderBreathing;
window.toggleBreathing = toggleBreathing;
