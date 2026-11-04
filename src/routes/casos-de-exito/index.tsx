import { useEffect, useState } from 'react'
import {
  Link,
  createFileRoute,
  redirect,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import { Container } from '../../components/ui/Container'
import { SectionTitle } from '../../components/ui/SectionTitle'
import CaseCard from '../../components/sections/cases/CaseCard'
import InstitutionalBanner from '../../components/shared/institutional-banner/InstitutionalBanner'
import { caseStudies, caseGroups, casesIntroduction } from '../../data/cases'
import { contactBanner } from '../../data/site'

export const Route = createFileRoute('/casos-de-exito/')({
  beforeLoad: ({ location }) => {
    const legacyCase = caseStudies.find((item) => item.id === location.hash)
    if (legacyCase)
      throw redirect({
        to: '/casos-de-exito/$slug',
        params: { slug: legacyCase.id },
        replace: true,
      })
  },
  head: () => ({
    meta: [
      { title: 'Casos de éxito · Navasoft Soluciones' },
      {
        name: 'description',
        content:
          'Explora proyectos de integración industrial, banca, gestión pública y modernización Oracle, y conoce NavaStay, nuestro producto para condominios.',
      },
    ],
  }),
  component: SuccessCasesPage,
})

function SuccessCasesPage() {
  const [activeGroup, setActiveGroup] = useState(caseGroups[0].id)
  useEffect(() => {
    let frame = 0
    const measure = () => {
      let current = caseGroups[0].id
      for (const group of caseGroups) {
        const section = document.getElementById(group.id)
        if (
          section &&
          section.getBoundingClientRect().top <=
            Math.max(150, window.innerHeight * 0.3)
        ) {
          current = group.id
        }
      }
      setActiveGroup(current)
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
  const hash = useLocation({ select: (location) => location.hash })
  const navigate = useNavigate()
  // El fragmento no llega al servidor; también se resuelve tras hidratar.
  useEffect(() => {
    const legacyCase = caseStudies.find((item) => item.id === hash)
    if (legacyCase)
      void navigate({
        to: '/casos-de-exito/$slug',
        params: { slug: legacyCase.id },
        replace: true,
      })
  }, [hash, navigate])
  return (
    <>
      <section
        className="cases-page"
        aria-label="Casos de éxito de Navasoft Soluciones"
      >
        <Container>
          <SectionTitle
            as="h1"
            title="Casos de éxito"
            eyebrow={casesIntroduction.eyebrow}
            description={casesIntroduction.description}
            className="cases-page-heading"
          />
          <div className="cases-page-navigation">
            <nav aria-label="Explorar proyectos">
              <ul className="cases-project-links">
                {caseGroups.map((group) => (
                  <li key={group.id}>
                    <a
                      href={`#${group.id}`}
                      className="cases-project-link"
                      aria-current={
                        activeGroup === group.id ? 'location' : undefined
                      }
                    >
                      {group.title}{' '}
                      <span className="cases-group-count">
                        {group.cases.length}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <Link to="/" hash="casos-de-exito" className="cases-page-return">
              Volver a Inicio
            </Link>
          </div>
          <div className="cases-catalog">
            {caseGroups.map((group) => (
              <section
                key={group.id}
                id={group.id}
                className="cases-category"
                aria-labelledby={`${group.id}-heading`}
              >
                <div className="cases-category-heading">
                  <h2 id={`${group.id}-heading`}>{group.title}</h2>
                  <p>{group.description}</p>
                </div>
                <ul className="success-cases-grid">
                  {group.cases.map((caseStudy) => (
                    <li key={caseStudy.id}>
                      <CaseCard caseStudy={caseStudy} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Container>
      </section>
      <InstitutionalBanner {...contactBanner} showDemo={false} />
    </>
  )
}
