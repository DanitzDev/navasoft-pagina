import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ButtonLink } from "@/components/ui/Button";
import { useCarousel } from "@/hooks/useCarousel";
import { heroSlides } from "@/data/hero";
import { cn } from "@/lib/cn";

export function Hero() {
    const { index, goTo, setPaused } = useCarousel(heroSlides.length, 3000);

    return (
        <section
            aria-roledescription="carrusel"
            className="relative isolate overflow-hidden bg-panel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            {/* Imágenes de fondo */}
            <div className="absolute inset-0 -z-10">
                {heroSlides.map((slide, i) => (
                    <img
                        key={slide.src}
                        src={slide.src}
                        alt={slide.alt}
                        aria-hidden={i !== index}
                        loading={i === 0 ? "eager" : "lazy"}
                        className={cn(
                            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
                            i === index ? "opacity-100" : "opacity-0",
                        )}
                    />
                ))}
                <div className="absolute inset-0 bg-panel/70" />
            </div>

            {/* Contenido */}
            <Container className="flex min-h-32rem flex-col justify-center py-24 lg:min-h-40remc:\Users\iamjh\AppData\Local\Packages\MicrosoftWindows.Client.Core_cw5n1h2txyewy\TempState\ScreenClip\{FE7C5FF7-8CD8-4B71-8E30-71D90400CD20}.png">
                <SectionTitle
                    as="h1"
                    title="Tecnología creada para transformar la operación de organizaciones que no pueden fallar."
                    description="Plataformas empresariales, soluciones SaaS e innovación con IA para instituciones y empresas que necesitan resultados confiables."
                />

                <div className="mt-8 flex flex-wrap gap-3">
                    <ButtonLink to="/contacto" search={{ motivo: "reunion" }} variant="secondary" size="lg">
                        Solicitar reunión
                    </ButtonLink>
                    <ButtonLink to="/contacto" search={{ motivo: "demo" }} size="lg">
                        Pedir una demo
                    </ButtonLink>
                </div>

                <p className="mt-4 text-sm text-white/70">
                    Respuesta en horario hábil · WhatsApp (506) 4070-0776
                </p>

                {/* Indicadores */}
                <div role="group" aria-label="Seleccionar imagen" className="mt-12 flex gap-2">
                    {heroSlides.map((slide, i) => (
                        <button
                            key={slide.src}
                            type="button"
                            onClick={() => goTo(i)}
                            aria-label={`Ir a la imagen ${i + 1}`}
                            aria-current={i === index}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-300",
                                i === index ? "w-10 bg-accent" : "w-6 bg-white/40 hover:bg-white/70",
                            )}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}