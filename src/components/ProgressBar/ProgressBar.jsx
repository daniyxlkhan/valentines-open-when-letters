import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ openedLetters, totalLetters }) => {
  const progress = Math.round((openedLetters / totalLetters) * 100);

  return (
    <div className="progress-section">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-text">
        Letters opened: {openedLetters}/{totalLetters}
      </p>
    </div>
  );
};

export default ProgressBar;
