import type { MouseEvent } from 'react'
import { ButtonLink } from '../../ui/Button'

// En escritorio no se necesita callback. En móvil se recibe closeMenu.
type NavbarActionsProps = { onNavigate?: () => void }

// El Navbar organiza las acciones; ButtonLink aporta el componente compartido.
// El callback permite reutilizar el grupo dentro del diálogo móvil.
export default function NavbarActions({ onNavigate }: NavbarActionsProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // Al abrir otra pestaña, mantener el menú y el foco de esta página.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    )
      return
    onNavigate?.()
  }

  return (
    <div className="navbar-actions">
      {/* La ruta de Contacto valida motivo. Las variantes vienen de ButtonLink;
          las clases locales conservan la forma y el peso visual del Navbar. */}
      <ButtonLink
        to="/contacto"
        search={{ motivo: 'reunion' }}
        variant="primary"
        size="sm"
        className="navbar-meeting-link rounded-full font-semibold shadow-none"
        onClick={handleClick}
      >
        Solicitar reunión
      </ButtonLink>
      {/* Partir del azul original y suavizar solo el fondo, sin atenuar el texto. */}
      <ButtonLink
        to="/contacto"
        search={{ motivo: 'demo' }}
        variant="secondary"
        size="sm"
        className={
          'navbar-demo-link rounded-full bg-primary/80 ' +
          'font-semibold shadow-none hover:bg-primary hover:text-white'
        }
        onClick={handleClick}
      >
        Pedir una demo
      </ButtonLink>
    </div>
  )
}
