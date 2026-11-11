import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { IconBox } from "@/components/ui/IconBox";
import type { Policy } from "@/data/policies";

export function PolicyCard({ policy }: { policy: Policy }) {
    return (
        <article className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-panel p-6">
            <IconBox icon={policy.icon} className="bg-accent/15 text-accent" />
            <div>
                <h3 className="text-xl font-bold">{policy.shortTitle}</h3>
                <p className="mt-1 text-xs text-white/60">
                    {policy.code} · Versión {policy.version} · {policy.date}
                </p>
            </div>
            <p className="text-sm leading-relaxed text-white/75">{policy.summary}</p>

            <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
                <Link
                    to="/politicas/$slug"
                    params={{ slug: policy.slug }}
                    className="text-sm font-semibold text-accent hover:text-accent-hover"
                >
                    Ver resumen →
                </Link>
                <a
                    href={policy.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white"
                >
                    Documento completo (PDF)
                    <ExternalLink aria-hidden="true" className="size-4" />
                    <span className="sr-only"> (se abre en una pestaña nueva)</span>
                </a>
            </div>
        </article>
    );
}