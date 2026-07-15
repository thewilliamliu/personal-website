'use client'

import { useEffect, useRef, useState } from 'react'

const MIN = 0.1
const MAX = 3

const PRESETS = [0.5, 1, 2, 3]

// A small circular dial. Drag up/down to change the animation speed;
// a plain click (no drag) cycles through preset speeds.
export default function SpeedDial() {
  const [speed, setSpeed] = useState(1)
  const dragging = useRef(false)
  const moved = useRef(false)
  const startY = useRef(0)
  const startSpeed = useRef(1)

  // Stay in sync with speed set elsewhere (e.g. per-page defaults)
  useEffect(() => {
    const w = window as unknown as { __aizawaSpeed?: number }
    if (typeof w.__aizawaSpeed === 'number') setSpeed(w.__aizawaSpeed)
    const onSpeed = (ev: Event) => setSpeed((ev as CustomEvent<number>).detail)
    window.addEventListener('aizawa-speed', onSpeed)
    return () => window.removeEventListener('aizawa-speed', onSpeed)
  }, [])

  const setAndBroadcast = (v: number) => {
    const clamped = Math.min(MAX, Math.max(MIN, v))
    setSpeed(clamped)
    ;(window as unknown as { __aizawaSpeed?: number }).__aizawaSpeed = clamped
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
    if (!moved.current) {
      // cycle to the next preset
      const next = PRESETS.find((v) => v > speed + 0.001) ?? PRESETS[0]
      setAndBroadcast(next)
    }
  }

  // Needle angle: -120° at MIN, +120° at MAX
  const angle = -120 + ((speed - MIN) / (MAX - MIN)) * 240

  return (
    <div className="flex flex-row items-center gap-2 select-none">
      <span className="font-mono text-[10px] opacity-60">
        {speed.toFixed(1)}x
      </span>
      <div
        role="slider"
        aria-label="Animation speed (click to cycle presets)"
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
        }}
        className="ctrl flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-105"
        title="Drag to change speed · click to cycle presets"
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
              stroke="currentColor"
              strokeOpacity="0.45"
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
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            transform={`rotate(${angle} 17 17)`}
            style={{ transition: dragging.current ? 'none' : 'transform .2s' }}
          />
          <circle cx="17" cy="17" r="1.8" fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}
