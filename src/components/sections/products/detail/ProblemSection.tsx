import { Check, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { ProductDetail } from "@/types";

type ProblemSectionProps = { name: string; problem: NonNullable<ProductDetail["problem"]> };

const label = "text-xs font-semibold uppercase tracking-widest text-accent";

export function ProblemSection({ name, problem }: ProblemSectionProps) {
    return (
        <section id="problema" className="scroll-mt-40 py-20">
            <Container className="grid gap-12 lg:grid-cols-2">
                <div className="space-y-5">
                    <p className={label}>El problema</p>
                    <p className="text-xl leading-relaxed text-white/90 lg:text-2xl">{problem.intro}</p>
                    <p className="text-sm text-white/60">{problem.audience}</p>
                </div>

                <div className="space-y-3">
                    <p className={label}>Qué queda resuelto</p>

                    <div
                        aria-hidden="true"
                        className="hidden grid-cols-2 px-4 text-xs font-semibold uppercase tracking-wider text-white/50 md:grid"
                    >
                        <span>Hoy</span>
                        <span>Con {name}</span>
                    </div>

                    <ul className="space-y-3">
                        {problem.pairs.map((pair) => (
                            <li
                                key={pair.after}
                                className="grid overflow-hidden rounded-2xl border border-white/10 md:grid-cols-2"
                            >
                                <div className="flex items-start gap-3 bg-night/60 p-4 text-sm text-white/60">
                                    <X aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red-300" />
                                    <span>
                                        <span className="sr-only">Hoy: </span>
                                        {pair.before}
                                    </span>
                                </div>
                                <div className="flex items-start gap-3 bg-product-soft p-4 text-sm text-white">
                                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-product" />
                                    <span>
                                        <span className="sr-only">Con {name}: </span>
                                        {pair.after}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </section>
    );
}