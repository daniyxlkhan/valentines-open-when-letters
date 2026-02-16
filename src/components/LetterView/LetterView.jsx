import React, { useState, useEffect } from 'react';
import './LetterView.css';

const LetterView = ({ letter, onClose, isValentineReveal = false }) => {
  const [showHearts, setShowHearts] = useState(isValentineReveal);

  useEffect(() => {
    // Prevent body scroll when letter is open
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Restore original overflow when letter closes
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    if (isValentineReveal) {
      // Hide hearts after animation completes
      const timer = setTimeout(() => setShowHearts(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isValentineReveal]);
  const handleVoiceNote = () => {
    const audio = new Audio(`/audio/voice-note-${letter.id}.mp3`);
    audio.play().catch(err => {
      console.log('Voice note playback failed:', err);
      alert('Could not play voice note. Make sure the file exists at public/audio/voice-note-' + letter.id + '.mp3');
    });
  };

  return (
    <div className={`letter-view ${isValentineReveal ? 'valentine-reveal' : ''}`}>
      {showHearts && (
        <div className="hearts-animation">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="floating-heart"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                fontSize: `${1 + Math.random() * 1.5}rem`
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}
      
      <button className="close-btn-letter" onClick={onClose}>
        ✕
      </button>
      
      <div className={`letter-paper ${isValentineReveal ? 'valentine-paper' : ''}`}>
        <div className="paper-texture">
          {/* Decorative header */}
          <div className="letter-header">
            <div className="decorative-line"></div>
            <div className="heart-divider">❤️</div>
            <div className="decorative-line"></div>
          </div>

          {/* Letter Title */}
          <h2 className="letter-title">{letter.title}</h2>
          
          {/* Photo if exists */}
          {letter.hasPhoto && letter.imagePrompt && (
            <div className="letter-photo">
              <div className="photo-frame">
                <img src={letter.imagePrompt} alt="Memory" />
              </div>
            </div>
          )}
          
          {/* Letter Body */}
          <div className="letter-body">
            {letter.content.split('\n').map((line, i) => (
              <p key={i} className="letter-line">{line}</p>
            ))}
          </div>

          {/* Signature area */}
          <div className="letter-signature">
            <p className="signature-text">Yours,</p>
            <p className="signature-name">[Your Name]</p>
          </div>

          {/* Decorative footer */}
          <div className="letter-footer">
            <div className="decorative-line"></div>
          </div>
        </div>

        {/* Action buttons outside the paper */}
        {letter.hasVoiceNote && (
          <div className="letter-actions">
            <button 
              className="action-btn voice-btn"
              onClick={handleVoiceNote}
            >
              <span className="btn-icon">🎙️</span>
              <span>Play Voice Note</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LetterView;
