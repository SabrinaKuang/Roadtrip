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

    // Randomize story, song, and font
    const randomStoryIndex = Math.floor(Math.random() * stories.length)
    const randomSongIndex = Math.floor(Math.random() * songs.length)
    const randomFontIndex = Math.floor(Math.random() * fonts.length)

    setStoryIndex(randomStoryIndex)
    setSongIndex(randomSongIndex)
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