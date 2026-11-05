import { useCallback, useEffect, useState } from 'react'

export function useCarousel(length: number, interval = 3000, enabled = true) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [canAnimate, setCanAnimate] = useState(false)
  const next = useCallback(
    () => setIndex((current) => (length > 0 ? (current + 1) % length : 0)),
    [length],
  )
  const prev = useCallback(
    () =>
      setIndex((current) => (length > 0 ? (current - 1 + length) % length : 0)),
    [length],
  )

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setCanAnimate(!motion.matches && !document.hidden)
    update()
    motion.addEventListener('change', update)
    document.addEventListener('visibilitychange', update)
    return () => {
      motion.removeEventListener('change', update)
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  useEffect(() => {
    if (!enabled || !canAnimate || paused || length < 2) return
    const timer = setTimeout(next, interval)
    return () => clearTimeout(timer)
  }, [index, paused, enabled, canAnimate, length, interval, next])

  return { index, goTo: setIndex, next, prev, setPaused }
}
