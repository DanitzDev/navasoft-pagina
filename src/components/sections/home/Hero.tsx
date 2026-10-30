import { useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ButtonLink } from '@/components/ui/Button'
import { useCarousel } from '@/hooks/useCarousel'
import { useInView } from '@/hooks/useInView'
import { heroSlides } from '@/data/hero'
import { cn } from '@/lib/cn'

const arrowButton =
  'flex size-11 items-center justify-center rounded-full border border-white/40 text-white ' +
  'transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60'

export function Hero() {
  const { ref, inView } = useInView<HTMLElement>(0.3)
  const [manualPaused, setManualPaused] = useState(false)
  const { index, goTo, next, prev, setPaused } = useCarousel(
    heroSlides.length,
    5000,
    inView && !manualPaused,
  )

  return (
    <section
      ref={ref}
      aria-roledescription="carrusel"
      className="relative isolate -mt-28 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={(event) => {
        if (!event.currentTarget.contains(document.activeElement))
          setPaused(false)
      }}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
      }}
    >
      {/* Imágenes y sombreado */}
      <div className="absolute inset-0 -z-10">
        {heroSlides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            aria-hidden={i !== index}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 motion-reduce:transition-none',
              i === index ? 'opacity-100' : 'opacity-0',
            )}
          />
        ))}

        {/* 1. Velo general */}
        <div className="absolute inset-0 bg-night/30" />
        {/* 2. Casi sólido a la izquierda, más transparente a la derecha */}
        <div className="absolute inset-0 bg-linear-to-r from-night/95 via-night/75 to-night/35" />
        {/* 3. Oscurece la parte de arriba, detrás del navbar */}
        <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-night/80 to-transparent" />
        {/* 4. Se funde con la sección siguiente */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-night to-transparent" />
      </div>

      <Container className="flex min-h-40rem flex-col justify-center pb-16 pt-44 lg:min-h-48rem">
        <SectionTitle
          as="h1"
          title="Tecnología creada para transformar la operación de organizaciones que no pueden fallar."
          description="Desarrollamos plataformas empresariales, soluciones SaaS e innovación basada en Inteligencia Artificial para organizaciones que buscan crecer, optimizar sus procesos y acelerar su transformación digital."
          titleClassName="lg:text-6xl leading-[1.05]"
          descriptionClassName="text-white/90 lg:text-xl"
        />

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink
            to="/contacto"
            search={{ motivo: 'reunion' }}
            variant="secondary"
            size="lg"
          >
            Solicitar reunión
          </ButtonLink>
          <ButtonLink to="/contacto" search={{ motivo: 'demo' }} size="lg">
            Pedir una demo
          </ButtonLink>
        </div>

        <p className="mt-4 text-sm text-white/70">
          Respuesta en horario hábil · WhatsApp (506) 4070-0776
        </p>

        {/* Etiqueta de la imagen + controles */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {heroSlides[index].label}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label="Seleccionar imagen"
              className="flex items-center gap-1"
            >
              {heroSlides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ir a la imagen ${i + 1}: ${slide.label}`}
                  aria-current={i === index}
                  className="grid size-8 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-1.5 rounded-full',
                      i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/60',
                    )}
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className={cn(arrowButton, 'motion-reduce:hidden')}
                aria-label={
                  manualPaused ? 'Reanudar imágenes' : 'Pausar imágenes'
                }
                onClick={() => setManualPaused((current) => !current)}
              >
                {manualPaused ? (
                  <Play size={18} aria-hidden="true" />
                ) : (
                  <Pause size={18} aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                onClick={prev}
                aria-label="Imagen anterior"
                className={arrowButton}
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Imagen siguiente"
                className={arrowButton}
              >
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
