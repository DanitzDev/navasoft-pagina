import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { IconBox } from "@/components/ui/IconBox";
import type { Surface } from "@/types";

export function SurfacesSection({ title, surfaces }: { title: string; surfaces: Surface[] }) {
    return (
        <section id="plataforma" className="scroll-mt-28 py-20">
            <Container>
                <SectionTitle eyebrow="Plataforma" title={title} />

                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                    {surfaces.map((surface) => (
                        <article
                            key={surface.name}
                            className="flex flex-col rounded-3xl border border-white/10 bg-panel p-8"
                        >
                            <div className="flex items-center gap-3">
                                <IconBox icon={surface.icon} className="bg-product-soft text-product" />
                                <h3 className="text-xl font-bold">{surface.name}</h3>
                            </div>
                            <p className="mt-3 text-white/70">{surface.tagline}</p>

                            <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                                {surface.items.map((item) => (
                                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/85">
                                        <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-product" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {surface.closing && (
                                <p className="mt-auto pt-6 text-sm font-semibold text-product">{surface.closing}</p>
                            )}
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
}