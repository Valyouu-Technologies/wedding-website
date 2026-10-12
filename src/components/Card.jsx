import { useEffect, useRef, useState } from 'react'
import { isSoundOn, isUnlocked, register, setSoundOn, subscribe } from '../sound.js'

// How much of a video must be on screen for it to play, and below which it
// stops. The gap keeps it from flickering on and off at the edge.
const PLAY_AT = 0.9
const STOP_BELOW = 0.5

function InviteVideo({ src, poster, label }) {
  const ref = useRef(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const el = ref.current

    // Sound on unless the guest turned it off. If the browser won't allow
    // sound yet, play muted until the first tap (see sound.js).
    const start = () => {
      el.dataset.active = '1'
      el.preload = 'auto'
      el.muted = !(isSoundOn() && isUnlocked())
      el.play().catch(() => {
        el.muted = true
        el.play().catch(() => {})
      })
    }
    const stop = () => {
      delete el.dataset.active
      el.pause()
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= PLAY_AT) start()
        else if (e.intersectionRatio < STOP_BELOW) stop()
        // Start fetching a little before it's needed.
        if (e.isIntersecting) el.preload = 'auto'
      },
      { threshold: [0, STOP_BELOW, PLAY_AT, 1] },
    )
    io.observe(el)

    // Sound unlocked or switched on/off elsewhere: apply it to the playing one.
    const unsubscribe = subscribe(() => {
      if (!el.dataset.active) return
      el.muted = !(isSoundOn() && isUnlocked())
      if (el.paused) start()
    })
    const onVolume = () => setMuted(el.muted)
    el.addEventListener('volumechange', onVolume)
    const unregister = register(el)

    return () => {
      io.disconnect()
      unsubscribe()
      unregister()
      el.removeEventListener('volumechange', onVolume)
    }
  }, [])

  // Turning sound on or off applies to every video from here on.
  const toggle = () => {
    const el = ref.current
    if (el.muted) {
      setSoundOn(true)
      el.muted = false
      el.play().catch(() => {})
    } else {
      setSoundOn(false)
      el.muted = true
    }
  }

  return (
    <>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        aria-label={label}
      />
      <button
        type="button"
        className="card-btn sound"
        onClick={toggle}
        aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
          {muted ? (
            <path d="M16 9.5l5 5M21 9.5l-5 5" />
          ) : (
            <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
          )}
        </svg>
      </button>
    </>
  )
}

// One card in an event's swipeable row: a video, an image, or (with neither)
// an empty black placeholder until the artwork arrives.
export default function Card({ video, poster, image, download, label }) {
  const file = download ?? video ?? image

  return (
    <div className={`card ${video || image ? '' : 'empty'}`}>
      {video && <InviteVideo src={video} poster={poster} label={label} />}
      {image && <img src={image} alt={label} loading="lazy" />}
      {file && (
        <a className="card-btn download" href={file} download aria-label="Download">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4v11M7 10.5l5 5 5-5M5 19.5h14" />
          </svg>
        </a>
      )}
    </div>
  )
}
