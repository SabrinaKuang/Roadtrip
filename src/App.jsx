import { useState } from 'react'
import './App.css'
import { stories } from './stories'
import { fonts } from './fonts'
import { songs } from './songs'
import TypewriterText from './TypewriterText'
import MusicPlayer from './MusicPlayer'

function App() {
  const [storyIndex, setStoryIndex] = useState(0)
  const [fontIndex, setFontIndex] = useState(0)
  const [songIndex, setSongIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)

  const nextStory = () => {
    // Enable audio on first click
    if (!audioEnabled) {
      setAudioEnabled(true);
    }

    // Ignore clicks while typing
    if (isTyping) {
      return;
    }
    
    // Go to next story and song in sequence
    const nextStoryIndex = (storyIndex + 1) % stories.length
    const nextSongIndex = (songIndex + 1) % songs.length
    const randomFontIndex = Math.floor(Math.random() * fonts.length)
    
    setStoryIndex(nextStoryIndex)
    setSongIndex(nextSongIndex)
    setFontIndex(randomFontIndex)
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
      <div className="story" style={{ fontFamily: fonts[fontIndex] }}>
        <TypewriterText 
          story={stories[storyIndex]} 
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