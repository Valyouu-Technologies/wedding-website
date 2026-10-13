import { useEffect, useRef, useState } from 'react'
import { isSoundOn, isUnlocked, subscribe } from '../sound.js'

// If the video hasn't started by then (slow network), skip to the invitation.
const START_TIMEOUT_MS = 6000

// Plays the intro (with its music) once and reports which phase we're in
// based on its playback time. After the last frame it simply stays paused,
// acting as the background. Underneath sits a still of that final frame (or, on
// large screens, the wide background), shown on its own when the video is
// skipped or can't play.
export default function IntroVideo({
  video,
  poster,
  endFrame,
  wideFrame,
  wideQuery,
  skip: skipVideo,
  namesFrom,
  namesUntil,
  contentAt,
  onPhase,
}) {
  const videoRef = useRef(null)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    if (skipVideo) {
      onPhase('content')
      return
    }

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
    // `paused` turns false as soon as play() is called, even while the video
    // is still buffering, so time out unless playback has actually begun.
    const timeout = setTimeout(skip, START_TIMEOUT_MS)
    const onPlaying = () => clearTimeout(timeout)

    el.addEventListener('error', skip)
    el.addEventListener('ended', onEnded)
    el.addEventListener('playing', onPlaying)
    // Try with sound first. Most phones refuse sound before the guest has
    // tapped, so fall back to playing muted and turn the music on at the
    // first tap (see sound.js).
    const begin = () => {
      if (!cancelled) raf = requestAnimationFrame(tick)
    }
    el.muted = !isSoundOn()
    el.play()
      .then(begin)
      .catch(() => {
        if (cancelled) return
        el.muted = true
        el.play().then(begin).catch(skip)
      })
    const unsubscribe = subscribe(() => {
      if (!el.ended) el.muted = !(isSoundOn() && isUnlocked())
    })

    return () => {
      cancelled = true
      clearTimeout(timeout)
      cancelAnimationFrame(raf)
      unsubscribe()
      el.removeEventListener('error', skip)
      el.removeEventListener('ended', onEnded)
      el.removeEventListener('playing', onPlaying)
    }
  }, [skipVideo, namesFrom, namesUntil, contentAt, onPhase])

  return (
    <>
      <picture>
        <source media={wideQuery} srcSet={wideFrame} />
        <img className="bg-media still" src={endFrame} alt="" />
      </picture>
      {!skipVideo && (
        <video
          ref={videoRef}
          className="bg-media"
          src={video}
          poster={poster}
          playsInline
          preload="auto"
          disablePictureInPicture
          hidden={blocked}
        />
      )}
    </>
  )
}
