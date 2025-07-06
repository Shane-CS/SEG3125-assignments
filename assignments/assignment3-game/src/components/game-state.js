/**
 * PairQuest Memory Game
 * Game state management
 */

// Card themes with image paths
const cardThemes = {
    nature: [
        'leaf', 'tree', 'flower', 'mountain', 'river', 'sun', 
        'cloud', 'forest', 'beach', 'waterfall', 'desert', 'ocean',
        'rainbow', 'moon', 'star', 'lake', 'island', 'canyon',
        'volcano', 'glacier', 'cave', 'valley', 'hill', 'meadow',
        'reef', 'geyser', 'dune', 'marsh', 'cliff', 'prairie',
        'tundra', 'savanna'
    ],
    technology: [
        'computer', 'smartphone', 'robot', 'satellite', 'rocket', 'drone',
        'camera', 'headphones', 'keyboard', 'mouse', 'monitor', 'printer',
        'server', 'microchip', 'battery', 'speaker', 'tablet', 'laptop',
        'smartwatch', 'vr-headset', 'game-controller', 'router', 'hard-drive', 'usb',
        'microphone', 'webcam', 'scanner', 'projector', 'earbuds', 'charger',
        'cable', 'antenna'
    ],
    abstract: [
        'circle', 'square', 'triangle', 'hexagon', 'spiral', 'wave',
        'dots', 'lines', 'curves', 'zigzag', 'grid', 'maze',
        'swirl', 'diamond', 'star-shape', 'cube', 'pyramid', 'sphere',
        'cylinder', 'cone', 'prism', 'torus', 'fractal', 'vortex',
        'helix', 'infinity', 'labyrinth', 'tessellation', 'mosaic', 'kaleidoscope',
        'mandala', 'origami'
    ]
};

// Default game state
const defaultGameState = {
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    gameStarted: false,
    gameOver: false,
    timerInterval: null,
    seconds: 0,
    isChallenge: false,
    currentTheme: 'nature',
    currentLevel: 4,
    unlockedLevels: [4],
    hintUsed: false,
    hintTimeout: null
};

// Current game state
let gameState = { ...defaultGameState };

/**
 * Save game state to localStorage
 */
function saveGameState() {
    const stateToSave = {
        isChallenge: gameState.isChallenge,
        currentTheme: gameState.currentTheme,
        currentLevel: gameState.currentLevel,
        unlockedLevels: gameState.unlockedLevels
    };
    
    localStorage.setItem('pairquest-game-state', JSON.stringify(stateToSave));
}

/**
 * Load game state from localStorage
 */
function loadGameState() {
    const savedState = localStorage.getItem('pairquest-game-state');
    
    if (savedState) {
        try {
            const parsedState = JSON.parse(savedState);
            
            gameState.isChallenge = parsedState.isChallenge || false;
            gameState.currentTheme = parsedState.currentTheme || 'nature';
            gameState.currentLevel = parsedState.currentLevel || 4;
            
            // Ensure unlockedLevels is an array and contains at least level 4
            if (Array.isArray(parsedState.unlockedLevels) && parsedState.unlockedLevels.length > 0) {
                gameState.unlockedLevels = parsedState.unlockedLevels;
                if (!gameState.unlockedLevels.includes(4)) {
                    gameState.unlockedLevels.push(4);
                }
            } else {
                gameState.unlockedLevels = [4];
            }
        } catch (e) {
            console.error('Error loading game state:', e);
            gameState.unlockedLevels = [4];
        }
    }
    
    return gameState;
}

/**
 * Reset game state for a new game
 */
function resetGameState() {
    // Keep persistent state
    const persistentState = {
        isChallenge: gameState.isChallenge,
        currentTheme: gameState.currentTheme,
        currentLevel: gameState.currentLevel,
        unlockedLevels: gameState.unlockedLevels
    };
    
    // Reset to default and restore persistent state
    gameState = { ...defaultGameState, ...persistentState };
    
    // Clear any existing timers
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    
    if (gameState.hintTimeout) {
        clearTimeout(gameState.hintTimeout);
        gameState.hintTimeout = null;
    }
    
    return gameState;
}

/**
 * Unlock a new level
 * @param {number} level - The level to unlock
 */
function unlockLevel(level) {
    if (!gameState.unlockedLevels.includes(level)) {
        gameState.unlockedLevels.push(level);
        saveGameState();
        return true;
    }
    return false;
}

/**
 * Shuffle an array (Fisher-Yates algorithm)
 * @param {Array} array - The array to shuffle
 * @returns {Array} - The shuffled array
 */
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Export functions and objects
export {
    gameState,
    cardThemes,
    saveGameState,
    loadGameState,
    resetGameState,
    unlockLevel,
    shuffleArray
};