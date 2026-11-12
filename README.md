# Portafolio · Camilo García

Mi sitio personal: quién soy, en qué me enfoco (automatizaciones, bots y desarrollo web), mis proyectos con su ficha de detalle, mi trayectoria y las tecnologías que he usado en proyectos reales.

En vivo: https://camilogarcia079.github.io/portafolio/

## Qué tiene

- **Español e inglés.** Un botón ES/EN cambia todo el sitio y recuerda la elección. También se puede abrir directo en inglés con `?lang=en`.
- **Escrito para cualquier persona.** Cada proyecto dice primero, en palabras simples, para qué sirve, y cada grupo de tecnologías explica qué es.
- **Habilidades blandas con ejemplos reales:** liderazgo, comunicación, trabajo en equipo, aprendizaje rápido, resolución de problemas y responsabilidad.
- **Cuatro proyectos destacados, cada uno con su simulación:** una carrera de Fórmula 1 con clima y pit stops, el despacho de una ambulancia en VitalRoute, un chat de Telegram tomando un pedido en DeliveryBot y el calendario de reservas con factura de Renta de Herramientas. Solo se animan mientras están en pantalla.
- **Contacto directo:** un formulario que envía el mensaje a mi correo (con FormSubmit), un botón para redactar el correo desde el programa de correo del visitante y otro para abrirlo en Gmail.
- Flujo de automatización interactivo en la portada, tema claro y oscuro, menú para celular y accesibilidad (teclado y reducción de movimiento).

## Tecnologías

HTML, CSS y JavaScript, sin frameworks ni proceso de compilación. GitHub Pages sirve los archivos tal cual.

## Estructura

```text
index.html          estructura de la página
css/styles.css      estilos, temas y diseño responsive
js/i18n.js          textos en inglés y funciones para cambiar de idioma
js/proyectos.js     proyectos, habilidades y tecnologías en los dos idiomas
js/demos.js         una función por proyecto que dibuja su demostración
js/logos.js         logos de las tecnologías (simple-icons, licencia CC0)
js/main.js          comportamiento: idioma, tema, menú, flujo, tarjetas, ficha y formulario
assets/             foto (normal y 4K) y favicon
```

## Decisiones

- **Los datos están separados del código.** Agregar un proyecto es sumar un objeto en `js/proyectos.js`; `main.js` arma la tarjeta y la ficha solo.
- **El flujo de la portada es un SVG normal.** JavaScript enciende cada nodo y mueve el punto por la línea con `getPointAtLength`, sin librerías de animación.
- **Cada demostración es independiente.** Devuelve `iniciar` y `detener`, y `main.js` las enciende con `IntersectionObserver` solo cuando se ven.
- **Las animaciones de aparición usan `IntersectionObserver`**, así solo se activan cuando el elemento entra en pantalla.
- **Traducción sin duplicar el HTML.** El español está en `index.html`; al cargar se guarda y `i18n.js` solo tiene el inglés. Los elementos traducibles llevan `data-i18n`.
- **El formulario no necesita servidor propio.** Se envía a FormSubmit con `fetch`; si falla, el visitante puede redactar el correo desde su propia cuenta.
- **El tema se aplica antes de pintar la página** con un script corto en el `<head>`, para que no parpadee al recargar.

## Cómo verlo en local

```bash
python3 -m http.server 8000
```

Y abrir http://localhost:8000.

## Autor

Camilo Andrés García Almeida · [GitHub](https://github.com/CamiloGarcia079) · [LinkedIn](https://www.linkedin.com/in/camilo-garcia-7570693b7/)
