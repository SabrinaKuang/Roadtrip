import { useState, useEffect } from 'react'
import './App.css'
import { stories } from './stories'
import { fonts } from './fonts'
import { songs } from './songs'
import TypewriterText from './TypewriterText'
import MusicPlayer from './MusicPlayer'
import { formatStory, getRandomBoxSize } from './formatStory'

function App() {
  const [storyIndex, setStoryIndex] = useState(0)
  const [fontIndex, setFontIndex] = useState(0)
  const [songIndex, setSongIndex] = useState(0)
  const [boxSize, setBoxSize] = useState(getRandomBoxSize())
  const [isTyping, setIsTyping] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [formattedStory, setFormattedStory] = useState(formatStory(stories[0]))

  const getRandomDuration = () => {
    const options = [15, 20, 25, 30];
    return options[Math.floor(Math.random() * options.length)] * 1000; // Convert to milliseconds
  }

  // Auto-advance songs on timer
  useEffect(() => {
    if (!audioEnabled) return;

    const duration = getRandomDuration();
    const timer = setTimeout(() => {
      setSongIndex((prev) => (prev + 1) % songs.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [songIndex, audioEnabled]);

  const nextStory = () => {
    // Enable audio on first click
    if (!audioEnabled) {
      setAudioEnabled(true);
    }

    // Ignore clicks while typing
    if (isTyping) {
      return;
    }

    // Randomize story, font, and box size
    const randomStoryIndex = Math.floor(Math.random() * stories.length)
    const randomFontIndex = Math.floor(Math.random() * fonts.length)
    const newBoxSize = getRandomBoxSize()

    setStoryIndex(randomStoryIndex)
    setFontIndex(randomFontIndex)
    setBoxSize(newBoxSize)
    setFormattedStory(formatStory(stories[randomStoryIndex]))
  }

  const handleTypingStart = () => {
    setIsTyping(true)
  }

  const handleTypingComplete = () => {
    setIsTyping(false)
  }

  return (
    <div className="app" onClick={nextStory}>
      <div className="background" />
      <div 
        className="story" 
        style={{ 
          fontFamily: fonts[fontIndex],
          width: `${boxSize.width}px`,
          height: `${boxSize.height}px`
        }}
      >
        <TypewriterText 
          story={formattedStory} 
          onComplete={handleTypingComplete}
          onStartTyping={handleTypingStart}
        />
      </div>
      <div className='music'>
        <MusicPlayer song={songs[songIndex]} shouldPlay={audioEnabled} />
      </div>
    </div>
  )
}

export default App