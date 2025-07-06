/**
 * PairQuest Memory Game
 * Card-related functionality
 */

import { gameState, cardThemes, shuffleArray } from './game-state.js';

/**
 * Generate a random color
 * @returns {string} - A random color in hex format
 */
function getRandomColor() {
    const colors = [
        '#FF5252', // Red
        '#FF4081', // Pink
        '#7C4DFF', // Purple
        '#536DFE', // Indigo
        '#448AFF', // Blue
        '#40C4FF', // Light Blue
        '#18FFFF', // Cyan
        '#64FFDA', // Teal
        '#69F0AE', // Green
        '#B2FF59', // Light Green
        '#EEFF41', // Lime
        '#FFFF00', // Yellow
        '#FFD740', // Amber
        '#FFAB40', // Orange
        '#FF6E40', // Deep Orange
        '#8D6E63', // Brown
        '#78909C'  // Blue Grey
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Determine if a color is light or dark
 * @param {string} color - The color in hex format
 * @returns {boolean} - True if the color is light, false if it's dark
 */
function isLightColor(color) {
    // Remove the hash if it exists
    const hex = color.replace('#', '');

    // Convert hex to RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calculate brightness using the formula: (0.299*R + 0.587*G + 0.114*B)
    // This formula gives more weight to green as human eyes are more sensitive to it
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return true if the color is light (brightness > 0.5)
    return brightness > 0.5;
}

/**
 * Generate cards for the game
 * @param {HTMLElement} gameGrid - The game grid element
 * @param {Function} flipCardHandler - The function to handle card flips
 */
function generateCards(gameGrid, flipCardHandler) {
    // Clear game grid - this will automatically remove all event listeners
    // as the elements are removed from the DOM
    gameGrid.innerHTML = '';

    // Clear existing cards from state
    gameState.cards = [];

    // Reset flipped cards array to ensure clean state
    gameState.flippedCards = [];

    // Calculate number of pairs needed
    const numPairs = Math.pow(gameState.currentLevel, 2) / 2;

    // Get random cards from the current theme
    const themeCards = [...cardThemes[gameState.currentTheme]];
    const selectedCards = [];
    const cardColors = {}; // Store colors for each card type

    // Ensure we have enough unique cards for the pairs
    if (themeCards.length < numPairs) {
        console.error('Not enough unique cards in theme for the current level');
        // Fallback to using as many unique cards as possible
    }

    // Select unique cards for pairs and assign random colors
    for (let i = 0; i < numPairs; i++) {
        if (themeCards.length === 0) break; // Safety check
        const randomIndex = Math.floor(Math.random() * themeCards.length);
        const cardType = themeCards[randomIndex];
        selectedCards.push(cardType);
        cardColors[cardType] = getRandomColor(); // Assign a random color to this card type
        themeCards.splice(randomIndex, 1); // Remove the selected card to ensure uniqueness
    }

    // Create pairs (each card appears exactly twice)
    let cardPairs = [];
    selectedCards.forEach(card => {
        cardPairs.push(card, card); // Add each card exactly twice
    });

    // Shuffle cards
    cardPairs = shuffleArray(cardPairs);

    // Create card elements
    cardPairs.forEach((card, index) => {
        const cardElement = createCardElement(card, index, flipCardHandler, cardColors[card]);

        // Add to game grid
        gameGrid.appendChild(cardElement);

        // Add to game state
        gameState.cards.push({
            id: index,
            type: card,
            element: cardElement,
            isFlipped: false,
            isMatched: false,
            color: cardColors[card]
        });
    });

    // Update grid class
    gameGrid.className = `game-grid grid-${gameState.currentLevel}x${gameState.currentLevel}`;
}

/**
 * Create a card element
 * @param {string} cardType - The type of card
 * @param {number} index - The card index
 * @param {Function} flipCardHandler - The function to handle card flips
 * @param {string} cardColor - The color for this card
 * @returns {HTMLElement} - The card element
 */
function createCardElement(cardType, index, flipCardHandler, cardColor) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.setAttribute('data-card-id', index);
    cardElement.setAttribute('data-card-type', cardType);

    // Card front (hidden)
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    cardFront.style.backgroundColor = cardColor || 'var(--bs-primary)';

    // Map card types to Material Icons
    const iconMap = {
        // Nature theme
        'leaf': 'eco',
        'tree': 'park',
        'flower': 'local_florist',
        'mountain': 'landscape',
        'river': 'water',
        'sun': 'wb_sunny',
        'cloud': 'cloud',
        'forest': 'forest',
        'beach': 'beach_access',
        'waterfall': 'waves',
        'desert': 'terrain',
        'ocean': 'water',
        'rainbow': 'gradient',
        'moon': 'nightlight',
        'star': 'star',
        'lake': 'water',
        'island': 'terrain',
        'canyon': 'landscape',
        'volcano': 'local_fire_department',
        'glacier': 'ac_unit',
        'cave': 'dark_mode',
        'valley': 'landscape',
        'hill': 'landscape',
        'meadow': 'grass',
        'reef': 'water',
        'geyser': 'water_drop',
        'dune': 'terrain',
        'marsh': 'water',
        'cliff': 'landscape',
        'prairie': 'grass',
        'tundra': 'ac_unit',
        'savanna': 'grass',

        // Technology theme
        'computer': 'computer',
        'smartphone': 'smartphone',
        'robot': 'smart_toy',
        'satellite': 'satellite',
        'rocket': 'rocket',
        'drone': 'airplanemode_active',
        'camera': 'camera',
        'headphones': 'headphones',
        'keyboard': 'keyboard',
        'mouse': 'mouse',
        'monitor': 'desktop_windows',
        'printer': 'print',
        'server': 'dns',
        'microchip': 'memory',
        'battery': 'battery_full',
        'speaker': 'speaker',
        'tablet': 'tablet',
        'laptop': 'laptop',
        'smartwatch': 'watch',
        'vr-headset': 'view_in_ar',
        'game-controller': 'sports_esports',
        'router': 'router',
        'hard-drive': 'storage',
        'usb': 'usb',
        'microphone': 'mic',
        'webcam': 'videocam',
        'scanner': 'scanner',
        'projector': 'cast',
        'earbuds': 'headset',
        'charger': 'power',
        'cable': 'cable',
        'antenna': 'settings_input_antenna',

        // Abstract theme
        'circle': 'circle',
        'square': 'square',
        'triangle': 'change_history',
        'hexagon': 'hexagon',
        'spiral': 'refresh',
        'wave': 'waves',
        'dots': 'grain',
        'lines': 'horizontal_rule',
        'curves': 'gesture',
        'zigzag': 'trending_up',
        'grid': 'grid_3x3',
        'maze': 'view_comfy',
        'swirl': 'refresh',
        'diamond': 'diamond',
        'star-shape': 'star',
        'cube': 'view_in_ar',
        'pyramid': 'change_history',
        'sphere': 'circle',
        'cylinder': 'view_in_ar',
        'cone': 'change_history',
        'prism': 'view_in_ar',
        'torus': 'donut_large',
        'fractal': 'auto_awesome',
        'vortex': 'refresh',
        'helix': 'sync',
        'infinity': 'all_inclusive',
        'labyrinth': 'view_comfy',
        'tessellation': 'grid_view',
        'mosaic': 'dashboard',
        'kaleidoscope': 'auto_awesome',
        'mandala': 'auto_awesome',
        'origami': 'interests'
    };

    // Use mapped icon or fallback to a default
    const iconName = iconMap[cardType] || 'help_outline';

    // Determine icon color based on background color for better contrast
    let iconColor = '#ffffff'; // Default to white
    if (cardColor && isLightColor(cardColor)) {
        iconColor = '#000000'; // Use black for light backgrounds
    }

    cardFront.innerHTML = `<i class="material-icons" style="color: ${iconColor};">${iconName}</i>`;

    // Card back (visible)
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.innerHTML = '<i class="material-icons">help</i>';

    // Add to card
    cardElement.appendChild(cardFront);
    cardElement.appendChild(cardBack);

    // Add click event - no need to store the handler since we'll clear the entire grid
    // when regenerating cards, which automatically removes all event listeners
    cardElement.addEventListener('click', () => flipCardHandler(cardElement));

    return cardElement;
}

/**
 * Flip a card
 * @param {HTMLElement} cardElement - The card element to flip
 * @param {Function} onMatch - Function to call when a match is found
 * @param {Function} onMismatch - Function to call when cards don't match
 * @param {Function} onFirstFlip - Function to call on the first card flip
 * @param {Function} updateMoves - Function to update the move counter
 */
function flipCard(cardElement, onMatch, onMismatch, onFirstFlip, updateMoves) {
    // Get card ID
    const cardId = parseInt(cardElement.getAttribute('data-card-id'));
    const card = gameState.cards.find(c => c.id === cardId);

    // Check if card can be flipped
    if (
        gameState.gameOver || 
        card.isFlipped || 
        card.isMatched || 
        gameState.flippedCards.length >= 2
    ) {
        return;
    }

    // Start game on first card flip
    if (!gameState.gameStarted) {
        gameState.gameStarted = true;

        // Call onFirstFlip callback
        if (onFirstFlip) {
            onFirstFlip();
        }
    }

    // Flip card
    card.isFlipped = true;
    cardElement.classList.add('flipped');

    // Add to flipped cards
    gameState.flippedCards.push(card);

    // Check for match if two cards are flipped
    if (gameState.flippedCards.length === 2) {
        // Increment moves
        gameState.moves++;

        // Update moves display
        if (updateMoves) {
            updateMoves(gameState.moves);
        }

        // Check for match
        checkForMatch(onMatch, onMismatch);
    }
}

/**
 * Check if the two flipped cards match
 * @param {Function} onMatch - Function to call when a match is found
 * @param {Function} onMismatch - Function to call when cards don't match
 */
function checkForMatch(onMatch, onMismatch) {
    const [card1, card2] = gameState.flippedCards;

    if (card1.type === card2.type) {
        // Match found
        handleMatch(card1, card2, onMatch);
    } else {
        // No match
        handleMismatch(card1, card2, onMismatch);
    }
}

/**
 * Handle matching cards
 * @param {Object} card1 - The first card
 * @param {Object} card2 - The second card
 * @param {Function} onMatch - Function to call when a match is found
 */
function handleMatch(card1, card2, onMatch) {
    // Mark cards as matched
    card1.isMatched = true;
    card2.isMatched = true;

    // Add matched class
    card1.element.classList.add('matched');
    card2.element.classList.add('matched');

    // Update matched pairs
    gameState.matchedPairs++;

    // Clear flipped cards
    gameState.flippedCards = [];

    // Add match animation in challenge mode
    if (gameState.isChallenge) {
        card1.element.classList.add('match-animation');
        card2.element.classList.add('match-animation');

        setTimeout(() => {
            card1.element.classList.remove('match-animation');
            card2.element.classList.remove('match-animation');
        }, 1000);
    }

    // Call onMatch callback
    if (onMatch) {
        onMatch(gameState.matchedPairs);
    }
}

/**
 * Handle mismatched cards
 * @param {Object} card1 - The first card
 * @param {Object} card2 - The second card
 * @param {Function} onMismatch - Function to call when cards don't match
 */
function handleMismatch(card1, card2, onMismatch) {
    // Flip cards back after delay
    setTimeout(() => {
        card1.element.classList.remove('flipped');
        card2.element.classList.remove('flipped');

        card1.isFlipped = false;
        card2.isFlipped = false;

        // Clear flipped cards
        gameState.flippedCards = [];

        // Call onMismatch callback
        if (onMismatch) {
            onMismatch();
        }
    }, 1000);
}

/**
 * Show a hint
 * @param {HTMLElement} hintButton - The hint button element
 */
function showHint(hintButton) {
    if (gameState.gameOver || gameState.hintUsed) return;

    // Find unmatched cards
    const unmatchedCards = gameState.cards.filter(card => !card.isMatched && !card.isFlipped);

    if (unmatchedCards.length === 0) return;

    // Find a matching pair
    let pairToShow = null;
    let cardTypes = {};

    // First try to find a matching pair
    for (const card of unmatchedCards) {
        if (cardTypes[card.type]) {
            // Found a matching pair
            pairToShow = [cardTypes[card.type], card];
            break;
        } else {
            cardTypes[card.type] = card;
        }
    }

    // If no matching pair found, just show any card
    if (!pairToShow && unmatchedCards.length > 0) {
        const randomCard = unmatchedCards[Math.floor(Math.random() * unmatchedCards.length)];
        pairToShow = [randomCard];
    }

    if (pairToShow) {
        // Mark hint as used
        gameState.hintUsed = true;
        hintButton.disabled = true;

        // Show hint with enhanced visual feedback
        pairToShow.forEach(card => {
            // Add hint class for pulsing effect
            card.element.classList.add('hint');

            // Add a temporary overlay to make it more obvious
            const hintOverlay = document.createElement('div');
            hintOverlay.className = 'hint-overlay';
            hintOverlay.innerHTML = '<i class="material-icons">touch_app</i>';
            card.element.appendChild(hintOverlay);
        });

        // Remove hint after delay (increased from 2s to 4s for better visibility)
        gameState.hintTimeout = setTimeout(() => {
            pairToShow.forEach(card => {
                card.element.classList.remove('hint');

                // Remove the hint overlay
                const overlay = card.element.querySelector('.hint-overlay');
                if (overlay) {
                    card.element.removeChild(overlay);
                }
            });

            // Reset hint after shorter delay (reduced from 10s to 5s for better usability)
            setTimeout(() => {
                gameState.hintUsed = false;
                hintButton.disabled = false;
            }, 5000);
        }, 4000);
    }
}

// Export functions
export {
    generateCards,
    flipCard,
    showHint
};
