
// Las vistas previas sociales exigen direcciones absolutas. Confirma que este es el dominio público.
export const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined) ?? "https://navasoft.es";
export const DEFAULT_OG_IMAGE = "/og-default.jpg";

type PageMetaOptions = {
    title: string; // sin el sufijo de la marca
    description: string;
    path: string; // por ejemplo "/oportunidades"
    image?: string; // ruta del sitio o dirección absoluta
    imageAlt?: string;
};

const absolute = (value: string) => (value.startsWith("http") ? value : `${SITE_URL}${value}`);

export function pageHead({ title, description, path, image = DEFAULT_OG_IMAGE, imageAlt }: PageMetaOptions) {
    const fullTitle = `${title} · Navasoft Soluciones`;
    const url = absolute(path);
    const img = absolute(image);
    const isDefault = image === DEFAULT_OG_IMAGE;

    return {
        meta: [
            { title: fullTitle },
            { name: "description", content: description },
            { property: "og:type", content: "website" },
            { property: "og:site_name", content: "Navasoft Soluciones" },
            { property: "og:locale", content: "es_CR" },
            { property: "og:title", content: fullTitle },
            { property: "og:description", content: description },
            { property: "og:url", content: url },
            { property: "og:image", content: img },
            ...(isDefault
                ? [
                    { property: "og:image:width", content: "1200" },
                    { property: "og:image:height", content: "630" },
                ]
                : []),
            { property: "og:image:alt", content: imageAlt ?? "Navasoft Soluciones, tecnología que innova" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: fullTitle },
            { name: "twitter:description", content: description },
            { name: "twitter:image", content: img },
        ],
        links: [{ rel: "canonical", href: url }],
    };
}
