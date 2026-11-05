import type { ReactNode } from 'react'
import { Container } from '../../ui/Container'
import { SectionTitle } from '../../ui/SectionTitle'

type PageHeaderProps = {
  title: string
  description?: string
  children?: ReactNode
}

// El encabezado de página compone los componentes atómicos sin duplicar sus estilos.
// Mantiene un solo h1 y el mismo contenedor en las páginas con presentación sencilla.
export default function PageHeader({
  title,
  description,
  children,
}: PageHeaderProps) {
  const content = description?.trim()
  return (
    <Container
      as="section"
      className="max-w-6xl py-10 [overflow-wrap:anywhere] lg:px-6"
    >
      <SectionTitle as="h1" title={title} />
      {content && <p className="mt-4 text-lg">{content}</p>}
      {/* Acciones relacionadas, como volver al inicio desde la página 404. */}
      {children}
    </Container>
  )
}
