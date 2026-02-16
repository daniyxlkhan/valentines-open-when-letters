import React from 'react';
import LetterCard from '../LetterCard/LetterCard';
import './LetterGrid.css';

const LetterGrid = ({ letters, openedLetters, onLetterClick }) => {
  return (
    <div className="letters-grid">
      {letters.map((letter) => (
        <LetterCard
          key={letter.id}
          letter={letter}
          isOpened={openedLetters.includes(letter.id)}
          onClick={() => onLetterClick(letter)}
        />
      ))}
    </div>
  );
};

export default LetterGrid;
