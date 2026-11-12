# Portafolio · Camilo García

Mi sitio personal: quién soy, en qué me enfoco (automatizaciones, bots y desarrollo web), mis proyectos con su ficha de detalle, mi trayectoria y las tecnologías que he usado en proyectos reales.

En vivo: https://camilogarcia079.github.io/portafolio/

## Qué tiene

- **Un flujo de automatización que se ejecuta en la portada.** Simula un pedido como el de mi DeliveryBot pasando por Telegram, el router, Google Sheets, cocina y cliente, con un registro de lo que va pasando. Se puede volver a ejecutar con un botón.
- **Una demostración animada dentro de cada proyecto.** Una carrera de Fórmula 1 con clima y pit stops, un despacho de ambulancia en un mapa, una petición que atraviesa las capas de la arquitectura hexagonal, un chat de Telegram, la clave dinámica del banco (con el mismo algoritmo del proyecto), entre otras. Solo se animan mientras están en pantalla.
- **Proyectos filtrables** (IA y automatización, backend, web) y una ficha de cada uno con el problema, lo que hice y el stack.
- **Sección de tecnologías interactiva:** al tocar una tecnología dice en qué proyectos la usé.
- Tema claro y oscuro (recuerda la elección), menú para celular, barra de progreso de lectura y animaciones al hacer scroll.
- Respeta la opción del sistema de reducir movimiento y se puede recorrer con teclado.

## Tecnologías

HTML, CSS y JavaScript, sin frameworks ni proceso de compilación. GitHub Pages sirve los archivos tal cual.

## Estructura

```text
index.html          estructura de la página
css/styles.css      estilos, temas y diseño responsive
js/proyectos.js     datos de los proyectos y del stack
js/demos.js         una función por proyecto que dibuja su demostración
js/logos.js         logos de las tecnologías (simple-icons, licencia CC0)
js/main.js          comportamiento: tema, menú, flujo, filtros, ficha y animaciones
assets/             foto (normal y 4K) y favicon
```

## Decisiones

- **Los datos están separados del código.** Agregar un proyecto es sumar un objeto en `js/proyectos.js`; `main.js` arma la tarjeta y la ficha solo.
- **El flujo de la portada es un SVG normal.** JavaScript enciende cada nodo y mueve el punto por la línea con `getPointAtLength`, sin librerías de animación.
- **Cada demostración es independiente.** Devuelve `iniciar` y `detener`, y `main.js` las enciende con `IntersectionObserver` solo cuando se ven.
- **Las animaciones de aparición usan `IntersectionObserver`**, así solo se activan cuando el elemento entra en pantalla.
- **El tema se aplica antes de pintar la página** con un script corto en el `<head>`, para que no parpadee al recargar.

## Cómo verlo en local

```bash
python3 -m http.server 8000
```

Y abrir http://localhost:8000.

## Autor

Camilo Andrés García Almeida · [GitHub](https://github.com/CamiloGarcia079) · [LinkedIn](https://www.linkedin.com/in/camilo-garcia-7570693b7/)
