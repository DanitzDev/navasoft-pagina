import type { CompanyValueId } from '../../../../data/about'

// Cada valor tiene un símbolo sobre la misma cuadrícula y con el mismo trazo.
const paths: Record<CompanyValueId, string> = {
  'commitment-innovation':
    'M9 18h6 M10 21h4 ' +
    'M8.3 14.7a6 6 0 1 1 7.4 0C14.7 15.4 15 16.2 15 18H9 ' +
    'c0-1.8.3-2.6-.7-3.3Z M12 2V1 M4 5 2.5 3.5 M20 5l1.5-1.5',
  teamwork:
    'M12 7a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z ' +
    'M3 21v-2a5 5 0 0 1 10 0v2 M16 4a3 3 0 0 1 0 6 ' +
    'M17 14a5 5 0 0 1 4 5v2',
  'process-excellence':
    'M3 16a9 9 0 1 1 18 0 M12 16l5-6 ' +
    'M6 10l1.5 1.5 M12 7v2 M18 10l-1.5 1.5 M3 16h3 M18 16h3',
  transparency: 'M18 10.5a7.5 7.5 0 1 1-15 0a7.5 7.5 0 0 1 15 0Z M16 16l5 5',
  efficiency:
    'M9 2h6 M12 2v3 M19 5l2 2 ' +
    'M20 13a8 8 0 1 1-16 0a8 8 0 0 1 16 0Z M12 9v4l3 2',
}

// El nombre del valor ya está visible; el SVG no necesita otra lectura ni foco.
export default function ValueIcon({ value }: { value: CompanyValueId }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[value]} />
    </svg>
  )
}
