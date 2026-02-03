import React, { useEffect, useRef } from 'react';
import './MusicPlayer.css';

export default function MusicPlayer({ song, shouldPlay }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current || !song || !song.audioUrl || !shouldPlay) {
      return;
    }

    const audio = audioRef.current;
    console.log("Loading song:", song.title, song.audioUrl);
    
    // Pause and reset
    audio.pause();
    audio.currentTime = 0;
    
    // Set source
    audio.src = song.audioUrl;
    
    const handleCanPlay = async () => {
      console.log("Audio can play");
      try {
        audio.currentTime = song.startTime || 0;
        console.log("Starting at:", audio.currentTime);
        await audio.play();
        console.log("Playing successfully");
      } catch (err) {
        console.error("Play failed:", err.message);
      }
    };

    const handleError = (e) => {
      console.error("Audio error:", e);
      console.error("Audio error details:", audio.error);
    };

    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.load();

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, [song, shouldPlay]);

  return (
    <div className="music-player">
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
      />

      <div className="music-header">
        Now Playing... 🎶
      </div>

      <div className="album-cover">
        {song?.coverImage ? (
          <img 
            src={song.coverImage} 
            alt={song.title}
          />
        ) : (
          <div className="album-cover-placeholder">
            🎵
          </div>
        )}
      </div>

      <div className="song-title">
        {song?.title || 'Song Title'}
      </div>

      <div className="song-artist">
        {song?.artist || 'Artist Name'}
      </div>
    </div>
  );
}