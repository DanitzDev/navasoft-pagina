import type { AreaId, ProfileId } from "@/data/opportunities";

export const MAX_FILE_MB = 5; // MAQUETA
export const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"];
export const ACCEPT_ATTR =
    ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export type ApplicationFields = {
    nombre: string;
    correo: string;
    telefono: string;
    enlace: string;
    presentacion: string;
    perfil: ProfileId | "";
    area: AreaId | "";
    curriculum: File | null;
    consentimiento: boolean;
};

export type ApplicationErrors = Partial<Record<keyof ApplicationFields, string>>;

export function validateResume(file: File | null): string | undefined {
    if (!file) return "Adjunte su currículum.";
    const name = file.name.toLowerCase();
    if (!ACCEPTED_EXTENSIONS.some((extension) => name.endsWith(extension))) {
        return "El archivo debe ser PDF o Word.";
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) return `El archivo supera los ${MAX_FILE_MB} MB.`;
    return undefined;
}

// Obligatorios: todos menos LinkedIn (la maqueta lo marca "opcional") y la presentación
export function validateApplication(data: ApplicationFields): ApplicationErrors {
    const errors: ApplicationErrors = {};

    if (data.nombre.trim().length < 3) errors.nombre = "Escriba su nombre.";
    if (!/^\S+@\S+\.\S+$/.test(data.correo.trim())) errors.correo = "Escriba un correo válido.";
    if (data.telefono.replace(/\D/g, "").length < 8) errors.telefono = "Escriba un teléfono válido.";
    if (!data.perfil) errors.perfil = "Seleccione un perfil.";
    if (!data.area) errors.area = "Seleccione un área.";

    const resumeError = validateResume(data.curriculum);
    if (resumeError) errors.curriculum = resumeError;

    if (!data.consentimiento) errors.consentimiento = "Debe autorizar la revisión del currículum.";

    return errors;
}

export function formatFileSize(bytes: number): string {
    if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/*
 * Mientras USE_MOCK sea true, el envío es una SIMULACIÓN no guarda nada
 * Poner USE_MOCK en false cuando exista el endpoint
*/
const USE_MOCK = true;

export async function submitApplication(data: ApplicationFields): Promise<void> {
    if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 900));
        return;
    }

    if (!data.curriculum) throw new Error("Falta el currículum");

    const body = new FormData();
    body.append("nombre", data.nombre.trim());
    body.append("correo", data.correo.trim());
    body.append("telefono", data.telefono.trim());
    body.append("enlace", data.enlace.trim());
    body.append("presentacion", data.presentacion.trim());
    body.append("perfil", data.perfil);
    body.append("area", data.area);
    body.append("curriculum", data.curriculum);
    body.append("consentimiento", String(data.consentimiento));

    const response = await fetch("/api/oportunidades", { method: "POST", body });
    if (!response.ok) throw new Error("No se pudo enviar");
}