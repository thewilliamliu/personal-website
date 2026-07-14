'use client'

import { useEffect, useRef } from 'react'

// Aizawa attractor parameters
const a = 0.95
const b = 0.7
const c = 0.6
const d = 3.5
const e = 0.25
const f = 0.1

const NUM_PARTICLES = 2500
const DT = 0.01

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

    // Seed particles near the attractor, burn in so they settle onto it
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
    for (let n = 0; n < 300; n++) {
      for (let i = 0; i < NUM_PARTICLES; i++) step(i)
    }
    // Desynchronize particles along the trajectory
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const extra = Math.floor(Math.random() * 500)
      for (let n = 0; n < extra; n++) step(i)
    }

    let angle = 0
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const draw = () => {
      // Trail fade
      ctx.fillStyle = 'rgba(10, 10, 10, 0.25)'
      ctx.fillRect(0, 0, width, height)

      const scale = Math.min(width, height) * 0.28
      const cx = width / 2
      const cy = height / 2 + scale * 0.15
      const cosA = Math.cos(angle)
      const sinA = Math.sin(angle)

      for (let i = 0; i < NUM_PARTICLES; i++) {
        step(i)
        // Rotate around the z (vertical) axis
        const rx = px[i] * cosA - py[i] * sinA
        const ry = px[i] * sinA + py[i] * cosA
        // Simple perspective
        const depth = 1 / (1 + ry * 0.25 + 1.5)
        const sx = cx + rx * scale
        const sy = cy - (pz[i] - 0.6) * scale
        const alpha = Math.max(0.15, Math.min(0.7, (ry + 2) / 4))
        ctx.fillStyle = `rgba(220, 225, 235, ${alpha})`
        const size = Math.max(0.6, 2.2 * depth)
        ctx.fillRect(sx, sy, size, size)
      }

      angle += 0.0018
      if (!prefersReduced) raf = requestAnimationFrame(draw)
    }
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, width, height)
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
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
