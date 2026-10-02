import { useEffect, useState } from 'react'
import IntroVideo from './components/IntroVideo.jsx'
import { Hero, Events } from './components/Invitation.jsx'
import { intro, groom, bride } from './data.js'
import './App.css'

// phase: 'intro' (doors opening) → 'names' (couple names over the temple)
//        → 'content' (video holds its last frame behind the first screen, and
//          the whole page becomes scrollable; the arch scrolls away with it)
export default function App() {
  const [phase, setPhase] = useState('intro')
  const ready = phase === 'content'

  // Always start at the top, and don't let the page scroll during the intro.
  useEffect(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    document.documentElement.classList.toggle('locked', !ready)
  }, [ready])

  return (
    <div className="page">
      <div className="stage">
        <IntroVideo {...intro} onPhase={setPhase} />

        <div
          className={`names-overlay ${phase === 'names' ? 'is-visible' : ''}`}
          aria-hidden={phase !== 'names'}
        >
          <p className="script">{groom.name}</p>
          <p className="weds">Weds</p>
          <p className="script">{bride.name}</p>
        </div>

        {ready && <Hero />}
      </div>

      {ready && <Events />}
    </div>
  )
}
