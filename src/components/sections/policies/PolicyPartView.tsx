import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PolicySectionCard } from "@/components/sections/policies/PolicySectionCard";
import type { PolicyPart } from "@/data/policies";

type PolicyPartViewProps = { part: PolicyPart; pdf: string; showPartLink: boolean };

export function PolicyPartView({ part, pdf, showPartLink }: PolicyPartViewProps) {
    return (
        <>
            <section className="py-16">
                <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
                    <div className="space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Propósito</p>
                        <p className="text-lg leading-relaxed text-white/90">{part.purpose}</p>
                        {showPartLink && part.pdfPage && (
                            <a
                                href={`${pdf}#page=${part.pdfPage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover"
                            >
                                Ver esta parte en el documento completo
                                <ExternalLink aria-hidden="true" className="size-4" />
                                <span className="sr-only"> (se abre en una pestaña nueva)</span>
                            </a>
                        )}
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-panel p-6">
                        <p className="text-xs font-semibold uppercase tracking-widest text-accent">A quién aplica</p>
                        <ul className="mt-4 space-y-3 text-sm text-white/85">
                            {part.appliesTo.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Container>
            </section>

            <section className="border-y border-primary/40 bg-deep py-16">
                <Container>
                    <SectionTitle eyebrow="Principios" title="Principios fundamentales" />
                    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {part.principles.map((principle, i) => (
                            <li key={principle.title} className="rounded-2xl border border-white/10 bg-panel p-6">
                                <span className="text-xs font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
                                <h3 className="mt-2 text-lg font-bold">{principle.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/70">{principle.text}</p>
                            </li>
                        ))}
                    </ul>
                </Container>
            </section>

            <section className="py-16">
                <Container>
                    <SectionTitle eyebrow="Resumen" title="Qué se compromete Navasoft a hacer" />
                    <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {part.sections.map((section) => (
                            <PolicySectionCard key={section.title} section={section} />
                        ))}
                    </ul>
                </Container>
            </section>

            <section className="pb-16">
                <Container size="md">
                    <figure className="rounded-3xl border border-accent/40 bg-accent/5 p-8 text-center">
                        <figcaption className="text-xs font-semibold uppercase tracking-widest text-accent">
                            Compromiso institucional
                        </figcaption>
                        <blockquote className="mt-3 text-lg leading-relaxed text-white/90">{part.commitment}</blockquote>
                    </figure>
                </Container>
            </section>
        </>
    );
}