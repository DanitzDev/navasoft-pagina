# Revisión de Inicio, Nosotros y Clientes

Fecha: 30 de octubre de 2026. Rama: `feature/Partners_clientes`.

## Correcciones

- Acceso a Clientes desde el menú de escritorio, menú móvil y pie de página.
- Controles visibles para pausar y recorrer las cintas de logos.
- Pausa explícita de testimonios; el avance también se detiene durante el foco y hover.
- Eliminación del destello al volver al primer testimonio.
- Paginación de testimonios con controles de al menos 24 × 32 px que se distribuyen en varias filas en móvil.
- Pausa del hero, selectores de imagen con zonas táctiles de 32 × 32 px y flechas de 44 × 44 px.
- El hero detiene su avance fuera de pantalla, con la pestaña oculta o al solicitar movimiento reducido. La pausa manual se conserva al salir del componente.
- Retirada de cinco referencias a imágenes de producto inexistentes. Las imágenes son opcionales y las tarjetas se presentan sin recuadros vacíos ni solicitudes a archivos ausentes.

## Verificación

| Página   | 320 px   | 768 px   | 1440 px  |
| -------- | -------- | -------- | -------- |
| Inicio   | Correcto | Correcto | Correcto |
| Nosotros | Correcto | Correcto | Correcto |
| Clientes | Correcto | Correcto | Correcto |

Se comprobó el ancho del documento, un único `h1` por página y la ausencia de imágenes con rutas vacías. Clientes muestra 12 organizaciones, en orden alfabético, sin buscador. Los tamaños se probaron mediante viewport del navegador, no en dispositivos físicos.

Pruebas de interacción realizadas:

- Apertura del menú móvil, despliegue de Productos y cierre con Escape: primero el submenú y después el diálogo.
- Historia: selección del último y primer año mediante Fin e Inicio; el año activo permanece dentro del selector visible.
- Hero: pausa y cambio manual de imagen.
- Logos: el botón siguiente desplaza la cinta y pausa el avance automático.
- Testimonios: pausa, botón siguiente, selección directa del décimo testimonio y atajos Inicio/Fin.
- Navegación de Inicio a Clientes y regreso a `#clientes-destacados`: el título queda debajo de la cabecera fija.
- 25 destinos internos comprobados por HTTP: todos responden 200 sin mostrar la página de error. Esto comprueba la disponibilidad de las rutas, no la aprobación de su contenido.

Comprobaciones técnicas:

- `npx tsc --noEmit` y Prettier sobre los archivos modificados: correctos.
- TypeScript y `npm run build` en una copia temporal del índice de Git: correctos. Esa copia conserva Contacto en su versión ya commiteada y excluye los cambios pendientes del formulario.
- Vista de producción de esa copia: sin testimonios provisionales y sin imágenes rotas en Inicio. Navegación a Clientes y regreso comprobada.
- Movimiento reducido revisado en código y CSS; no se cambió la preferencia del sistema para emularla.

## Contenido pendiente

- Logos de Ferji y Ficohsa: se muestran sus nombres.
- Imágenes definitivas de Gridxia, NavaStay, Tracxia, Ordexia y Factxia: las tarjetas funcionan sin ellas.
- Testimonios aprobados: el catálogo sigue vacío; las muestras solo se muestran en desarrollo.

Los cambios pendientes de Contacto permanecen fuera de estos commits. No se ha hecho push ni despliegue.

## Integración posterior de productos

Se integró `origin/feature/productos-section` (hasta `a1c65ca`) en la rama de clientes y partners.

- Se conservaron las páginas, el contenido y las imágenes `.jpeg` aportadas en productos. Las cinco imágenes de productos dejan de estar pendientes.
- Se resolvieron los conflictos en `src/data/products.ts` y `src/types/index.ts`, conservando los tipos nuevos y el soporte de imágenes opcionales.
- Se ajustó el hero para usar el mockup existente si no hay fotografía.
- Se corrigió el desbordamiento móvil de las etiquetas largas y el tamaño del título.
- Tracxia referencia su marca alternativa existente: el logo `/images/logos/tracxia-icon.png` no estaba incluido en la rama.
- Las cinco páginas se comprobaron a 320 y 1440 px; los casos con desbordamiento a 320 px se corrigieron y volvieron a verificar.
- Se comprobó la apertura de preguntas frecuentes y la regresión de Inicio, Nosotros y Clientes. Clientes mantiene 12 organizaciones.
- TypeScript y compilación final correctos, con los cambios locales de Contacto resguardados fuera de la integración.
