// Shankha · Tirunamam · Chakra line art. Replace with the designer's exported
// SVG for a pixel-exact match if you have it.
export default function Emblem() {
  const ink = '#3a2c20'
  const spokes = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4
    return (
      <line
        key={i}
        x1={126 + 3.5 * Math.cos(a)}
        y1={33 + 3.5 * Math.sin(a)}
        x2={126 + 9 * Math.cos(a)}
        y2={33 + 9 * Math.sin(a)}
      />
    )
  })

  return (
    <svg
      className="emblem"
      viewBox="0 0 160 70"
      fill="none"
      stroke={ink}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Shankha */}
      <path d="M27 17 L29 9 L32.5 13 L34 7 L35.5 13 L39 9 L41 17 Z" />
      <circle cx="34" cy="5" r="1.4" />
      <path d="M34 18 C46 21 48 37 40 49 C38 52 30 52 28 49 C20 37 22 21 34 18 Z" />
      <path d="M34 22 C40 28 40 38 35 44" />
      <path d="M30 25 C33 31 33 39 31 45" />
      <path d="M23 31 C17 34 17 42 22 46 M45 31 C51 34 51 42 46 46" />
      <path d="M29 53 L39 53 L41 60 L27 60 Z" />

      {/* Tirunamam */}
      <path d="M63 8 L71 8 L78.5 50 L81.5 50 L89 8 L97 8 L86 56 L74 56 Z" fill="#fffaf0" />
      <path d="M74 12 L86 12 L80.8 47 L79.2 47 Z" fill="#b5281f" stroke="#b5281f" strokeWidth="0.8" />
      <path d="M70 59 Q80 63 90 59" />
      <path d="M72 62.5 L88 62.5" />

      {/* Chakra */}
      <path d="M119 17 L121 9 L124.5 13 L126 7 L127.5 13 L131 9 L133 17 Z" />
      <circle cx="126" cy="5" r="1.4" />
      <circle cx="126" cy="33" r="14" />
      <circle cx="126" cy="33" r="10.5" />
      <circle cx="126" cy="33" r="3.5" />
      {spokes}
      <path d="M121 53 L131 53 L133 60 L119 60 Z" />
      <path d="M126 47 L126 53" />
    </svg>
  )
}
