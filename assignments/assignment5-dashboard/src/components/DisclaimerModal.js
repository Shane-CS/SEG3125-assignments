import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const DisclaimerModal = ({ show, handleClose, title, content }) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);

  // Focus trap for accessibility
  useEffect(() => {
    if (show && modalRef.current) {
      modalRef.current.focus();
    }
  }, [show]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && show) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [show, handleClose]);

  if (!show) return null;

  return (
    <div className="disclaimer-modal-backdrop" onClick={handleClose}>
      <div 
        className="disclaimer-modal"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="disclaimer-title"
        aria-modal="true"
      >
        <div className="disclaimer-modal-header">
          <h2 id="disclaimer-title" className="disclaimer-modal-title">
            {title || t('disclaimer.title')}
          </h2>
          <button 
            className="disclaimer-modal-close" 
            onClick={handleClose}
            aria-label={t('disclaimer.closeLabel')}
          >
            &times;
          </button>
        </div>
        <div className="disclaimer-modal-body">
          {content || (
            <>
              <p>{t('disclaimer.content')}</p>
              <p>
                <a 
                  href="https://www.bankofcanada.ca/valet" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {t('disclaimer.source')}
                </a>
              </p>
            </>
          )}
        </div>
        <div className="disclaimer-modal-footer">
          <button 
            className="btn btn-primary" 
            onClick={handleClose}
          >
            {t('disclaimer.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;
