import type { CompanyPurposeId } from '../../../../data/about'

// Iconos exclusivos de Misión y Visión; su nombre ya está en el título visible.
export default function PurposeIcon({
  purpose,
}: {
  purpose: CompanyPurposeId
}) {
  return (
    <svg viewBox="0 0 64 64" fill="none" focusable="false">
      {purpose === 'mission' ? (
        <>
          <circle cx="30" cy="34" r="21" />
          <circle cx="30" cy="34" r="11" />
          <path d="m30 34 23-23m-11 0h11v11" />
        </>
      ) : (
        <>
          <path d="M7 40s9-18 25-18 25 18 25 18M7 48h50M32 9v7M12 17l5 5m35-5-5 5" />
          <path d="M23 40a9 9 0 0 1 18 0" />
        </>
      )}
    </svg>
  )
}
