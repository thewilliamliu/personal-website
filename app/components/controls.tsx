'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import SpeedDial from 'app/components/speed-dial'

// Top-right control cluster: speed dial (optional) with a "see the math"
// hint, plus theme and font toggles. Preferences persist in localStorage.
export default function Controls({ showDial = false }: { showDial?: boolean }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [font, setFont] = useState<'sans' | 'serif'>('sans')

  useEffect(() => {
    const el = document.documentElement
    setTheme(el.dataset.theme === 'light' ? 'light' : 'dark')
    setFont(el.dataset.font === 'serif' ? 'serif' : 'sans')
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {}
    window.dispatchEvent(new CustomEvent('site-theme', { detail: next }))
  }

  const toggleFont = () => {
    const next = font === 'sans' ? 'serif' : 'sans'
    setFont(next)
    document.documentElement.dataset.font = next
    try {
      localStorage.setItem('font', next)
    } catch {}
  }

  const btn =
    'ctrl flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[13px] transition-transform hover:scale-105'

  return (
    <div className="fixed right-6 top-6 z-10 flex flex-row items-start gap-2">
      {showDial && <SpeedDial />}
      <Link
        href="/attractor"
        className={btn}
        aria-label="The math behind the background"
        title="The math behind the background"
      >
        <span className="text-[15px] leading-none">∫</span>
      </Link>
      <button
        type="button"
        onClick={toggleTheme}
        className={btn}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      >
        {theme === 'dark' ? (
          // sun
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        ) : (
          // moon
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
          </svg>
        )}
      </button>
      <button
        type="button"
        onClick={toggleFont}
        className={btn}
        aria-label={`Switch to ${font === 'sans' ? 'serif' : 'sans-serif'} font`}
        title={font === 'sans' ? 'Serif font' : 'Sans-serif font'}
        style={{
          fontFamily:
            font === 'sans'
              ? "'Newsreader Variable', Georgia, serif"
              : "-apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        Aa
      </button>
    </div>
  )
}
