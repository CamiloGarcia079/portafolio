/*
 * Demostraciones animadas de cada proyecto.
 * Cada función recibe el contenedor, dibuja su escena y devuelve { iniciar, detener }.
 * main.js las enciende solo cuando la tarjeta está en pantalla y las apaga al salir,
 * así no gastan batería ni procesador cuando nadie las ve.
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

  // Ejecuta una lista de pasos [esperaMs, funcion] y vuelve a empezar al terminar
  function secuencia(r, pasos, alTerminar) {
    let t = 0;
    pasos.forEach(([ms, fn]) => { t += ms; r.en(t, fn); });
    if (alTerminar) r.en(t + 10, alTerminar);
  }

  /* ================= Fórmula 1 ================= */
  function f1(el) {
    const PILOTOS = [
      ['VER', 'Verstappen', '#3671C6', 97], ['HAM', 'Hamilton', '#27F4D2', 96],
      ['LEC', 'Leclerc', '#E8002D', 92], ['NOR', 'Norris', '#FF8000', 90],
      ['ALO', 'Alonso', '#229971', 91], ['GAS', 'Gasly', '#FF87BC', 84]
    ];
    // Factores de tiempo de vuelta tomados de CondicionClimatica.java
    const CLIMAS = [['Seco', 1.00], ['Nublado', 1.05], ['Lluvioso', 1.15]];
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
            <span class="mono">Vuelta <b class="f1__vuelta">1</b>/${VUELTAS}</span>
            <span class="f1__clima mono">Seco</span>
          </div>
          <ol class="f1__tabla"></ol>
          <p class="f1__evento mono">Semáforo en verde</p>
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

    function preparar() {
      clima = CLIMAS[0];
      terminado = false;
      capa.innerHTML = '';
      autos = PILOTOS.map(([cod, nombre, color, nivel], i) => {
        const g = document.createElementNS(NS, 'g');
        g.innerHTML = `<circle r="7" fill="${color}" stroke="#0a0e16" stroke-width="2"/>`;
        capa.append(g);
        return { cod, nombre, color, nivel, g, dist: -i * 0.018, combustible: 1, pit: 0 };
      });
      climaEl.textContent = clima[0];
      climaEl.dataset.clima = clima[0];
      evento.textContent = 'Semáforo en verde';
      dibujar();
    }

    function dibujar() {
      autos.forEach((a) => {
        const p = pista.getPointAtLength(((a.dist % 1) + 1) % 1 * largo);
        a.g.setAttribute('transform', `translate(${p.x} ${p.y})`);
      });
      const orden = [...autos].sort((a, b) => b.dist - a.dist);
      tabla.innerHTML = orden.map((a, i) => `
        <li><span class="mono">${i + 1}</span><i style="background:${a.color}"></i><b>${a.cod}</b>
        <span class="f1__gap mono">${i === 0 ? 'Líder' : '+' + ((orden[0].dist - a.dist) * 84).toFixed(1) + 's'}</span>
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
        clima = CLIMAS[(CLIMAS.indexOf(clima) + 1) % CLIMAS.length];
        climaEl.textContent = clima[0];
        climaEl.dataset.clima = clima[0];
        evento.textContent = `Cambio de clima: ${clima[0].toLowerCase()}`;
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
            evento.textContent = `${a.nombre} entra a boxes`;
          }
        });
        dibujar();
        const lider = autos.reduce((m, a) => (a.dist > m.dist ? a : m));
        if (lider.dist >= VUELTAS) {
          terminado = true;
          evento.innerHTML = `Bandera a cuadros: gana <b>${lider.nombre}</b>`;
          r.en(3500, () => { r.parar(); iniciar(); });
        }
      });
    }
    return { iniciar, detener: () => r && r.parar() };
  }
  const PISTA = 'M250 259 L120 259 C70 259 40 236 40 200 C40 168 64 150 92 140 C130 126 132 96 112 74 C96 56 110 30 140 28 C176 26 196 46 214 70 C232 94 262 98 286 82 C318 60 340 30 380 28 C428 26 470 50 476 92 C482 132 452 150 420 160 C392 169 388 196 410 214 C432 232 424 259 388 259 Z';

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
      <div class="demo__chips"><span class="mono vr__estado">centro de mando · en línea</span></div>`;
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
    let r, n = 0;
    const iniciar = () => {
      r = reloj();
      const caso = casos[n++ % casos.length];
      clin.forEach((g) => g.classList.remove('is-on'));
      alerta.setAttribute('transform', `translate(${caso.p[0]} ${caso.p[1]})`);
      ruta.setAttribute('d', caso.d);
      const L = ruta.getTotalLength();
      ruta.style.strokeDasharray = L; ruta.style.strokeDashoffset = L;
      amb.setAttribute('opacity', 0);
      secuencia(r, [
        [300, () => { alerta.setAttribute('opacity', 1); estado.textContent = 'emergencia recibida · paramédico'; }],
        [1000, () => { estado.innerHTML = `triaje: <b data-t="${caso.tri}">${caso.tri}</b> · agente decide clínica`; }],
        [1100, () => { clin[caso.c].classList.add('is-on'); ruta.style.transition = 'stroke-dashoffset 1.6s ease'; ruta.style.strokeDashoffset = 0; estado.textContent = 'despacho enviado por WebSocket'; }],
        [300, () => {
          amb.setAttribute('opacity', 1);
          const t0 = performance.now();
          r.cuadro((dt, t) => {
            const k = Math.min((t - t0) / 1800, 1);
            const p = ruta.getPointAtLength(L * k);
            amb.setAttribute('cx', p.x); amb.setAttribute('cy', p.y);
          });
        }],
        [2000, () => { estado.textContent = 'clínica notificada · cama reservada'; alerta.setAttribute('opacity', 0); }],
        [1800, () => { ruta.style.transition = 'none'; }]
      ], () => { r.parar(); iniciar(); });
    };
    return { iniciar, detener: () => r && r.parar() };
  }

  /* ================= MindConnect ================= */
  function mindconnect(el) {
    const capas = [
      ['GET /api/countries', 'pet'], ['JwtFilter', 'inf'], ['Controller', 'inf'],
      ['UseCase', 'app'], ['Country', 'dom'], ['Repository', 'inf'], ['PostgreSQL', 'db']
    ];
    el.innerHTML = `
      <div class="mc">
        <div class="mc__leyenda mono"><span data-c="inf">infraestructura</span><span data-c="app">aplicación</span><span data-c="dom">dominio</span></div>
        <ol class="mc__fila">${capas.map(([t, c]) => `<li data-c="${c}" class="mono">${t}</li>`).join('')}</ol>
        <div class="mc__resp mono"><span class="mc__codigo">esperando petición</span><span class="mc__tests">631 pruebas · 0 fallos</span></div>
      </div>`;
    const items = [...el.querySelectorAll('.mc__fila li')];
    const codigo = el.querySelector('.mc__codigo');
    let r;
    const iniciar = () => {
      r = reloj();
      items.forEach((i) => i.classList.remove('is-on', 'is-back'));
      codigo.textContent = 'Authorization: Bearer eyJhbGci…';
      const pasos = items.map((it) => [380, () => it.classList.add('is-on')]);
      const vuelta = [...items].reverse().slice(1).map((it) => [140, () => it.classList.add('is-back')]);
      secuencia(r, [...pasos, [300, () => { codigo.textContent = 'consulta en mindconnect_schema'; }], ...vuelta,
        [200, () => { codigo.innerHTML = '<b>200 OK</b> · [{"nameCountry":"Colombia","codeCountry":"CO"}]'; }],
        [2600, () => {}]], () => { r.parar(); iniciar(); });
    };
    return { iniciar, detener: () => r && r.parar() };
  }

  /* ================= Renta de Herramientas ================= */
  function renta(el) {
    const dias = 14;
    const filas = ['Taladro percutor', 'Andamio 2 m', 'Mezcladora'];
    el.innerHTML = `
      <div class="rt">
        <div class="rt__cal">
          ${filas.map((f, i) => `<div class="rt__fila"><span class="mono">${f}</span><div class="rt__dias" data-fila="${i}">${'<i></i>'.repeat(dias)}</div></div>`).join('')}
        </div>
        <div class="rt__fact mono">
          <div><span>Subtotal</span><b class="rt__sub">$0</b></div>
          <div><span>IVA 19 %</span><b class="rt__iva">$0</b></div>
          <div class="rt__tot"><span>Total</span><b class="rt__total">$0</b></div>
        </div>
        <p class="rt__msg mono">reservas por fechas</p>
      </div>`;
    const msg = el.querySelector('.rt__msg');
    const fmt = (n) => '$' + Math.round(n).toLocaleString('es-CO');
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
      msg.textContent = 'reservas por fechas';
      secuencia(r, [
        [500, () => bloque(0, 1, 4, 'ok')],
        [600, () => bloque(1, 3, 9, 'ok')],
        [600, () => bloque(2, 6, 8, 'ok')],
        [800, () => { bloque(0, 3, 6, 'no'); msg.textContent = 'taladro ocupado del día 4 al 5: reserva rechazada'; }],
        [1600, () => { bloque(0, 3, 4, 'ok'); bloque(0, 5, 6, ''); bloque(0, 7, 9, 'nuevo'); msg.textContent = 'nueva fecha disponible: reserva aprobada'; }],
        [900, () => { contar('.rt__sub', 270000); contar('.rt__iva', 51300); contar('.rt__total', 321300); msg.textContent = 'factura calculada en el servidor (BigDecimal)'; }],
        [3200, () => {}]
      ], () => { r.parar(); iniciar(); });
    };
    return { iniciar, detener: () => r && r.parar() };
  }

  /* ================= Aduana-Copilot ================= */
  function aduana(el) {
    const lineas = [
      ['Valor en aduana', '', '934,500.00'], ['IGI', '0 %', '0.00'],
      ['DTA', '0.8 %', '7,476.00'], ['IVA', '0 %', '0.00'], ['Total estimado', '', '941,976.00']
    ];
    el.innerHTML = `
      <div class="ad">
        <p class="ad__agente mono"></p>
        <div class="ad__hoja">${lineas.map(([c, t, v], i) => `<div class="ad__l${i === 4 ? ' ad__tot' : ''}"><span>${c}</span><em class="mono">${t}</em><b class="mono">${v}</b></div>`).join('')}</div>
        <p class="ad__nota mono">tasas de muestra · cada cifra lleva fuente y fecha</p>
      </div>`;
    const ag = el.querySelector('.ad__agente');
    const ls = [...el.querySelectorAll('.ad__l')];
    let r;
    const escribir = (txt) => new Promise((ok) => {
      let i = 0; ag.textContent = '';
      const t = () => { ag.textContent = txt.slice(0, ++i); if (i < txt.length) r.en(22, t); else ok(); };
      t();
    });
    const iniciar = () => {
      r = reloj();
      ls.forEach((l) => l.classList.remove('is-on'));
      escribir('agente > buscar_fraccion("insulina")').then(() => r.en(600, () =>
        escribir('agente > calcular_cotizacion(...)  // el motor hace las cuentas').then(() => {
          secuencia(r, ls.map((l) => [380, () => l.classList.add('is-on')]).concat([[3000, () => {}]]), () => { r.parar(); iniciar(); });
        })));
    };
    return { iniciar, detener: () => r && r.parar() };
  }

  /* ================= DeliveryBot ================= */
  function deliverybot(el) {
    const chat = [
      ['yo', '/start'],
      ['bot', 'Hola, bienvenido. ¿Qué quieres pedir?', ['Bebidas', 'Comidas', 'Mi carrito']],
      ['yo', 'Bebidas'],
      ['bot', 'Café americano · $3.000', ['Agregar']],
      ['yo', 'Confirmar pedido'],
      ['bot', 'Pedido PED-20261212-48213 · Total $9.500. Cocina ya lo tiene.']
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
        m.innerHTML = txt + (botones ? `<div class="tg__btns">${botones.map((b) => `<span>${b}</span>`).join('')}</div>` : '');
        caja.append(m);
        while (caja.children.length > 4) caja.firstElementChild.remove();
      }]).concat([[2600, () => {}]]), () => { r.parar(); iniciar(); });
    };
    return { iniciar, detener: () => r && r.parar() };
  }

  /* ================= Analizador de CVs ================= */
  function cv(el) {
    const casos = [
      ['cv_ejemplo_laura_mendez.pdf', 86, 'Entrevistar', 'Java · Spring Boot · 3 años'],
      ['cv_ejemplo_andres_cardenas.pdf', 31, 'No avanzar por ahora', 'Diseño gráfico · aprendiendo']
    ];
    el.innerHTML = `
      <div class="cv">
        <div class="cv__doc"><span class="cv__scan"></span>${'<i></i>'.repeat(7)}</div>
        <div class="cv__res">
          <p class="cv__file mono"></p>
          <svg viewBox="0 0 120 70" class="cv__gauge"><path class="cv__base" d="M10 64 A50 50 0 0 1 110 64"/><path class="cv__val" d="M10 64 A50 50 0 0 1 110 64"/></svg>
          <p class="cv__pct"><b>0</b>% de ajuste</p>
          <p class="cv__rec mono"></p>
        </div>
      </div>`;
    const val = el.querySelector('.cv__val');
    const L = val.getTotalLength();
    val.style.strokeDasharray = L;
    let r, n = 0;
    const iniciar = () => {
      r = reloj();
      const [file, pct, rec, perfil] = casos[n++ % casos.length];
      el.querySelector('.cv__file').textContent = file;
      el.querySelector('.cv__rec').textContent = 'leyendo PDF…';
      el.querySelector('.cv__pct b').textContent = 0;
      val.style.transition = 'none'; val.style.strokeDashoffset = L;
      el.classList.remove('is-bajo');
      el.querySelector('.cv__doc').classList.add('is-scan');
      secuencia(r, [
        [1600, () => { el.querySelector('.cv__doc').classList.remove('is-scan'); el.querySelector('.cv__rec').textContent = perfil; }],
        [400, () => {
          el.classList.toggle('is-bajo', pct < 50);
          val.style.transition = 'stroke-dashoffset 1.2s ease'; val.style.strokeDashoffset = L * (1 - pct / 100);
          const b = el.querySelector('.cv__pct b'), t0 = performance.now();
          const paso = (t) => { const k = Math.min((t - t0) / 1200, 1); b.textContent = Math.round(pct * k); if (k < 1) requestAnimationFrame(paso); };
          requestAnimationFrame(paso);
        }],
        [1400, () => { el.querySelector('.cv__rec').textContent = 'recomendación: ' + rec; }],
        [2600, () => {}]
      ], () => { r.parar(); iniciar(); });
    };
    return { iniciar, detener: () => r && r.parar() };
  }

  /* ================= Tribuna Global ================= */
  function tribuna(el) {
    const ops = [
      ['"Qué definición, el mejor del partido."', 'positiva'],
      ['"Hoy no apareció en todo el segundo tiempo."', 'negativa'],
      ['"Buen pase, pero falló dos goles claros."', 'mixta'],
      ['"Jugó de lateral izquierdo."', 'neutra']
    ];
    el.innerHTML = `
      <div class="tb">
        <p class="tb__op"></p>
        <p class="tb__res mono"></p>
        <div class="tb__barras">${['positiva', 'negativa', 'mixta', 'neutra'].map((s) => `<div data-s="${s}"><span class="mono">${s}</span><i><b></b></i><em class="mono">0</em></div>`).join('')}</div>
      </div>`;
    const cuenta = { positiva: 0, negativa: 0, mixta: 0, neutra: 0 };
    let r, n = 0;
    const pintar = () => Object.entries(cuenta).forEach(([s, c]) => {
      const fila = el.querySelector(`.tb__barras [data-s="${s}"]`);
      fila.querySelector('b').style.width = Math.min(c * 18, 100) + '%';
      fila.querySelector('em').textContent = c;
    });
    const iniciar = () => {
      r = reloj();
      const una = () => {
        const [txt, s] = ops[n++ % ops.length];
        el.querySelector('.tb__op').textContent = txt;
        el.querySelector('.tb__res').innerHTML = 'clasificando…';
        r.en(1100, () => {
          el.querySelector('.tb__res').innerHTML = `sentimiento: <b data-s="${s}">${s}</b> · guardado`;
          cuenta[s]++; if (Object.values(cuenta).some((c) => c > 5)) Object.keys(cuenta).forEach((k) => { cuenta[k] = 0; });
          pintar();
          r.en(1800, una);
        });
      };
      pintar(); una();
    };
    return { iniciar, detener: () => r && r.parar() };
  }

  /* ================= Banco ACME ================= */
  function banco(el) {
    // Mismo algoritmo que js/6_clave_dinamica.js del proyecto
    const clave = () => String((Math.floor(Date.now() / 30000) * 99991 + 12345) % 1000000).padStart(6, '0');
    el.innerHTML = `
      <div class="bk">
        <div class="bk__card">
          <span class="mono">Banco ACME · cuenta 4012</span>
          <b class="bk__saldo">$0</b>
          <small>saldo disponible</small>
        </div>
        <div class="bk__lado">
          <div class="bk__token"><small>Clave dinámica</small><b class="mono bk__clave">------</b><i><span class="bk__barra"></span></i></div>
          <ul class="bk__mov mono"></ul>
        </div>
      </div>`;
    const saldoEl = el.querySelector('.bk__saldo');
    const movs = el.querySelector('.bk__mov');
    const ops = [['Consignación', 500000], ['Pago luz · ref 8812', -84300], ['Transferencia a 2207', -120000], ['Meta de ahorro', -50000]];
    const fmt = (n) => '$' + Math.round(n).toLocaleString('es-CO');
    let r, saldo, mostrado;
    const iniciar = () => {
      r = reloj();
      saldo = 1250000; mostrado = 0; movs.innerHTML = '';
      r.cuadro((dt) => {
        mostrado += (saldo - mostrado) * Math.min(dt * 6, 1);
        saldoEl.textContent = fmt(mostrado);
        const resta = 30 - (Date.now() / 1000) % 30;
        el.querySelector('.bk__barra').style.width = (resta / 30 * 100) + '%';
        el.querySelector('.bk__clave').textContent = clave();
      });
      secuencia(r, ops.map(([t, v]) => [1400, () => {
        saldo += v;
        const li = document.createElement('li');
        li.innerHTML = `<span>${t}</span><b class="${v > 0 ? 'in' : 'out'}">${v > 0 ? '+' : '−'}${fmt(Math.abs(v))}</b>`;
        movs.prepend(li);
        while (movs.children.length > 3) movs.lastElementChild.remove();
      }]).concat([[3000, () => {}]]), () => { r.parar(); iniciar(); });
    };
    return { iniciar, detener: () => r && r.parar() };
  }

  return { f1, vitalroute, mindconnect, renta, aduana, deliverybot, cv, tribuna, banco };
})();
