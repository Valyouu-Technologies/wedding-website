// Shared sound state for the invitation videos.
//
// Sound is on by default, but browsers refuse to start audio until the guest
// has tapped, clicked or pressed a key on the page (scrolling doesn't count).
// Until then videos play muted; the first real tap turns sound on for the
// video that's playing and for every one after it.

let soundOn = true
let unlocked = false
const videos = new Set()
const listeners = new Set()

const notify = () => listeners.forEach((fn) => fn())

export const isSoundOn = () => soundOn
export const isUnlocked = () => unlocked

export function setSoundOn(on) {
  soundOn = on
  notify()
}

export function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function register(video) {
  videos.add(video)
  return () => videos.delete(video)
}

// pointerup (not pointerdown/touchend) so a finger that scrolls, which ends in
// pointercancel, isn't mistaken for a tap.
function onGesture(e) {
  // Where supported, trust the browser's own view of whether this counts.
  if (navigator.userActivation && !navigator.userActivation.isActive) return
  unlocked = true
  // iOS only lets a video play with sound if it was first started during a
  // gesture, so briefly start and stop each paused one now, while we're in one.
  videos.forEach((v) => {
    if (!v.paused || v.dataset.primed) return
    v.dataset.primed = '1'
    const wasMuted = v.muted
    v.muted = false
    v.play().catch(() => {})
    v.pause()
    v.muted = wasMuted
  })
  // A tap on a sound button handles that video itself (see Card.jsx).
  if (!e.target.closest?.('.card-btn.sound')) notify()
}

;['pointerup', 'keydown'].forEach((type) =>
  window.addEventListener(type, onGesture, { capture: true, passive: true }),
)
