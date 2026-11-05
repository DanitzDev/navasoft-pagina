import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { careersCopy, type ApplyIntent } from "@/data/opportunities";

export function CareersHero({ onApply }: { onApply: (intent: ApplyIntent) => void }) {
    const { eyebrow, title, description, facts, image, imageAlt } = careersCopy.hero;

    return (
        <section className="relative isolate -mt-28 overflow-hidden pb-20 pt-40">
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(60% 60% at 80% 15%, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent)",
                }}
            />

            <Container className="grid items-center gap-12 lg:grid-cols-2">
                <div className="space-y-8">
                    <SectionTitle
                        as="h1"
                        eyebrow={eyebrow}
                        title={title}
                        description={description}
                        titleClassName="lg:text-6xl"
                    />

                    <ul className="flex flex-wrap gap-2">
                        {facts.map((fact) => (
                            <li key={fact}>
                                <Badge variant="outline" size="md" className="border-white/25 text-white/85">
                                    {fact}
                                </Badge>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap gap-3">
                        <Button size="lg" onClick={() => onApply({ profile: "profesional" })}>
                            Soy profesional
                        </Button>
                        <Button size="lg" variant="secondary" onClick={() => onApply({ profile: "practicante" })}>
                            Busco prácticas
                        </Button>
                    </div>
                </div>

                <figure className="relative">
                    <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-full bg-accent/15 blur-3xl" />
                    <div className="overflow-hidden rounded-3xl border border-white/15 bg-panel shadow-2xl shadow-black/40">
                        <img src={image} alt={imageAlt} className="aspect-4/3 w-full object-cover" />
                    </div>
                </figure>
            </Container>
        </section>
    );
}