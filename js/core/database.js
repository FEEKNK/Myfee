// FILE: js/features/database.js
// --- Local Database Backup & Restore System (Offline 100%) ---

function exportDatabase() {
    try {
        const backupData = {
            version: '1.0',
            exportedAt: new Date().toISOString(),
            app: 'MY FEE',
            data: {
                learnedCards: JSON.parse(localStorage.getItem('learnedCards')) || [],
                favCards: JSON.parse(localStorage.getItem('favCards')) || [],
                appSettings: JSON.parse(localStorage.getItem('appSettings')) || {},
                streakData: JSON.parse(localStorage.getItem('streakData')) || {},
                todoData: JSON.parse(localStorage.getItem('todoData')) || [],
                financeData: JSON.parse(localStorage.getItem('financeData')) || [],
                waterData: JSON.parse(localStorage.getItem('waterData')) || {},
                habitData: JSON.parse(localStorage.getItem('habitData')) || [],
                customCards: JSON.parse(localStorage.getItem('customCards')) || [],
                reviewCards: JSON.parse(localStorage.getItem('reviewCards')) || [],
                projectsData: JSON.parse(localStorage.getItem('projectsData')) || [],
                notesData: JSON.parse(localStorage.getItem('notesData')) || [],
                countdownData: JSON.parse(localStorage.getItem('countdownData')) || [],
                goalsData: JSON.parse(localStorage.getItem('goalsData')) || []
            }
        };

        state.settings.lastBackupDate = backupData.exportedAt;
        localStorage.setItem('appSettings', JSON.stringify(state.settings));
        if(typeof renderDatabaseStats === 'function') renderDatabaseStats();

        const jsonString = JSON.stringify(backupData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const todayStr = new Date().toISOString().split('T')[0];
        const fileName = `MYFEE_Backup_${todayStr}.json`;

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert(`✅ สำรองข้อมูลเรียบร้อยแล้ว!\nไฟล์สำรอง: ${fileName}`);
    } catch (err) {
        console.error('Export Error:', err);
        alert('❌ เกิดข้อผิดพลาดในการส่งออกข้อมูล: ' + err.message);
    }
}

function importDatabase(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);

            if (!imported || !imported.data) {
                throw new Error('รูปแบบไฟล์สำรองไม่ถูกต้อง (Invalid Backup Format)');
            }

            const data = imported.data;

            if (confirm(`⚠️ ยืนยันการนำเข้าข้อมูลของไฟล์ที่บันทึกเมื่อ: ${imported.exportedAt ? new Date(imported.exportedAt).toLocaleString('th-TH') : 'ไม่ระบุ'}?\n\nข้อมูลปัจจุบันในเครื่องจะถูกแทนที่ด้วยข้อมูลจากไฟล์สำรองนี้`)) {
                
                if (data.learnedCards) localStorage.setItem('learnedCards', JSON.stringify(data.learnedCards));
                if (data.favCards) localStorage.setItem('favCards', JSON.stringify(data.favCards));
                if (data.appSettings) localStorage.setItem('appSettings', JSON.stringify(data.appSettings));
                if (data.streakData) localStorage.setItem('streakData', JSON.stringify(data.streakData));
                if (data.todoData) localStorage.setItem('todoData', JSON.stringify(data.todoData));
                if (data.financeData) localStorage.setItem('financeData', JSON.stringify(data.financeData));
                if (data.waterData) localStorage.setItem('waterData', JSON.stringify(data.waterData));
                if (data.habitData) localStorage.setItem('habitData', JSON.stringify(data.habitData));
                if (data.projectsData) localStorage.setItem('projectsData', JSON.stringify(data.projectsData));
                if (data.notesData) localStorage.setItem('notesData', JSON.stringify(data.notesData));
                if (data.countdownData) localStorage.setItem('countdownData', JSON.stringify(data.countdownData));
                if (data.goalsData) localStorage.setItem('goalsData', JSON.stringify(data.goalsData));

                // Update state memory
                state.learned = JSON.parse(localStorage.getItem('learnedCards')) || [];
                state.favorites = JSON.parse(localStorage.getItem('favCards')) || [];
                state.settings = JSON.parse(localStorage.getItem('appSettings')) || { darkMode: false, autoPlay: false };
                state.streak = JSON.parse(localStorage.getItem('streakData')) || { count: 0, lastDate: null, cardsFlippedToday: 0 };
                state.todos = JSON.parse(localStorage.getItem('todoData')) || [];
                state.finance = JSON.parse(localStorage.getItem('financeData')) || [];
                state.water = JSON.parse(localStorage.getItem('waterData')) || { goal: 2000, current: 0, lastDate: new Date().toLocaleDateString() };
                state.habits = JSON.parse(localStorage.getItem('habitData')) || [];
                state.projects = JSON.parse(localStorage.getItem('projectsData')) || [];
                state.notes = JSON.parse(localStorage.getItem('notesData')) || [];
                state.countdown = JSON.parse(localStorage.getItem('countdownData')) || [];
                state.goals = JSON.parse(localStorage.getItem('goalsData')) || [];

                // Refresh UI
                if (typeof applySettings === 'function') applySettings();
                if (typeof renderTodos === 'function') renderTodos();
                if (typeof renderFinance === 'function') renderFinance();
                if (typeof renderWater === 'function') renderWater();
                if (typeof renderHabits === 'function') renderHabits();
                if (typeof renderProjects === 'function') renderProjects();
                if (typeof renderNotes === 'function') renderNotes();
                if (typeof renderCountdown === 'function') renderCountdown();
                if (typeof renderGoals === 'function') renderGoals();
                if (typeof updateDashboard === 'function') updateDashboard();
                if (typeof renderDatabaseStats === 'function') renderDatabaseStats();

                alert('🎉 คืนค่าฐานข้อมูลเรียบร้อยแล้ว!');
            }
        } catch (err) {
            console.error('Import Error:', err);
            alert('❌ ไม่สามารถนำเข้าข้อมูลได้: ' + err.message);
        }
    };
    reader.readAsText(file);
}

function clearAllDatabase() {
    if (confirm('⚠️ เตือนภัย! คุณต้องการลบฐานข้อมูลทั้งหมดในเครื่องใช่หรือไม่?\n\nข้อมูลแอปทั้งหมดของคุณจะถูกลบทิ้งอย่างถาวร!')) {
        const doubleCheck = prompt('กรุณาพิมพ์ "DELETE" เพื่อยืนยันการลบฐานข้อมูลทิ้ง');
        if (doubleCheck === 'DELETE') {
            localStorage.clear();
            location.reload();
        }
    }
}

function renderDatabaseStats() {
    const statsContainer = document.getElementById('dbStatsContainer');
    if (!statsContainer) return;

    let totalBytes = 0;
    const keys = ['learnedCards', 'favCards', 'appSettings', 'streakData', 'todoData', 'financeData', 'waterData', 'habitData', 'projectsData', 'notesData', 'countdownData', 'goalsData'];
    
    keys.forEach(key => {
        const item = localStorage.getItem(key);
        if (item) totalBytes += item.length * 2; // ~2 bytes per character
    });

    const totalKB = (totalBytes / 1024).toFixed(2);

    const flashcardsCount = (JSON.parse(localStorage.getItem('learnedCards')) || []).length;
    const todosCount = (JSON.parse(localStorage.getItem('todoData')) || []).length;
    const financeCount = (JSON.parse(localStorage.getItem('financeData')) || []).length;
    const habitsCount = (JSON.parse(localStorage.getItem('habitData')) || []).length;

    let backupWarning = '';
    const lastBackup = state.settings.lastBackupDate;
    if (lastBackup) {
        const daysSinceBackup = Math.floor((new Date() - new Date(lastBackup)) / (1000 * 60 * 60 * 24));
        if (daysSinceBackup >= 14) {
            backupWarning = `<div class="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-xl mb-3 text-xs font-bold font-thai border border-red-200 dark:border-red-800 flex items-center gap-2"><i class="fa-solid fa-triangle-exclamation text-lg"></i> ไม่ได้สำรองข้อมูลมา ${daysSinceBackup} วันแล้ว! แนะนำให้กดสำรองข้อมูลด่วน</div>`;
        } else {
            backupWarning = `<div class="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-xl mb-3 text-xs font-bold font-thai border border-green-200 dark:border-green-800 flex items-center gap-2"><i class="fa-solid fa-check-circle text-lg"></i> สำรองข้อมูลล่าสุดเมื่อ: ${new Date(lastBackup).toLocaleDateString('th-TH')}</div>`;
        }
    } else {
        backupWarning = `<div class="bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 p-3 rounded-xl mb-3 text-xs font-bold font-thai border border-orange-200 dark:border-orange-800 flex items-center gap-2"><i class="fa-solid fa-circle-exclamation text-lg"></i> ยังไม่เคยสำรองข้อมูลเลย! กรุณาสำรองข้อมูลเพื่อป้องกันข้อมูลสูญหาย</div>`;
    }

    statsContainer.innerHTML = `
        ${backupWarning}
        <div class="grid grid-cols-2 gap-3 text-center font-thai">
            <div class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                <span class="text-[10px] text-gray-400 font-bold uppercase">ขนาดฐานข้อมูล</span>
                <p class="text-xl font-black text-blue-600 dark:text-blue-400 mt-0.5">${totalKB} KB</p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                <span class="text-[10px] text-gray-400 font-bold uppercase">คำศัพท์ที่เรียนแล้ว</span>
                <p class="text-xl font-black text-green-600 dark:text-green-400 mt-0.5">${flashcardsCount} คำ</p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                <span class="text-[10px] text-gray-400 font-bold uppercase">รายการ To-Do</span>
                <p class="text-xl font-black text-purple-600 dark:text-purple-400 mt-0.5">${todosCount} งาน</p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                <span class="text-[10px] text-gray-400 font-bold uppercase">รายการการเงิน</span>
                <p class="text-xl font-black text-rose-600 dark:text-rose-400 mt-0.5">${financeCount} รายการ</p>
            </div>
        </div>
    `;
}

window.exportDatabase = exportDatabase;
window.importDatabase = importDatabase;
window.clearAllDatabase = clearAllDatabase;
window.renderDatabaseStats = renderDatabaseStats;
