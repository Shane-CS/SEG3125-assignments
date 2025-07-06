/**
 * PairQuest Memory Game
 * Main application file
 * 
 * This file orchestrates the game by importing and using the modular components.
 * It handles initialization, event listeners, and game flow.
 */

import { gameState, loadGameState, resetGameState, saveGameState } from './components/game-state.js';
import { generateCards, flipCard, showHint } from './components/card.js';
import { 
    updateGameMode, startTimer, updateTimerDisplay, handleGameComplete,
    initThemeSelection, initLevelSelection, updateUnlockedLevels
} from './components/ui.js';
import { initThemeSwitcher } from './theme-switcher.js';

// Log application start
console.log('PairQuest: Initializing application');

// Initialize theme switcher immediately when this module loads
// This ensures it's available even before DOM is fully loaded
try {
    console.log('PairQuest: Initializing theme switcher');
    initThemeSwitcher();
} catch (error) {
    console.error('PairQuest: Failed to initialize theme switcher', error);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('PairQuest: DOM loaded, initializing game');

    // Initialize theme switcher again to ensure it's properly set up
    try {
        initThemeSwitcher();
    } catch (error) {
        console.error('PairQuest: Failed to initialize theme switcher on DOMContentLoaded', error);
    }

    // Game elements
    const elements = {
        // Game grid
        gameGrid: document.getElementById('gameGrid'),

        // Counters and stats
        moveCounter: document.getElementById('moveCounter'),
        pairsCounter: document.getElementById('pairsCounter'),
        totalPairs: document.getElementById('totalPairs'),
        timer: document.getElementById('timer'),
        timerContainer: document.getElementById('timerContainer'),

        // Buttons
        restartButton: document.getElementById('restartButton'),
        hintButton: document.getElementById('hintButton'),
        modeToggle: document.getElementById('modeToggle'),

        // Labels
        relaxedLabel: document.getElementById('relaxedLabel'),
        challengeLabel: document.getElementById('challengeLabel'),

        // Dropdowns
        themeDropdown: document.getElementById('themeDropdown'),
        levelDropdown: document.getElementById('levelDropdown'),

        // Modals
        howToPlayLink: document.getElementById('howToPlayLink'),
        completionModal: null, // Will be initialized after checking for element
        howToPlayModal: null, // Will be initialized after checking for element

        // Completion stats
        finalMoves: document.getElementById('finalMoves'),
        finalTime: document.getElementById('finalTime'),
        completionTimeSection: document.getElementById('completionTimeSection'),

        // Modal buttons
        nextLevelButton: document.getElementById('nextLevelButton'),
        replayButton: document.getElementById('replayButton')
    };

    // Verify all required elements are found
    try {
        const requiredElements = [
            'gameGrid', 'moveCounter', 'pairsCounter', 'totalPairs', 
            'timer', 'timerContainer', 'restartButton', 'hintButton', 
            'modeToggle', 'relaxedLabel', 'challengeLabel', 'themeDropdown', 
            'levelDropdown', 'howToPlayLink', 'finalMoves', 'finalTime', 
            'completionTimeSection', 'nextLevelButton', 'replayButton'
        ];

        const missingElements = requiredElements.filter(id => !elements[id]);
        if (missingElements.length > 0) {
            throw new Error(`Missing required DOM elements: ${missingElements.join(', ')}`);
        }

        // Initialize modals after checking elements
        const completionModalElement = document.getElementById('completionModal');
        const howToPlayModalElement = document.getElementById('howToPlayModal');

        if (!completionModalElement || !howToPlayModalElement) {
            throw new Error('Modal elements not found');
        }

        elements.completionModal = new bootstrap.Modal(completionModalElement);
        elements.howToPlayModal = new bootstrap.Modal(howToPlayModalElement);

        console.log('PairQuest: All required DOM elements found');
    } catch (error) {
        console.error('PairQuest: Error initializing game elements', error);
        alert('Error initializing game. Please check the console for details.');
        return; // Exit initialization if elements are missing
    }

    // Load saved game state
    loadGameState();

    // Initialize game
    initializeGame();

    // Event listeners
    elements.restartButton.addEventListener('click', restartGame);
    elements.hintButton.addEventListener('click', () => showHint(elements.hintButton));
    elements.howToPlayLink.addEventListener('click', showHowToPlay);
    elements.replayButton.addEventListener('click', replayLevel);

    // Mode toggle
    elements.modeToggle.addEventListener('change', () => {
        gameState.isChallenge = elements.modeToggle.checked;
        updateGameMode(elements.relaxedLabel, elements.challengeLabel, elements.timerContainer);
        saveGameState();

        // Restart game when mode changes
        restartGame();
    });

    // Initialize theme selection
    initThemeSelection(
        elements.themeDropdown,
        document.querySelectorAll('.dropdown-menu[aria-labelledby="themeDropdown"] .dropdown-item'),
        restartGame
    );

    // Initialize level selection
    initLevelSelection(
        elements.levelDropdown,
        document.querySelectorAll('.dropdown-menu[aria-labelledby="levelDropdown"] .dropdown-item'),
        restartGame
    );

    /**
     * Initialize the game
     */
    function initializeGame() {
        // Set game mode
        elements.modeToggle.checked = gameState.isChallenge;
        updateGameMode(elements.relaxedLabel, elements.challengeLabel, elements.timerContainer);

        // Initialize tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        // Show How to Play modal on page load
        setTimeout(() => {
            elements.howToPlayModal.show();
        }, 500);

        // Start game
        startGame();
    }

    /**
     * Start a new game
     */
    function startGame() {
        // Reset game state
        resetGameState();

        // Update UI
        elements.moveCounter.textContent = '0';
        elements.pairsCounter.textContent = '0';
        elements.timer.textContent = '00:00';

        // Calculate total pairs
        const totalPairsCount = Math.pow(gameState.currentLevel, 2) / 2;
        elements.totalPairs.textContent = totalPairsCount;

        // Generate cards
        generateCards(elements.gameGrid, handleCardFlip);
    }

    /**
     * Handle card flip
     * @param {HTMLElement} cardElement - The card element that was flipped
     */
    function handleCardFlip(cardElement) {
        flipCard(
            cardElement,
            handleMatchFound,
            handleMismatch,
            handleFirstFlip,
            updateMoves
        );
    }

    /**
     * Handle the first card flip
     */
    function handleFirstFlip() {
        // Start timer in challenge mode
        if (gameState.isChallenge) {
            gameState.timerInterval = startTimer(elements.timer);
        }
    }

    /**
     * Update the moves counter
     * @param {number} moves - The number of moves
     */
    function updateMoves(moves) {
        elements.moveCounter.textContent = moves;
    }

    /**
     * Handle when a match is found
     * @param {number} matchedPairs - The number of matched pairs
     */
    function handleMatchFound(matchedPairs) {
        // Update pairs counter
        elements.pairsCounter.textContent = matchedPairs;

        // Check if game is complete
        if (matchedPairs === parseInt(elements.totalPairs.textContent)) {
            setTimeout(() => {
                handleGameComplete({
                    completionModal: elements.completionModal,
                    finalMoves: elements.finalMoves,
                    finalTime: elements.finalTime,
                    timer: elements.timer,
                    completionTimeSection: elements.completionTimeSection,
                    nextLevelButton: elements.nextLevelButton
                }, handleNextLevel);
            }, 500);
        }
    }

    /**
     * Handle mismatched cards
     */
    function handleMismatch() {
        // No additional handling
    }

    /**
     * Handle next level selection
     * @param {number} nextLevel - The next level to play
     */
    function handleNextLevel(nextLevel) {
        gameState.currentLevel = nextLevel;
        elements.levelDropdown.textContent = `Level: ${nextLevel}×${nextLevel}`;

        // Update active state
        document.querySelectorAll('.dropdown-menu[aria-labelledby="levelDropdown"] .dropdown-item').forEach(item => {
            const level = parseInt(item.getAttribute('data-level'));
            if (level === nextLevel) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        saveGameState();
        restartGame();
    }

    /**
     * Restart the game
     */
    function restartGame() {
        // Stop timer
        if (gameState.timerInterval) {
            clearInterval(gameState.timerInterval);
            gameState.timerInterval = null;
        }

        // Start new game
        startGame();
    }

    /**
     * Replay the current level
     */
    function replayLevel() {
        elements.completionModal.hide();
        restartGame();
    }

    /**
     * Show the how to play modal
     * @param {Event} e - The event object
     */
    function showHowToPlay(e) {
        if (e) e.preventDefault();
        elements.howToPlayModal.show();
    }
});
