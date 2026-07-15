'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const MIN = 0
const MAX = 3

// A small circular dial in the corner.
// Drag up/down to change the animation speed; a plain click
// (no drag) opens the /attractor page.
export default function SpeedDial() {
  const [speed, setSpeed] = useState(1)
  const dragging = useRef(false)
  const moved = useRef(false)
  const startY = useRef(0)
  const startSpeed = useRef(1)
  const router = useRouter()

  const setAndBroadcast = (v: number) => {
    const clamped = Math.min(MAX, Math.max(MIN, v))
    setSpeed(clamped)
    window.dispatchEvent(new CustomEvent('aizawa-speed', { detail: clamped }))
  }

  const onPointerDown = (ev: React.PointerEvent) => {
    dragging.current = true
    moved.current = false
    startY.current = ev.clientY
    startSpeed.current = speed
    ;(ev.target as HTMLElement).setPointerCapture(ev.pointerId)
  }
  const onPointerMove = (ev: React.PointerEvent) => {
    if (!dragging.current) return
    const dy = startY.current - ev.clientY
    if (Math.abs(dy) > 4) moved.current = true
    if (moved.current) setAndBroadcast(startSpeed.current + dy / 60)
  }
  const onPointerUp = () => {
    dragging.current = false
    if (!moved.current) router.push('/attractor')
  }

  // Needle angle: -120° at MIN, +120° at MAX
  const angle = -120 + ((speed - MIN) / (MAX - MIN)) * 240

  return (
    <div className="fixed right-6 top-6 z-10 flex flex-col items-center gap-1.5 select-none">
      <div
        role="slider"
        aria-label="Animation speed (click for details)"
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={Math.round(speed * 100) / 100}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={(ev) => {
          if (ev.key === 'ArrowUp') setAndBroadcast(speed + 0.25)
          if (ev.key === 'ArrowDown') setAndBroadcast(speed - 0.25)
          if (ev.key === 'Enter') router.push('/attractor')
        }}
        className="glass-card flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-105"
        title="Drag to change speed · click to learn about the attractor"
      >
        <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
          {/* tick marks */}
          {[-120, -60, 0, 60, 120].map((t) => (
            <line
              key={t}
              x1="17"
              y1="4"
              x2="17"
              y2="7"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="1"
              transform={`rotate(${t} 17 17)`}
            />
          ))}
          {/* needle */}
          <line
            x1="17"
            y1="17"
            x2="17"
            y2="6"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            transform={`rotate(${angle} 17 17)`}
            style={{ transition: dragging.current ? 'none' : 'transform .2s' }}
          />
          <circle cx="17" cy="17" r="1.8" fill="white" />
        </svg>
      </div>
      <span className="font-mono text-[10px] text-white/60">
        {speed.toFixed(1)}x
      </span>
    </div>
  )
}
