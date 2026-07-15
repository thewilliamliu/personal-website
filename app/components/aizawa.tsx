'use client'

import { useEffect, useRef } from 'react'

// Aizawa attractor parameters
const a = 0.95
const b = 0.7
const c = 0.6
const d = 3.5
const e = 0.25
const f = 0.1

const DT = 0.01

type Instance = {
  n: number // particle count
  cx: number // center x, fraction of width
  cy: number // center y, fraction of height
  scale: number // fraction of min(w,h)
  tiltX: number // fixed tilt around x-axis
  angle: number // initial rotation
  speed: number // rotation speed
  px: Float32Array
  py: Float32Array
  pz: Float32Array
}

function makeInstance(
  n: number,
  cx: number,
  cy: number,
  scale: number,
  tiltX: number,
  angle: number,
  speed: number
): Instance {
  const px = new Float32Array(n)
  const py = new Float32Array(n)
  const pz = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    px[i] = 0.1 + Math.random() * 0.1
    py[i] = Math.random() * 0.1
    pz[i] = Math.random() * 0.1
  }
  return { n, cx, cy, scale, tiltX, angle, speed, px, py, pz }
}

function step(inst: Instance, i: number) {
  const x = inst.px[i]
  const y = inst.py[i]
  const z = inst.pz[i]
  inst.px[i] = x + DT * ((z - b) * x - d * y)
  inst.py[i] = y + DT * (d * x + (z - b) * y)
  inst.pz[i] =
    z +
    DT *
      (c +
        a * z -
        (z * z * z) / 3 -
        (x * x + y * y) * (1 + e * z) +
        f * z * x * x * x)
}

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

    // Three copies of the attractor at different positions, sizes,
    // and viewing angles — placed toward the edges so the card
    // doesn't hide them.
    const instances: Instance[] = [
      // Big one, upper-left, tilted to show the disc edge-on
      makeInstance(1800, 0.22, 0.3, 0.34, 1.1, 0.5, 0.0016),
      // Right side, viewed more top-down (shows the spiral disc)
      makeInstance(1400, 0.82, 0.68, 0.26, 0.35, 2.1, -0.0022),
      // Small one, bottom-left, side view
      makeInstance(900, 0.14, 0.85, 0.16, 1.5, 4.0, 0.0028),
    ]

    // Burn in so particles settle onto the attractor, then desync
    for (const inst of instances) {
      for (let nn = 0; nn < 300; nn++)
        for (let i = 0; i < inst.n; i++) step(inst, i)
      for (let i = 0; i < inst.n; i++) {
        const extra = Math.floor(Math.random() * 500)
        for (let nn = 0; nn < extra; nn++) step(inst, i)
      }
    }

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const draw = () => {
      // Trail fade
      ctx.fillStyle = 'rgba(10, 10, 10, 0.22)'
      ctx.fillRect(0, 0, width, height)

      const m = Math.min(width, height)

      for (const inst of instances) {
        const scale = m * inst.scale
        const ox = width * inst.cx
        const oy = height * inst.cy
        const cosA = Math.cos(inst.angle)
        const sinA = Math.sin(inst.angle)
        const cosT = Math.cos(inst.tiltX)
        const sinT = Math.sin(inst.tiltX)

        for (let i = 0; i < inst.n; i++) {
          step(inst, i)
          // Rotate around z (spin), then tilt around x (viewing angle)
          const rx = inst.px[i] * cosA - inst.py[i] * sinA
          const ry = inst.px[i] * sinA + inst.py[i] * cosA
          const rz = inst.pz[i] - 0.6
          const ty = ry * cosT - rz * sinT
          const tz = ry * sinT + rz * cosT

          const sx = ox + rx * scale
          const sy = oy - tz * scale
          const alpha = Math.max(0.12, Math.min(0.65, (ty + 2) / 4))
          ctx.fillStyle = `rgba(220, 225, 235, ${alpha})`
          const size = ty > 0 ? 1.6 : 1
          ctx.fillRect(sx, sy, size, size)
        }

        inst.angle += inst.speed
      }

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
