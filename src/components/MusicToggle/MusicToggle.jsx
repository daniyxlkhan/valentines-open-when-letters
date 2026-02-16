import React from 'react';
import './MusicToggle.css';

const MusicToggle = ({ musicPlaying, onToggle }) => {
  return (
    <button 
      className="music-toggle"
      onClick={onToggle}
      aria-label={musicPlaying ? 'Mute music' : 'Play music'}
    >
      {musicPlaying ? '🎵' : '🔇'}
    </button>
  );
};

export default MusicToggle;
