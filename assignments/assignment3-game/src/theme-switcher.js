/**
 * Theme Switcher for PairQuest
 * Handles toggling between light and dark themes
 */

/**
 * Initialize the theme switcher
 */
function initThemeSwitcher() {
    console.log('Theme switcher: Initializing');

    try {
        // Get the theme toggle button
        const themeToggle = document.getElementById('theme-toggle');

        if (!themeToggle) {
            console.error('Theme switcher: Toggle button not found');
            return;
        }

        // Check if user has a saved preference
        const savedTheme = localStorage.getItem('pairquest-theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-bs-theme', savedTheme);
        }

        // Remove any existing click listeners to prevent duplicates
        themeToggle.removeEventListener('click', toggleTheme);

        // Add click event listener
        themeToggle.addEventListener('click', toggleTheme);

        console.log('Theme switcher: Initialized successfully');
    } catch (error) {
        console.error('Theme switcher: Initialization error', error);
    }
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    try {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        // Update the theme
        document.documentElement.setAttribute('data-bs-theme', newTheme);

        // Save preference to localStorage
        localStorage.setItem('pairquest-theme', newTheme);

        console.log(`Theme switcher: Switched to ${newTheme} mode`);
    } catch (error) {
        console.error('Theme switcher: Toggle error', error);
    }
}

// Export functions
export { initThemeSwitcher, toggleTheme };
