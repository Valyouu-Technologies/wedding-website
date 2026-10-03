import { useEffect, useRef, useState } from 'react'
import Emblem from './Emblem.jsx'
import Card from './Card.jsx'
import Monogram from './Monogram.jsx'
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

// Whether the scroller is at (nearly) the very top.
function useAtTop(ref, threshold = 24) {
  const [atTop, setAtTop] = useState(true)
  useEffect(() => {
    const el = ref.current
    const onScroll = () => setAtTop(el.scrollTop <= threshold)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [ref, threshold])
  return atTop
}

// Text that slides up into view from behind an invisible line, once its
// section is revealed. `d` staggers it within the section.
function Rise({ as: Tag = 'span', d = 0, className = '', children }) {
  return (
    <Tag className={`rise ${className}`} style={{ '--d': d }}>
      <span className="rise-inner">{children}</span>
    </Tag>
  )
}

// The first screen.
function Hero({ atTop }) {
  // Staggered entrance.
  const step = (i, className = '') => ({ style: { '--i': i }, className: `enter ${className}` })
  const next = () => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })

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

// Reveal each section's pieces (see .reveal in App.css) as it scrolls into view.
function useReveal(ref) {
  useEffect(() => {
    const targets = [...ref.current.querySelectorAll('.reveal')]
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
      { threshold: 0.12 },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [ref])
}

// Everything after the intro. The arch (the video's last frame) stays fixed
// behind; only this scrolls, clipped to the arch opening.
export default function Invitation() {
  const ref = useRef(null)
  useReveal(ref)
  const atTop = useAtTop(ref)

  return (
    <main className="invitation" ref={ref}>
      <Hero atTop={atTop} />
      <div className="events" id="events">
        {events.map((ev) => (
          <section key={ev.title.join()} className="event reveal">
            <h2 className="event-title">
              <span className="star">✦</span>
              <Rise d={0}>
                {ev.title.map((part, i) => (
                  <span key={part}>
                    {i > 0 && <em className="amp">&amp;</em>}
                    {part}
                  </span>
                ))}
              </Rise>
              <span className="star">✦</span>
            </h2>
            <div className="fade-up" style={{ '--d': 1 }}>
              <DateTime {...ev} />
            </div>

            <div className={`cards ${ev.cards.length === 1 ? 'single' : ''}`}>
              {ev.cards.map((card, i) => (
                <Card key={i} label={`${ev.title.join(' & ')} invitation`} {...card} />
              ))}
            </div>

            <p className="caps venue-label fade-up" style={{ '--d': 4 }}>
              Venue
            </p>
            <div className="fade-up" style={{ '--d': 5 }}>
              <Venues venues={ev.venues} />
            </div>
          </section>
        ))}

        <footer className="gratitude reveal">
          <Monogram />
          <div className="divider" aria-hidden="true">
            <span>✦</span>
            <i />
            <span>✦</span>
          </div>
          <Rise as="h2" d={3}>
            {gratitude.title}
          </Rise>
          <p className="fade-up" style={{ '--d': 4 }}>
            {gratitude.text}
          </p>
        </footer>
      </div>
    </main>
  )
}
