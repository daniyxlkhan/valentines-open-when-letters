import React, { useState, useEffect } from 'react';
import './PasswordModal.css';

const PasswordModal = ({ onClose, onSubmit, unlockDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const targetDate = new Date(unlockDate).getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsUnlocked(true);
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
  }, [unlockDate]);

  const handleUnlock = () => {
    onSubmit();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <h2>💌 Valentine's Day Letter</h2>
        {!isUnlocked ? (
          <>
            <p>This letter unlocks on Valentine's Day</p>
            {timeRemaining && (
              <div className="countdown-timer">
                <div className="countdown-item">
                  <span className="countdown-value">{timeRemaining.days}</span>
                  <span className="countdown-label">Days</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-value">{timeRemaining.hours}</span>
                  <span className="countdown-label">Hours</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-value">{timeRemaining.minutes}</span>
                  <span className="countdown-label">Minutes</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-value">{timeRemaining.seconds}</span>
                  <span className="countdown-label">Seconds</span>
                </div>
              </div>
            )}
            <p className="countdown-message">✨ Come back on Valentine's Day ✨</p>
          </>
        ) : (
          <>
            <p className="unlock-message">🎉 Happy Valentine's Day! 🎉</p>
            <p>The letter is now unlocked!</p>
            <button onClick={handleUnlock} className="submit-btn">
              Open Letter
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordModal;
