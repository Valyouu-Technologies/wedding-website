import { useEffect, useRef, useState } from 'react'

// If the video hasn't started by then (slow network), skip to the invitation.
const START_TIMEOUT_MS = 6000

// Plays the intro once and reports which phase we're in based on its playback
// time. After the last frame it simply stays paused, acting as the background.
export default function IntroVideo({
  video,
  poster,
  endFrame,
  namesFrom,
  namesUntil,
  contentAt,
  onPhase,
}) {
  const videoRef = useRef(null)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    let raf = 0
    let cancelled = false
    let current = null

    const report = (phase) => {
      if (phase !== current) {
        current = phase
        onPhase(phase)
      }
    }

    const tick = () => {
      const t = el.currentTime
      if (t >= contentAt) return report('content')
      report(t >= namesFrom && t < namesUntil ? 'names' : 'intro')
      raf = requestAnimationFrame(tick)
    }

    // Autoplay refused (e.g. iOS Low Power Mode) or the file failed: show the
    // final frame as a still image and go straight to the invitation.
    const skip = () => {
      if (cancelled || current === 'content') return
      cancelAnimationFrame(raf)
      setBlocked(true)
      report('content')
    }

    const onEnded = () => report('content')
    const timeout = setTimeout(() => {
      if (el.paused) skip()
    }, START_TIMEOUT_MS)

    el.addEventListener('error', skip)
    el.addEventListener('ended', onEnded)
    el.play()
      .then(() => {
        clearTimeout(timeout)
        if (!cancelled) raf = requestAnimationFrame(tick)
      })
      .catch(skip)

    return () => {
      cancelled = true
      clearTimeout(timeout)
      cancelAnimationFrame(raf)
      el.removeEventListener('error', skip)
      el.removeEventListener('ended', onEnded)
    }
  }, [namesFrom, namesUntil, contentAt, onPhase])

  return (
    <>
      <video
        ref={videoRef}
        className="bg-media"
        src={video}
        poster={poster}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        hidden={blocked}
      />
      {blocked && <img className="bg-media" src={endFrame} alt="" />}
    </>
  )
}
