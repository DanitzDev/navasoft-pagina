import { Check } from "lucide-react";
import { IconBox } from "@/components/ui/IconBox";
import type { PolicySection } from "@/data/policies";

export function PolicySectionCard({ section }: { section: PolicySection }) {
    return (
        <li className="rounded-2xl border border-white/10 bg-panel p-6">
            <IconBox icon={section.icon} className="bg-accent/15 text-accent" />
            <h3 className="mt-4 text-lg font-bold">{section.title}</h3>
            <ul className="mt-3 space-y-2.5">
                {section.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/75">
                        <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                        {point}
                    </li>
                ))}
            </ul>
        </li>
    );
}