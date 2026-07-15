'use client'

import { useEffect, useRef } from 'react'

// Aizawa attractor parameters
const a = 0.95
const b = 0.7
const c = 0.6
const d = 3.5
const e = 0.25
const f = 0.1

const DT = 0.002 // slow base speed
const NUM_PARTICLES = 3000

// Other components can set the speed multiplier:
// window.dispatchEvent(new CustomEvent('aizawa-speed', { detail: 1.5 }))
export default function AizawaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let raf = 0
    let speed = 1

    // Theme-aware colors
    const themes = {
      dark: { bg: '#121212', trail: 'rgba(18, 18, 18, 0.18)', dot: '225, 230, 240' },
      light: { bg: '#f6f1e7', trail: 'rgba(246, 241, 231, 0.18)', dot: '70, 58, 45' },
    }
    let colors =
      document.documentElement.dataset.theme === 'light'
        ? themes.light
        : themes.dark

    const onSpeed = (ev: Event) => {
      speed = (ev as CustomEvent<number>).detail
    }
    window.addEventListener('aizawa-speed', onSpeed)

    const onTheme = (ev: Event) => {
      colors =
        (ev as CustomEvent<string>).detail === 'light'
          ? themes.light
          : themes.dark
      ctx.fillStyle = colors.bg
      ctx.fillRect(0, 0, width, height)
    }
    window.addEventListener('site-theme', onTheme)

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const px = new Float32Array(NUM_PARTICLES)
    const py = new Float32Array(NUM_PARTICLES)
    const pz = new Float32Array(NUM_PARTICLES)
    const step = (i: number, dt: number) => {
      const x = px[i]
      const y = py[i]
      const z = pz[i]
      px[i] = x + dt * ((z - b) * x - d * y)
      py[i] = y + dt * (d * x + (z - b) * y)
      pz[i] =
        z +
        dt *
          (c +
            a * z -
            (z * z * z) / 3 -
            (x * x + y * y) * (1 + e * z) +
            f * z * x * x * x)
    }
    // Seed particles uniformly along a long precomputed orbit so the
    // swarm fills the whole attractor with volume at all times,
    // instead of bunching into a thin filament.
    {
      const ORBIT = 60000
      const ox = new Float32Array(ORBIT)
      const oy = new Float32Array(ORBIT)
      const oz = new Float32Array(ORBIT)
      let x = 0.1
      let y = 0
      let z = 0
      const dt0 = 0.01
      for (let n = 0; n < 3000; n++) {
        const nx = x + dt0 * ((z - b) * x - d * y)
        const ny = y + dt0 * (d * x + (z - b) * y)
        const nz =
          z +
          dt0 *
            (c +
              a * z -
              (z * z * z) / 3 -
              (x * x + y * y) * (1 + e * z) +
              f * z * x * x * x)
        x = nx
        y = ny
        z = nz
      }
      for (let n = 0; n < ORBIT; n++) {
        const nx = x + dt0 * ((z - b) * x - d * y)
        const ny = y + dt0 * (d * x + (z - b) * y)
        const nz =
          z +
          dt0 *
            (c +
              a * z -
              (x * x + y * y) * (1 + e * z) -
              (z * z * z) / 3 +
              f * z * x * x * x)
        x = nx
        y = ny
        z = nz
        ox[n] = x
        oy[n] = y
        oz[n] = z
      }
      for (let i = 0; i < NUM_PARTICLES; i++) {
        const j = Math.floor(Math.random() * ORBIT)
        px[i] = ox[j]
        py[i] = oy[j]
        pz[i] = oz[j]
      }
    }

    // Scroll drives the viewing angle
    let scrollT = 0
    let smoothT = 0
    const onScroll = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      )
      scrollT = window.scrollY / max
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    let spin = 0
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const draw = () => {
      smoothT += (scrollT - smoothT) * 0.06

      // Trail fade
      ctx.fillStyle = colors.trail
      ctx.fillRect(0, 0, width, height)

      const scale = Math.min(width, height) * 0.42
      const ox = width / 2
      const oy = height / 2

      // Default view: side-on sphere with the central funnel visible;
      // scrolling tilts through the other views
      const tilt = Math.PI + smoothT * 1.8
      const angle = spin + smoothT * Math.PI * 2

      const cosA = Math.cos(angle)
      const sinA = Math.sin(angle)
      const cosT = Math.cos(tilt)
      const sinT = Math.sin(tilt)
      const dt = DT * speed

      for (let i = 0; i < NUM_PARTICLES; i++) {
        step(i, dt)
        const rx = px[i] * cosA - py[i] * sinA
        const ry = px[i] * sinA + py[i] * cosA
        const rz = pz[i] - 0.6
        const ty = ry * cosT - rz * sinT
        const tz = ry * sinT + rz * cosT

        const sx = ox + rx * scale
        const sy = oy - tz * scale
        let alpha = Math.max(0.12, Math.min(0.7, (ty + 2) / 4))
        // Dim particles across the whole text block (flat, like the
        // center fade), easing back to full brightness at the edges
        const ndx = (sx - width / 2) / (width * 0.24)
        const ndy = (sy - height / 2) / (height * 0.3)
        const d2 = ndx * ndx + ndy * ndy
        if (d2 < 1) alpha *= 0.25
        else if (d2 < 1.7) alpha *= 0.25 + 0.75 * ((d2 - 1) / 0.7)
        ctx.fillStyle = `rgba(${colors.dot}, ${alpha})`
        const size = ty > 0 ? 1.7 : 1
        ctx.fillRect(sx, sy, size, size)
      }

      spin += 0.00024 * speed
      if (!prefersReduced) raf = requestAnimationFrame(draw)
    }
    ctx.fillStyle = colors.bg
    ctx.fillRect(0, 0, width, height)
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('aizawa-speed', onSpeed)
      window.removeEventListener('site-theme', onTheme)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  )
}
