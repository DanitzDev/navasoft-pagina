import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

type Step = { title: string; text: string };

export function StepsSection({ name, steps, title }: { name: string; steps: Step[]; title?: string }) {
    return (
        <section id="como-funciona" className="scroll-mt-28 py-20">
            <Container>
                <SectionTitle eyebrow="Flujo de operación" title={title ?? `Cómo funciona ${name}`} />

                <ol className={`mt-12 grid gap-10 sm:grid-cols-2 ${steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}
                >
                    {steps.map((step, i) => (
                        <li key={step.title} className="relative pt-14">
                            <span
                                aria-hidden="true"
                                className="absolute left-0 right-0 top-5 hidden h-px bg-white/15 lg:block"
                            />
                            <span
                                aria-hidden="true"
                                className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full bg-product text-sm font-bold text-night"
                            >
                                {String(i + 1).padStart(2, "0")}
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