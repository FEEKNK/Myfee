// FILE: js/features/water.js
// --- Water Intake Tracker ---

function checkWaterDayReset() {
    const today = new Date().toLocaleDateString();
    if (state.water.lastDate !== today) {
        state.water.current = 0;
        state.water.lastDate = today;
        saveWaterData();
    }
}

function saveWaterData() {
    localStorage.setItem('waterData', JSON.stringify(state.water));
    renderWater();
    if (typeof updateDashboard === 'function') updateDashboard();
}

function addWater(amount) {
    checkWaterDayReset();
    state.water.current += parseInt(amount);
    saveWaterData();
}

function resetWater() {
    if (confirm('คุณต้องการรีเซ็ตการดื่มน้ำของวันนี้ใช่หรือไม่?')) {
        state.water.current = 0;
        saveWaterData();
    }
}

function renderWater() {
    checkWaterDayReset();
    const currentEl = document.getElementById('waterCurrent');
    const goalEl = document.getElementById('waterGoal');
    const percentEl = document.getElementById('waterPercent');
    const waveEl = document.getElementById('waterWaveBar');

    const percent = Math.min(100, Math.round((state.water.current / state.water.goal) * 100));

    if (currentEl) currentEl.textContent = state.water.current.toLocaleString();
    if (goalEl) goalEl.textContent = state.water.goal.toLocaleString();
    if (percentEl) percentEl.textContent = `${percent}%`;
    if (waveEl) waveEl.style.height = `${percent}%`;
}

window.renderWater = renderWater;
window.addWater = addWater;
window.resetWater = resetWater;
