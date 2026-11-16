import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { institutions, type Institution } from "@/data/government";
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'

function InstitutionCard({ item }: { item: Institution }) {
  const Icon = item.icon;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-night/70 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-2xl hover:shadow-black/40">
      {/* Icono grande de fondo, decorativo */}
      <Icon
        aria-hidden="true"
        className="pointer-events-none absolute -right-5 -top-5 size-32 text-white/5 transition duration-500 group-hover:scale-110 group-hover:text-accent/15"
      />

      {item.logo ? (
        <span className="flex h-14 w-fit items-center rounded-2xl bg-white px-4">
          <ResponsiveImage
            src={item.logo}
            alt=""
            sizes="(max-width: 768px) 120px, 160px"
            className="max-h-9 w-auto"
          />        </span>
      ) : (
        <span className="flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-accent to-accent-hover text-night shadow-lg shadow-accent/20">
          <Icon aria-hidden="true" className="size-7" />
        </span>
      )}

      <h3 className="mt-5 text-xl font-bold leading-snug text-white">{item.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/75">{item.description}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <li key={tag}>
            <Badge variant="outline" className="border-white/25 text-white/80">
              {tag}
            </Badge>
          </li>
        ))}
      </ul>

      {item.highlight && (
        <p className="mt-4 border-l-2 border-accent pl-3 text-sm text-white/90">{item.highlight}</p>
      )}

      <div className="mt-auto pt-6">
        {item.sectorSlug ? (
          <ArrowLink to="/sectores/$slug" params={{ slug: item.sectorSlug }}>
            Ver sector
          </ArrowLink>
        ) : (
          <ArrowLink to="/casos-de-exito">Ver casos de éxito</ArrowLink>
        )}
      </div>
    </article>
  );
}

export function GovernmentSection() {
  return (
    <section className="relative isolate overflow-hidden border-y border-primary/40 bg-deep py-24 text-white">
      {/* Foto de fondo con sombreado (el mismo esquema de los héroes) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <ResponsiveImage
          src="/images/area-publico.jpeg"
          alt=""
          sizes="(min-width: 768px) 50vw, 100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-deep via-deep/90 to-deep/55" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-deep to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-deep to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 55% at 85% 20%, color-mix(in oklab, var(--color-accent) 16%, transparent), transparent)",
          }}
        />
      </div>

      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow="Sector público"
            title="Cuando la tecnología impacta a miles de personas, la confianza lo es todo."
            description="Trabajamos junto a organizaciones públicas para modernizar procesos, optimizar la gestión y generar mejores servicios para la ciudadanía."
            className="max-w-2xl"
          />
          <ArrowLink to="/areas/$slug" params={{ slug: "gobierno" }} className="shrink-0">
            Ver proyectos del sector público
          </ArrowLink>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {institutions.map((item, index) => (
            <li key={item.name}>
              <Reveal delay={index * 100} className="h-full">
                <InstitutionCard item={item} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}