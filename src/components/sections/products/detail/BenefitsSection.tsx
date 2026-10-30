import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";
import type { Benefits } from "@/types";

export function BenefitsSection({ benefits }: { benefits: Benefits }) {
    const { savings } = benefits;

    return (
        <section id="beneficios" className="scroll-mt-28 border-y border-primary/40 bg-deep py-20">
            <Container>
                <SectionTitle eyebrow="Beneficios" title={benefits.title} />

                <div className={cn("mt-10 grid gap-6", savings && "lg:grid-cols-[1.4fr_1fr]")}>
                    <ul className="grid content-start gap-3 sm:grid-cols-2">
                        {benefits.items.map((item) => (
                            <li
                                key={item}
                                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-panel px-4 py-3.5 text-sm"
                            >
                                <Check aria-hidden="true" className="size-4 shrink-0 text-product" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    {savings && (
                        <aside className="rounded-3xl border border-product bg-product-soft p-8">
                            <p className="text-xs font-semibold uppercase tracking-widest text-product">
                                {savings.title}
                            </p>
                            <h3 className="mt-2 text-2xl font-bold">{savings.lead}</h3>
                            <ul className="mt-6 space-y-3">
                                {savings.items.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-white">
                                        <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-product" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 border-t border-white/15 pt-4 font-semibold">{savings.closing}</p>
                        </aside>
                    )}
                </div>
            </Container>
        </section>
    );
}