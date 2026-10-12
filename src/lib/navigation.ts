// La barra final y los parámetros no cambian la sección activa.
export function isNavigationActive(pathname: string, href: string) {
  const normalize = (value: string) =>
    value.split(/[?#]/)[0].replace(/\/+$/, '') || '/'
  const current = normalize(pathname)
  const target = normalize(href)

  return (
    current === target || (target !== '/' && current.startsWith(target + '/'))
  )
}
