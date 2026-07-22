import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const cups = [
  {
    name: 'Espresso Noir',
    origin: 'Ethiopia · Highland',
    note: 'Bold · Intense · Dark Chocolate',
    body: '#1A1108',
    sleeve: '#2A1F0E',
    accent: '#D4691E',
    price: '$4.50',
  },
  {
    name: 'Velvet Latte',
    origin: 'Colombia · Huila',
    note: 'Smooth · Caramel · Floral',
    body: '#3D2415',
    sleeve: '#4F3020',
    accent: '#E8832A',
    price: '$5.80',
  },
  {
    name: 'Cold Brew Reserve',
    origin: 'Vietnam · Dalat',
    note: 'Crisp · Mellow · Zero Bitterness',
    body: '#0D0804',
    sleeve: '#1A1108',
    accent: '#C45A1A',
    price: '$6.20',
  },
  {
    name: 'Golden Macchiato',
    origin: 'Brazil · Cerrado',
    note: 'Sweet · Nutty · Honey Finish',
    body: '#2A1505',
    sleeve: '#3A2010',
    accent: '#F09030',
    price: '$5.50',
  },
]

const CUP_W = 240
const CUP_H = 304

function CupSVG({ body, sleeve, accent }: { body: string; sleeve: string; accent: string }) {
  return (
    <svg viewBox="0 0 300 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M42 80 L258 80 L235 340 Q232 362 212 362 L88 362 Q68 362 65 340 Z" fill={body} />
      <path d="M48 148 L252 148 L244 204 L56 204 Z" fill={sleeve} />
      <path d="M28 58 Q28 36 42 36 L258 36 Q272 36 272 58 L272 80 L28 80 Z" fill={sleeve} />
      <path d="M88 36 Q150 26 212 36" stroke={body} strokeWidth="2.5" fill="none" opacity="0.6" />
      <ellipse cx="150" cy="40" rx="30" ry="9" fill={body} />
      <path d="M118 22 Q113 11 118 1" stroke={accent} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M150 16 Q145 5 150 -4" stroke={accent} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M182 22 Q177 11 182 1" stroke={accent} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <g transform="translate(97, 212)">
        <path d="M25 8 L81 8 L73 72 Q72 78 64 78 L42 78 Q34 78 33 72 Z" stroke={accent} strokeWidth="2.5" fill="none" />
        <path d="M81 22 Q98 22 98 38 Q98 54 81 54" stroke={accent} strokeWidth="2.5" fill="none" />
        <path d="M38 4 Q35 -3 38 -10" stroke={accent} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M53 1 Q50 -6 53 -13" stroke={accent} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M68 4 Q65 -3 68 -10" stroke={accent} strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>
      <text x="150" y="172" textAnchor="middle" fill={accent} fontSize="11" fontFamily="'Inter',sans-serif" fontWeight="700" letterSpacing="4">COFFEE</text>
      <text x="150" y="194" textAnchor="middle" fill={accent} fontSize="11" fontFamily="'Inter',sans-serif" fontWeight="700" letterSpacing="4">CUP</text>
    </svg>
  )
}

function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  })

  const cup3RotateRaw = useTransform(scrollYProgress, [0, 0.9], [10, 360])
  const cup3XRaw      = useTransform(scrollYProgress, [0, 0.9], [160, 0])
  const cup3YRaw      = useTransform(scrollYProgress, [0, 0.9], [0, 350])
  const cup3Rotate    = useSpring(cup3RotateRaw, { stiffness: 80, damping: 14, restDelta: 0.2 })
  const cup3X         = useSpring(cup3XRaw,     { stiffness: 80, damping: 14, restDelta: 0.2 })
  const cup3Y         = useSpring(cup3YRaw,     { stiffness: 80, damping: 14, restDelta: 0.2 })
  const infoOpacity   = useTransform(scrollYProgress, [0, 0.12, 0.25], [1, 0.6, 0])
  const glowOpacity   = useTransform(scrollYProgress, [0, 0.3, 1], [0.28, 0.1, 0])
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0])

  const offLeft = -(CUP_W / 2)
  const offTop = -(CUP_H / 2)

  return (
    <div ref={scrollRef}>
      <div style={{ height: '250vh' }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden" style={{ backgroundColor: '#F2E8D5' }}>
          {/* Grain texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}
          />

          {/* Glow behind active cup */}
          <motion.div
            className="absolute rounded-full"
            style={{
              left: '50%',
              top: '50%',
              width: 360,
              height: 360,
              marginLeft: -180,
              marginTop: -180,
              backgroundColor: cups[0].accent,
              filter: 'blur(100px)',
              opacity: glowOpacity,
            }}
          />

          {/* Cup 2 — left, behind */}
          <motion.div
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              marginLeft: offLeft,
              marginTop: offTop,
              x: -155,
              rotate: -10,
              zIndex: 20,
              width: CUP_W,
              height: CUP_H,
            }}
          >
            <CupSVG body={cups[1].body} sleeve={cups[1].sleeve} accent={cups[1].accent} />
          </motion.div>

          {/* Cup 1 — center, active */}
          <motion.div
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              marginLeft: offLeft,
              marginTop: offTop,
              rotate: 0,
              zIndex: 40,
              width: CUP_W,
              height: CUP_H,
            }}
          >
            <CupSVG body={cups[0].body} sleeve={cups[0].sleeve} accent={cups[0].accent} />
          </motion.div>

          {/* Cup 4 — far right, partially visible */}
          <motion.div
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              marginLeft: offLeft,
              marginTop: offTop,
              x: 385,
              rotate: -14,
              zIndex: 10,
              width: CUP_W,
              height: CUP_H,
            }}
          >
            <CupSVG body={cups[3].body} sleeve={cups[3].sleeve} accent={cups[3].accent} />
          </motion.div>

          {/* Active cup info overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-between px-10 md:px-20 pointer-events-none"
            style={{ opacity: infoOpacity }}
          >
            <div className="flex flex-col gap-2 max-w-xs">
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ color: cups[0].accent }}
              >
                {cups[0].origin}
              </span>
              <h2
                className="font-display text-4xl md:text-6xl lg:text-7xl leading-none"
                style={{ color: '#1A1108' }}
              >
                {cups[0].name}
              </h2>
              <p className="text-sm mt-1" style={{ color: '#8B7355' }}>
                {cups[0].note}
              </p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <span
                className="font-display text-5xl md:text-7xl tracking-wide"
                style={{ color: cups[0].accent }}
              >
                {cups[0].price}
              </span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#8B7355' }}>
                per cup
              </span>
              <div
                className="mt-4 w-10 h-10 rounded-full flex items-center justify-center font-display text-lg"
                style={{ backgroundColor: cups[0].accent, color: 'white' }}
              >
                01
              </div>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ opacity: scrollHintOpacity }}
          >
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: '#8B7355' }}>
              Scroll
            </span>
            <motion.div
              className="w-px h-10 origin-top"
              style={{ backgroundColor: '#D4691E' }}
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </div>

      {/* Empty landing section */}
      <div style={{ height: '100vh', backgroundColor: '#F2E8D5' }} className="relative" />

      {/* Cup 3 — fixed, animates from hero right side into landing section center */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          marginLeft: offLeft,
          marginTop: offTop,
          x: cup3X,
          y: cup3Y,
          rotate: cup3Rotate,
          zIndex: 50,
          width: CUP_W,
          height: CUP_H,
        }}
      >
        <CupSVG body={cups[2].body} sleeve={cups[2].sleeve} accent={cups[2].accent} />
      </motion.div>
    </div>
  )
}

function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#D4691E' }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
            <path d="M4 15h16v2a4 4 0 01-4 4H8a4 4 0 01-4-4v-2zm1-2l1-8h12l1 8H5z" />
          </svg>
        </div>
        <span className="font-display text-2xl tracking-widest" style={{ color: '#1A1108' }}>
          LOUNGE
        </span>
      </div>
      <ul className="hidden md:flex items-center gap-8">
        {['Home', 'Menu', 'Shop', 'About'].map((link) => (
          <li key={link}>
            <a href="#" className="text-sm font-medium tracking-wide transition-colors" style={{ color: '#5C3D1E' }}>
              {link}
            </a>
          </li>
        ))}
      </ul>
      <motion.button
        className="hidden md:block px-5 py-2 rounded-full text-sm font-semibold text-white"
        style={{ backgroundColor: '#D4691E' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Order Now
      </motion.button>
    </motion.nav>
  )
}

export default function App() {
  return (
    <main>
      <Navbar />
      <HeroSection />
    </main>
  )
}
