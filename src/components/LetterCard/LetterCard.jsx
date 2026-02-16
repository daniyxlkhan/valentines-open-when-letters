import React, { useState, useEffect } from 'react';
import './LetterCard.css';

const LetterCard = ({ letter, isOpened, onClick }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);

  useEffect(() => {
    if (letter.unlockDate && letter.isLocked) {
      const calculateTimeRemaining = () => {
        const now = new Date().getTime();
        const targetDate = new Date(letter.unlockDate).getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
          if (!isUnlocked) {
            setIsUnlocked(true);
            setJustUnlocked(true);
          }
          setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      };

      calculateTimeRemaining();
      const timer = setInterval(calculateTimeRemaining, 1000);

      return () => clearInterval(timer);
    }
  }, [letter.unlockDate, letter.isLocked, isUnlocked]);

  const getIcon = () => {
    if (letter.isLocked && !isUnlocked) return '🔒';
    if (isOpened) return '❤️';
    return '💌';
  };

  const handleClick = () => {
    // Allow click only if not locked or if unlocked
    if (!letter.isLocked || isUnlocked) {
      onClick();
    }
  };

  return (
    <div
      className={`letter-card ${isOpened ? 'opened' : ''} ${letter.isLocked && !isUnlocked ? 'locked' : ''} ${justUnlocked ? 'just-unlocked' : ''}`}
      onClick={handleClick}
    >
      <div className="card-icon">{getIcon()}</div>
      <h3>{letter.title}</h3>
      
      {letter.unlockDate && letter.isLocked && !isUnlocked && timeRemaining && (
        <div className="countdown-on-card">
          <div className="countdown-row">
            <div className="countdown-unit">
              <span className="countdown-num">{timeRemaining.days}</span>
              <span className="countdown-text">d</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-num">{String(timeRemaining.hours).padStart(2, '0')}</span>
              <span className="countdown-text">h</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-num">{String(timeRemaining.minutes).padStart(2, '0')}</span>
              <span className="countdown-text">m</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-num">{String(timeRemaining.seconds).padStart(2, '0')}</span>
              <span className="countdown-text">s</span>
            </div>
          </div>
        </div>
      )}
      
      {justUnlocked && (
        <div className="unlock-celebration">
          <div className="falling-petals">
            {[...Array(30)].map((_, i) => (
              <span 
                key={i} 
                className="petal" 
                style={{ 
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${(i * 0.3) + Math.random() * 2}s`,
                  animationDuration: `${6 + Math.random() * 2}s`,
                  animationIterationCount: 'infinite'
                }}
              >
                🌸
              </span>
            ))}
          </div>
          <div className="unlock-glow"></div>
          <div className="unlock-message">Happy Valentine's Day 💕</div>
        </div>
      )}
      
      {isOpened && !letter.isLocked && (
        <span className="opened-badge">Opened ✓</span>
      )}
    </div>
  );
};

export default LetterCard;
