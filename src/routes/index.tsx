import { createFileRoute } from '@tanstack/react-router'
import Button, { ButtonLink } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="bg-slate-900">
      <Button variant="secondary" onClick={() => alert('SIUUUU')}>
        Siu
      </Button>
      <ButtonLink variant="primary" to="/contacto" search={{ motivo: "demo", tema: "gridxia" }}>
        Pedir una demo
      </ButtonLink>

      <SectionTitle
      eyebrow='Confianza'
      title='La confianza se construye con resultados.'
      description='Durante más de 15 años, Navasoft ha impulsado la transformación digital de instituciones públicas, empresas privadas y organizaciones que generan impacto en Costa Rica mediante plataformas tecnológicas, innovación y soluciones empresariales.'
      ></SectionTitle>
    </div>
  )
}
