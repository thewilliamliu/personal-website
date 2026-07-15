'use client'

import { useEffect, useRef, useState } from 'react'

// Scrollable card body: fades out the text at the bottom and shows a
// chevron until the reader has scrolled to the end.
export default function ScrollCard({
  children,
}: {
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [more, setMore] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const check = () => {
      setMore(el.scrollHeight - el.scrollTop - el.clientHeight > 8)
    }
    check()
    el.addEventListener('scroll', check, { passive: true })
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', check)
      ro.disconnect()
    }
  }, [])

  return (
    <div className="relative">
      <div
        ref={ref}
        className="max-h-[calc(100dvh-8.5rem)] overflow-y-auto p-5 md:max-h-[85vh] md:p-10"
        style={
          more
            ? {
                maskImage:
                  'linear-gradient(to bottom, black 82%, transparent 98%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, black 82%, transparent 98%)',
              }
            : undefined
        }
      >
        {children}
      </div>
      {/* scroll hint */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${
          more ? 'opacity-50' : 'opacity-0'
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bounce"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  )
}
