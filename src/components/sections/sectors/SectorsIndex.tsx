import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectorCard } from "@/components/sections/sectors/SectorCard";
import { SectorCta } from "@/components/sections/sectors/SectorCta";
import { sectorGroups, sectors, type SectorGroup } from "@/data/sectors";

export function SectorsIndex() {
    const groups = Object.keys(sectorGroups) as SectorGroup[];

    return (
        <div className="bg-night text-white">
            <section className="relative isolate -mt-28 overflow-hidden pb-16 pt-40">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10"
                    style={{
                        background:
                            "radial-gradient(60% 60% at 80% 15%, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent)",
                    }}
                />
                <Container>
                    <SectionTitle
                        as="h1"
                        eyebrow="Sectores"
                        title="Sectores que impulsamos"
                        // MAQUETA (sección "Confianza" del Inicio)
                        description="Durante más de 15 años, Navasoft ha impulsado la transformación digital de instituciones públicas, empresas privadas y organizaciones que generan impacto en Costa Rica."
                        titleClassName="lg:text-6xl"
                    />
                </Container>
            </section>

            <section className="pb-20">
                <Container className="space-y-14">
                    {groups.map((group) => (
                        <div key={group}>
                            <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60">
                                {sectorGroups[group]}
                            </h2>
                            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {sectors
                                    .filter((sector) => sector.group === group)
                                    .map((sector) => (
                                        <li key={sector.slug}>
                                            <SectorCard sector={sector} />
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    ))}
                </Container>
            </section>

            <SectorCta topic="privado" />
        </div>
    );
}