# Invitación Digital - Pía y Alejo

Documentacion de contexto, contenido, decisiones visuales y mantenimiento de la tarjeta.

Última actualización: 18 de septiembre de 2026.

## 1. Objetivo

La tarjeta es una invitación digital responsive para la celebración de Pía y Alejo. Debe funcionar principalmente en celulares, pero también verse correctamente en tablets y escritorio.

La estetica buscada es elegante, familiar y festiva. No debe parecer una invitacion romantica de pareja ni una pagina generica. La composicion combina azul profundo, plateado, blanco hielo y detalles pastel de cumpleanos.

## 2. Datos del evento

- Nombres: Pía y Alejo.
- Frase principal: A compartir una noche especial.
- Fecha: sábado 10 de octubre de 2026.
- Hora: 21:00 hs.
- Lugar: El Rancho.
- Direccion: Caucete, San Juan.
- Google Maps: https://maps.app.goo.gl/zwSQP48DQSfJqVin9
- Vestimenta: Formal sport.
- Alias: aranela.09.
- Numero de WhatsApp: 5492644548296.
- Mensaje de WhatsApp: Hola Pía y Alejo, confirmo mi asistencia.
- Texto de regalo: Tu presencia es el mejor regalo, pero si querés hacerme un obsequio, podés usar este alias.
- Mensaje final: Los esperamos para compartir este momento tan especial.
- Autor del pie: Jesús Funes.

Los datos editables se encuentran en el objeto `INVITACION` de `script.js`.

## 3. Archivos principales

- `index.html`: estructura completa de la invitacion y textos base.
- `style.css`: layout, responsive, colores, tipografias, tarjetas y animaciones visuales.
- `script.js`: datos dinamicos, cuenta regresiva, enlaces, copia del alias, animaciones y lightbox.
- `img/`: imagenes de portada y galeria.
- `README.txt`: guia rapida de proyecto y publicacion.
- `DOCUMENTACION.md`: este documento de contexto completo.

El proyecto usa HTML, CSS y JavaScript puro. No tiene framework ni proceso de build.

## 4. Estructura de la tarjeta

### Portada

- Foto principal con `img/portada-hero.jpg`.
- Overlay azul para mejorar el contraste.
- Marco fino y esquinas decorativas.
- Nombre, frase, fecha y boton `Ver invitacion`.

### Reservar fecha

- Foto formal `img/foto6.jpg`.
- Numero 10 en una insignia circular.
- Nombre escrito con `Pinyon Script`.

### Fecha

- Dia de la semana.
- Dia grande, mes y ano.
- Frase auxiliar: `Una noche para celebrar juntos`.

### Cuenta regresiva

- Dias, horas, minutos y segundos.
- Se actualiza cada segundo.
- Al llegar la fecha muestra `El gran dia llego.`.

### Recepcion

- Hora: 21:00 hs.
- Lugar: El Rancho.
- Ubicacion: Caucete, San Juan.
- Boton que abre Google Maps.

### Asistencia

- Mensaje `¿Nos acompañás?`.
- Boton que genera el enlace de WhatsApp con el numero y mensaje configurados.

### Regalo

- El título `Regalo` usa `Playfair Display`, en coral suave.
- El texto descriptivo usa `Lora` normal para que sea llamativo y fácil de leer.
- El alias se muestra en una tarjeta con boton lateral para copiar.
- El boton inferior `Copiar alias` mantiene una alternativa visible.

### Vestimenta

- Texto actual: `Formal sport`.
- Fondo azul profundo con cuadricula sutil.
- Se separa visualmente de la galeria mediante un margen superior.

### Galeria

- Contiene 7 fotografias.
- Todas las tarjetas tienen proporcion vertical `3:4`.
- Las fotos se muestran completas con `object-fit: contain`.
- En movil se muestran 2 columnas.
- En escritorio se muestran 4 columnas.
- El fondo actual es marfil tipo papel, con puntos de confeti pastel y una decoracion curva tipo serpentina.
- Las fotos pueden abrirse en un lightbox.

### Cierre

- Mensaje final de bienvenida.
- Firma `Pía y Alejo` con fuente manuscrita.

## 5. Imagenes

- `img/portada-hero.jpg`: portada responsive, 1672 x 941 px.
- `img/portada.jpg`: portada alternativa, 1152 x 1536 px.
- `img/foto1.jpg`: 1152 x 1536 px.
- `img/foto2.jpg`: 864 x 1536 px, mas angosta que el resto.
- `img/foto3.jpg`: 1152 x 1536 px.
- `img/foto4.jpg`: 1152 x 1536 px.
- `img/foto5.jpg`: 1152 x 1536 px.
- `img/foto6.jpg`: 1152 x 1536 px.
- `img/foto7.jpg`: 1152 x 1536 px.

No cambiar la galeria a `object-fit: cover`: eso vuelve a cortar las fotos. La tarjeta debe conservar `aspect-ratio: 3 / 4` y `object-fit: contain`.

## 6. Identidad visual

### Colores principales

- Azul profundo: `#21445B` (`--deep`).
- Blanco hielo: `#FDFEFF` (`--ice` y `--white`).
- Plateado solicitado: `#C9D3D8` (`--silver`).
- Celeste: `#6EB7D6` (`--sky`).
- Fondo papel: `#FFF9F0` (`--paper`).
- Coral principal de decoracion: `#E79782` (`--party-coral`).
- Coral suave del titulo Regalo: `#D99282` (`--party-coral-soft`).
- Amarillo pastel: `#F2C66D` (`--party-sun`).
- Verde menta: `#A8D6C9` (`--party-mint`).
- Lila pastel: `#BBA9D8` (`--party-lilac`).

El plateado se reserva para bordes, lineas, marcos y detalles metalicos. El coral de Regalo es un acento, no el color plateado.

### Tipografias

- `Inter`: textos funcionales, botones, datos y alias.
- `Lora`: texto descriptivo de Regalo, por ser distintiva y legible.
- `Playfair Display`: titulos elegantes, fecha y titulo Regalo.
- `Pinyon Script`: nombres y firma manuscrita.

Las fuentes se cargan desde Google Fonts en `index.html`.

## 7. Funcionalidad JavaScript

- `cargarDatos()`: completa textos, fecha, enlaces, alias y vestimenta desde `INVITACION`.
- `iniciarCuentaRegresiva()`: actualiza la cuenta regresiva cada segundo.
- `copiarAlias()`: copia el alias usando Clipboard API o fallback con textarea.
- `iniciarBotones()`: conecta desplazamiento, copia de alias y botones principales.
- `iniciarAnimaciones()`: activa las secciones cuando entran en pantalla.
- `iniciarLightbox()`: permite abrir fotos con click, Enter o espacio y cerrar con boton, click exterior o Escape.

## 8. Responsive

- Base: layout movil con 2 columnas en galeria.
- `max-width: 359px`: reduce gaps, padding y tamanos para celulares pequenos.
- `min-width: 560px`: aumenta padding y separacion.
- `min-width: 760px`: activa layout amplio, galeria de 4 columnas y composiciones de escritorio.
- `min-width: 1100px`: aumenta la altura de portada y el espacio inferior.

La pagina debe evitar desbordamiento horizontal en todas las resoluciones.

## 9. Historial de decisiones

- Se reemplazo la galeria editorial inicial porque usaba tarjetas con proporciones diferentes y recortaba algunas fotos.
- Se unificaron todas las fotos en tarjetas verticales `3:4`.
- Se cambio `object-fit: cover` por `object-fit: contain` para mostrar las imagenes completas.
- Se elimino el fondo azul oscuro de la galeria y se incorporo un fondo marfil festivo.
- Se agregaron confeti pastel y una decoracion curva tipo serpentina sin depender de imagenes nuevas.
- Se agrego separacion entre Vestimenta y Galeria.
- Se eliminaron clases y reglas CSS obsoletas de la grilla editorial anterior.
- El titulo Regalo se mantuvo serif y coral suave.
- El texto de Regalo se cambió a `Lora` para mejorar la lectura sin usar una fuente demasiado común.
- Se eliminó el círculo decorativo que aparecía junto a la sección de fecha.
- El plateado oficial de la invitacion se mantuvo como `#C9D3D8`.

## 10. Mantenimiento

Para cambiar datos del evento, editar solamente `INVITACION` en `script.js` siempre que no sea necesario modificar estructura.

Para cambiar fotos de galeria:

- Mantener los nombres `foto1.jpg` a `foto7.jpg`, o actualizar los `src` correspondientes en `index.html`.
- Preferir fotos verticales.
- No quitar la clase `zoomable`.
- No reemplazar `contain` por `cover` si se quiere evitar recortes.

Para mantener la estetica:

- Conservar el plateado `#C9D3D8` para marcos y lineas.
- No convertir la galeria nuevamente en fondo azul oscuro.
- Mantener el fondo festivo sutil, sin recargarlo.
- Usar `Inter` para textos funcionales, `Lora` para textos largos y `Playfair Display` para titulos.
- Verificar siempre movil y escritorio despues de cambios visuales.

## 11. Verificaciones realizadas

- Se verifico la galeria en 320, 360, 390, 768, 1024 y 1440 px durante las iteraciones visuales.
- Se verifico que las 7 fotos mantengan formato uniforme.
- Se verifico que no exista desbordamiento horizontal.
- Se verifico el funcionamiento del lightbox.
- `node --check script.js` se mantiene correcto.
- `git diff --check` se mantiene correcto, con advertencias normales de conversion de saltos de linea de Git en Windows.

## 12. Publicacion

Para Cloudflare Pages:

- Framework preset: None / Ninguno.
- Build command: vacio.
- Output directory: `.`.
- El proyecto puede publicarse como sitio estatico sin compilacion.
