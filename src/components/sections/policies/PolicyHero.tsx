import { Link } from "@tanstack/react-router";
import { Download, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import type { Policy } from "@/data/policies";

export function PolicyHero({ policy }: { policy: Policy }) {
    const Icon = policy.icon;

    return (
        <section className="relative isolate -mt-28 overflow-hidden pb-16 pt-40">
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(60% 60% at 80% 15%, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent)",
                }}
            />

            <Container className="space-y-8">
                <nav aria-label="Migas de pan" className="text-sm text-white/60">
                    <Link to="/politicas/$slug" params={{ slug: "terminos" }}>
                        Políticas
                    </Link>
                    <span aria-hidden="true"> / </span>
                    <span className="text-white">{policy.shortTitle}</span>
                </nav>

                <header className="max-w-4xl space-y-5">
                    <p className="text-sm font-semibold uppercase tracking-widest text-accent">Política de Navasoft</p>
                    <div className="flex items-start gap-5">
                        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-white lg:size-16">
                            <Icon aria-hidden="true" className="size-7 lg:size-8" />
                        </span>
                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            {policy.title}
                        </h1>
                    </div>
                    <p className="text-base leading-relaxed text-white/90 sm:text-lg">{policy.summary}</p>
                </header>

                <ul className="flex flex-wrap gap-2">
                    <li>
                        <Badge variant="outline" size="md" className="border-white/25 text-white/85">
                            Código {policy.code}
                        </Badge>
                    </li>
                    <li>
                        <Badge variant="outline" size="md" className="border-white/25 text-white/85">
                            Versión {policy.version}
                        </Badge>
                    </li>
                    <li>
                        <Badge variant="outline" size="md" className="border-white/25 text-white/85">
                            {policy.date}
                        </Badge>
                    </li>
                </ul>

                <div className="flex flex-wrap gap-3">
                    <a href={policy.pdf} target="_blank" rel="noopener noreferrer" className={buttonStyles({ size: "lg" })}>
                        Ver documento completo (PDF)
                        <ExternalLink aria-hidden="true" className="ml-2 size-4" />
                        <span className="sr-only"> (se abre en una pestaña nueva)</span>
                    </a>
                    <a href={policy.pdf} download className={buttonStyles({ variant: "secondary", size: "lg" })}>
                        <Download aria-hidden="true" className="mr-2 size-4" />
                        Descargar
                    </a>
                </div>
            </Container>
        </section>
    );
}