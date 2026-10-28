import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ConsultButton } from "@/components/sections/products/ConsultButton";
import type { ProductSlug } from "@/types";

export function ProductCta({ name, slug }: { name: string; slug: ProductSlug }) {
    return (
        <section id="demo" className="relative isolate scroll-mt-40 overflow-hidden border-t border-primary/40 bg-deep py-24">
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(50% 60% at 50% 0%, color-mix(in oklab, var(--product) 30%, transparent), transparent)",
                }}
            />

            <Container size="md" className="flex flex-col items-center gap-8 text-center">
                <SectionTitle
                    as="h2"
                    align="center"
                    eyebrow="Socio tecnológico"
                    title={`¿Demo de ${name.toUpperCase()} o una reunión sobre su operación?`}
                    description="Le mostramos el producto sobre su proceso, no sobre una demo genérica."
                />

                <div className="flex flex-wrap justify-center gap-3">
                    <ConsultButton topic={slug} motivo="reunion" variant="secondary" size="lg">
                        Solicitar reunión
                    </ConsultButton>
                    <ConsultButton topic={slug} motivo="demo" size="lg">
                        Solicitar demostración
                    </ConsultButton>
                </div>

                <p className="text-sm text-white/70">Respuesta en horario hábil · WhatsApp (506) 4070-0776</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                    Estamos preparados para ser su socio tecnológico.
                </p>
            </Container>
        </section>
    );
}