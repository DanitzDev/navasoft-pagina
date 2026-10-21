import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { institutions } from "@/data/government";

export function GovernmentSection() {
    return (
        <section className="bg-night py-20 text-white">
            <Container>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <SectionTitle
                        eyebrow="Gobierno y sector público"
                        title="Cuando la tecnología impacta a miles de personas, la confianza lo es todo."
                        description="Trabajamos junto a organizaciones públicas para modernizar procesos, optimizar la gestión y generar mejores servicios para la ciudadanía."
                        className="max-w-2xl"
                    />
                    <ArrowLink to="/areas/$slug" params={{ slug: "gobierno" }} className="shrink-0">
                        Ver proyectos de gobierno
                    </ArrowLink>
                </div>

                <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {institutions.map((institution) => (
                        <li key={institution.name}>
                            <Card className="h-full border-white/10 bg-field shadow-none">
                                <CardContent className="gap-2 p-5">
                                    <h3 className="text-lg font-bold leading-snug text-white">{institution.name}</h3>
                                    <p className="text-sm text-white/75">{institution.description}</p>
                                </CardContent>
                            </Card>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}