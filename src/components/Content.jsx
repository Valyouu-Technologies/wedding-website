// Edit the text below with your own details.
export default function Content({ visible }) {
  return (
    <main className={`content ${visible ? 'is-visible' : ''}`}>
      <section className="hero">
        <p className="eyebrow">Together with their families</p>
        <h1 className="names">
          Bride <span>&amp;</span> Groom
        </h1>
        <p className="tagline">invite you to celebrate their wedding</p>
        <div className="scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>
      </section>

      <section className="card">
        <h2>Save the Date</h2>
        <p className="big">Saturday, 12 December 2026</p>
        <p>Muhurtham at 10:30 AM</p>
      </section>

      <section className="card">
        <h2>Venue</h2>
        <p className="big">Venue Name</p>
        <p>Street Address, City</p>
        <a
          className="button"
          href="https://maps.google.com"
          target="_blank"
          rel="noreferrer"
        >
          Open in Maps
        </a>
      </section>

      <section className="card">
        <h2>Events</h2>
        <ul className="events">
          <li><strong>Haldi</strong><span>10 Dec · 9:00 AM</span></li>
          <li><strong>Sangeet</strong><span>11 Dec · 7:00 PM</span></li>
          <li><strong>Wedding</strong><span>12 Dec · 10:30 AM</span></li>
          <li><strong>Reception</strong><span>12 Dec · 7:00 PM</span></li>
        </ul>
      </section>

      <section className="card">
        <h2>Our Story</h2>
        <p>
          Write a few lines about how you met, your journey together, and why
          you can&apos;t wait to celebrate with everyone you love.
        </p>
      </section>

      <footer className="footer">
        <p>With love,</p>
        <p className="names small">Bride &amp; Groom</p>
      </footer>
    </main>
  )
}
