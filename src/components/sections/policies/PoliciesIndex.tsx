import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PolicyCard } from "@/components/sections/policies/PolicyCard";
import { policies, policiesContact } from "@/data/policies";

export function PoliciesIndex() {
    return (
        <div className="bg-night text-white">
            <section className="relative isolate -mt-28 overflow-hidden pb-14 pt-40">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10"
                    style={{
                        background:
                            "radial-gradient(60% 60% at 80% 15%, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent)",
                    }}
                />
                <Container>
                    <SectionTitle
                        as="h1"
                        eyebrow="Navasoft"
                        title="Políticas y ética"
                        // GENERADO: texto de la página índice
                        description="Los compromisos de Navasoft en sostenibilidad ambiental, igualdad, inclusión y diversidad. Cada política tiene un resumen y su documento completo."
                        titleClassName="lg:text-6xl"
                    />
                </Container>
            </section>

            <section className="pb-20">
                <Container>
                    <ul className="grid gap-4 md:grid-cols-2">
                        {policies.map((policy) => (
                            <li key={policy.slug}>
                                <PolicyCard policy={policy} />
                            </li>
                        ))}
                    </ul>

                    <p className="mt-10 text-sm text-white/60">Consultas: {policiesContact}</p>
                </Container>
            </section>
        </div>
    );
}