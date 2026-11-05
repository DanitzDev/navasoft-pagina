import { useState } from 'react'
import { CareersHero } from '@/components/sections/careers/CareersHero'
import { ProfilesSection } from '@/components/sections/careers/ProfilesSection'
import { InterestAreas } from '@/components/sections/careers/InterestAreas'
import { FocusPlatforms } from '@/components/sections/careers/FocusPlatforms'
import { ApplySteps } from '@/components/sections/careers/ApplySteps'
import { OpeningsSection } from '@/components/sections/careers/OpeningsSection'
import { PerksSection } from '@/components/sections/careers/PerksSection'
import { CareersFaq } from '@/components/sections/careers/CareersFaq'
import { ApplySection } from '@/components/sections/careers/ApplySection'
import { ProductSideNav } from '@/components/sections/products/detail/ProductSideNav'
import type { SubnavItem } from '@/components/sections/products/detail/ProductSideNav'
import { perks } from '@/data/opportunities'
import type { ApplyIntent, AreaId, ProfileId } from '@/data/opportunities'

type CareersPageProps = { initialProfile?: ProfileId; initialArea?: AreaId }

export function CareersPage({ initialProfile, initialArea }: CareersPageProps) {
  const [profile, setProfile] = useState<ProfileId | ''>(initialProfile ?? '')
  const [area, setArea] = useState<AreaId | ''>(initialArea ?? '')

  // Deja elegido el perfil o el área y baja al formulario
  const goToForm = (intent: ApplyIntent) => {
    if (intent.profile) setProfile(intent.profile)
    if (intent.area) setArea(intent.area)

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    document.getElementById('aplicar')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  const items: (SubnavItem | false)[] = [
    { id: 'perfiles', label: 'Perfiles' },
    { id: 'areas', label: 'Áreas' },
    { id: 'trabajo', label: 'Plataformas' },
    { id: 'como-aplicar', label: 'Cómo aplicar' },
    { id: 'convocatorias', label: 'Convocatorias' },
    perks.length > 0 && { id: 'beneficios', label: 'Beneficios' },
    { id: 'preguntas', label: 'Preguntas' },
    { id: 'aplicar', label: 'Currículum' },
  ]
  const subnav = items.filter((item): item is SubnavItem => Boolean(item))

  return (
    <div className="bg-night text-white">
      <CareersHero onApply={goToForm} />
      <ProductSideNav items={subnav} />

      <ProfilesSection onApply={goToForm} />
      <InterestAreas
        selected={area}
        onSelect={(next) => goToForm({ area: next })}
      />
      <FocusPlatforms />
      <ApplySteps />
      <OpeningsSection onApply={goToForm} />
      <PerksSection />
      <CareersFaq />

      <ApplySection
        profile={profile}
        area={area}
        onProfileChange={setProfile}
        onAreaChange={setArea}
      />
    </div>
  )
}
