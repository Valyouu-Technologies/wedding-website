import { useEffect, useRef, useState } from 'react'
import Emblem from './Emblem.jsx'
import Card from './Card.jsx'
import { groom, bride, blessing, events, gratitude } from '../data.js'

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
      <span className="time">{time}</span>
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

function Person({ parents, name, ...rest }) {
  return (
    <div {...rest}>
      <p className="caps parents">
        {parents[0]}
        <br />
        {parents[1]}
      </p>
      <h1 className="script">{name}</h1>
    </div>
  )
}

// True while the page is scrolled to (nearly) the very top.
function useAtTop(threshold = 24) {
  const [atTop, setAtTop] = useState(true)
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY <= threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return atTop
}

// The first screen, laid over the intro video's final frame.
export function Hero() {
  // Staggered entrance.
  const step = (i, className = '') => ({ style: { '--i': i }, className: `enter ${className}` })
  const next = () => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })
  const atTop = useAtTop()

  return (
    <section className="hero">
      <div {...step(0)}>
        <Emblem />
      </div>
      <p {...step(1, 'caps together')}>
        Together with
        <br />
        their families
      </p>
      <p {...step(2, 'blessing')}>{blessing}</p>

      <Person {...step(3, 'person first')} {...groom} />
      <p {...step(4, 'weds')}>Weds</p>
      <Person {...step(5, 'person')} {...bride} />

      <div {...step(6, 'scroll-cue-wrap')}>
        <button
          type="button"
          className={`scroll-cue ${atTop ? '' : 'is-hidden'}`}
          onClick={next}
          tabIndex={atTop ? 0 : -1}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
          Step into our celebration
        </button>
      </div>
    </section>
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
      { threshold: 0.15 },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])
  return ref
}

export function Events() {
  const ref = useReveal()

  return (
    <main className="events" id="events" ref={ref}>
      {events.map((ev) => (
        <section key={ev.title.join()} className="event on-scroll">
          <h2 className="event-title">
            <span className="star">✦</span>
            <span>
              {ev.title.map((part, i) => (
                <span key={part}>
                  {i > 0 && <em className="amp">&amp;</em>}
                  {part}
                </span>
              ))}
            </span>
            <span className="star">✦</span>
          </h2>
          <DateTime {...ev} />

          <div className={`cards ${ev.cards.length === 1 ? 'single' : ''}`}>
            {ev.cards.map((card, i) => (
              <Card key={i} {...card} label={`${ev.title.join(' & ')} invitation`} />
            ))}
          </div>

          <p className="caps venue-label">Venue</p>
          <Venues venues={ev.venues} />
        </section>
      ))}

      <footer className="gratitude on-scroll">
        <div className="monogram" aria-label="S & S">
          <span>S</span>
          <span>S</span>
        </div>
        <div className="divider" aria-hidden="true">
          <span>✦</span>
          <i />
          <span>✦</span>
        </div>
        <h2>{gratitude.title}</h2>
        <p>{gratitude.text}</p>
      </footer>
    </main>
  )
}
