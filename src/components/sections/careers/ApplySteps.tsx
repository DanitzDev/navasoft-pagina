import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { applySteps, careersCopy } from "@/data/opportunities";

export function ApplySteps() {
    return (
        <section id="como-aplicar" className="scroll-mt-28 border-y border-primary/40 bg-deep py-20">
            <Container>
                <SectionTitle eyebrow={careersCopy.steps.eyebrow} title={careersCopy.steps.title} />

                <ol className="mt-12 grid gap-10 md:grid-cols-3">
                    {applySteps.map((step, index) => (
                        <li key={step.title} className="relative pt-14">
                            <span aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-px bg-white/15 md:block" />
                            <span
                                aria-hidden="true"
                                className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-night"
                            >
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className="text-lg font-bold">{step.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-white/70">{step.text}</p>
                        </li>
                    ))}
                </ol>
            </Container>
        </section>
    );
}