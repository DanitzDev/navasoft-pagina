import { Link } from "@tanstack/react-router";
import { IconBox } from "@/components/ui/IconBox";
import type { Sector } from "@/data/sectors";

export function SectorCard({ sector }: { sector: Sector }) {
    return (
        <Link
            to="/sectores/$slug"
            params={{ slug: sector.slug }}
            className="group flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-panel p-5 transition duration-200 hover:-translate-y-1 hover:border-accent/60"
        >
            <IconBox icon={sector.icon} className="bg-accent/15 text-accent" />
            <h3 className="text-lg font-bold">{sector.name}</h3>
            <p className="text-sm leading-relaxed text-white/70">{sector.intro}</p>
            <span className="mt-auto text-sm font-semibold text-accent">
                Ver sector{" "}
                <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
                    →
                </span>
            </span>
        </Link>
    );
}