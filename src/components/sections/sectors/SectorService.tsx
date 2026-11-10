import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { areas } from "@/data/areas";
import type { Sector } from "@/data/sectors";

export function SectorService({ sector }: { sector: Sector }) {
    const area = areas.find((item) => item.slug === sector.area);
    if (!area?.page || area.page === "navalav") return null;

    return (
        <section id="servicios" className="scroll-mt-28 py-20">
            <Container>
                <div className="rounded-3xl border border-white/10 bg-panel p-8 lg:p-10">
                    <SectionTitle eyebrow="Servicio de Navasoft" title={area.name} description={area.description} />

                    <ul className="mt-6 flex flex-wrap gap-2">
                        {area.tags.map((tag) => (
                            <li key={tag}>
                                <Badge variant="outline" size="md" className="border-white/25 text-white/80">
                                    {tag}
                                </Badge>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8">
                        <ArrowLink to="/areas/$slug" params={{ slug: area.page }}>
                            Conocer {area.name}
                        </ArrowLink>
                    </div>
                </div>
            </Container>
        </section>
    );
}