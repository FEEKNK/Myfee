// FILE: js/features/notes.js
// --- Quick Notes & Daily Mood Journal ---

function saveNotesData() {
    localStorage.setItem('notesData', JSON.stringify(state.notes));
    renderNotes();
}

function addNote(content, mood, isPinned) {
    if (!content || !content.trim()) return;
    const note = {
        id: Date.now(),
        content: content.trim(),
        mood: mood || 'neutral', // happy, neutral, sad, angry
        date: new Date().toISOString(),
        isPinned: !!isPinned
    };
    state.notes.unshift(note);
    saveNotesData();
}

function deleteNote(id) {
    state.notes = state.notes.filter(n => n.id !== id);
    saveNotesData();
}

function togglePinNote(id) {
    const note = state.notes.find(n => n.id === id);
    if (note) {
        note.isPinned = !note.isPinned;
        saveNotesData();
    }
}

function renderNotes() {
    const container = document.getElementById('view-notes');
    if (!container) return;

    // Filter by search? Optional.
    const sortedNotes = [...state.notes].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.date) - new Date(a.date);
    });

    const moodIcons = {
        'happy': '😊',
        'neutral': '😐',
        'sad': '😢',
        'angry': '😡'
    };

    let html = `
        <header class="bg-white dark:bg-gray-800 shadow-sm p-4 z-20 sticky top-0 transition-colors duration-300">
            <div class="max-w-md mx-auto flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <button onclick="switchTab('home')" class="p-2 text-gray-400 hover:text-yellow-500 transition-colors" title="Back to Home">
                        <i class="fa-solid fa-arrow-left text-xl"></i>
                    </button>
                    <h1 class="text-xl font-bold text-gray-800 dark:text-white font-thai">โน้ตด่วน & ไดอารี่</h1>
                </div>
            </div>
        </header>
        <main class="max-w-md mx-auto w-full p-4 space-y-4">
            
            <!-- Add Note Form -->
            <form onsubmit="event.preventDefault(); addNote(document.getElementById('noteContent').value, document.getElementById('noteMood').value, document.getElementById('notePin').checked); document.getElementById('noteContent').value='';" class="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-3">
                <textarea id="noteContent" rows="3" placeholder="เขียนบันทึก, ไอเดีย, หรือความรู้สึกวันนี้..." required class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl text-sm font-thai focus:outline-none resize-none"></textarea>
                <div class="flex justify-between items-center">
                    <select id="noteMood" class="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg text-sm font-thai focus:outline-none">
                        <option value="happy">😊 อารมณ์ดี</option>
                        <option value="neutral" selected>😐 ปกติ</option>
                        <option value="sad">😢 เศร้า/เหนื่อย</option>
                        <option value="angry">😡 หงุดหงิด</option>
                    </select>
                    <label class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 font-thai cursor-pointer">
                        <input type="checkbox" id="notePin" class="w-4 h-4 text-yellow-500 rounded border-gray-300">
                        ปักหมุด 📌
                    </label>
                </div>
                <button type="submit" class="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl shadow-md transition-all font-thai text-sm">
                    + บันทึก
                </button>
            </form>

            <!-- List -->
            <div class="space-y-3 pb-6">
    `;

    if (sortedNotes.length === 0) {
        html += `
            <div class="text-center py-8 text-gray-400 dark:text-gray-500 font-thai">
                <i class="fa-solid fa-note-sticky text-4xl mb-2"></i>
                <p>ยังไม่มีบันทึกเลย เขียนอะไรสักหน่อยสิ!</p>
            </div>
        `;
    } else {
        sortedNotes.forEach(n => {
            const dateStr = new Date(n.date).toLocaleString('th-TH', {day:'numeric', month:'short', year:'2-digit', hour:'2-digit', minute:'2-digit'});
            
            html += `
                <div class="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border ${n.isPinned ? 'border-yellow-300 dark:border-yellow-600' : 'border-gray-100 dark:border-gray-700'}">
                    <div class="flex justify-between items-start mb-2 gap-2">
                        <div class="text-xs text-gray-400 font-thai">${dateStr}</div>
                        <div class="flex items-center gap-2 shrink-0">
                            <button onclick="togglePinNote(${n.id})" class="${n.isPinned ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'} transition-colors"><i class="fa-solid fa-thumbtack text-sm"></i></button>
                            <button onclick="deleteNote(${n.id})" class="text-gray-300 hover:text-red-500 transition-colors"><i class="fa-solid fa-trash-can text-sm"></i></button>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="text-2xl">${moodIcons[n.mood] || '😐'}</div>
                        <div class="font-thai text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap flex-1 leading-relaxed">${n.content}</div>
                    </div>
                </div>
            `;
        });
    }

    html += `</div></main>`;
    container.innerHTML = html;
}

window.renderNotes = renderNotes;
window.addNote = addNote;
window.deleteNote = deleteNote;
window.togglePinNote = togglePinNote;
