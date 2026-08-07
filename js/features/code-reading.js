// FILE: js/features/code-reading.js

let crCurrentMode = 'code'; // 'code' or 'sql'
let crCurrentLevelIndex = 0;
let crCurrentQuestionIndex = 0;

function crInit() {
    // Load progress
    const saved = localStorage.getItem('myfee_cr_progress');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            crCurrentMode = parsed.mode || 'code';
            crCurrentLevelIndex = parsed.levelIndex || 0;
            crCurrentQuestionIndex = parsed.questionIndex || 0;
        } catch(e){}
    }

    crUpdateTabsUI();
    crRenderLevelSelector();
    
    // Ensure indices are within bounds
    const data = crGetData();
    if (crCurrentLevelIndex >= data.length) crCurrentLevelIndex = 0;
    if (data[crCurrentLevelIndex] && crCurrentQuestionIndex >= data[crCurrentLevelIndex].questions.length) {
        crCurrentQuestionIndex = 0;
    }
    
    document.getElementById('crLevelSelect').value = crCurrentLevelIndex;
    crRenderCurrentQuestion();
}

function crGetData() {
    return crCurrentMode === 'code' ? (window.codeReadingLevels || []) : (window.sqlReadingLevels || []);
}

function crUpdateTabsUI() {
    const tabCode = document.getElementById('crTabCode');
    const tabSql = document.getElementById('crTabSql');
    
    if (crCurrentMode === 'code') {
        tabCode.className = 'flex-1 py-1.5 rounded-lg bg-white dark:bg-gray-800 font-bold text-blue-600 dark:text-blue-400 shadow-sm transition-all';
        tabSql.className = 'flex-1 py-1.5 rounded-lg text-gray-500 dark:text-gray-400 transition-all';
    } else {
        tabSql.className = 'flex-1 py-1.5 rounded-lg bg-white dark:bg-gray-800 font-bold text-blue-600 dark:text-blue-400 shadow-sm transition-all';
        tabCode.className = 'flex-1 py-1.5 rounded-lg text-gray-500 dark:text-gray-400 transition-all';
    }
}

function crSwitchMode(mode) {
    crCurrentMode = mode;
    crCurrentLevelIndex = 0;
    crCurrentQuestionIndex = 0;
    
    crUpdateTabsUI();
    crRenderLevelSelector();
    crRenderCurrentQuestion();
}

function crRenderLevelSelector() {
    const data = crGetData();
    const select = document.getElementById('crLevelSelect');
    select.innerHTML = '';
    
    data.forEach((lvl, idx) => {
        const option = document.createElement('option');
        option.value = idx;
        option.textContent = lvl.title;
        select.appendChild(option);
    });
    
    select.value = crCurrentLevelIndex;
}

function crChangeLevel(levelIdx) {
    crCurrentLevelIndex = parseInt(levelIdx);
    crCurrentQuestionIndex = 0;
    crRenderCurrentQuestion();
}

function crPrev() {
    if (crCurrentQuestionIndex > 0) {
        crCurrentQuestionIndex--;
        crRenderCurrentQuestion();
    }
}

function crNext() {
    const data = crGetData();
    const level = data[crCurrentLevelIndex];
    if (level && crCurrentQuestionIndex < level.questions.length - 1) {
        crCurrentQuestionIndex++;
        crRenderCurrentQuestion();
    }
}

function escapeHtml(unsafe) {
    return (unsafe || '').replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

function crRenderCurrentQuestion() {
    const data = crGetData();
    const level = data[crCurrentLevelIndex];
    if(!level) return;
    const q = level.questions[crCurrentQuestionIndex];
    if(!q) return;

    // Update Progress UI
    document.getElementById('crCurrentIndex').innerText = crCurrentQuestionIndex + 1;
    document.getElementById('crTotalIndex').innerText = level.questions.length;
    document.getElementById('crProgressBar').style.width = `${((crCurrentQuestionIndex + 1) / level.questions.length) * 100}%`;

    const container = document.getElementById('crContentArea');
    
    // Parse Markdown
    const parseMD = (str) => window.marked ? marked.parse(str) : `<p>${str.replace(/\n/g, '<br>')}</p>`;

    let html = `
        <h3 class="font-bold text-lg text-gray-800 dark:text-white">${q.title}</h3>
        <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg mt-3 relative text-sm">
            <div class="absolute top-0 right-0 bg-gray-700 text-gray-300 text-[10px] px-2 py-1 rounded-bl-lg uppercase font-bold z-10">${q.codeLanguage}</div>
            <pre class="m-0 p-4 overflow-x-auto"><code class="language-${q.codeLanguage}">${escapeHtml(q.code)}</code></pre>
        </div>
        <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mt-4">
            <h4 class="font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                <i class="fa-solid fa-circle-question text-blue-500"></i> คำถาม
            </h4>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">${q.question}</p>
        </div>
    `;

    if(q.hint) {
        html += `
            <div class="mt-4">
                <button onclick="this.nextElementSibling.classList.toggle('hidden')" class="px-4 py-2 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 font-bold rounded-xl shadow-sm text-xs border border-yellow-200 dark:border-yellow-800/50 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 transition-colors w-full text-left flex items-center justify-between">
                    <span><i class="fa-solid fa-lightbulb mr-2"></i> ขอคำใบ้หน่อย!</span>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div class="hidden mt-2 p-4 bg-yellow-50/50 dark:bg-yellow-900/10 rounded-xl border border-yellow-100 dark:border-yellow-800/30 text-gray-700 dark:text-gray-300 text-sm">
                    ${q.hint}
                </div>
            </div>
        `;
    }

    if(q.answer) {
        html += `
            <div class="mt-4 mb-4">
                <button onclick="this.nextElementSibling.classList.toggle('hidden')" class="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold rounded-xl shadow-sm text-xs border border-blue-200 dark:border-blue-800/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors w-full text-left flex items-center justify-between">
                    <span><i class="fa-solid fa-key mr-2"></i> คลิกดูเฉลย</span>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div class="hidden mt-2 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800/30 text-gray-700 dark:text-gray-300 text-sm overflow-x-auto">
                    ${parseMD(q.answer)}
                    ${q.whatIf ? `
                        <div class="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800/50">
                            <h5 class="font-bold text-indigo-600 dark:text-indigo-400 mb-2"><i class="fa-solid fa-brain mr-1"></i> What-If (ลองคิดต่อ...)</h5>
                            ${parseMD(q.whatIf)}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    container.innerHTML = html;

    // Apply Highlight.js
    if (window.hljs) {
        container.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }

    // Adjust markdown specific global styles slightly for inner elements
    container.querySelectorAll('p').forEach(p => p.classList.add('mb-2'));
    container.querySelectorAll('ul').forEach(ul => ul.classList.add('list-disc', 'pl-5', 'mb-2'));
    container.querySelectorAll('ol').forEach(ol => ol.classList.add('list-decimal', 'pl-5', 'mb-2'));
    container.querySelectorAll('strong').forEach(s => s.classList.add('font-bold', 'text-gray-900', 'dark:text-white'));
    container.querySelectorAll('code:not([class*="language-"])').forEach(c => c.classList.add('bg-gray-100', 'dark:bg-gray-700', 'px-1', 'rounded', 'text-blue-600', 'dark:text-blue-400', 'text-[0.9em]'));

    // Update buttons
    document.getElementById('crPrevBtn').disabled = (crCurrentQuestionIndex === 0);
    document.getElementById('crNextBtn').disabled = (crCurrentQuestionIndex === level.questions.length - 1);
    
    // Save progress
    crSaveProgress();
}

function crSaveProgress() {
    localStorage.setItem('myfee_cr_progress', JSON.stringify({
        mode: crCurrentMode,
        levelIndex: crCurrentLevelIndex,
        questionIndex: crCurrentQuestionIndex
    }));
}

// ==========================================
// Cheat Sheet System
// ==========================================

const cheatSheetData = {
    'HTML': [
        { term: '&lt;header&gt;, &lt;main&gt;, &lt;footer&gt;', desc: 'แท็กแบ่งโครงสร้างสัดส่วนหลักๆ ของหน้าเว็บ (หัว, กลาง, ท้าย)' },
        { term: '&lt;nav&gt;', desc: 'ใช้ห่อลิงก์ที่เป็นเมนูนำทาง (Navigation)' },
        { term: 'type="email", type="password"', desc: 'ช่วยเช็ครูปแบบอีเมลให้ และซ่อนรหัสผ่านเป็นจุดๆ ตอนพิมพ์' },
        { term: 'required', desc: 'บังคับให้ต้องกรอกฟิลด์นี้ก่อนถึงจะกดยืนยัน (Submit) ฟอร์มได้' }
    ],
    'CSS': [
        { term: 'display: grid', desc: 'จัดเรียงเนื้อหาเป็นตาราง (แถวและคอลัมน์)' },
        { term: 'display: flex', desc: 'จัดเรียงเนื้อหาเป็นแนวยาว 1 มิติ (ซ้ายไปขวา หรือบนลงล่าง)' },
        { term: 'gap', desc: 'กำหนดระยะห่างระหว่างลูกๆ ภายใน Grid หรือ Flex' },
        { term: 'transition', desc: 'ทำให้การเปลี่ยนสไตล์ (เช่น ตอนเอาเมาส์ชี้) ค่อยๆ เปลี่ยนแบบสมูท ไม่กระตุก' },
        { term: '@media', desc: 'ใช้สำหรับทำ Responsive รองรับขนาดหน้าจอที่เปลี่ยนไป (เช่น มือถือ)' }
    ],
    'JS': [
        { term: '.map()', desc: 'เอาของใน Array มาแปรรูปทีละชิ้น แล้วได้ Array ใหม่ที่มีขนาดเท่าเดิม' },
        { term: '.filter()', desc: 'คัดกรองเฉพาะตัวที่ตรงเงื่อนไข แล้วเก็บไว้ใน Array ใหม่' },
        { term: '.reduce()', desc: 'เอาของใน Array มายุบรวมกันให้เหลือค่าเดียว (เช่น หาผลรวม)' },
        { term: '.find()', desc: 'หาตัวแรกที่ตรงตามเงื่อนไข (คืนค่าเป็นตัวนั้นเลย ไม่ใช่ Array)' },
        { term: 'localStorage', desc: 'ฐานข้อมูลเล็กๆ ที่ฝังอยู่ในเบราว์เซอร์ เก็บข้อมูลไว้ได้แม้ปิดเว็บไปแล้ว' }
    ],
    'React': [
        { term: 'useState', desc: 'กล่องเก็บข้อมูลของ Component ถ้าข้อมูลเปลี่ยน หน้าจอจะอัปเดตตามทันที' },
        { term: 'useEffect', desc: 'ใช้สำหรับสั่งให้ทำงานตอนที่ Component เพิ่งโชว์ขึ้นมา (เช่น ดึง API) หรือตอนตัวแปรเปลี่ยน' },
        { term: 'key={...}', desc: 'ป้ายชื่อที่ต้องแปะตอนใช้ .map() ให้ React รู้ว่าใครเป็นใคร จะได้ไม่เรียงลำดับผิด' },
        { term: 'props', desc: 'ข้อมูลที่พ่อ (Parent) ส่งต่อลงไปให้ลูก (Child) ใช้งาน' }
    ],
    'SQL': [
        { term: 'SELECT ... FROM', desc: 'เลือกคอลัมน์อะไร จากตารางไหน' },
        { term: 'WHERE', desc: 'กรองข้อมูลตามเงื่อนไข (ก่อนจะจับกลุ่ม)' },
        { term: 'GROUP BY', desc: 'จับกลุ่มแถวที่มีค่าเหมือนกัน (มักใช้คู่กับ SUM, COUNT)' },
        { term: 'HAVING', desc: 'กรองข้อมูล "หลังจาก" ที่จับกลุ่มเสร็จแล้ว' },
        { term: 'JOIN', desc: 'เอาข้อมูลจาก 2 ตารางมาต่อกันโดยใช้กาว (ID ที่เชื่อมกัน)' },
        { term: 'LEFT JOIN', desc: 'เอาตารางซ้ายมาทั้งหมด ถึงแม้ตารางขวาจะไม่มีข้อมูลจับคู่ก็ตาม (จะเป็น NULL)' }
    ]
};

function crToggleCheatSheet() {
    const sidebar = document.getElementById('crCheatSheetSidebar');
    const overlay = document.getElementById('crCheatSheetOverlay');
    
    if (sidebar.classList.contains('translate-x-full')) {
        // Open
        overlay.classList.remove('hidden');
        // small delay for transition
        setTimeout(() => {
            overlay.classList.remove('opacity-0');
            sidebar.classList.remove('translate-x-full');
        }, 10);
        crRenderCheatSheet('HTML');
    } else {
        // Close
        overlay.classList.add('opacity-0');
        sidebar.classList.add('translate-x-full');
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 300);
    }
}

function crRenderCheatSheet(category) {
    const content = document.getElementById('crCheatSheetContent');
    const items = cheatSheetData[category] || [];
    
    let html = '';
    items.forEach(function(item) {
        html += '<div class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-100 dark:border-gray-600">' +
            '<div class="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">' + item.term + '</div>' +
            '<div class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">' + item.desc + '</div>' +
            '</div>';
    });
    
    content.innerHTML = html;
}
