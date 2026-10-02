// All invitation text lives here. Edit freely.
// `map` is the link opened when a venue is tapped; leave it null for no link.

const maps = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

export const intro = {
  video: '/intro.mp4',
  poster: '/intro-start.jpg', // shown while the video loads
  endFrame: '/intro-end.jpg', // shown instead of the video if autoplay is blocked
  // Large screens (tablets, laptops, desktops) skip the intro and show this
  // wide background instead. Keep in sync with the media query in App.css.
  wideFrame: '/bg-wide.jpg',
  wideQuery: '(min-width: 768px) and (min-height: 520px)',
  // Timings in seconds, matched to the intro video.
  namesFrom: 3.0, // doors open, temple in view
  namesUntil: 7.0, // camera starts pushing into the arch
  contentAt: 8.3, // cream arch has settled
}

export const groom = {
  name: 'Sudeepth Reddy',
  parents: ['Son of Smt. Adulla Saritha', 'Sri. Adulla Srinivas Reddy'],
}
export const bride = {
  name: 'Sukritha Balaji',
  parents: ['Daughter of Smt. Kavitha Balaji', 'Sri. V.S. Balaji'],
}

export const blessing =
  'With the blessings of our families, we invite you to celebrate the beginning of forever'

// Cards shown in each event's swipeable row.
//   { video, poster }  an invitation video (plays muted; guests can unmute)
//   { image }          a still image, cropped to fill the card
//   download           file saved by the download button (defaults to the media)
//   {}                 an empty black card, until the artwork is ready

export const events = [
  {
    title: ['Haldi', 'Mehandi'],
    day: '30',
    month: 'Oct',
    year: '2026',
    time: '10:00 AM',
    cards: [{ video: '/media/haldi.mp4', poster: '/media/haldi-poster.jpg' }],
    venues: [
      { name: "Bride's Home", map: null },
      { name: "Groom's Home", map: 'https://maps.app.goo.gl/TefFaHhzWL4FynTCA' },
    ],
  },
  {
    title: ['Sangeeth'],
    day: '30',
    month: 'Oct',
    year: '2026',
    time: '06:00 PM',
    cards: [{ video: '/media/sangeeth.mp4', poster: '/media/sangeeth-poster.jpg' }],
    venues: [{ name: 'Tavaro Resort', map: maps('Tavaro Resort Kokapet Hyderabad') }],
  },
  {
    title: ['Wedding'],
    day: '01',
    month: 'Nov',
    year: '2026',
    time: '10:08 AM',
    cards: [{ video: '/media/wedding.mp4', poster: '/media/wedding-poster.jpg' }],
    venues: [
      { name: 'Ananda Convention', map: maps('Ananda Convention Himayath Sagar Hyderabad') },
    ],
  },
  {
    title: ['Reception'],
    day: '03',
    month: 'Nov',
    year: '2026',
    time: '07:00 PM',
    cards: [{ video: '/media/reception.mp4', poster: '/media/reception-poster.jpg' }],
    venues: [{ name: 'Savaaya Convention', map: maps('Savaaya Convention Gandipet Hyderabad') }],
  },
]

export const gratitude = {
  title: 'With Gratitude',
  text: "Our story brought us here, but it's your presence that will make every celebration complete. See you soon.",
}
