import { useEffect, useRef } from 'react'

// Sin JavaScript u observador el contenido permanece visible. Cada bloque entra una sola vez.
export function useSectionReveal<T extends HTMLElement = HTMLElement>() {
  const section = useRef<T>(null)

  useEffect(() => {
    const element = section.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        element.dataset.reveal = 'visible'
        observer.disconnect()
      },
      { threshold: 0, rootMargin: '0px 0px -32px 0px' },
    )

    // Los bloques que ya están en pantalla entran sin ocultarlos primero.
    element.dataset.reveal =
      element.getBoundingClientRect().top < window.innerHeight - 32
        ? 'visible'
        : 'pending'
    if (element.dataset.reveal === 'pending') observer.observe(element)

    // Cambiar la preferencia durante la visita también descubre el contenido pendiente.
    const revealWithoutMotion = () => {
      if (!motion.matches) return
      delete element.dataset.reveal
      observer.disconnect()
    }
    motion.addEventListener('change', revealWithoutMotion)

    return () => {
      observer.disconnect()
      motion.removeEventListener('change', revealWithoutMotion)
      delete element.dataset.reveal
    }
  }, [])

  return section
}
