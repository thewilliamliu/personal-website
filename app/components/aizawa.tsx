'use client'

import { useEffect, useRef } from 'react'

// Aizawa attractor parameters
const a = 0.95
const b = 0.7
const c = 0.6
const d = 3.5
const e = 0.25
const f = 0.1

const DT = 0.006 // slower particle motion
const NUM_PARTICLES = 3000

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

    const px = new Float32Array(NUM_PARTICLES)
    const py = new Float32Array(NUM_PARTICLES)
    const pz = new Float32Array(NUM_PARTICLES)
    for (let i = 0; i < NUM_PARTICLES; i++) {
      px[i] = 0.1 + Math.random() * 0.1
      py[i] = Math.random() * 0.1
      pz[i] = Math.random() * 0.1
    }
    const step = (i: number) => {
      const x = px[i]
      const y = py[i]
      const z = pz[i]
      px[i] = x + DT * ((z - b) * x - d * y)
      py[i] = y + DT * (d * x + (z - b) * y)
      pz[i] =
        z +
        DT *
          (c +
            a * z -
            (z * z * z) / 3 -
            (x * x + y * y) * (1 + e * z) +
            f * z * x * x * x)
    }
    // Burn in, then desynchronize along the trajectory
    for (let n = 0; n < 500; n++) for (let i = 0; i < NUM_PARTICLES; i++) step(i)
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const extra = Math.floor(Math.random() * 800)
      for (let n = 0; n < extra; n++) step(i)
    }

    // Scroll drives the viewing angle
    let scrollT = 0 // 0..1 scroll progress
    let smoothT = 0 // eased version to avoid jumps
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
      ctx.fillStyle = 'rgba(10, 10, 10, 0.18)'
      ctx.fillRect(0, 0, width, height)

      // Large and centered
      const scale = Math.min(width, height) * 0.42
      const ox = width / 2
      const oy = height / 2

      // Scroll: tilt sweeps from top-down (spiral disc) to edge-on,
      // and adds extra rotation, so scrolling tours the attractor.
      const tilt = 0.2 + smoothT * 1.5
      const angle = spin + smoothT * Math.PI * 2

      const cosA = Math.cos(angle)
      const sinA = Math.sin(angle)
      const cosT = Math.cos(tilt)
      const sinT = Math.sin(tilt)

      for (let i = 0; i < NUM_PARTICLES; i++) {
        step(i)
        const rx = px[i] * cosA - py[i] * sinA
        const ry = px[i] * sinA + py[i] * cosA
        const rz = pz[i] - 0.6
        const ty = ry * cosT - rz * sinT
        const tz = ry * sinT + rz * cosT

        const sx = ox + rx * scale
        const sy = oy - tz * scale
        const alpha = Math.max(0.12, Math.min(0.7, (ty + 2) / 4))
        ctx.fillStyle = `rgba(225, 230, 240, ${alpha})`
        const size = ty > 0 ? 1.7 : 1
        ctx.fillRect(sx, sy, size, size)
      }

      spin += 0.0008 // slow ambient rotation
      if (!prefersReduced) raf = requestAnimationFrame(draw)
    }
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, width, height)
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
