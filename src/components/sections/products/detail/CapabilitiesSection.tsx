import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { IconBox } from "@/components/ui/IconBox";
import type { Capability } from "@/types";

// Anchos para 6 tarjetas: 2+1 / 1+2 / 1+2 (suma 3 columnas por fila)
const spans = ["lg:col-span-2", "", "", "lg:col-span-2", "", "lg:col-span-2"];

export function CapabilitiesSection({ name, capabilities }: { name: string; capabilities: Capability[] }) {
    return (
        <section id="capacidades" className="scroll-mt-40 border-y border-primary/40 bg-deep py-20">
            <Container>
                <SectionTitle eyebrow="Capacidades" title={`Lo que ${name.toUpperCase()} opera`} />

                <ul className="mt-10 grid gap-4 lg:grid-cols-3">
                    {capabilities.map((capability, i) => (
                        <li
                            key={capability.title}
                            className={`rounded-2xl border border-white/10 bg-panel p-6 transition duration-200 hover:-translate-y-1 hover:border-product ${spans[i] ?? ""}`}
                        >
                            <IconBox icon={capability.icon} className="bg-product-soft text-product" />
                            <h3 className="mt-4 text-lg font-bold">{capability.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-white/70">{capability.text}</p>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}