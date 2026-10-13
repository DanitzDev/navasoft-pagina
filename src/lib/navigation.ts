// La barra final y los parámetros no cambian la sección activa.
function normalizeNavigationPath(value: string) {
  return value.split(/[?#]/)[0].replace(/\/+$/, '') || '/'
}

export function isNavigationActive(pathname: string, href: string) {
  const current = normalizeNavigationPath(pathname)
  const target = normalizeNavigationPath(href)

  return (
    current === target || (target !== '/' && current.startsWith(target + '/'))
  )
}

// Una sección padre está activa, pero no representa la página hija exacta.
export function getNavigationCurrent(
  pathname: string,
  href: string,
): 'page' | 'location' | undefined {
  if (normalizeNavigationPath(pathname) === normalizeNavigationPath(href)) {
    return 'page'
  }
  return isNavigationActive(pathname, href) ? 'location' : undefined
}
