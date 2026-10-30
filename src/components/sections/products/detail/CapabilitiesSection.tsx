import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { IconBox } from "@/components/ui/IconBox";
import { Badge } from "@/components/ui/Badge";
import type { Capability } from "@/types";

const spanClass = { 1: "", 2: "lg:col-span-2", 3: "lg:col-span-3" } as const;
const defaultSpans = ["lg:col-span-2", "", "", "lg:col-span-2", "", "lg:col-span-2"];

export function CapabilitiesSection({ name, capabilities }: { name: string; capabilities: Capability[] }) {
    return (
        <section id="capacidades" className="scroll-mt-28 border-y border-primary/40 bg-deep py-20">
            <Container>
                <SectionTitle eyebrow="Capacidades" title={`Lo que ${name.toUpperCase()} opera`} />

                <ul className="mt-10 grid gap-4 lg:grid-cols-3">
                    {capabilities.map((capability, i) => (
                        <li
                            key={capability.title}
                            className={`rounded-2xl border border-white/10 bg-panel p-6 transition duration-200 hover:-translate-y-1 hover:border-product ${capability.span ? spanClass[capability.span] : (defaultSpans[i] ?? "")
                                }`}
                        >
                            <IconBox icon={capability.icon} className="bg-product-soft text-product" />
                            <h3 className="mt-4 text-lg font-bold">{capability.title}</h3>
                            {capability.text && (
                                <p className="mt-2 text-sm leading-relaxed text-white/70">{capability.text}</p>
                            )}
                            {capability.items && (
                                <ul className="mt-4 flex flex-wrap gap-2">
                                    {capability.items.map((item) => (
                                        <li key={item}>
                                            <Badge variant="outline" className="border-white/20 text-white/80">
                                                {item}
                                            </Badge>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}