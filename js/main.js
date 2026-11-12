/*
 * Portafolio · Camilo García
 * Todo el comportamiento de la página, sin librerías.
 * Cada bloque es una función pequeña que se llama al final del archivo.
 */

const $ = (sel, raiz = document) => raiz.querySelector(sel);
const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];
const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- Tema claro / oscuro ---------- */
function iniciarTema() {
  $('#tema').addEventListener('click', () => {
    const html = document.documentElement;
    const nuevo = html.dataset.theme === 'light' ? 'dark' : 'light';
    html.dataset.theme = nuevo;
    try { localStorage.setItem('tema', nuevo); } catch (e) { /* modo privado: no pasa nada */ }
  });
}

/* ---------- Navegación: fondo al bajar, menú móvil y sección activa ---------- */
function iniciarNavegacion() {
  const nav = $('#nav');
  const barra = $('.progress');
  const boton = $('#abrir-menu');
  const menu = $('#menu');

  const alHacerScroll = () => {
    nav.classList.toggle('is-scrolled', scrollY > 20);
    const total = document.documentElement.scrollHeight - innerHeight;
    barra.style.transform = `scaleX(${total > 0 ? scrollY / total : 0})`;
  };
  addEventListener('scroll', alHacerScroll, { passive: true });
  alHacerScroll();

  boton.addEventListener('click', () => {
    const abierto = menu.classList.toggle('is-open');
    boton.setAttribute('aria-expanded', abierto);
  });
  $$('a', menu).forEach((a) => a.addEventListener('click', () => {
    menu.classList.remove('is-open');
    boton.setAttribute('aria-expanded', 'false');
  }));

  // Marca en el menú la sección que se está viendo
  const enlaces = $$('a', menu);
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      enlaces.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach((s) => observador.observe(s));
}

/* ---------- Aparición de elementos al hacer scroll ---------- */
function iniciarApariciones() {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        observador.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    observador.observe(el);
  });
}

/* ---------- Contadores de la portada ---------- */
function iniciarContadores() {
  $$('[data-count]').forEach((el) => {
    const fin = Number(el.dataset.count);
    if (sinMovimiento) { el.textContent = fin; return; }
    const inicio = performance.now();
    const duracion = 1400;
    const paso = (ahora) => {
      const t = Math.min((ahora - inicio) / duracion, 1);
      el.textContent = Math.round(fin * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(paso);
    };
    setTimeout(() => requestAnimationFrame(paso), 500);
  });
}

/* ---------- Flujo de automatización de la portada ----------
 * Simula un pedido recorriendo los nodos: cada paso enciende un nodo,
 * mueve el punto por la conexión y escribe una línea en el registro.
 */
function iniciarFlujo() {
  const nodos = $$('.node');
  const aristas = $$('.edge');
  const punto = $('.packet');
  const registro = $('#flow-log');
  const estado = $('#flow-estado');
  const boton = $('#flow-run');
  let corriendo = false;

  const pasos = [
    { nodo: 0, texto: 'mensaje recibido de <b>@cliente</b>: "2 cafés y 1 pandebono"' },
    { arista: 0, nodo: 1, texto: 'router: acción = <b>confirmar_pedido</b>' },
    { arista: 1, nodo: 2, texto: 'sheets: total $9.500 · pedido <b>PED-20261212-48213</b>' },
    { arista: 2, nodo: 3, texto: 'cocina notificada: pedido en preparación' },
    { arista: 3, nodo: 4, texto: 'cliente notificado: <span class="ok">pedido confirmado</span>' }
  ];

  const hora = () => new Date().toLocaleTimeString('es-CO', { hour12: false });

  const escribir = (html) => {
    const li = document.createElement('li');
    li.innerHTML = `${hora()} ${html}`;
    registro.append(li);
    while (registro.children.length > 6) registro.firstElementChild.remove();
  };

  // Mueve el punto a lo largo de la conexión usando su longitud
  const moverPunto = (arista, ms) => new Promise((listo) => {
    const largo = arista.getTotalLength();
    const inicio = performance.now();
    punto.style.opacity = 1;
    const cuadro = (ahora) => {
      const t = Math.min((ahora - inicio) / ms, 1);
      const p = arista.getPointAtLength(largo * t);
      punto.setAttribute('cx', p.x);
      punto.setAttribute('cy', p.y);
      if (t < 1) requestAnimationFrame(cuadro);
      else { punto.style.opacity = 0; listo(); }
    };
    requestAnimationFrame(cuadro);
  });

  const reiniciar = () => {
    nodos.forEach((n) => n.classList.remove('is-active', 'is-done'));
    aristas.forEach((a) => a.classList.remove('is-active', 'is-done'));
  };

  async function ejecutar() {
    if (corriendo) return;
    corriendo = true;
    boton.disabled = true;
    reiniciar();
    estado.textContent = 'ejecutando';
    estado.className = 'flow__state mono is-running';
    escribir('<b>ejecución iniciada</b>');

    for (const paso of pasos) {
      if (paso.arista !== undefined) {
        const a = aristas[paso.arista];
        a.classList.add('is-active');
        await moverPunto(a, sinMovimiento ? 1 : 650);
        a.classList.replace('is-active', 'is-done');
      }
      const n = nodos[paso.nodo];
      n.classList.add('is-active');
      escribir(paso.texto);
      await esperar(sinMovimiento ? 0 : 450);
      n.classList.replace('is-active', 'is-done');
    }

    estado.textContent = 'ok · 5 nodos';
    estado.className = 'flow__state mono is-done';
    corriendo = false;
    boton.disabled = false;
  }

  boton.addEventListener('click', ejecutar);

  // Se ejecuta solo al cargar y luego cada 12 segundos mientras se vea
  setTimeout(ejecutar, 1200);
  if (!sinMovimiento) {
    let visible = true;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe($('.flow'));
    setInterval(() => { if (visible && !document.hidden) ejecutar(); }, 12000);
  }
}

/* ---------- Proyectos: tarjetas, filtros y ficha ---------- */
function crearTarjeta(p, i) {
  const art = document.createElement('article');
  art.className = 'card reveal';
  art.dataset.categorias = p.categorias.join(' ');
  art.innerHTML = `
    <div class="card__top"><span class="card__tag">${p.etiqueta}</span><span class="card__num">${String(i + 1).padStart(2, '0')}</span></div>
    <h3>${p.titulo}</h3>
    <p>${p.resumen}</p>
    ${p.rol ? `<p class="card__role">${p.rol}</p>` : ''}
    <p class="card__metric">${p.metrica}</p>
    <div class="card__chips">${p.stack.slice(0, 5).map((s) => `<span class="tag">${s}</span>`).join('')}</div>
    <div class="card__actions">
      <button class="card__btn" type="button" data-id="${p.id}">Ver detalle <span>&rarr;</span></button>
      <a class="card__btn" href="${p.repo}" target="_blank" rel="noopener">Repositorio <span>&nearr;</span></a>
    </div>`;
  // Brillo que sigue al cursor
  art.addEventListener('pointermove', (ev) => {
    const r = art.getBoundingClientRect();
    art.style.setProperty('--mx', `${ev.clientX - r.left}px`);
    art.style.setProperty('--my', `${ev.clientY - r.top}px`);
  });
  return art;
}

function iniciarProyectos() {
  const lista = $('#lista-proyectos');
  PROYECTOS.forEach((p, i) => lista.append(crearTarjeta(p, i)));

  // Filtros
  $$('.chip').forEach((chip) => chip.addEventListener('click', () => {
    $$('.chip').forEach((c) => { c.classList.remove('is-active'); c.setAttribute('aria-pressed', 'false'); });
    chip.classList.add('is-active');
    chip.setAttribute('aria-pressed', 'true');
    const filtro = chip.dataset.filtro;
    $$('.card', lista).forEach((card) => {
      const entra = filtro === 'todos' || card.dataset.categorias.includes(filtro);
      card.classList.toggle('is-hidden', !entra);
      if (entra) card.classList.add('is-in');
    });
  }));

  // Ficha de detalle
  const modal = $('#modal');
  lista.addEventListener('click', (ev) => {
    const boton = ev.target.closest('[data-id]');
    if (!boton) return;
    const p = PROYECTOS.find((x) => x.id === boton.dataset.id);
    $('#modal-tag').textContent = p.etiqueta;
    $('#modal-titulo').textContent = p.titulo;
    $('#modal-rol').textContent = p.rol || '';
    $('#modal-cuerpo').innerHTML = `
      <h4>El problema</h4><p>${p.problema}</p>
      <h4>Qué hice</h4><ul>${p.hice.map((h) => `<li>${h}</li>`).join('')}</ul>`;
    $('#modal-chips').innerHTML = p.stack.map((s) => `<span class="tag">${s}</span>`).join('');
    $('#modal-repo').href = p.repo;
    modal.showModal();
  });
  $('#cerrar-modal').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (ev) => { if (ev.target === modal) modal.close(); });
}

/* ---------- Stack: al tocar una tecnología dice dónde se usó ---------- */
function iniciarStack() {
  const grid = $('#stack-grid');
  const donde = $('#stack-donde');
  STACK.forEach((g) => {
    const fila = document.createElement('div');
    fila.className = 'stack__row reveal';
    fila.innerHTML = `<h3>${g.grupo}</h3><div class="stack__items">${
      g.items.map(([nombre, proyectos]) => `<button class="tech" type="button" data-donde="${proyectos}">${nombre}</button>`).join('')
    }</div>`;
    grid.append(fila);
  });
  const mostrar = (btn) => {
    $$('.tech', grid).forEach((t) => t.classList.toggle('is-on', t === btn));
    donde.innerHTML = `${btn.textContent} &rarr; <b>${btn.dataset.donde}</b>`;
  };
  grid.addEventListener('pointerover', (ev) => { const b = ev.target.closest('.tech'); if (b) mostrar(b); });
  grid.addEventListener('click', (ev) => { const b = ev.target.closest('.tech'); if (b) mostrar(b); });
  grid.addEventListener('focusin', (ev) => { const b = ev.target.closest('.tech'); if (b) mostrar(b); });
}

/* ---------- Copiar el correo ---------- */
function iniciarCopiar() {
  const toast = $('#toast');
  const avisar = (texto) => {
    toast.textContent = texto;
    toast.classList.add('is-on');
    setTimeout(() => toast.classList.remove('is-on'), 2200);
  };
  $('#copiar').addEventListener('click', async (ev) => {
    try {
      await navigator.clipboard.writeText(ev.currentTarget.dataset.correo);
      avisar('Correo copiado');
    } catch (e) {
      avisar('No se pudo copiar: kaliko2411@gmail.com');
    }
  });
}

/* ---------- Arranque ---------- */
iniciarTema();
iniciarNavegacion();
iniciarProyectos();   // antes de las apariciones, para que las tarjetas también se animen
iniciarStack();
iniciarApariciones();
iniciarContadores();
iniciarFlujo();
