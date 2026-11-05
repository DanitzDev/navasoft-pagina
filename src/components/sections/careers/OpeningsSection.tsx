import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import {
    areas,
    careersCopy,
    openings,
    profiles,
    type ApplyIntent,
    type AreaId,
    type ProfileId,
} from "@/data/opportunities";
import { cn } from "@/lib/cn";

export function OpeningsSection({ onApply }: { onApply: (intent: ApplyIntent) => void }) {
    const copy = careersCopy.openings;
    const [profileFilter, setProfileFilter] = useState<ProfileId | "todos">("todos");
    const [areaFilter, setAreaFilter] = useState<AreaId | "todas">("todas");

    const visible = openings.filter(
        (opening) =>
            (profileFilter === "todos" || opening.profile === profileFilter) &&
            (areaFilter === "todas" || opening.area === areaFilter),
    );

    const profileFilters: { value: ProfileId | "todos"; label: string }[] = [
        { value: "todos", label: "Todos" },
        ...profiles.map((profile) => ({ value: profile.id, label: profile.tab })),
    ];

    return (
        <section id="convocatorias" className="scroll-mt-28 py-20">
            <Container>
                <SectionTitle eyebrow={copy.eyebrow} title={copy.title} />

                {openings.length === 0 ? (
                    <div className="mt-10 rounded-3xl border border-dashed border-white/20 bg-panel/60 p-10 text-center">
                        <h3 className="text-xl font-bold">{copy.emptyTitle}</h3>
                        <p className="mx-auto mt-3 max-w-xl text-white/70">{copy.emptyText}</p>
                        <div className="mt-6">
                            <Button onClick={() => onApply({})}>{copy.emptyCta}</Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="mt-10 flex flex-wrap items-end gap-4">
                            <div role="group" aria-label="Filtrar por perfil" className="flex gap-2">
                                {profileFilters.map((filter) => (
                                    <button
                                        key={filter.value}
                                        type="button"
                                        aria-pressed={profileFilter === filter.value}
                                        onClick={() => setProfileFilter(filter.value)}
                                        className={cn(
                                            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                                            profileFilter === filter.value
                                                ? "border-accent bg-accent/10 text-white"
                                                : "border-white/20 text-white/70 hover:text-white",
                                        )}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>

                            <div className="w-full max-w-xs">
                                <Select
                                    aria-label="Filtrar por área"
                                    value={areaFilter}
                                    onChange={(event) => setAreaFilter(event.target.value as AreaId | "todas")}
                                    options={[
                                        { value: "todas", label: "Todas las áreas" },
                                        ...areas.map((area) => ({ value: area.id, label: area.label })),
                                    ]}
                                />
                            </div>
                        </div>

                        {visible.length === 0 ? (
                            <p className="mt-8 text-white/70">No hay posiciones con esos filtros.</p>
                        ) : (
                            <ul className="mt-8 grid gap-4 lg:grid-cols-2">
                                {visible.map((opening) => (
                                    <li key={opening.id} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-panel p-6">
                                        <h3 className="text-xl font-bold">{opening.title}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="solid" className="bg-accent text-black">
                                                {profiles.find((profile) => profile.id === opening.profile)?.tab}
                                            </Badge>
                                            <Badge variant="outline" className="border-white/25 text-white/80">
                                                {areas.find((area) => area.id === opening.area)?.label}
                                            </Badge>
                                            {opening.modality && (
                                                <Badge variant="outline" className="border-white/25 text-white/80">
                                                    {opening.modality}
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm leading-relaxed text-white/75">{opening.summary}</p>
                                        {opening.requirements && (
                                            <ul className="list-disc space-y-1 pl-5 text-sm text-white/70">
                                                {opening.requirements.map((requirement) => (
                                                    <li key={requirement}>{requirement}</li>
                                                ))}
                                            </ul>
                                        )}
                                        <div className="mt-auto pt-2">
                                            <Button size="sm" onClick={() => onApply({ profile: opening.profile, area: opening.area })}>
                                                Aplicar a esta posición
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </Container>
        </section>
    );
}