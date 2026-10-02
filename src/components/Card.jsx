import { useEffect, useRef, useState } from 'react'

// Only one card plays with sound at a time.
const UNMUTE = 'card-unmute'

function InviteVideo({ src, poster, label }) {
  const ref = useRef(null)
  const [muted, setMuted] = useState(true)

  // Play only while mostly on screen, so off-screen cards don't use data.
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.preload = 'auto'
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    const onOtherUnmute = (e) => {
      if (e.detail !== el) setMuted(true)
    }
    window.addEventListener(UNMUTE, onOtherUnmute)
    return () => {
      io.disconnect()
      window.removeEventListener(UNMUTE, onOtherUnmute)
    }
  }, [])

  // React doesn't reliably sync the `muted` attribute, so set the property.
  useEffect(() => {
    ref.current.muted = muted
  }, [muted])

  const toggle = () => {
    const el = ref.current
    if (muted) {
      window.dispatchEvent(new CustomEvent(UNMUTE, { detail: el }))
      el.play().catch(() => {})
    }
    setMuted(!muted)
  }

  return (
    <>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted={muted}
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
