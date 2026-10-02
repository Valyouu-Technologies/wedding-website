import { useState } from 'react'
import IntroVideo from './components/IntroVideo.jsx'
import Invitation from './components/Invitation.jsx'
import { intro, groom, bride } from './data.js'
import './App.css'

// Phones play the intro; large screens skip it (see intro.wideQuery).
// phase: 'intro' (doors opening) → 'names' (couple names over the temple)
//        → 'content' (video holds its last frame, the arch, as a fixed
//          background; the invitation fades in and scrolls inside it)
export default function App() {
  const [phase, setPhase] = useState('intro')
  // Decided once on load: large screens go straight to the invitation.
  const [wide] = useState(() => window.matchMedia(intro.wideQuery).matches)

  return (
    <div className="page">
      <IntroVideo {...intro} skip={wide} onPhase={setPhase} />

      <div
        className={`names-overlay ${phase === 'names' ? 'is-visible' : ''}`}
        aria-hidden={phase !== 'names'}
      >
        <p className="script">{groom.name}</p>
        <p className="weds">Weds</p>
        <p className="script">{bride.name}</p>
      </div>

      {phase === 'content' && <Invitation />}
    </div>
  )
}
