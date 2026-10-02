import { useState } from 'react'
import IntroVideo from './components/IntroVideo.jsx'
import Invitation from './components/Invitation.jsx'
import { intro, groom, bride } from './data.js'
import './App.css'

// phase: 'intro' (doors opening) → 'names' (couple names over the temple)
//        → 'content' (video holds its last frame, invitation fades in and
//          scrolls inside the fixed arch)
export default function App() {
  const [phase, setPhase] = useState('intro')

  return (
    <div className="page">
      <IntroVideo {...intro} onPhase={setPhase} />

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
