# PairQuest Memory Game

A responsive and accessible memory matching game with multiple themes, difficulty levels, and game modes.

## Features

### Game Modes
- **Relaxed Mode**: Take your time, no timer pressure. Perfect for casual play with gentle animations and feedback.
- **Challenge Mode**: Race against the clock with animated feedback and celebrations when you complete a level.

### Themes
- **Nature**: Cards featuring natural elements like trees, mountains, rivers, etc.
- **Technology**: Cards with technology-related icons like computers, smartphones, robots, etc.
- **Abstract**: Cards with abstract shapes and patterns.

### Difficulty Levels
- **Beginner (4×4)**: 8 pairs to match
- **Intermediate (6×6)**: 18 pairs to match (unlocked after completing Beginner)
- **Advanced (8×8)**: 32 pairs to match (unlocked after completing Intermediate)

### Accessibility Features
- Keyboard navigation support
- High contrast mode (via dark/light theme toggle)
- Responsive design for various screen sizes
- Clear visual feedback for interactions

### Additional Features
- Game state persistence (saves your progress, unlocked levels, theme preference, etc.)
- Dark/light mode toggle
- Hint system to help when you're stuck
- Detailed statistics (moves, time, pairs found)
- Confetti celebration animation in Challenge mode

## How to Play

1. Select your preferred game mode (Relaxed or Challenge)
2. Choose a theme and difficulty level
3. Click on any card to flip it and reveal the image
4. Click on a second card to find its matching pair
5. If the cards match, they stay face up
6. If they don't match, they flip back over
7. Continue until all pairs are found
8. Complete a level to unlock the next difficulty

## Technologies Used

- HTML5
- CSS3 (with animations and transitions)
- JavaScript (ES6+ with ES modules)
- Bootstrap 5 (for responsive layout and components)
- Material Icons (for card faces and UI elements)
- SCSS (for theming)

## Development

The game is built using a modular approach with ES modules:

- `index.html`: Main game structure
- `src/app.js`: Main application file that orchestrates the game
- `src/theme-switcher.js`: Dark/light mode functionality
- `src/components/game-state.js`: Game state management
- `src/components/card.js`: Card-related functionality
- `src/components/ui.js`: UI-related functionality
- `css/theme.css`: Generated from SCSS theme
- `css/custom.css`: Game-specific styles

## Running the Game

1. Clone the repository
2. Navigate to the project directory
3. Open `index.html` in a web browser

Alternatively, use the npm scripts:

```bash
# Install dependencies
npm install

# Run the development server
npm run start-a3
```

## Recent Changes and Fixes

The game has been refactored to use a modular approach with ES modules for better maintainability and organization:

1. **Code Modularization**:
   - Separated game logic into specialized modules:
     - `game-state.js`: Manages game state and persistence
     - `card.js`: Handles card creation, rendering, and interactions
     - `ui.js`: Manages UI updates and interactions
     - `app.js`: Orchestrates the game flow and module interactions

2. **Bug Fixes**:
   - Fixed card rendering issues by properly removing event listeners before clearing the game grid
   - Fixed theme switching functionality with improved error handling and initialization
   - Added proper error checking for DOM elements to prevent null reference errors
   - Enhanced logging for better debugging
   - Removed circular dependencies in module imports
   - Fixed module loading issues by removing self-initialization in theme-switcher.js
   - Ensured theme switcher is initialized both on module load and DOMContentLoaded

3. **Icon System Update**:
   - Replaced Bootstrap Icons with Material Icons for better visual consistency
   - Created a comprehensive mapping of card types to Material Icons

4. **Improved Error Handling**:
   - Added try-catch blocks for critical operations
   - Added user-friendly error messages
   - Added detailed logging for debugging
   - Improved error recovery to prevent cascading failures

5. **Script Loading Optimization**:
   - Simplified script loading in index.html to prevent duplicate module loading
   - Removed redundant script tags to prevent conflicts
   - Ensured proper initialization order for dependencies

These changes ensure the game runs smoothly and provides a better user experience while making the codebase more maintainable for future development.
