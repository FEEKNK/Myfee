// FILE: js/quiz.js
// --- Quiz Functions ---

function startQuiz() {
    if (els.quizModal) {
        els.quizModal.classList.remove('hidden');
        state.quizScore = 0;
        els.quizScore.textContent = `Score: 0`;
        generateQuizQuestion();
    }
}

function generateQuizQuestion() {
    els.quizFeedback.textContent = '';
    els.quizNextBtn.classList.add('hidden');
    
    if (els.quizInputContainer) els.quizInputContainer.classList.add('hidden');
    if (els.quizOptions) els.quizOptions.classList.add('hidden');
    
    const correct = state.allData[Math.floor(Math.random() * state.allData.length)];
    state.currentQuizAnswer = correct;
    
    const quizType = Math.floor(Math.random() * 3); // 0: Meaning, 1: Listening, 2: Spelling

    if (quizType === 0) {
        els.quizWord.textContent = correct.word;
        els.quizWord.classList.remove('text-transparent', 'bg-clip-text', 'bg-gray-200');
        setupMultipleChoice(correct, 'thai');
    } else if (quizType === 1) {
        els.quizWord.textContent = "🔊 Listen & Choose";
        els.quizWord.classList.add('text-transparent', 'bg-clip-text', 'bg-gray-200');
        speak(correct.word);
        setupMultipleChoice(correct, 'word');
    } else {
        els.quizWord.textContent = correct.thai;
        els.quizWord.classList.remove('text-transparent', 'bg-clip-text', 'bg-gray-200');
        if (els.quizInputContainer) els.quizInputContainer.classList.remove('hidden');
        if (els.quizInput) {
            els.quizInput.value = '';
            els.quizInput.disabled = false;
            els.quizInput.className = 'w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 dark:text-white border-2 border-transparent focus:border-blue-500 rounded-xl outline-none text-center text-xl font-bold';
            setTimeout(() => els.quizInput.focus(), 100);
        }
        if (els.quizSubmitBtn) els.quizSubmitBtn.disabled = false;
    }
}

function setupMultipleChoice(correct, field) {
    if (els.quizOptions) els.quizOptions.classList.remove('hidden');
    const distractors = [];
    while (distractors.length < 3) {
        const r = state.allData[Math.floor(Math.random() * state.allData.length)];
        if (r.id !== correct.id && !distractors.some(d => d.id === r.id)) distractors.push(r);
    }
    const options = [correct, ...distractors].sort(() => Math.random() - 0.5);
    if (els.quizOptions) els.quizOptions.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'w-full p-4 text-left bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-transparent hover:border-blue-300 text-lg font-bold';
        if (field === 'thai') btn.classList.add('font-thai');
        btn.textContent = opt[field];
        btn.onclick = () => {
            Array.from(els.quizOptions.children).forEach(b => b.disabled = true);
            if (opt.id === correct.id) {
                state.quizScore++;
                els.quizScore.textContent = `Score: ${state.quizScore}`;
                btn.classList.add('bg-green-100', 'border-green-500', 'text-green-800');
                els.quizFeedback.textContent = "Correct! 🎉";
            } else {
                btn.classList.add('bg-red-100', 'border-red-500', 'text-red-800');
                els.quizFeedback.textContent = `Wrong! It's "${correct[field]}"`;
                Array.from(els.quizOptions.children).forEach(b => { if (b.textContent === correct[field]) b.classList.add('bg-green-100', 'border-green-500'); });
            }
            els.quizNextBtn.classList.remove('hidden');
        };
        if (els.quizOptions) els.quizOptions.appendChild(btn);
    });
}

function checkQuizSpelling() {
    if (!els.quizInput || els.quizInput.disabled) return;
    const userInput = els.quizInput.value.toLowerCase().trim();
    const correctWord = state.currentQuizAnswer.word.toLowerCase().trim();
    
    els.quizInput.disabled = true;
    els.quizSubmitBtn.disabled = true;
    
    if (userInput === correctWord) {
        state.quizScore++;
        els.quizScore.textContent = `Score: ${state.quizScore}`;
        els.quizInput.classList.add('border-green-500', 'bg-green-50');
        els.quizFeedback.textContent = "Correct! 🎉";
    } else {
        els.quizInput.classList.add('border-red-500', 'bg-red-50', 'dark:bg-red-900/50');
        els.quizFeedback.textContent = `Wrong! It's "${state.currentQuizAnswer.word}"`;
    }
    els.quizNextBtn.classList.remove('hidden');
}
