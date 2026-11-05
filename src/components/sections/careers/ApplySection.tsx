import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ApplyForm } from "@/components/sections/careers/ApplyForm";
import { careersCopy, type AreaId, type ProfileId } from "@/data/opportunities";

type ApplySectionProps = {
    profile: ProfileId | "";
    area: AreaId | "";
    onProfileChange: (profile: ProfileId) => void;
    onAreaChange: (area: AreaId | "") => void;
};

export function ApplySection(props: ApplySectionProps) {
    const copy = careersCopy.apply;

    return (
        <section id="aplicar" className="scroll-mt-28 border-t border-primary/40 bg-deep py-20">
            <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
                <div className="space-y-8">
                    <SectionTitle
                        eyebrow={copy.eyebrow}
                        title={copy.title}
                        description={copy.description}
                    />

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-accent">{copy.checklistTitle}</p>
                        <ul className="mt-4 space-y-3">
                            {copy.checklist.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-sm text-white/70">
                        {copy.whatsappText}{" "}
                        <a
                            href={copy.whatsappHref}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-accent hover:text-accent-hover"
                        >
                            {copy.whatsappLabel}
                        </a>
                    </p>
                </div>

                <ApplyForm {...props} />
            </Container>
        </section>
    );
}