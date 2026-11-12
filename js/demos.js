/*
 * Simulaciones animadas de los proyectos destacados.
 * Cada función recibe el contenedor, dibuja su escena y devuelve { iniciar, detener }.
 * main.js las enciende solo cuando la tarjeta está en pantalla y las apaga al salir.
 * Los textos usan L({ es, en }) de i18n.js para salir en el idioma elegido.
 */

const DEMOS = (() => {
  const NS = 'http://www.w3.org/2000/svg';
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Temporizadores que se pueden cancelar todos juntos al detener la demo
  function reloj() {
    const ids = new Set();
    let raf = null;
    return {
      en(ms, fn) { const id = setTimeout(() => { ids.delete(id); fn(); }, ms); ids.add(id); },
      cuadro(fn) {
        let ultimo = performance.now();
        const paso = (t) => { const dt = Math.min((t - ultimo) / 1000, 0.05); ultimo = t; fn(dt, t); raf = requestAnimationFrame(paso); };
        raf = requestAnimationFrame(paso);
      },
      parar() { ids.forEach(clearTimeout); ids.clear(); cancelAnimationFrame(raf); }
    };
  }

  // Ejecuta una lista de pasos [esperaMs, funcion] y avisa al terminar
  function secuencia(r, pasos, alTerminar) {
    let t = 0;
    pasos.forEach(([ms, fn]) => { t += ms; r.en(t, fn); });
    if (alTerminar) r.en(t + 10, alTerminar);
  }

  /* ================= Fórmula 1 ================= */
  const PISTA = 'M250 259 L120 259 C70 259 40 236 40 200 C40 168 64 150 92 140 C130 126 132 96 112 74 C96 56 110 30 140 28 C176 26 196 46 214 70 C232 94 262 98 286 82 C318 60 340 30 380 28 C428 26 470 50 476 92 C482 132 452 150 420 160 C392 169 388 196 410 214 C432 232 424 259 388 259 Z';

  function f1(el) {
    // Pilotos y nivel tomados de DataInitializer.java
    const PILOTOS = [
      ['VER', 'Verstappen', '#3671C6', 97], ['HAM', 'Hamilton', '#27F4D2', 96],
      ['LEC', 'Leclerc', '#E8002D', 92], ['NOR', 'Norris', '#FF8000', 90],
      ['ALO', 'Alonso', '#229971', 91], ['GAS', 'Gasly', '#FF87BC', 84]
    ];
    // Factores de tiempo de vuelta de CondicionClimatica.java
    const CLIMAS = [[{ es: 'Seco', en: 'Dry' }, 1.00, 'seco'], [{ es: 'Nublado', en: 'Cloudy' }, 1.05, 'nublado'], [{ es: 'Lluvioso', en: 'Rainy' }, 1.15, 'lluvia']];
    const VUELTAS = 5;

    el.innerHTML = `
      <div class="f1">
        <svg class="f1__pista" viewBox="0 0 520 280" aria-hidden="true">
          <path class="f1__borde" d="${PISTA}"/>
          <path class="f1__asfalto" d="${PISTA}"/>
          <path class="f1__linea" d="${PISTA}"/>
          <rect class="f1__meta" x="246" y="248" width="8" height="22"/>
          <g class="f1__autos"></g>
        </svg>
        <div class="f1__panel">
          <div class="f1__hud">
            <span class="mono">${L({ es: 'Vuelta', en: 'Lap' })} <b class="f1__vuelta">1</b>/${VUELTAS}</span>
            <span class="f1__clima mono"></span>
          </div>
          <ol class="f1__tabla"></ol>
          <p class="f1__evento mono"></p>
        </div>
      </div>`;
    const svg = el.querySelector('svg');
    const pista = svg.querySelector('.f1__linea');
    const largo = pista.getTotalLength();
    const capa = svg.querySelector('.f1__autos');
    const tabla = el.querySelector('.f1__tabla');
    const evento = el.querySelector('.f1__evento');
    const climaEl = el.querySelector('.f1__clima');
    const vueltaEl = el.querySelector('.f1__vuelta');
    let r, autos, clima, terminado;

    const ponerClima = (c) => { clima = c; climaEl.textContent = L(c[0]); climaEl.dataset.clima = c[2]; };

    function preparar() {
      terminado = false;
      capa.innerHTML = '';
      autos = PILOTOS.map(([cod, nombre, color, nivel], i) => {
        const g = document.createElementNS(NS, 'g');
        g.innerHTML = `<circle r="7" fill="${color}" stroke="#0a0e16" stroke-width="2"/>`;
        capa.append(g);
        return { cod, nombre, color, nivel, g, dist: -i * 0.018, combustible: 1, pit: 0 };
      });
      ponerClima(CLIMAS[0]);
      evento.textContent = L({ es: 'Semáforo en verde', en: 'Lights out' });
      dibujar();
    }

    function dibujar() {
      autos.forEach((a) => {
        const p = pista.getPointAtLength((((a.dist % 1) + 1) % 1) * largo);
        a.g.setAttribute('transform', `translate(${p.x} ${p.y})`);
      });
      const orden = [...autos].sort((a, b) => b.dist - a.dist);
      tabla.innerHTML = orden.map((a, i) => `
        <li><span class="mono">${i + 1}</span><i style="background:${a.color}"></i><b>${a.cod}</b>
        <span class="f1__gap mono">${i === 0 ? L({ es: 'Líder', en: 'Leader' }) : '+' + ((orden[0].dist - a.dist) * 84).toFixed(1) + 's'}</span>
        ${a.pit > 0 ? '<em class="mono">PIT</em>' : ''}</li>`).join('');
      vueltaEl.textContent = Math.min(VUELTAS, Math.max(1, Math.floor(orden[0].dist) + 1));
    }

    function iniciar() {
      r = reloj();
      preparar();
      if (quieto) return;
      // El clima cambia cada pocos segundos, como GeneradorClima
      const cambiarClima = () => {
        if (terminado) return;
        ponerClima(CLIMAS[(CLIMAS.indexOf(clima) + 1) % CLIMAS.length]);
        evento.textContent = L({ es: 'Cambio de clima: ', en: 'Weather change: ' }) + L(clima[0]).toLowerCase();
        r.en(5200, cambiarClima);
      };
      r.en(5200, cambiarClima);

      r.cuadro((dt) => {
        if (terminado) return;
        autos.forEach((a) => {
          if (a.pit > 0) { a.pit -= dt; return; }
          // Ritmo: nivel del piloto, clima y un poco de azar
          const ritmo = (0.068 + a.nivel / 2400) / clima[1] * (0.93 + Math.random() * 0.14);
          a.dist += ritmo * dt;
          a.combustible -= dt * (0.05 + Math.random() * 0.02);
          if (a.combustible < 0.18) {          // como necesitaPitStop()
            a.combustible = 1; a.pit = 1.3;
            evento.textContent = a.nombre + L({ es: ' entra a boxes', en: ' pits' });
          }
        });
        dibujar();
        const lider = autos.reduce((m, a) => (a.dist > m.dist ? a : m));
        if (lider.dist >= VUELTAS) {
          terminado = true;
          evento.innerHTML = L({ es: 'Bandera a cuadros: gana ', en: 'Chequered flag: ' }) + `<b>${lider.nombre}</b>` + L({ es: '', en: ' wins' });
          r.en(3500, () => { r.parar(); iniciar(); });
        }
      });
    }
    return { iniciar, detener: () => r && r.parar() };
  }

  /* ================= VitalRoute ================= */
  function vitalroute(el) {
    el.innerHTML = `
      <svg viewBox="0 0 400 200" class="vr" aria-hidden="true">
        <g class="vr__calles">${[40, 90, 140].map((y) => `<line x1="0" y1="${y}" x2="400" y2="${y}"/>`).join('')}${[60, 150, 240, 330].map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="200"/>`).join('')}</g>
        <g class="vr__clinicas">
          <g transform="translate(330 40)"><rect x="-11" y="-11" width="22" height="22" rx="5"/><path d="M-5 0h10M0-5v10"/></g>
          <g transform="translate(60 140)"><rect x="-11" y="-11" width="22" height="22" rx="5"/><path d="M-5 0h10M0-5v10"/></g>
          <g transform="translate(330 140)"><rect x="-11" y="-11" width="22" height="22" rx="5"/><path d="M-5 0h10M0-5v10"/></g>
        </g>
        <g class="vr__alerta" opacity="0"><circle r="7"/><circle r="7" class="vr__onda"/></g>
        <path class="vr__ruta" d=""/>
        <circle class="vr__amb" r="6" opacity="0"/>
      </svg>
      <div class="demo__chips"><span class="mono vr__estado"></span></div>`;
    const svg = el.querySelector('svg');
    const alerta = svg.querySelector('.vr__alerta');
    const ruta = svg.querySelector('.vr__ruta');
    const amb = svg.querySelector('.vr__amb');
    const estado = el.querySelector('.vr__estado');
    const clin = [...svg.querySelectorAll('.vr__clinicas g')];
    const casos = [
      { p: [150, 90], c: 0, tri: 'ROJO', d: 'M150 90 H240 V40 H330' },
      { p: [240, 140], c: 2, tri: 'AMARILLO', d: 'M240 140 H330' },
      { p: [150, 40], c: 1, tri: 'ROJO', d: 'M150 40 V140 H60' }
    ];
    const triaje = { ROJO: { es: 'ROJO', en: 'RED' }, AMARILLO: { es: 'AMARILLO', en: 'YELLOW' } };
    let r, n = 0;
    estado.textContent = L({ es: 'centro de mando · en línea', en: 'command center · online' });
    const iniciar = () => {
      r = reloj();
      const caso = casos[n++ % casos.length];
      clin.forEach((g) => g.classList.remove('is-on'));
      alerta.setAttribute('transform', `translate(${caso.p[0]} ${caso.p[1]})`);
      ruta.setAttribute('d', caso.d);
      const largo = ruta.getTotalLength();
      ruta.style.transition = 'none';
      ruta.style.strokeDasharray = largo; ruta.style.strokeDashoffset = largo;
      amb.setAttribute('opacity', 0);
      secuencia(r, [
        [300, () => { alerta.setAttribute('opacity', 1); estado.textContent = L({ es: 'emergencia recibida · paramédico', en: 'emergency received · paramedic' }); }],
        [1000, () => { estado.innerHTML = `${L({ es: 'triaje', en: 'triage' })}: <b data-t="${caso.tri}">${L(triaje[caso.tri])}</b> · ${L({ es: 'la IA elige clínica', en: 'AI picks the clinic' })}`; }],
        [1100, () => { clin[caso.c].classList.add('is-on'); ruta.style.transition = 'stroke-dashoffset 1.6s ease'; ruta.style.strokeDashoffset = 0; estado.textContent = L({ es: 'despacho enviado en tiempo real', en: 'dispatch sent in real time' }); }],
        [300, () => {
          amb.setAttribute('opacity', 1);
          const t0 = performance.now();
          r.cuadro((dt, t) => {
            const k = Math.min((t - t0) / 1800, 1);
            const p = ruta.getPointAtLength(largo * k);
            amb.setAttribute('cx', p.x); amb.setAttribute('cy', p.y);
          });
        }],
        [2000, () => { estado.textContent = L({ es: 'clínica avisada · cama reservada', en: 'clinic notified · bed reserved' }); alerta.setAttribute('opacity', 0); }],
        [1800, () => {}]
      ], () => { r.parar(); iniciar(); });
    };
    return { iniciar, detener: () => r && r.parar() };
  }

  /* ================= DeliveryBot ================= */
  function deliverybot(el) {
    const chat = [
      ['yo', '/start'],
      ['bot', { es: 'Hola, bienvenido. ¿Qué quieres pedir?', en: 'Hi, welcome. What would you like to order?' }, [{ es: 'Bebidas', en: 'Drinks' }, { es: 'Comidas', en: 'Food' }, { es: 'Mi carrito', en: 'My cart' }]],
      ['yo', { es: 'Bebidas', en: 'Drinks' }],
      ['bot', { es: 'Café americano · $3.000', en: 'Americano coffee · $3,000' }, [{ es: 'Agregar', en: 'Add' }]],
      ['yo', { es: 'Confirmar pedido', en: 'Confirm order' }],
      ['bot', { es: 'Pedido PED-20261212-48213 · Total $9.500. Cocina ya lo tiene.', en: 'Order PED-20261212-48213 · Total $9,500. The kitchen has it.' }]
    ];
    el.innerHTML = `<div class="tg"><div class="tg__top"><i></i><span>DeliveryBot</span><small class="mono">bot</small></div><div class="tg__msgs"></div></div>`;
    const caja = el.querySelector('.tg__msgs');
    let r;
    const iniciar = () => {
      r = reloj();
      caja.innerHTML = '';
      secuencia(r, chat.map(([quien, txt, botones]) => [quien === 'bot' ? 1000 : 900, () => {
        const m = document.createElement('div');
        m.className = 'tg__m tg__' + quien;
        m.innerHTML = L(txt) + (botones ? `<div class="tg__btns">${botones.map((b) => `<span>${L(b)}</span>`).join('')}</div>` : '');
        caja.append(m);
        while (caja.children.length > 4) caja.firstElementChild.remove();
      }]).concat([[2600, () => {}]]), () => { r.parar(); iniciar(); });
    };
    return { iniciar, detener: () => r && r.parar() };
  }

  /* ================= Renta de Herramientas ================= */
  function renta(el) {
    const dias = 14;
    const filas = [{ es: 'Taladro percutor', en: 'Hammer drill' }, { es: 'Andamio 2 m', en: 'Scaffold 2 m' }, { es: 'Mezcladora', en: 'Concrete mixer' }];
    el.innerHTML = `
      <div class="rt">
        <div class="rt__cal">
          ${filas.map((f, i) => `<div class="rt__fila"><span class="mono">${L(f)}</span><div class="rt__dias" data-fila="${i}">${'<i></i>'.repeat(dias)}</div></div>`).join('')}
        </div>
        <div class="rt__fact mono">
          <div><span>Subtotal</span><b class="rt__sub">$0</b></div>
          <div><span>${L({ es: 'IVA 19 %', en: 'VAT 19%' })}</span><b class="rt__iva">$0</b></div>
          <div class="rt__tot"><span>Total</span><b class="rt__total">$0</b></div>
        </div>
        <p class="rt__msg mono"></p>
      </div>`;
    const msg = el.querySelector('.rt__msg');
    const fmt = (n) => '$' + Math.round(n).toLocaleString(idioma() === 'en' ? 'en-US' : 'es-CO');
    let r;
    const bloque = (fila, desde, hasta, clase) => {
      const ds = el.querySelectorAll(`[data-fila="${fila}"] i`);
      for (let d = desde; d <= hasta; d++) ds[d].className = clase;
    };
    const contar = (sel, fin) => {
      const e = el.querySelector(sel), t0 = performance.now();
      const paso = (t) => { const k = Math.min((t - t0) / 700, 1); e.textContent = fmt(fin * k); if (k < 1) requestAnimationFrame(paso); };
      requestAnimationFrame(paso);
    };
    const iniciar = () => {
      r = reloj();
      el.querySelectorAll('.rt__dias i').forEach((i) => { i.className = ''; });
      ['.rt__sub', '.rt__iva', '.rt__total'].forEach((s) => { el.querySelector(s).textContent = '$0'; });
      msg.textContent = L({ es: 'reservas por fechas', en: 'bookings by date' });
      secuencia(r, [
        [500, () => bloque(0, 1, 4, 'ok')],
        [600, () => bloque(1, 3, 9, 'ok')],
        [600, () => bloque(2, 6, 8, 'ok')],
        [800, () => { bloque(0, 3, 6, 'no'); msg.textContent = L({ es: 'taladro ocupado esos días: reserva rechazada', en: 'drill already booked those days: request rejected' }); }],
        [1600, () => { bloque(0, 3, 4, 'ok'); bloque(0, 5, 6, ''); bloque(0, 7, 9, 'nuevo'); msg.textContent = L({ es: 'nueva fecha libre: reserva aprobada', en: 'new free dates: booking approved' }); }],
        [900, () => { contar('.rt__sub', 270000); contar('.rt__iva', 51300); contar('.rt__total', 321300); msg.textContent = L({ es: 'factura calculada por el servidor', en: 'invoice calculated by the server' }); }],
        [3200, () => {}]
      ], () => { r.parar(); iniciar(); });
    };
    return { iniciar, detener: () => r && r.parar() };
  }

  return { f1, vitalroute, deliverybot, renta };
})();
