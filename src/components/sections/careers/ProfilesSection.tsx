import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { IconBox } from '@/components/ui/IconBox'
import Button from '@/components/ui/Button'
import { careersCopy, profiles, values } from '@/data/opportunities'
import type { ApplyIntent, ProfileId } from '@/data/opportunities'
import { cn } from '@/lib/cn'

export function ProfilesSection({
  onApply,
}: {
  onApply: (intent: ApplyIntent) => void
}) {
  const [active, setActive] = useState<ProfileId>('profesional')
  const current =
    profiles.find((profile) => profile.id === active) ?? profiles[0]

  return (
    <section id="perfiles" className="scroll-mt-28 py-20">
      <Container>
        <SectionTitle
          eyebrow={careersCopy.profiles.eyebrow}
          title={careersCopy.profiles.title}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div
            role="group"
            aria-label="Perfil"
            className="flex gap-2 lg:flex-col"
          >
            {profiles.map((profile) => (
              <button
                key={profile.id}
                type="button"
                aria-pressed={active === profile.id}
                onClick={() => setActive(profile.id)}
                className={cn(
                  'flex-1 rounded-2xl border px-5 py-4 text-left text-base font-semibold transition-colors lg:flex-none',
                  active === profile.id
                    ? 'border-accent bg-accent/10 text-white'
                    : 'border-white/10 bg-panel text-white/70 hover:border-white/30 hover:text-white',
                )}
              >
                {profile.tab}
              </button>
            ))}
          </div>

          <div
            aria-live="polite"
            className="rounded-3xl border border-white/10 bg-panel p-8"
          >
            <p className="text-lg leading-relaxed text-white/90">
              {current.summary}
            </p>

            <dl className="mt-6 grid gap-6 md:grid-cols-3">
              {current.points.map((point) => (
                <div key={point.title}>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {point.title}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-white/75">
                    {point.text}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <Button onClick={() => onApply({ profile: current.id })}>
                Aplicar como {current.tab.toLowerCase()}
              </Button>
            </div>
          </div>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <li
              key={value.title}
              className="rounded-2xl border border-white/10 bg-night p-6"
            >
              <IconBox icon={value.icon} className="bg-accent/15 text-accent" />
              <h3 className="mt-4 text-lg font-bold">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {value.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
