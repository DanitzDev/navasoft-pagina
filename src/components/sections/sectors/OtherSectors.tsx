import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectorCard } from "@/components/sections/sectors/SectorCard";
import { sectors } from "@/data/sectors";

export function OtherSectors({ currentSlug }: { currentSlug: string }) {
    const others = sectors.filter((sector) => sector.slug !== currentSlug);

    return (
        <section id="sectores" className="scroll-mt-28 border-y border-primary/40 bg-deep py-20">
            <Container>
                <SectionTitle eyebrow="Sectores que impulsamos" title="Otros sectores" />

                <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {others.map((sector) => (
                        <li key={sector.slug}>
                            <SectorCard sector={sector} />
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}