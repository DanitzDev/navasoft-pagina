import type { ContactKind } from '../../../data/site'

// Los íconos son decorativos; el texto del contacto aporta el nombre accesible.
// Record obliga a definir un trazado para cada ContactKind, sin claves sueltas.
// Cada cadena d contiene coordenadas SVG sobre la misma cuadrícula de 24 × 24.
const paths: Record<ContactKind, string> = {
  phone:
    'M22 16.92v3a2 2 0 0 1-2.18 2 ' +
    '19.79 19.79 0 0 1-8.63-3.07 ' +
    '19.5 19.5 0 0 1-6-6 ' +
    '19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3 ' +
    'a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.79 ' +
    'a2 2 0 0 1-.45 2.11L8.09 9.91 ' +
    'a16 16 0 0 0 6 6l1.27-1.27 ' +
    'a2 2 0 0 1 2.11-.45c.89.33 1.83.56 2.79.69 ' +
    'A2 2 0 0 1 22 16.92Z',
  message: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z',
  email:
    'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4 ' +
    'a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z M2 6l10 7 10-7',
  location:
    'M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 0 1 18 0Z ' +
    'M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
}

// currentColor hereda el naranja de Footer.css y mantiene el SVG sin relleno.
// aria-hidden y focusable evitan leer el icono o crear una parada extra con Tab.
export default function ContactIcon({ kind }: { kind: ContactKind }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="footer-contact-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[kind]} />
    </svg>
  )
}
