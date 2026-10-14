import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Link } from '@tanstack/react-router'
import type { LinkComponentProps } from '@tanstack/react-router'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'sm' | 'md' | 'lg'

// Las variantes son compartidas. Los eventos nativos pertenecen a Button o Link.
interface StyleProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

// Estilos base para el botón
const base =
  'inline-flex items-center justify-center rounded-xl transition-colors duration-200 ' +
  'font-medium focus-visible:outline-none font-montserrat focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 ' +
  'disabled:pointer-events-none disabled:opacity-50'

// Record<K, T> (key, Type)
const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-black shadow-sm hover:bg-accent-hover',
  secondary: 'bg-primary text-white shadow-sm hover:bg-primary-hover',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-3.5 text-base',
}

// Función para generar las clases de estilo del botón
export function buttonStyles({
  variant = 'primary',
  size = 'md',
  className,
}: StyleProps = {}) {
  return cn(base, variants[variant], sizes[size], className)
}

// Definición de tipos para las propiedades del botón
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<StyleProps, 'className'>

// Componente de botón
export default function Button({
  variant,
  size,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  )
}

type ButtonLinkProps = Omit<LinkComponentProps<'a'>, 'className'> & StyleProps

// Componente de enlace con estilo de botón
export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props} />
  )
}
