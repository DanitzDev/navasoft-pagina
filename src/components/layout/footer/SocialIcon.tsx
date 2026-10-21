import type { SocialNetwork } from '../../../data/site'

// El enlace aporta el nombre accesible; el SVG solo representa la marca.
// network elige una única marca; el tamaño visual es independiente del área
// táctil de 44 px que Footer.basic.css asigna al enlace que contiene este SVG.
export default function SocialIcon({ network }: { network: SocialNetwork }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      {network === 'linkedin' && (
        <>
          <circle cx="4.5" cy="4.5" r="2" />
          <path
            d="M3 8h3v13H3Z M9 8h3v1.8C13 8.3 14.2 8 15.5 8
            19 8 21 10.2 21 14v7h-3v-7c0-2-1-3-2.5-3S12 12 12 14v7H9Z"
          />
        </>
      )}
      {network === 'facebook' && (
        <path
          d="M14 22v-9h3l.5-4H14V7c0-1.2.3-2 2-2h2V1.4
          C17.3 1.2 16.1 1 14.7 1 11.5 1 10 2.9 10 6v3H7v4h3v9Z"
        />
      )}
      {network === 'instagram' && (
        <>
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="12"
            cy="12"
            r="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="17.5" cy="6.5" r="1.2" />
        </>
      )}
    </svg>
  )
}
