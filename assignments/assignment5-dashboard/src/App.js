import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import DisclaimerModal from './components/DisclaimerModal';

function App() {
  const { i18n, t } = useTranslation();
  const [theme, setTheme] = useState('light');
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [language, setLanguage] = useState('en');

  // Toggle theme between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
  };

  // Toggle language between English and French
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fr' : 'en';
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  // Show disclaimer modal
  const handleShowDisclaimer = () => {
    setShowDisclaimer(true);
  };

  // Hide disclaimer modal
  const handleCloseDisclaimer = () => {
    setShowDisclaimer(false);
  };

  // Set initial theme based on user preference
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = prefersDarkMode ? 'dark' : 'light';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-bs-theme', initialTheme);

    // Show disclaimer on first load
    const hasSeenDisclaimer = localStorage.getItem('hasSeenDisclaimer');
    if (!hasSeenDisclaimer) {
      setShowDisclaimer(true);
      localStorage.setItem('hasSeenDisclaimer', 'true');
    }
  }, []);

  return (
    <div className={`app ${theme}-theme`}>
      <Header 
        toggleTheme={toggleTheme} 
        toggleLanguage={toggleLanguage}
        currentTheme={theme}
        currentLanguage={language}
        title={t('app.title')}
      />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </main>

      <Footer 
        onShowDisclaimer={handleShowDisclaimer} 
        copyrightText={`© ${new Date().getFullYear()} ${t('footer.copyright')}`}
      />

      <DisclaimerModal 
        show={showDisclaimer} 
        handleClose={handleCloseDisclaimer} 
        title={t('disclaimer.title')}
        content={
          <>
            <p>{t('disclaimer.content')}</p>
            <p><a href="https://www.bankofcanada.ca/valet" target="_blank" rel="noopener noreferrer">{t('disclaimer.source')}</a></p>
            <p>{t('dashboard.description')}</p>
          </>
        }
      />
    </div>
  );
}

export default App;
