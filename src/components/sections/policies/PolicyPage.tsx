import { useState } from "react";
import { Download, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { buttonStyles } from "@/components/ui/Button";
import { PolicyHero } from "@/components/sections/policies/PolicyHero";
import { PolicyPartView } from "@/components/sections/policies/PolicyPartView";
import { PolicySectionCard } from "@/components/sections/policies/PolicySectionCard";
import { PolicyCard } from "@/components/sections/policies/PolicyCard";
import { policies, policiesContact } from "@/data/policies";
import type { Policy } from "@/data/policies";
import { cn } from "@/lib/cn";

export function PolicyPage({ policy }: { policy: Policy }) {
    const [activeId, setActiveId] = useState(policy.parts[0].id);
    const part = policy.parts.find((item) => item.id === activeId) ?? policy.parts[0];
    const hasTabs = policy.parts.length > 1;
    const others = policies.filter((item) => item.slug !== policy.slug);

    return (
        <div className="bg-night text-white">
            <PolicyHero policy={policy} />

            {hasTabs && (
                <section className="border-y border-primary/40 bg-deep py-6">
                    <Container>
                        <div role="group" aria-label="Parte del reglamento" className="flex flex-wrap gap-2">
                            {policy.parts.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    aria-pressed={activeId === item.id}
                                    onClick={() => setActiveId(item.id)}
                                    className={cn(
                                        "rounded-full border px-5 py-2 text-sm font-semibold transition-colors",
                                        activeId === item.id
                                            ? "border-accent bg-accent/10 text-white"
                                            : "border-white/20 text-white/70 hover:text-white",
                                    )}
                                >
                                    {item.tab}
                                </button>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            <PolicyPartView part={part} pdf={policy.pdf} showPartLink={hasTabs} />

            {policy.shared && (
                <section className="border-y border-primary/40 bg-deep py-16">
                    <Container>
                        <SectionTitle eyebrow="Reglamento" title={policy.shared.title} />
                        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {policy.shared.sections.map((section) => (
                                <PolicySectionCard key={section.title} section={section} />
                            ))}
                        </ul>
                    </Container>
                </section>
            )}

            {/* Documento completo */}
            <section id="documento" className="scroll-mt-28 py-16">
                <Container size="md">
                    <div className="rounded-3xl border border-white/10 bg-panel p-8 text-center lg:p-10">
                        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Documento completo</p>
                        <h2 className="mt-3 text-2xl font-bold">{policy.title}</h2>
                        <p className="mt-2 text-sm text-white/60">
                            {policy.code} · Versión {policy.version} · {policy.date}
                        </p>

                        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/75">
                            Esta página es un resumen informativo. El contenido que rige es el del documento completo.
                        </p>

                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <a href={policy.pdf} target="_blank" rel="noopener noreferrer" className={buttonStyles({ size: "lg" })}>
                                Ver documento completo (PDF)
                                <ExternalLink aria-hidden="true" className="ml-2 size-4" />
                                <span className="sr-only"> (se abre en una pestaña nueva)</span>
                            </a>
                            <a href={policy.pdf} download className={buttonStyles({ variant: "secondary", size: "lg" })}>
                                <Download aria-hidden="true" className="mr-2 size-4" />
                                Descargar
                            </a>
                        </div>

                        <p className="mt-6 text-xs text-white/60">Consultas: {policiesContact}</p>
                    </div>
                </Container>
            </section>

            {others.length > 0 && (
                <section className="border-t border-primary/40 bg-deep py-16">
                    <Container>
                        <SectionTitle eyebrow="Políticas y ética" title="Otras políticas de Navasoft" />
                        <ul className="mt-8 grid gap-4 md:grid-cols-2">
                            {others.map((item) => (
                                <li key={item.slug}>
                                    <PolicyCard policy={item} />
                                </li>
                            ))}
                        </ul>
                    </Container>
                </section>
            )}
        </div>
    );
}
