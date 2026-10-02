import { useEffect, useRef } from 'react'
import Emblem from './Emblem.jsx'
import { groom, bride, blessing, wedding, events, gratitude } from '../data.js'

function DateTime({ day, month, year, time }) {
  return (
    <div className="datetime">
      <span className="day">{day}</span>
      <span className="month-year">
        {month}
        <br />
        {year}
      </span>
      <span className="rule" />
      <span className="time">
        {time}
        <br />
        Venue is
      </span>
    </div>
  )
}

function Venues({ venues }) {
  return (
    <div className="venues">
      {venues.map(({ name, map }) =>
        map ? (
          <a key={name} className="venue" href={map} target="_blank" rel="noreferrer">
            {name}
          </a>
        ) : (
          <span key={name} className="venue">
            {name}
          </span>
        ),
      )}
    </div>
  )
}

// Fade sections in as they scroll into view.
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const targets = [...ref.current.querySelectorAll('.on-scroll')]
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          // Also reveal anything above it, in case a fast fling skipped past.
          targets.slice(0, targets.indexOf(e.target) + 1).forEach((t) => {
            t.classList.add('is-visible')
            io.unobserve(t)
          })
        }),
      { threshold: 0.2 },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])
  return ref
}

// Grow the top fade (CSS --fade) with scroll distance, up to the height of the
// arch's carved top.
function useTopFade(ref) {
  useEffect(() => {
    const el = ref.current
    const onScroll = () => {
      const max = el.clientHeight * 0.24
      el.style.setProperty('--fade', `${Math.min(el.scrollTop, max)}px`)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [ref])
}

export default function Invitation() {
  const ref = useReveal()
  useTopFade(ref)
  // Staggered entrance for the first screen.
  const step = (i) => ({ style: { '--i': i }, className: 'enter' })

  return (
    <main className="invitation" ref={ref}>
      <section className="hero">
        <div {...step(0)}>
          <Emblem />
        </div>
        <p {...step(1)} className="enter caps together">
          Together with
          <br />
          their families
        </p>

        <div {...step(2)} className="enter person first">
          <p className="caps parents">{groom.parents}</p>
          <h1 className="script">{groom.name}</h1>
        </div>
        <p {...step(3)} className="enter weds">
          Weds
        </p>
        <div {...step(4)} className="enter person">
          <p className="caps parents">{bride.parents}</p>
          <h1 className="script">{bride.name}</h1>
        </div>

        <p {...step(5)} className="enter blessing">
          {blessing}
        </p>

        <div {...step(6)} className="enter">
          <DateTime {...wedding} />
          <Venues venues={wedding.venues} />
        </div>
      </section>

      {events.map((ev) => (
        <section key={ev.title.join()} className="event on-scroll">
          <h2 className="event-title">
            <span className="star">✦</span>
            {ev.title.map((part, i) => (
              <span key={part}>
                {i > 0 && <em className="amp">&amp;</em>}
                {part}
              </span>
            ))}
            <span className="star">✦</span>
          </h2>
          <DateTime {...ev} />
          <Venues venues={ev.venues} />
        </section>
      ))}

      <footer className="gratitude on-scroll">
        <h2>{gratitude.title}</h2>
        <p>{gratitude.text}</p>
        <div className="monogram" aria-label="S & S">
          <span>S</span>
          <span>S</span>
        </div>
      </footer>
    </main>
  )
}
