class BingoGame {
    constructor() {
        // Default phrases - can be customized
        this.defaultPhrases = [
            "Someone mentions coffee", "A cat appears on camera", "Technical difficulties occur",
            "Someone says 'Can you hear me?'", "Background noise interrupts", "Someone types loudly",
            "A child or pet makes an appearance", "Someone forgets to unmute", "Internet connection issues",
            "Someone multitasks visibly", "Background music plays", "Someone drinks water",
            "A delivery arrives", "Someone mentions the weather", "Technology fails",
            "Someone wears pajama bottoms", "A doorbell rings", "Someone checks their phone",
            "Background TV sounds", "Someone eats during the call", "A construction sound",
            "Someone says 'Sorry, I was on mute'", "Video freezes", "Someone waves goodbye",
            "Echo on the line", "Let's circle back on that", "Can we take this offline?",
            "I have a hard stop at...", "We're running out of time", "Let's parking lot this",
            "Can you share your screen?", "I think there's a lag", "Let's sync up later",
            "Can everyone go on mute?", "I'll follow up via email", "That's a great question",
            "Let's table this for now", "I can't see the presentation", "Can you make it bigger?",
            "We lost you there", "I have another meeting", "Let's schedule a follow-up",
            "Can you hear me now?", "I think we lost John", "Can you unmute yourself?",
            "Let's give them a minute", "Are you still there?", "Can everyone turn off video?",
            "I'll send the recording", "Let's start without them"
        ];
        
        this.presetPhrases = {
            meeting: [
                "Can you hear me?", "You're on mute", "Can everyone see my screen?", "Sorry, I was on mute",
                "Let's circle back on that", "Can we take this offline?", "I have a hard stop at...", "Sorry, can you repeat that?",
                "We're running out of time", "Let's parking lot this", "Can you share your screen?", "I think there's a lag",
                "Let's sync up later", "Can everyone go on mute?", "I'll follow up via email", "That's a great question",
                "Let's table this for now", "I can't see the presentation", "Can you make it bigger?", "We lost you there",
                "I have another meeting", "Let's schedule a follow-up", "Can you hear me now?", "I think we lost John",
                "Technical difficulties", "Can you unmute yourself?", "Let's give them a minute", "Are you still there?",
                "Connection issues", "Can everyone turn off video?", "I'll send the recording", "Let's start without them"
            ],
            workFromHome: [
                "Someone mentions coffee", "A cat appears on camera", "A child interrupts", "Delivery person rings doorbell",
                "Someone wears pajama bottoms", "Background TV sounds", "Someone multitasks visibly", "Pet makes noise",
                "Someone checks their phone", "Construction noise outside", "Neighbor mows lawn", "Dog barking",
                "Someone eats during call", "Laundry machine beeps", "Phone rings in background", "Package delivery",
                "Someone mentions weather", "Microwave beeps", "Car honks outside", "Someone's doorbell rings",
                "Background music plays", "Someone mentions being tired", "Coffee maker sounds", "Vacuum cleaner noise",
                "Someone mentions weekend plans", "Kitchen sounds", "Someone mentions lunch", "Dishwasher running",
                "Someone mentions Netflix", "Home office complaints", "Internet connection issues", "Power outage mentioned"
            ],
            movie: [
                "Someone says 'I've seen this before'", "Phone rings during movie", "Someone asks 'Who's that actor?'", "Popcorn spills",
                "Someone gets up for snacks", "Someone talks during dialogue", "Volume complaint", "Someone predicts plot",
                "Bathroom break", "Someone checks phone", "Commercial break comment", "Someone mentions other movies",
                "Someone falls asleep", "Snoring sounds", "Someone asks what happened", "Remote control fight",
                "Someone mentions the book", "Plot twist reaction", "Someone jumps at scary scene", "Crying during sad scene",
                "Someone laughs at wrong time", "Someone quotes movie lines", "Someone mentions actor's other films", "Credits discussion",
                "Someone wants to rewind", "Sound effects commentary", "Someone mentions director", "Sequel discussion",
                "Rating debate", "Someone mentions reviews", "Intermission request", "End credits watch"
            ],
            education: [
                "Technical difficulties", "Can you see my screen?", "Audio issues", "Someone joins late",
                "Chat box is used", "Someone asks to repeat", "Breakout room mention", "Poll or quiz time",
                "Someone has connection issues", "Microphone feedback", "Someone types loudly", "Background noise",
                "Question in chat", "Someone asks for recording", "Screen sharing problems", "Waiting for others",
                "Someone mentions homework", "Assignment clarification", "Due date question", "Grade inquiry",
                "Someone asks about syllabus", "Office hours mentioned", "Email follow-up needed", "Group project discussion",
                "Someone mentions textbook", "Library resources", "Study group formation", "Exam preparation",
                "Someone asks about attendance", "Late submission policy", "Extra credit opportunity", "Course evaluation"
            ]
        };
        
        this.currentPhrases = this.loadCustomPhrases() || [...this.defaultPhrases];
        this.calledPhrases = [];
        this.availablePhrases = [];
        this.playerCard = [];
        this.gameActive = false;
        this.customMode = false;
        
        this.initializeElements();
        this.loadStats();
        this.updateStatsDisplay();
        this.generateNewCard();
        this.attachEventListeners();
    }

    initializeElements() {
        this.elements = {
            newGameBtn: document.getElementById('newGameBtn'),
            resetStatsBtn: document.getElementById('resetStatsBtn'),
            customizeBtn: document.getElementById('customizeBtn'),
            currentNumber: document.getElementById('currentNumber'),
            calledNumbersList: document.getElementById('calledNumbersList'),
            availablePhrasesList: document.getElementById('availablePhrasesList'),
            bingoGrid: document.getElementById('bingoGrid'),
            winModal: document.getElementById('winModal'),
            closeModal: document.getElementById('closeModal'),
            customModal: document.getElementById('customModal'),
            closeCustomModal: document.getElementById('closeCustomModal'),
            saveCustomPhrases: document.getElementById('saveCustomPhrases'),
            resetToDefault: document.getElementById('resetToDefault'),
            customPhrasesTextarea: document.getElementById('customPhrasesTextarea'),
            phraseCount: document.getElementById('phraseCount'),
            meetingBingo: document.getElementById('meetingBingo'),
            workFromHomeBingo: document.getElementById('workFromHomeBingo'),
            movieBingo: document.getElementById('movieBingo'),
            educationBingo: document.getElementById('educationBingo'),
            gamesPlayed: document.getElementById('gamesPlayed'),
            gamesWon: document.getElementById('gamesWon'),
            winRate: document.getElementById('winRate')
        };
    }

    attachEventListeners() {
        this.elements.newGameBtn.addEventListener('click', () => this.startNewGame());
        this.elements.resetStatsBtn.addEventListener('click', () => this.resetStats());
        this.elements.customizeBtn.addEventListener('click', () => this.openCustomModal());
        this.elements.closeModal.addEventListener('click', () => this.closeWinModal());
        this.elements.closeCustomModal.addEventListener('click', () => this.closeCustomModal());
        this.elements.saveCustomPhrases.addEventListener('click', () => this.saveCustomPhrases());
        this.elements.resetToDefault.addEventListener('click', () => this.resetToDefaultPhrases());
        
        // Preset button event listeners
        this.elements.meetingBingo.addEventListener('click', () => this.loadPreset('meeting'));
        this.elements.workFromHomeBingo.addEventListener('click', () => this.loadPreset('workFromHome'));
        this.elements.movieBingo.addEventListener('click', () => this.loadPreset('movie'));
        this.elements.educationBingo.addEventListener('click', () => this.loadPreset('education'));
        
        // Close modals when clicking outside
        this.elements.winModal.addEventListener('click', (e) => {
            if (e.target === this.elements.winModal) {
                this.closeWinModal();
            }
        });
        
        this.elements.customModal.addEventListener('click', (e) => {
            if (e.target === this.elements.customModal) {
                this.closeCustomModal();
            }
        });
        
        // Update phrase count as user types
        this.elements.customPhrasesTextarea.addEventListener('input', () => {
            this.updatePhraseCount();
        });
    }

    generateNewCard() {
        if (this.currentPhrases.length < 24) {
            alert('You need at least 24 phrases to generate a bingo card. Please add more phrases or use the default set.');
            return;
        }
        
        this.playerCard = [];
        const shuffledPhrases = [...this.currentPhrases].sort(() => Math.random() - 0.5);
        
        // Generate 5x5 grid
        for (let row = 0; row < 5; row++) {
            const cardRow = [];
            for (let col = 0; col < 5; col++) {
                if (row === 2 && col === 2) {
                    // Center square is FREE
                    cardRow.push('FREE');
                } else {
                    // Remove used phrase from shuffled array
                    cardRow.push(shuffledPhrases.pop());
                }
            }
            this.playerCard.push(cardRow);
        }
        
        this.renderCard();
        this.renderAvailablePhrases();
    }

    renderAvailablePhrases() {
        this.elements.availablePhrasesList.innerHTML = '';
        
        // Sort phrases: available first, then called
        const sortedPhrases = [...this.availablePhrases, ...this.calledPhrases];
        
        sortedPhrases.forEach(phrase => {
            const phraseElement = document.createElement('div');
            phraseElement.className = 'phrase-item';
            phraseElement.textContent = phrase;
            phraseElement.title = phrase; // Tooltip
            
            const isCalled = this.calledPhrases.includes(phrase);
            if (isCalled) {
                phraseElement.classList.add('called');
                phraseElement.textContent += ' ✓';
            } else if (this.gameActive) {
                phraseElement.addEventListener('click', () => this.callSpecificPhrase(phrase));
            } else {
                // Game not active, disable clicking
                phraseElement.style.opacity = '0.5';
                phraseElement.style.cursor = 'not-allowed';
            }
            
            this.elements.availablePhrasesList.appendChild(phraseElement);
        });
    }

    renderCard() {
        this.elements.bingoGrid.innerHTML = '';
        
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                const cell = document.createElement('div');
                cell.className = 'bingo-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                const value = this.playerCard[row][col];
                cell.textContent = value;
                cell.title = value; // Tooltip for long text
                
                if (value === 'FREE') {
                    cell.classList.add('free', 'marked');
                }
                
                cell.addEventListener('click', () => this.toggleCell(row, col));
                this.elements.bingoGrid.appendChild(cell);
            }
        }
    }

    toggleCell(row, col) {
        if (!this.gameActive) return;
        
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        const value = this.playerCard[row][col];
        
        if (value === 'FREE') return;
        
        // Only allow marking if the phrase has been called
        if (!this.calledPhrases.includes(value)) {
            this.showMessage('This phrase hasn\'t been called yet!');
            return;
        }
        
        cell.classList.toggle('marked');
        this.checkForWin();
    }

    startNewGame() {
        this.gameActive = true;
        this.calledPhrases = [];
        this.availablePhrases = [...this.currentPhrases];
        
        this.elements.currentNumber.textContent = 'Click phrases below to call them';
        this.elements.calledNumbersList.innerHTML = '';
        this.generateNewCard();
        
        this.showMessage('New game started! Click on phrases to call them!');
    }

    callSpecificPhrase(phrase) {
        if (!this.gameActive || !this.availablePhrases.includes(phrase)) {
            return;
        }
        
        // Remove phrase from available and add to called
        const phraseIndex = this.availablePhrases.indexOf(phrase);
        this.availablePhrases.splice(phraseIndex, 1);
        this.calledPhrases.push(phrase);
        
        this.elements.currentNumber.textContent = phrase;
        
        // Add to called phrases list
        const phraseElement = document.createElement('div');
        phraseElement.className = 'called-number';
        phraseElement.textContent = phrase;
        phraseElement.title = phrase; // Tooltip for long text
        this.elements.calledNumbersList.appendChild(phraseElement);
        
        // Auto-mark if player has this phrase
        this.autoMarkPhrase(phrase);
        
        // Re-render available phrases to update the display
        this.renderAvailablePhrases();
        
        this.saveGameState();
    }

    callPhrase() {
        if (!this.gameActive || this.availablePhrases.length === 0) {
            if (this.availablePhrases.length === 0) {
                this.showMessage('All phrases have been called!');
            }
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * this.availablePhrases.length);
        const calledPhrase = this.availablePhrases.splice(randomIndex, 1)[0];
        
        this.calledPhrases.push(calledPhrase);
        this.elements.currentNumber.textContent = calledPhrase;
        
        // Add to called phrases list
        const phraseElement = document.createElement('div');
        phraseElement.className = 'called-number';
        phraseElement.textContent = calledPhrase;
        phraseElement.title = calledPhrase; // Tooltip for long text
        this.elements.calledNumbersList.appendChild(phraseElement);
        
        // Auto-mark if player has this phrase
        this.autoMarkPhrase(calledPhrase);
        
        this.saveGameState();
    }

    autoMarkPhrase(phrase) {
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                if (this.playerCard[row][col] === phrase) {
                    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                    if (!cell.classList.contains('marked')) {
                        cell.classList.add('marked');
                        setTimeout(() => this.checkForWin(), 100);
                    }
                }
            }
        }
    }

    checkForWin() {
        const markedCells = document.querySelectorAll('.bingo-cell.marked');
        const markedPositions = Array.from(markedCells).map(cell => ({
            row: parseInt(cell.dataset.row),
            col: parseInt(cell.dataset.col)
        }));

        // Check rows
        for (let row = 0; row < 5; row++) {
            const rowCells = markedPositions.filter(pos => pos.row === row);
            if (rowCells.length === 5) {
                this.handleWin();
                return;
            }
        }

        // Check columns
        for (let col = 0; col < 5; col++) {
            const colCells = markedPositions.filter(pos => pos.col === col);
            if (colCells.length === 5) {
                this.handleWin();
                return;
            }
        }

        // Check diagonals
        const diagonal1 = markedPositions.filter(pos => pos.row === pos.col);
        const diagonal2 = markedPositions.filter(pos => pos.row + pos.col === 4);
        
        if (diagonal1.length === 5 || diagonal2.length === 5) {
            this.handleWin();
        }
    }

    handleWin() {
        this.gameActive = false;
        
        // Update stats
        const stats = this.loadStats();
        stats.gamesWon++;
        stats.totalGames++;
        this.saveStats(stats);
        this.updateStatsDisplay();
        
        // Re-render available phrases to disable clicking
        this.renderAvailablePhrases();
        
        // Show win modal
        setTimeout(() => {
            this.elements.winModal.style.display = 'block';
        }, 500);
        
        this.saveGameState();
    }

    closeWinModal() {
        this.elements.winModal.style.display = 'none';
        this.startNewGame();
    }

    openCustomModal() {
        this.elements.customModal.style.display = 'block';
        this.elements.customPhrasesTextarea.value = this.currentPhrases.join('\n');
        this.updatePhraseCount();
    }

    closeCustomModal() {
        this.elements.customModal.style.display = 'none';
    }

    saveCustomPhrases() {
        const textareaValue = this.elements.customPhrasesTextarea.value.trim();
        if (!textareaValue) {
            alert('Please enter at least 24 phrases, one per line.');
            return;
        }
        
        const phrases = textareaValue.split('\n')
            .map(phrase => phrase.trim())
            .filter(phrase => phrase.length > 0);
            
        if (phrases.length < 24) {
            alert('You need at least 24 phrases to play bingo. Please add more phrases.');
            return;
        }
        
        this.currentPhrases = phrases;
        localStorage.setItem('customBingoPhrases', JSON.stringify(phrases));
        this.closeCustomModal();
        this.showMessage(`Custom phrases saved! (${phrases.length} phrases)`);
        
        // Start a new game with the new phrases
        this.startNewGame();
    }

    resetToDefaultPhrases() {
        if (confirm('Are you sure you want to reset to default phrases?')) {
            this.currentPhrases = [...this.defaultPhrases];
            localStorage.removeItem('customBingoPhrases');
            this.elements.customPhrasesTextarea.value = this.currentPhrases.join('\n');
            this.updatePhraseCount();
            this.showMessage('Reset to default phrases!');
        }
    }

    loadPreset(presetName) {
        if (this.presetPhrases[presetName]) {
            this.elements.customPhrasesTextarea.value = this.presetPhrases[presetName].join('\n');
            this.updatePhraseCount();
        }
    }

    updatePhraseCount() {
        const phrases = this.elements.customPhrasesTextarea.value.split('\n')
            .map(phrase => phrase.trim())
            .filter(phrase => phrase.length > 0);
        this.elements.phraseCount.textContent = `${phrases.length} phrases (minimum 24 needed)`;
        this.elements.phraseCount.style.color = phrases.length >= 24 ? '#4CAF50' : '#f44336';
    }

    loadCustomPhrases() {
        const saved = localStorage.getItem('customBingoPhrases');
        return saved ? JSON.parse(saved) : null;
    }

    showMessage(message) {
        // Toast notification system
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
        
        console.log(message);
    }

    loadStats() {
        const defaultStats = { totalGames: 0, gamesWon: 0 };
        const statsData = localStorage.getItem('bingoGameStats');
        return statsData ? JSON.parse(statsData) : defaultStats;
    }

    saveStats(stats) {
        localStorage.setItem('bingoGameStats', JSON.stringify(stats));
    }

    updateStatsDisplay() {
        const stats = this.loadStats();
        const winRate = stats.totalGames > 0 ? Math.round((stats.gamesWon / stats.totalGames) * 100) : 0;
        
        this.elements.gamesPlayed.textContent = stats.totalGames;
        this.elements.gamesWon.textContent = stats.gamesWon;
        this.elements.winRate.textContent = `${winRate}%`;
    }

    resetStats() {
        if (confirm('Are you sure you want to reset all statistics?')) {
            localStorage.removeItem('bingoGameStats');
            localStorage.removeItem('bingoGameState');
            this.updateStatsDisplay();
            this.showMessage('Statistics reset successfully!');
        }
    }

    saveGameState() {
        const gameState = {
            calledPhrases: this.calledPhrases,
            availablePhrases: this.availablePhrases,
            playerCard: this.playerCard,
            gameActive: this.gameActive,
            currentPhrases: this.currentPhrases,
            timestamp: Date.now()
        };
        localStorage.setItem('bingoGameState', JSON.stringify(gameState));
    }

    loadGameState() {
        const stateData = localStorage.getItem('bingoGameState');
        if (!stateData) return false;
        
        try {
            const gameState = JSON.parse(stateData);
            
            // Don't load states older than 24 hours
            if (Date.now() - gameState.timestamp > 24 * 60 * 60 * 1000) {
                localStorage.removeItem('bingoGameState');
                return false;
            }
            
            this.calledPhrases = gameState.calledPhrases || [];
            this.availablePhrases = gameState.availablePhrases || [];
            this.playerCard = gameState.playerCard || [];
            this.gameActive = gameState.gameActive || false;
            this.currentPhrases = gameState.currentPhrases || this.currentPhrases;
            
            if (this.playerCard.length > 0) {
                this.renderCard();
                this.renderAvailablePhrases();
                this.restoreCalledPhrases();
                return true;
            }
        } catch (error) {
            console.error('Error loading game state:', error);
            localStorage.removeItem('bingoGameState');
        }
        
        return false;
    }

    restoreCalledPhrases() {
        this.elements.calledNumbersList.innerHTML = '';
        
        if (this.calledPhrases.length > 0) {
            this.elements.currentNumber.textContent = this.calledPhrases[this.calledPhrases.length - 1];
            
            this.calledPhrases.forEach(phrase => {
                const phraseElement = document.createElement('div');
                phraseElement.className = 'called-number';
                phraseElement.textContent = phrase;
                phraseElement.title = phrase;
                this.elements.calledNumbersList.appendChild(phraseElement);
                
                this.autoMarkPhrase(phrase);
            });
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new BingoGame();
    
    // Try to load previous game state
    if (!game.loadGameState()) {
        // If no previous state, start fresh
        game.startNewGame();
    }
});

// Save game state when page is about to unload
window.addEventListener('beforeunload', () => {
    // Game state is automatically saved during gameplay
});
