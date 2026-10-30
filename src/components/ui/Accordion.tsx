import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export function AccordionItem({ question, children }: { question: string; children: ReactNode }) {
    return (
        <details className="group rounded-2xl border border-white/10 bg-panel px-5 py-4 open:border-product">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                {question}
                <ChevronDown
                    aria-hidden="true"
                    className="size-5 shrink-0 text-product transition-transform group-open:rotate-180"
                />
            </summary>
            <div className="pt-3 text-sm leading-relaxed text-white/75">{children}</div>
        </details>
    );
}