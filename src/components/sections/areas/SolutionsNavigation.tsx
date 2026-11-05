import { useEffect, useState } from 'react'

const sections = [
  { id: 'empresas', label: 'Empresas' },
  { id: 'gobierno', label: 'Gobierno' },
  { id: 'productos-relacionados', label: 'Productos' },
]

export default function SolutionsNavigation() {
  const [active, setActive] = useState('empresas')

  useEffect(() => {
    let frame = 0
    const measure = () => {
      let current = sections[0].id
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (
          element &&
          element.getBoundingClientRect().top <=
            Math.max(150, window.innerHeight * 0.3)
        )
          current = section.id
      }
      setActive(current)
    }
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    <nav
      className="solutions-navigation"
      aria-label="Secciones de Gobierno y Empresas"
    >
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-current={active === section.id ? 'location' : undefined}
        >
          {section.label}
        </a>
      ))}
    </nav>
  )
}
