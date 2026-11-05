import { createFileRoute } from "@tanstack/react-router";
import { CareersPage } from "@/components/sections/careers/CareersPage";
import { areas, profiles, type AreaId, type ProfileId } from "@/data/opportunities";

export const Route = createFileRoute("/oportunidades")({
  // Permite enlaces como /oportunidades?perfil=practicante&area=desarrollo que dejan el formulario preelegido
  validateSearch: (search: Record<string, unknown>): { perfil?: ProfileId; area?: AreaId } => ({
    perfil: profiles.find((profile) => profile.id === search.perfil)?.id,
    area: areas.find((area) => area.id === search.area)?.id,
  }),
  head: () => ({
    meta: [
      { title: "Oportunidades · Navasoft Soluciones" },
      {
        name: "description",
        content:
          "Navasoft busca profesionales y practicantes en desarrollo, datos, IoT, implementación y administración. Envíe su currículum.",
      },
    ],
  }),
  component: OportunidadesPage,
});

function OportunidadesPage() {
  const { perfil, area } = Route.useSearch();
  return <CareersPage initialProfile={perfil} initialArea={area} />;
}