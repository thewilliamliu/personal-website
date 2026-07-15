'use client'

import { useEffect, useRef } from 'react'

// Aizawa attractor parameters
const a = 0.95
const b = 0.7
const c = 0.6
const d = 3.5
const e = 0.25
const f = 0.1

// One long precomputed orbit, drawn as a continuous curve
const ORBIT_POINTS = 24000
const DT = 0.004

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

    // Precompute the orbit
    const ox3 = new Float32Array(ORBIT_POINTS)
    const oy3 = new Float32Array(ORBIT_POINTS)
    const oz3 = new Float32Array(ORBIT_POINTS)
    {
      let x = 0.1
      let y = 0
      let z = 0
      // burn in
      for (let n = 0; n < 5000; n++) {
        const nx = x + DT * ((z - b) * x - d * y)
        const ny = y + DT * (d * x + (z - b) * y)
        const nz =
          z +
          DT *
            (c +
              a * z -
              (z * z * z) / 3 -
              (x * x + y * y) * (1 + e * z) +
              f * z * x * x * x)
        x = nx
        y = ny
        z = nz
      }
      for (let n = 0; n < ORBIT_POINTS; n++) {
        const nx = x + DT * ((z - b) * x - d * y)
        const ny = y + DT * (d * x + (z - b) * y)
        const nz =
          z +
          DT *
            (c +
              a * z -
              (z * z * z) / 3 -
              (x * x + y * y) * (1 + e * z) +
              f * z * x * x * x)
        x = nx
        y = ny
        z = nz
        ox3[n] = x
        oy3[n] = y
        oz3[n] = z - 0.6
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

      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, width, height)

      const scale = Math.min(width, height) * 0.42
      const cx = width / 2
      const cy = height / 2

      const tilt = 0.2 + smoothT * 1.5
      const angle = spin + smoothT * Math.PI * 2

      const cosA = Math.cos(angle)
      const sinA = Math.sin(angle)
      const cosT = Math.cos(tilt)
      const sinT = Math.sin(tilt)

      ctx.lineWidth = 0.6
      ctx.strokeStyle = 'rgba(225, 230, 240, 0.16)'
      ctx.beginPath()
      for (let i = 0; i < ORBIT_POINTS; i++) {
        const rx = ox3[i] * cosA - oy3[i] * sinA
        const ry = ox3[i] * sinA + oy3[i] * cosA
        const tz = ry * sinT + oz3[i] * cosT
        const sx = cx + rx * scale
        const sy = cy - tz * scale
        if (i === 0) ctx.moveTo(sx, sy)
        else ctx.lineTo(sx, sy)
      }
      ctx.stroke()

      spin += 0.00024 // ~30% of previous speed
      if (!prefersReduced) raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
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
