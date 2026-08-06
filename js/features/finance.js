// FILE: js/features/finance.js
// --- Finance & Expense Tracker (Monthly & Yearly Analytics) ---

if (window.currentFinYear === undefined) window.currentFinYear = new Date().getFullYear();
if (window.currentFinMonth === undefined) window.currentFinMonth = new Date().getMonth();
if (window.currentFinPeriod === undefined) window.currentFinPeriod = 'month'; // 'month', 'year', 'all'

const THAI_MONTHS = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

function saveFinanceData() {
    localStorage.setItem('financeData', JSON.stringify(state.finance));
    renderFinance();
    if (typeof updateDashboard === 'function') updateDashboard();
}

function addTransaction(type, category, amount, note, dateStr) {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
        alert('กรุณากรอกจำนวนเงินให้ถูกต้อง');
        return;
    }

    let finalDate = new Date().toISOString();
    if (dateStr) {
        // ใช้เวลาปัจจุบันผสมกับวันที่ที่ผู้ใช้เลือก เพื่อให้เรียงลำดับเวลาได้ถูกต้อง
        const d = new Date(dateStr);
        const now = new Date();
        d.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
        finalDate = d.toISOString();
    }

    const transaction = {
        id: Date.now(),
        type: type,
        category: category || 'ทั่วไป',
        amount: numAmount,
        note: note || '',
        date: finalDate
    };

    state.finance.unshift(transaction);
    
    // เรียงลำดับรายการตามวันที่จากล่าสุดไปเก่าสุด
    state.finance.sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date(0);
        const dateB = b.date ? new Date(b.date) : new Date(0);
        return dateB - dateA;
    });

    saveFinanceData();
}

function deleteTransaction(id) {
    state.finance = state.finance.filter(item => item.id !== id);
    saveFinanceData();
}

function changeFinPeriod(period) {
    window.currentFinPeriod = period;
    renderFinance();
}

function prevFinPeriod() {
    if (window.currentFinPeriod === 'month') {
        window.currentFinMonth--;
        if (window.currentFinMonth < 0) {
            window.currentFinMonth = 11;
            window.currentFinYear--;
        }
    } else if (window.currentFinPeriod === 'year') {
        window.currentFinYear--;
    }
    renderFinance();
}

function nextFinPeriod() {
    if (window.currentFinPeriod === 'month') {
        window.currentFinMonth++;
        if (window.currentFinMonth > 11) {
            window.currentFinMonth = 0;
            window.currentFinYear++;
        }
    } else if (window.currentFinPeriod === 'year') {
        window.currentFinYear++;
    }
    renderFinance();
}

function renderFinance() {
    const listEl = document.getElementById('financeList');
    const incomeEl = document.getElementById('totalIncome');
    const expenseEl = document.getElementById('totalExpense');
    const balanceEl = document.getElementById('netBalance');
    const periodLabelEl = document.getElementById('finPeriodLabel');
    const categoryBreakdownEl = document.getElementById('finCategoryBreakdown');

    const period = window.currentFinPeriod || 'month';
    const year = window.currentFinYear;
    const month = window.currentFinMonth;

    const searchEl = document.getElementById('finSearchInput');
    const filterCatEl = document.getElementById('finFilterCat');
    
    const searchTerm = searchEl ? searchEl.value.toLowerCase() : '';
    const filterCat = filterCatEl ? filterCatEl.value : 'All';

    // Filter items based on selected period, search, and category
    let filteredItems = state.finance.filter(item => {
        if (!item.date) return true;
        const d = new Date(item.date);
        
        // Period filter
        if (period === 'month' && (d.getFullYear() !== year || d.getMonth() !== month)) return false;
        if (period === 'year' && d.getFullYear() !== year) return false;
        
        // Category filter
        if (filterCat !== 'All' && item.category !== filterCat) return false;
        
        // Search filter
        if (searchTerm) {
            const textMatch = `${item.category} ${item.note}`.toLowerCase();
            if (!textMatch.includes(searchTerm)) return false;
        }
        
        return true;
    });

    // Label text
    let periodText = '';
    if (period === 'month') {
        periodText = `${THAI_MONTHS[month]} ${year + 543}`;
    } else if (period === 'year') {
        periodText = `ปี ${year + 543}`;
    } else {
        periodText = 'ทั้งหมดทุกช่วงเวลา';
    }
    if (periodLabelEl) periodLabelEl.textContent = periodText;

    // Calculate income & expense totals
    let totalIncome = 0;
    let totalExpense = 0;
    const catExpenseMap = {};

    filteredItems.forEach(item => {
        if (item.type === 'income') {
            totalIncome += item.amount;
        } else {
            totalExpense += item.amount;
            const cat = item.category || 'อื่นๆ';
            catExpenseMap[cat] = (catExpenseMap[cat] || 0) + item.amount;
        }
    });

    const netBalance = totalIncome - totalExpense;

    if (incomeEl) incomeEl.textContent = `+฿${totalIncome.toLocaleString()}`;
    if (expenseEl) expenseEl.textContent = `-฿${totalExpense.toLocaleString()}`;
    if (balanceEl) balanceEl.textContent = `฿${netBalance.toLocaleString()}`;

    // Render Category Breakdown
    if (categoryBreakdownEl) {
        const catEntries = Object.entries(catExpenseMap).sort((a, b) => b[1] - a[1]);
        if (catEntries.length === 0) {
            categoryBreakdownEl.innerHTML = `<p class="text-center text-xs text-gray-400 font-thai py-2">ไม่มีข้อมูลรายจ่ายใน${periodText}</p>`;
        } else {
            categoryBreakdownEl.innerHTML = catEntries.map(([cat, amt]) => {
                const pct = totalExpense > 0 ? Math.round((amt / totalExpense) * 100) : 0;
                return `
                    <div class="space-y-1">
                        <div class="flex justify-between items-center text-xs font-thai">
                            <span class="font-bold text-gray-700 dark:text-gray-300">${cat}</span>
                            <span class="font-bold text-rose-500">฿${amt.toLocaleString()} (${pct}%)</span>
                        </div>
                        <div class="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div class="h-full bg-rose-500 rounded-full" style="width: ${pct}%"></div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    // Render Transaction List
    if (!listEl) return;

    if (filteredItems.length === 0) {
        listEl.innerHTML = `
            <div class="text-center py-8 text-gray-400 dark:text-gray-500 font-thai">
                <i class="fa-solid fa-receipt text-4xl mb-2"></i>
                <p>ยังไม่มีรายการบันทึกใน${periodText}</p>
            </div>
        `;
        return;
    }

    listEl.innerHTML = filteredItems.map(item => {
        const isIncome = item.type === 'income';
        const dateStr = new Date(item.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
        return `
            <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center ${isIncome ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400'}">
                        <i class="fa-solid ${isIncome ? 'fa-arrow-down-left' : 'fa-arrow-up-right'}"></i>
                    </div>
                    <div>
                        <div class="font-bold text-gray-800 dark:text-gray-200 font-thai text-sm">${item.category}</div>
                        <div class="text-xs text-gray-400 font-thai">${item.note ? item.note + ' • ' : ''}${dateStr}</div>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <span class="font-bold ${isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}">
                        ${isIncome ? '+' : '-'}฿${item.amount.toLocaleString()}
                    </span>
                    <button onclick="deleteTransaction(${item.id})" class="text-gray-300 hover:text-red-500 transition-colors p-1">
                        <i class="fa-solid fa-trash-can text-sm"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function exportFinanceCSV() {
    if (state.finance.length === 0) {
        alert("ไม่มีข้อมูลสำหรับส่งออก");
        return;
    }
    
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // Include BOM for Thai characters in Excel
    csvContent += "วันที่,ประเภท,หมวดหมู่,จำนวนเงิน,หมายเหตุ\n";
    
    state.finance.forEach(item => {
        const d = new Date(item.date);
        const dateStr = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
        const typeStr = item.type === 'income' ? 'รายรับ' : 'รายจ่าย';
        // Escape quotes
        const note = item.note ? item.note.replace(/"/g, '""') : '';
        const row = `"${dateStr}","${typeStr}","${item.category}","${item.amount}","${note}"`;
        csvContent += row + "\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MYFEE_Finance_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

window.renderFinance = renderFinance;
window.addTransaction = addTransaction;
window.deleteTransaction = deleteTransaction;
window.changeFinPeriod = changeFinPeriod;
window.prevFinPeriod = prevFinPeriod;
window.nextFinPeriod = nextFinPeriod;
window.exportFinanceCSV = exportFinanceCSV;
