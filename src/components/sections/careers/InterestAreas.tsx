import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { IconBox } from "@/components/ui/IconBox";
import { areas, careersCopy, type AreaId } from "@/data/opportunities";
import { cn } from "@/lib/cn";

type InterestAreasProps = { selected: AreaId | ""; onSelect: (area: AreaId) => void };

export function InterestAreas({ selected, onSelect }: InterestAreasProps) {
    const { eyebrow, title, description } = careersCopy.areas;

    return (
        <section id="areas" className="scroll-mt-28 border-y border-primary/40 bg-deep py-20">
            <Container>
                <SectionTitle eyebrow={eyebrow} title={title} description={description} />

                <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {areas.map((area) => {
                        const isSelected = selected === area.id;
                        return (
                            <li key={area.id}>
                                <button
                                    type="button"
                                    aria-pressed={isSelected}
                                    onClick={() => onSelect(area.id)}
                                    className={cn(
                                        "flex h-full w-full flex-col items-start gap-3 rounded-2xl border p-6 text-left transition duration-200 hover:-translate-y-1",
                                        isSelected
                                            ? "border-accent bg-accent/10"
                                            : "border-white/10 bg-panel hover:border-accent/60",
                                    )}
                                >
                                    <IconBox icon={area.icon} className="bg-accent/15 text-accent" />
                                    <h3 className="text-lg font-bold">{area.label}</h3>
                                    <p className="text-sm leading-relaxed text-white/70">{area.description}</p>
                                    <span className="mt-auto pt-2 text-sm font-semibold text-accent">
                                        {isSelected ? "Área seleccionada" : "Elegir esta área →"}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </Container>
        </section>
    );
}