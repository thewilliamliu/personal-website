'use client'

import { useEffect } from 'react'

// Sets the attractor speed when a page mounts (e.g. 0.1x on reading
// pages so the background stays calm). The dial can still override it.
export default function SetSpeed({ value }: { value: number }) {
  useEffect(() => {
    ;(window as unknown as { __aizawaSpeed?: number }).__aizawaSpeed = value
    window.dispatchEvent(new CustomEvent('aizawa-speed', { detail: value }))
  }, [value])
  return null
}
