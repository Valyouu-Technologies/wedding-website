// All invitation text lives here. Edit freely.
// `map` is the link opened when a venue is tapped; leave it null for no link.

const maps = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

export const intro = {
  video: '/intro.mp4',
  poster: '/intro-start.jpg', // shown while the video loads
  endFrame: '/intro-end.jpg', // shown instead of the video if autoplay is blocked
  // Timings in seconds, matched to the intro video.
  namesFrom: 3.8, // doors open, temple in view
  namesUntil: 7.0, // camera starts pushing into the arch
  contentAt: 8.3, // cream arch has settled
}

export const groom = { name: 'Sudeepth Reddy', parents: 'Son of Megan & Swetha' }
export const bride = { name: 'Sukritha Balaji', parents: 'Daughter of Megan & Swetha' }

export const blessing =
  'With the blessings of our families, we invite you to celebrate the beginning of forever'

export const wedding = {
  day: '01',
  month: 'Nov',
  year: '2026',
  time: '10:08 AM',
  venues: [{ name: 'Ananda Convention', map: maps('Ananda Convention') }],
}

export const events = [
  {
    title: ['Haldi', 'Mehandi'],
    day: '30',
    month: 'Oct',
    year: '2026',
    time: '11:00 AM',
    venues: [
      { name: "Bride's Home", map: null },
      { name: "Groom's Home", map: null },
    ],
  },
  {
    title: ['Sangeeth'],
    day: '30',
    month: 'Oct',
    year: '2026',
    time: '08:00 PM',
    venues: [{ name: 'Tavaro Resort', map: maps('Tavaro Resort') }],
  },
  {
    title: ['Reception'],
    day: '03',
    month: 'Nov',
    year: '2026',
    time: '07:00 PM',
    venues: [{ name: 'Savaaya Convention', map: maps('Savaaya Convention') }],
  },
]

export const gratitude = {
  title: 'With Gratitude',
  text: 'Thank you for celebrating our love, sharing our joy, and being part of the beginning of our forever.',
}
