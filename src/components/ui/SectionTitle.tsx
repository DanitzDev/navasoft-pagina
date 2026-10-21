import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type SectionTitleProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Heading = 'h2',
  className,
}: SectionTitleProps) {
  // Recibe props para personalizar el título de la sección, incluyendo un "eyebrow", el título principal, una descripción opcional, alineación, el tipo de encabezado y clases adicionales
  const isCenter = align === 'center'

  return (
    <header
      className={cn(
        'flex max-w-3xl flex-col gap-4',
        isCenter ? 'mx-auto items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'font-montserratregular font-normal text-sm uppercase tracking-widest',
            'text-text-eyebrow',
          )}
        >
          {eyebrow}
        </span>
      )}

      <Heading
        className={cn(
          'font-poppins text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl',
          'text-white',
        )}
      >
        {title}
      </Heading>

      {description && (
        <p
          className={cn(
            'font-montserratregular font-normal text-base leading-relaxed sm:text-lg',
            'text-slate-300',
          )}
        >
          {description}
        </p>
      )}
    </header>
  )
}
