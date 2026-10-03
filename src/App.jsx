import { useCallback, useEffect, useState } from 'react'
import IntroVideo from './components/IntroVideo.jsx'
import Invitation from './components/Invitation.jsx'
import { intro, opening, groom, bride } from './data.js'
import './App.css'

const FADE_MS = 900

// Phones play the intro; large screens skip it (see intro.wideQuery).
// phase: 'intro' (doors opening) → 'names' (couple names over the temple)
//        → 'content' (video holds its last frame, the arch, as a fixed
//          background)
// Then, inside the arch: the opening lines fade in and out, and the
// invitation follows and scrolls inside it.
export default function App() {
  const [phase, setPhase] = useState('intro')
  // Decided once on load: large screens go straight to the invitation.
  const [wide] = useState(() => window.matchMedia(intro.wideQuery).matches)
  // 'waiting' → 'in' → 'out' → 'done'
  const [openingStep, setOpeningStep] = useState('waiting')

  // Stable, since IntroVideo re-runs its effect when this changes.
  const onPhase = useCallback((next) => {
    setPhase(next)
    if (next === 'content') setOpeningStep((step) => (step === 'waiting' ? 'in' : step))
  }, [])

  useEffect(() => {
    if (openingStep === 'in') {
      const t = setTimeout(() => setOpeningStep('out'), FADE_MS + opening.holdMs)
      return () => clearTimeout(t)
    }
    if (openingStep === 'out') {
      const t = setTimeout(() => setOpeningStep('done'), FADE_MS)
      return () => clearTimeout(t)
    }
  }, [openingStep])

  // A tap skips the opening lines.
  const skipOpening = () => openingStep === 'in' && setOpeningStep('out')

  return (
    <div className="page">
      <IntroVideo {...intro} skip={wide} onPhase={onPhase} />

      <div
        className={`names-overlay ${phase === 'names' ? 'is-visible' : ''}`}
        aria-hidden={phase !== 'names'}
      >
        <p className="script">{groom.name}</p>
        <p className="weds">Weds</p>
        <p className="script">{bride.name}</p>
      </div>

      {(openingStep === 'in' || openingStep === 'out') && (
        <div className={`opening ${openingStep === 'out' ? 'is-leaving' : ''}`} onClick={skipOpening}>
          {opening.lines.map((pair, i) => (
            <p key={i} style={{ '--i': i }}>
              {pair[0]}
              <br />
              {pair[1]}
            </p>
          ))}
        </div>
      )}

      {openingStep === 'done' && <Invitation />}
    </div>
  )
}
