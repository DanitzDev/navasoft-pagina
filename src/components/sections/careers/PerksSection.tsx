import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { IconBox } from '@/components/ui/IconBox'
import { careersCopy, perks } from '@/data/opportunities'

export function PerksSection() {
  if (perks.length === 0) return null

  return (
    <section
      id="beneficios"
      className="scroll-mt-28 border-y border-primary/40 bg-deep py-20"
    >
      <Container>
        <SectionTitle
          eyebrow={careersCopy.perks.eyebrow}
          title={careersCopy.perks.title}
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((perk) => (
            <li
              key={perk.title}
              className="rounded-2xl border border-white/10 bg-panel p-6"
            >
              <IconBox icon={perk.icon} className="bg-accent/15 text-accent" />
              <h3 className="mt-4 text-lg font-bold">{perk.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {perk.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
