/**
 * PairQuest Memory Game
 * UI-related functionality
 */

import { gameState, saveGameState, unlockLevel } from './game-state.js';

/**
 * Update game mode (Challenge vs Relaxed)
 * @param {HTMLElement} relaxedLabel - The relaxed mode label element
 * @param {HTMLElement} challengeLabel - The challenge mode label element
 * @param {HTMLElement} timerContainer - The timer container element
 */
function updateGameMode(relaxedLabel, challengeLabel, timerContainer) {
    if (gameState.isChallenge) {
        relaxedLabel.classList.add('d-none');
        challengeLabel.classList.remove('d-none');
        timerContainer.classList.remove('d-none');
        document.body.classList.add('challenge-mode');
        document.body.classList.remove('relaxed-mode');
    } else {
        relaxedLabel.classList.remove('d-none');
        challengeLabel.classList.add('d-none');
        timerContainer.classList.add('d-none');
        document.body.classList.remove('challenge-mode');
        document.body.classList.add('relaxed-mode');
    }
}

/**
 * Update the timer display
 * @param {HTMLElement} timerElement - The timer element
 * @param {number} seconds - The number of seconds
 */
function updateTimerDisplay(timerElement, seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Start the timer
 * @param {HTMLElement} timerElement - The timer element
 * @returns {number} - The timer interval ID
 */
function startTimer(timerElement) {
    // Reset seconds
    gameState.seconds = 0;
    updateTimerDisplay(timerElement, gameState.seconds);
    
    // Start interval
    return setInterval(() => {
        gameState.seconds++;
        updateTimerDisplay(timerElement, gameState.seconds);
    }, 1000);
}

/**
 * Update unlocked levels in the UI
 * @param {NodeList} levelItems - The level dropdown items
 */
function updateUnlockedLevels(levelItems) {
    levelItems.forEach(item => {
        const level = parseInt(item.getAttribute('data-level'));
        if (gameState.unlockedLevels.includes(level)) {
            item.classList.remove('disabled');
        } else {
            item.classList.add('disabled');
        }
        
        if (level === gameState.currentLevel) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * Handle game completion
 * @param {Object} elements - UI elements needed for completion
 * @param {Function} onNextLevel - Function to call when next level is selected
 */
function handleGameComplete(elements, onNextLevel) {
    const { 
        completionModal, finalMoves, finalTime, timer, 
        completionTimeSection, nextLevelButton 
    } = elements;
    
    // Stop timer
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    
    // Set game over
    gameState.gameOver = true;
    
    // Update completion stats
    finalMoves.textContent = gameState.moves;
    
    // Only show time in challenge mode
    if (gameState.isChallenge) {
        finalTime.textContent = timer.textContent;
        completionTimeSection.classList.remove('d-none');
    } else {
        completionTimeSection.classList.add('d-none');
    }
    
    // Check if next level should be unlocked
    const nextLevel = gameState.currentLevel === 4 ? 6 : gameState.currentLevel === 6 ? 8 : null;
    
    if (nextLevel && !gameState.unlockedLevels.includes(nextLevel)) {
        unlockLevel(nextLevel);
        
        // Enable next level button
        nextLevelButton.disabled = false;
    } else {
        // Disable next level button if no next level
        nextLevelButton.disabled = nextLevel === null;
    }
    
    // Show completion modal
    completionModal.show();
    
    // Add confetti effect in challenge mode
    if (gameState.isChallenge) {
        showConfetti();
    }
    
    // Set up next level button
    if (nextLevel && gameState.unlockedLevels.includes(nextLevel)) {
        nextLevelButton.onclick = () => {
            completionModal.hide();
            onNextLevel(nextLevel);
        };
    }
}

/**
 * Show confetti animation for game completion
 */
function showConfetti() {
    // Create confetti container
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    // Create confetti pieces
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 3}s`;
        confetti.style.backgroundColor = getRandomColor();
        confettiContainer.appendChild(confetti);
    }
    
    // Remove confetti after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

/**
 * Get a random color for confetti
 * @returns {string} - A random color
 */
function getRandomColor() {
    const colors = [
        '#7291A3', // river
        '#808D5E', // moss-light
        '#79804D', // leaf
        '#A8C1D1', // water-light
        '#95A878', // fern
        '#D2C2A9'  // sand
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Initialize theme selection
 * @param {HTMLElement} themeDropdown - The theme dropdown element
 * @param {NodeList} themeItems - The theme dropdown items
 * @param {Function} onThemeChange - Function to call when theme changes
 */
function initThemeSelection(themeDropdown, themeItems, onThemeChange) {
    // Set initial theme text
    themeDropdown.textContent = `Theme: ${gameState.currentTheme.charAt(0).toUpperCase() + gameState.currentTheme.slice(1)}`;
    
    // Set active theme
    themeItems.forEach(item => {
        if (item.getAttribute('data-theme') === gameState.currentTheme) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
        
        // Add click event
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const theme = e.target.getAttribute('data-theme');
            if (theme !== gameState.currentTheme) {
                gameState.currentTheme = theme;
                themeDropdown.textContent = `Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`;
                
                // Update active state
                themeItems.forEach(i => {
                    i.classList.remove('active');
                });
                e.target.classList.add('active');
                
                saveGameState();
                
                // Call theme change callback
                if (onThemeChange) {
                    onThemeChange();
                }
            }
        });
    });
}

/**
 * Initialize level selection
 * @param {HTMLElement} levelDropdown - The level dropdown element
 * @param {NodeList} levelItems - The level dropdown items
 * @param {Function} onLevelChange - Function to call when level changes
 */
function initLevelSelection(levelDropdown, levelItems, onLevelChange) {
    // Set initial level text
    levelDropdown.textContent = `Level: ${gameState.currentLevel}×${gameState.currentLevel}`;
    
    // Update unlocked levels
    updateUnlockedLevels(levelItems);
    
    // Add click events
    levelItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('disabled')) return;
            
            const level = parseInt(e.target.getAttribute('data-level'));
            if (level !== gameState.currentLevel) {
                gameState.currentLevel = level;
                levelDropdown.textContent = `Level: ${level}×${level}`;
                
                // Update active state
                levelItems.forEach(i => {
                    i.classList.remove('active');
                });
                e.target.classList.add('active');
                
                saveGameState();
                
                // Call level change callback
                if (onLevelChange) {
                    onLevelChange();
                }
            }
        });
    });
}

// Export functions
export {
    updateGameMode,
    updateTimerDisplay,
    startTimer,
    updateUnlockedLevels,
    handleGameComplete,
    showConfetti,
    initThemeSelection,
    initLevelSelection
};