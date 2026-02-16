import React, { useState, useRef } from 'react';
import { letters } from './data/letters';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header/Header';
import ProgressBar from './components/ProgressBar/ProgressBar';
import MusicToggle from './components/MusicToggle/MusicToggle';
import LetterGrid from './components/LetterGrid/LetterGrid';
import LetterView from './components/LetterView/LetterView';
import PasswordModal from './components/PasswordModal/PasswordModal';
import Login from './components/Login/Login';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
  const [openedLetters, setOpenedLetters] = useLocalStorage('openedLetters', []);
  const [currentLetter, setCurrentLetter] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isValentineReveal, setIsValentineReveal] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [audio] = useState(new Audio('/music/background-music.mp3'));
  const scrollPositionRef = useRef(0);

  const APP_PASSWORD = 'password';

  const handleLogin = (password) => {
    if (password === APP_PASSWORD) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLetterClick = (letter) => {
    // Save current scroll position before opening letter
    scrollPositionRef.current = window.scrollY || window.pageYOffset;
    
    // Check if locked letter has unlockDate and if it's unlocked
    const isTimeUnlocked = letter.unlockDate && new Date().getTime() >= new Date(letter.unlockDate).getTime();
    
    if (letter.isLocked && !isTimeUnlocked) {
      // Still locked - show countdown modal
      setCurrentLetter(letter);
      setShowPasswordModal(true);
    } else {
      // Unlocked or not locked so open directly
      setCurrentLetter(letter);
      // Trigger Valentine animation for letter #12
      if (letter.id === 12) {
        setIsValentineReveal(true);
      }
      if (!openedLetters.includes(letter.id)) {
        setOpenedLetters([...openedLetters, letter.id]);
      }
    }
  };

  const handlePasswordSubmit = () => {
    setShowPasswordModal(false);
    // Trigger Valentine animation for letter #12 every time it's unlocked
    if (currentLetter.id === 12) {
      setIsValentineReveal(true);
    }
    if (!openedLetters.includes(currentLetter.id)) {
      setOpenedLetters([...openedLetters, currentLetter.id]);
    }
  };

  const closeLetter = () => {
    // Restore scroll position after a brief delay to ensure DOM is updated
    setTimeout(() => {
      window.scrollTo(0, scrollPositionRef.current);
    }, 0);
    setCurrentLetter(null);
    setShowPasswordModal(false);
    setIsValentineReveal(false);
  };

  const toggleMusic = () => {
    if (!musicPlaying) {
      audio.loop = true;
      audio.volume = 0.2; // Set volume to 20%
      audio.play().catch(err => {
        console.log('Audio playback failed:', err);
        alert('Add your music file to public/music/background-music.mp3');
      });
    } else {
      audio.pause();
    }
    setMusicPlaying(!musicPlaying);
  };

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Show letter view if a letter is selected and password verified
  if (currentLetter && !showPasswordModal) {
    return (
      <LetterView 
        letter={currentLetter} 
        onClose={closeLetter} 
        isValentineReveal={isValentineReveal}
      />
    );
  }

  return (
    <div className="app">
      <MusicToggle musicPlaying={musicPlaying} onToggle={toggleMusic} />
      
      <Header />
      
      <ProgressBar 
        openedLetters={openedLetters.length} 
        totalLetters={letters.length} 
      />
      
      <LetterGrid 
        letters={letters}
        openedLetters={openedLetters}
        onLetterClick={handleLetterClick}
      />

      {showPasswordModal && (
        <PasswordModal
          onClose={closeLetter}
          onSubmit={handlePasswordSubmit}
          unlockDate={currentLetter?.unlockDate}
        />
      )}
    </div>
  );
}

export default App;
