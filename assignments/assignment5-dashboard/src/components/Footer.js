import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = ({ onShowDisclaimer, copyrightText }) => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-copyright">
        {copyrightText || `© ${new Date().getFullYear()} ${t('footer.copyright')}`}
      </div>
      <div className="footer-links">
        <span 
          className="footer-link" 
          onClick={onShowDisclaimer}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onShowDisclaimer();
            }
          }}
        >
          {t('footer.disclaimer')}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
