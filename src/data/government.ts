import { GraduationCap, Landmark, TrafficCone, Zap, type LucideIcon } from "lucide-react";

export type Institution = {
  name: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  highlight?: string; // "qué hicimos"
  sectorSlug?: string; // si existe, la tarjeta enlaza a la página de ese sector
  logo?: string; // cuando haya logo oficial, reemplazar al icono (por ejemplo /images/logos/clients/jasec.svg)
};

export const institutions: Institution[] = [
  {
    name: "Municipalidad de La Unión",
    description: "Sector público local y transformación digital",
    icon: Landmark,
    tags: ["Sector público local", "Transformación digital"],
  },
  {
    name: "COSEVI",
    description: "Seguridad vial y gestión institucional",
    icon: TrafficCone,
    tags: ["Seguridad vial", "Gestión institucional"],
  },
  {
    name: "CONAPE",
    description: "Educación y financiamiento social",
    icon: GraduationCap,
    tags: ["Educación", "Financiamiento social"],
    highlight: "Expedientes digitales con trazabilidad completa",
    sectorSlug: "prestamos-para-la-educacion",
  },
  {
    name: "JASEC",
    description: "Energía, telecomunicaciones e innovación",
    icon: Zap,
    tags: ["Energía", "Telecomunicaciones", "Innovación"],
    highlight: "Continuidad de los servicios críticos",
    sectorSlug: "electricidad",
  },
];