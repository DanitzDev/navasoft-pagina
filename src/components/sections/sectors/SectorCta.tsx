import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ConsultButton } from "@/components/sections/products/ConsultButton";
import type { ContactTopic } from "@/types";

export function SectorCta({ topic }: { topic: ContactTopic }) {
    return (
        <section id="contacto" className="relative isolate scroll-mt-28 overflow-hidden py-24">
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(50% 60% at 50% 0%, color-mix(in oklab, var(--color-accent) 25%, transparent), transparent)",
                }}
            />

            <Container size="md" className="flex flex-col items-center gap-8 text-center">
                <SectionTitle
                    as="h2"
                    align="center"
                    eyebrow="Socio tecnológico"
                    title="Transformemos juntos el siguiente desafío."
                    description="Gobierno, empresa, plataformas SaaS e innovación. Una misma visión para construir soluciones que generan resultados reales."
                />

                <div className="flex flex-wrap justify-center gap-3">
                    <ConsultButton topic={topic} motivo="reunion" variant="secondary" size="lg">
                        Solicitar reunión
                    </ConsultButton>
                    <ConsultButton topic={topic} motivo="demo" size="lg">
                        Solicitar demostración
                    </ConsultButton>
                </div>

                <p className="text-sm text-white/70">Respuesta en horario hábil · WhatsApp (506) 4070-0776</p>
            </Container>
        </section>
    );
}