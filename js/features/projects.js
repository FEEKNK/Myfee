// FILE: js/features/projects.js
// --- Personal Projects & Roadmap ---

function saveProjectsData() {
    localStorage.setItem('projectsData', JSON.stringify(state.projects));
    renderProjects();
}

function addProject(name, category, targetDate) {
    if (!name || !name.trim()) return;
    const project = {
        id: Date.now(),
        name: name.trim(),
        category: category || 'ทั่วไป',
        status: 'in_progress', // in_progress, future, completed
        targetDate: targetDate || '',
        subtasks: []
    };
    state.projects.unshift(project);
    saveProjectsData();
}

function deleteProject(id) {
    state.projects = state.projects.filter(p => p.id !== id);
    saveProjectsData();
}

function changeProjectStatus(id, newStatus) {
    const p = state.projects.find(x => x.id === id);
    if (p) {
        p.status = newStatus;
        saveProjectsData();
    }
}

function addSubtask(projectId, text) {
    if (!text || !text.trim()) return;
    const p = state.projects.find(x => x.id === projectId);
    if (p) {
        p.subtasks.push({ id: Date.now(), text: text.trim(), completed: false });
        saveProjectsData();
        renderProjectDetail(projectId); // re-render detail view
    }
}

function toggleSubtask(projectId, subtaskId) {
    const p = state.projects.find(x => x.id === projectId);
    if (p) {
        const st = p.subtasks.find(x => x.id === subtaskId);
        if (st) {
            st.completed = !st.completed;
            
            // Auto check project status if all subtasks are complete?
            // Optional: let user manually change project status.
            
            saveProjectsData();
            renderProjectDetail(projectId);
        }
    }
}

function deleteSubtask(projectId, subtaskId) {
    const p = state.projects.find(x => x.id === projectId);
    if (p) {
        p.subtasks = p.subtasks.filter(x => x.id !== subtaskId);
        saveProjectsData();
        renderProjectDetail(projectId);
    }
}

function renderProjects() {
    const container = document.getElementById('view-projects');
    if (!container) return;

    let html = `
        <header class="bg-white dark:bg-gray-800 shadow-sm p-4 z-20 sticky top-0 transition-colors duration-300">
            <div class="max-w-md mx-auto flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <button onclick="switchTab('home')" class="p-2 text-gray-400 hover:text-indigo-600 transition-colors" title="Back to Home">
                        <i class="fa-solid fa-arrow-left text-xl"></i>
                    </button>
                    <h1 class="text-xl font-bold text-gray-800 dark:text-white font-thai">โปรเจกต์ (Projects)</h1>
                </div>
            </div>
        </header>
        <main class="max-w-md mx-auto w-full p-4 space-y-4">
            <!-- Add Form -->
            <form onsubmit="event.preventDefault(); addProject(document.getElementById('projName').value, document.getElementById('projCat').value, document.getElementById('projDate').value); document.getElementById('projName').value='';" class="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-3">
                <h3 class="font-bold text-sm text-gray-700 dark:text-gray-300 font-thai">สร้างโปรเจกต์ใหม่</h3>
                <input type="text" id="projName" placeholder="ชื่อโปรเจกต์..." required class="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl text-sm font-thai focus:outline-none">
                <div class="flex gap-2">
                    <select id="projCat" class="w-1/2 px-3 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl text-sm font-thai focus:outline-none">
                        <option value="IT/Tech">💻 IT/Tech</option>
                        <option value="การงาน">🏢 การงาน</option>
                        <option value="สุขภาพ">💪 สุขภาพ</option>
                        <option value="การเงิน">💰 การเงิน</option>
                        <option value="ท่องเที่ยว">✈️ ท่องเที่ยว</option>
                        <option value="พัฒนาตนเอง">📚 พัฒนาตนเอง</option>
                    </select>
                    <input type="date" id="projDate" class="w-1/2 px-3 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl text-sm font-thai focus:outline-none text-gray-400">
                </div>
                <button type="submit" class="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl shadow-md transition-all font-thai text-sm">
                    + เพิ่มโปรเจกต์
                </button>
            </form>

            <!-- List -->
            <div class="space-y-3">
    `;

    if (state.projects.length === 0) {
        html += `
            <div class="text-center py-8 text-gray-400 dark:text-gray-500 font-thai">
                <i class="fa-solid fa-folder-tree text-4xl mb-2"></i>
                <p>ยังไม่มีโปรเจกต์ เริ่มสร้างเลย!</p>
            </div>
        `;
    } else {
        const statusMap = {
            'in_progress': { icon: '🟡', label: 'กำลังทำ', bg: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400' },
            'future': { icon: '🔵', label: 'อนาคต', bg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' },
            'completed': { icon: '🟢', label: 'เสร็จสิ้น', bg: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' }
        };

        state.projects.forEach(p => {
            const totalSub = p.subtasks.length;
            const completedSub = p.subtasks.filter(s => s.completed).length;
            const progress = totalSub === 0 ? 0 : Math.round((completedSub / totalSub) * 100);
            const st = statusMap[p.status];
            
            const dateStr = p.targetDate ? new Date(p.targetDate).toLocaleDateString('th-TH', {day:'numeric', month:'short', year:'2-digit'}) : 'ไม่ระบุ';

            html += `
                <div class="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow" onclick="renderProjectDetail(${p.id})">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <div class="font-bold text-gray-800 dark:text-gray-200 font-thai text-sm">${p.name}</div>
                            <div class="text-xs text-gray-500 font-thai mt-0.5">${p.category} • เป้าหมาย: ${dateStr}</div>
                        </div>
                        <span class="text-[10px] font-bold px-2 py-1 rounded-full ${st.bg} font-thai shrink-0">${st.icon} ${st.label}</span>
                    </div>
                    <div class="flex justify-between items-center text-xs font-thai font-bold mt-3 mb-1">
                        <span class="text-gray-500 dark:text-gray-400">ความคืบหน้า</span>
                        <span class="text-indigo-600 dark:text-indigo-400">${progress}% (${completedSub}/${totalSub})</span>
                    </div>
                    <div class="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div class="h-full bg-indigo-500 rounded-full" style="width: ${progress}%"></div>
                    </div>
                </div>
            `;
        });
    }

    html += `</main>`;
    container.innerHTML = html;
}

function renderProjectDetail(id) {
    const p = state.projects.find(x => x.id === id);
    if (!p) return renderProjects();

    const container = document.getElementById('view-projects');
    if (!container) return;

    const totalSub = p.subtasks.length;
    const completedSub = p.subtasks.filter(s => s.completed).length;
    const progress = totalSub === 0 ? 0 : Math.round((completedSub / totalSub) * 100);

    let html = `
        <header class="bg-white dark:bg-gray-800 shadow-sm p-4 z-20 sticky top-0 transition-colors duration-300">
            <div class="max-w-md mx-auto flex items-center justify-between">
                <div class="flex items-center gap-2 flex-1 min-w-0">
                    <button onclick="renderProjects()" class="p-2 text-gray-400 hover:text-indigo-600 transition-colors shrink-0" title="Back">
                        <i class="fa-solid fa-arrow-left text-xl"></i>
                    </button>
                    <h1 class="text-base font-bold text-gray-800 dark:text-white font-thai truncate flex-1 min-w-0">${p.name}</h1>
                </div>
                <button onclick="if(confirm('ยืนยันการลบโปรเจกต์นี้?')) { deleteProject(${p.id}); renderProjects(); }" class="text-red-500 p-2">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </header>
        <main class="max-w-md mx-auto w-full p-4 space-y-4">
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-sm font-bold text-gray-600 dark:text-gray-300 font-thai">สถานะโปรเจกต์:</span>
                    <select onchange="changeProjectStatus(${p.id}, this.value)" class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg text-xs font-thai focus:outline-none">
                        <option value="in_progress" ${p.status === 'in_progress' ? 'selected' : ''}>🟡 กำลังทำ</option>
                        <option value="future" ${p.status === 'future' ? 'selected' : ''}>🔵 อนาคต/แผนงาน</option>
                        <option value="completed" ${p.status === 'completed' ? 'selected' : ''}>🟢 เสร็จสิ้นแล้ว</option>
                    </select>
                </div>
                <div class="flex justify-between items-center text-xs font-thai font-bold mb-1">
                    <span class="text-gray-500 dark:text-gray-400">ภาพรวมความคืบหน้า</span>
                    <span class="text-indigo-600 dark:text-indigo-400">${progress}%</span>
                </div>
                <div class="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-indigo-500 rounded-full transition-all duration-500" style="width: ${progress}%"></div>
                </div>
            </div>

            <div class="space-y-2">
                <h3 class="font-bold text-xs uppercase tracking-wider text-gray-400 font-thai">รายการงานย่อย (Sub-tasks)</h3>
                <form onsubmit="event.preventDefault(); addSubtask(${p.id}, document.getElementById('subtaskInput').value); document.getElementById('subtaskInput').value='';" class="flex gap-2">
                    <input type="text" id="subtaskInput" placeholder="เพิ่มงานย่อย..." required class="flex-1 px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-thai focus:outline-none">
                    <button type="submit" class="px-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl shadow-sm"><i class="fa-solid fa-plus"></i></button>
                </form>
            </div>
            
            <div class="space-y-2 pb-6">
    `;

    if (p.subtasks.length === 0) {
        html += `<div class="text-center py-4 text-xs text-gray-400 font-thai">ยังไม่มีงานย่อย</div>`;
    } else {
        p.subtasks.forEach(st => {
            html += `
                <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                    <div class="flex items-center gap-3 flex-1 cursor-pointer" onclick="toggleSubtask(${p.id}, ${st.id})">
                        <i class="${st.completed ? 'fa-solid fa-circle-check text-green-500' : 'fa-regular fa-circle text-gray-300 dark:text-gray-600'} text-xl"></i>
                        <span class="font-thai text-sm ${st.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-200'}">${st.text}</span>
                    </div>
                    <button onclick="deleteSubtask(${p.id}, ${st.id})" class="text-gray-300 hover:text-red-500 p-1 shrink-0"><i class="fa-solid fa-trash-can text-sm"></i></button>
                </div>
            `;
        });
    }

    html += `</div></main>`;
    container.innerHTML = html;
}

window.renderProjects = renderProjects;
window.addProject = addProject;
window.deleteProject = deleteProject;
window.changeProjectStatus = changeProjectStatus;
window.addSubtask = addSubtask;
window.toggleSubtask = toggleSubtask;
window.deleteSubtask = deleteSubtask;
window.renderProjectDetail = renderProjectDetail;
