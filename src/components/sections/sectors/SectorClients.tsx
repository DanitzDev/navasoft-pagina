import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Sector } from "@/data/sectors";

export function SectorClients({ clients }: { clients: NonNullable<Sector["clients"]> }) {
    return (
        <section id="respaldo" className="scroll-mt-28 border-y border-primary/40 bg-deep py-20">
            <Container>
                <SectionTitle eyebrow="Respaldo" title="Organizaciones de este sector que confían en Navasoft" />

                <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {clients.map((client) => (
                        <li key={client.name} className="rounded-2xl border border-white/10 bg-field p-5">
                            <h3 className="text-lg font-bold text-white">{client.name}</h3>
                            <p className="mt-1 text-sm text-white/75">{client.note}</p>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}