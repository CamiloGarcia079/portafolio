/*
 * Portafolio · Camilo García
 * Todo el comportamiento de la página, sin librerías.
 * Cada bloque es una función pequeña que se llama al final del archivo.
 */

const $ = (sel, raiz = document) => raiz.querySelector(sel);
const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];
const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const CORREO = 'kaliko2411@gmail.com';

/* ---------- Tema claro / oscuro ---------- */
function iniciarTema() {
  $('#tema').addEventListener('click', () => {
    const html = document.documentElement;
    const nuevo = html.dataset.theme === 'light' ? 'dark' : 'light';
    html.dataset.theme = nuevo;
    try { localStorage.setItem('tema', nuevo); } catch (e) { /* modo privado */ }
  });
}

/* ---------- Idioma español / inglés ---------- */
function iniciarIdioma() {
  aplicarIdioma(idioma());
  $$('.lang button').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.lang === idioma()) return;
    aplicarIdioma(b.dataset.lang);
    try { localStorage.setItem('idioma', b.dataset.lang); } catch (e) { /* modo privado */ }
    pintarContenido();                       // vuelve a armar tarjetas en el nuevo idioma
    $('#flow-estado').textContent = idioma() === 'en' ? 'waiting' : 'en espera';
    $('#flow-log').innerHTML = '';
    actualizarGmail();
  }));
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
const observadorReveal = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('is-in');
      observadorReveal.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

function observarApariciones(raiz = document) {
  $$('.reveal:not(.is-in)', raiz).forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    observadorReveal.observe(el);
  });
}

/* ---------- Contadores de la portada ---------- */
function iniciarContadores() {
  $$('[data-count]').forEach((el) => {
    const fin = Number(el.dataset.count);
    const sufijo = el.dataset.sufijo || '';
    if (sinMovimiento) { el.textContent = fin + sufijo; return; }
    const inicio = performance.now() + 500;
    const paso = (ahora) => {
      const t = Math.max(0, Math.min((ahora - inicio) / 1400, 1));
      el.textContent = Math.round(fin * (1 - Math.pow(1 - t, 3))) + (t === 1 ? sufijo : '');
      if (t < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  });
}

/* ---------- Flujo de automatización de la portada ---------- */
function iniciarFlujo() {
  const nodos = $$('.flow .node');
  const aristas = $$('.flow .edge');
  const punto = $('.packet');
  const registro = $('#flow-log');
  const estado = $('#flow-estado');
  const boton = $('#flow-run');
  let corriendo = false;

  // Cada paso: qué conexión recorre el punto y qué nodo se enciende
  const pasos = [{ nodo: 0 }, { arista: 0, nodo: 1 }, { arista: 1, nodo: 2 }, { arista: 2, nodo: 3 }, { arista: 3, nodo: 4 }];
  const hora = () => new Date().toLocaleTimeString('es-CO', { hour12: false });

  const escribir = (html) => {
    const li = document.createElement('li');
    li.innerHTML = `${hora()} ${html}`;
    registro.append(li);
    while (registro.children.length > 6) registro.firstElementChild.remove();
  };

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

  async function ejecutar() {
    if (corriendo) return;
    corriendo = true;
    boton.disabled = true;
    nodos.forEach((n) => n.classList.remove('is-active', 'is-done'));
    aristas.forEach((a) => a.classList.remove('is-active', 'is-done'));
    estado.textContent = T('flowRun');
    estado.className = 'flow__state mono is-running';
    const textos = T('flow');
    escribir(textos[0]);

    for (const [i, paso] of pasos.entries()) {
      if (paso.arista !== undefined) {
        const a = aristas[paso.arista];
        a.classList.add('is-active');
        await moverPunto(a, sinMovimiento ? 1 : 650);
        a.classList.replace('is-active', 'is-done');
      }
      const n = nodos[paso.nodo];
      n.classList.add('is-active');
      escribir(textos[i + 1]);
      await esperar(sinMovimiento ? 0 : 450);
      n.classList.replace('is-active', 'is-done');
    }

    estado.textContent = T('flowOk');
    estado.className = 'flow__state mono is-done';
    corriendo = false;
    boton.disabled = false;
  }

  boton.addEventListener('click', ejecutar);
  setTimeout(ejecutar, 1200);
  if (!sinMovimiento) {
    let visible = true;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe($('.flow'));
    setInterval(() => { if (visible && !document.hidden) ejecutar(); }, 12000);
  }
}

/* ---------- Simulaciones: se encienden al verse y se apagan al salir ---------- */
const demosActivas = new Map();
const observadorDemos = new IntersectionObserver((entradas) => {
  entradas.forEach(({ target, isIntersecting }) => {
    let demo = demosActivas.get(target);
    if (isIntersecting) {
      if (!demo) {
        const crear = DEMOS[target.dataset.demo];
        if (!crear) return;
        demo = crear(target);
        demosActivas.set(target, demo);
      }
      demo.detener();
      demo.iniciar();
    } else if (demo) {
      demo.detener();
    }
  });
}, { threshold: 0.25 });

function apagarDemos() {
  demosActivas.forEach((d, el) => { d.detener(); observadorDemos.unobserve(el); });
  demosActivas.clear();
}

/* ---------- Tarjetas de proyectos ---------- */
function crearTarjeta(p, i) {
  const art = document.createElement('article');
  art.className = 'card reveal' + (p.destacado ? ' card--wide' : '');
  art.innerHTML = `
    <div class="demo${p.destacado ? ' demo--wide' : ''}" data-demo="${p.id}" aria-hidden="true"></div>
    <div class="card__body">
      <div class="card__top">
        <span class="card__tag">${L(p.etiqueta)}</span>
        ${p.destacado ? `<span class="card__badge mono">${T('principal')}</span>` : `<span class="card__num">${String(i + 1).padStart(2, '0')}</span>`}
      </div>
      <h3>${L(p.titulo)}</h3>
      <p class="card__simple">${L(p.simple)}</p>
      ${p.rol ? `<p class="card__role">${L(p.rol)}</p>` : ''}
      <p class="card__metric">${L(p.metrica)}</p>
      <div class="card__chips">${p.stack.map((s) => `<span class="tag">${s}</span>`).join('')}</div>
      <div class="card__actions">
        <button class="card__btn" type="button" data-id="${p.id}">${T('detalle')} <span>&rarr;</span></button>
        <a class="card__btn" href="${p.repo}" target="_blank" rel="noopener">${T('repo')} <span>&nearr;</span></a>
      </div>
    </div>`;
  art.addEventListener('pointermove', (ev) => {
    const r = art.getBoundingClientRect();
    art.style.setProperty('--mx', `${ev.clientX - r.left}px`);
    art.style.setProperty('--my', `${ev.clientY - r.top}px`);
  });
  return art;
}

function pintarProyectos() {
  apagarDemos();
  const lista = $('#lista-proyectos');
  lista.innerHTML = '';
  PROYECTOS.forEach((p, i) => lista.append(crearTarjeta(p, i)));
  $$('.demo', lista).forEach((d) => observadorDemos.observe(d));

}

function iniciarFicha() {
  const modal = $('#modal');
  $('#lista-proyectos').addEventListener('click', (ev) => {
    const boton = ev.target.closest('[data-id]');
    if (!boton) return;
    const p = PROYECTOS.find((x) => x.id === boton.dataset.id);
    $('#modal-tag').textContent = L(p.etiqueta);
    $('#modal-titulo').textContent = L(p.titulo);
    $('#modal-rol').textContent = p.rol ? L(p.rol) : '';
    $('#modal-cuerpo').innerHTML = `
      <h4>${T('simple')}</h4><p>${L(p.simple)}</p>
      <h4>${T('problema')}</h4><p>${L(p.problema)}</p>
      <h4>${T('hice')}</h4><ul>${L(p.hice).map((h) => `<li>${h}</li>`).join('')}</ul>`;
    $('#modal-chips').innerHTML = p.stack.map((s) => `<span class="tag">${s}</span>`).join('');
    $('#modal-repo').href = p.repo;
    modal.showModal();
  });
  $('#cerrar-modal').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (ev) => { if (ev.target === modal) modal.close(); });
}

/* ---------- Habilidades blandas ---------- */
function pintarHabilidades() {
  $('#lista-habilidades').innerHTML = HABILIDADES.map((h) => `
    <article class="skill reveal">
      <div class="skill__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${h.icono}"/></svg></div>
      <h3>${L(h.t)}</h3>
      <p>${L(h.d)}</p>
      <p class="skill__ev"><span class="mono">${T('ejemplo')}</span>${L(h.e)}</p>
    </article>`).join('');
}

/* ---------- Tecnologías con logo, explicación simple y dónde se usaron ---------- */
function icono(logo) {
  const l = LOGOS[logo];
  return l ? `<svg viewBox="0 0 24 24" aria-hidden="true" style="--marca:${l.c}"><path d="${l.d}"/></svg>` : '';
}

function pintarStack() {
  const ver = idioma() === 'en' ? 'See it in' : 'Ver en';
  // Lenguajes principales: cada tarjeta abre el proyecto donde se usó
  $('#lenguajes').innerHTML = LENGUAJES.map((l) => `
    <a class="lang-card tech reveal" href="${l.repo}" target="_blank" rel="noopener" data-n="${l.n}" data-donde="${l.proyecto}">
      ${icono(l.logo)}
      <span class="lang-card__n">${l.n}</span>
      <span class="lang-card__uso">${L(l.uso)}</span>
      <span class="lang-card__ir mono">${ver} ${l.proyecto} &nearr;</span>
    </a>`).join('');

  // Resto de tecnologías por grupo; cada una también abre su proyecto
  $('#stack-grid').innerHTML = STACK.map((g) => `
    <div class="stack__row reveal">
      <div class="stack__grupo"><h3>${L(g.grupo)}</h3><p>${L(g.simple)}</p></div>
      <div class="stack__items">${g.items.map(([nombre, proyecto, logo, url]) =>
        `<a class="tech" href="${url}" target="_blank" rel="noopener" data-n="${nombre}" data-donde="${proyecto}">${icono(logo)}<span>${nombre}</span></a>`
      ).join('')}</div>
    </div>`).join('');
}

function iniciarStack() {
  const grid = $('#stack');
  const donde = $('#stack-donde');
  const mostrar = (el) => {
    $$('.tech', grid).forEach((t) => t.classList.toggle('is-on', t === el));
    const abrir = idioma() === 'en' ? 'click to open the project' : 'clic para abrir el proyecto';
    donde.innerHTML = `${el.dataset.n} &rarr; <b>${el.dataset.donde}</b> · ${abrir}`;
  };
  ['pointerover', 'focusin'].forEach((tipo) => grid.addEventListener(tipo, (ev) => {
    const t = ev.target.closest('.tech');
    if (t) mostrar(t);
  }));
}

/* Arma todo lo que depende del idioma */
function pintarContenido() {
  pintarHabilidades();
  pintarProyectos();
  pintarStack();
  // Lo nuevo aparece ya visible si su sección está en pantalla
  $$('#lista-habilidades .reveal, #lista-proyectos .reveal, #stack .reveal').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in');
  });
  observarApariciones();
}

/* ---------- Aviso flotante ---------- */
function avisar(texto) {
  const toast = $('#toast');
  toast.textContent = texto;
  toast.classList.add('is-on');
  clearTimeout(avisar.t);
  avisar.t = setTimeout(() => toast.classList.remove('is-on'), 2600);
}

/* ---------- Contacto: copiar, formulario y redactar ---------- */
function datosFormulario() {
  const f = $('#form-contacto');
  return {
    nombre: f.nombre.value.trim(),
    email: f.email.value.trim(),
    empresa: f.empresa.value.trim(),
    mensaje: f.mensaje.value.trim()
  };
}

function cuerpoCorreo(d) {
  const partes = [d.mensaje];
  if (d.nombre || d.empresa) partes.push('', '— ' + [d.nombre, d.empresa].filter(Boolean).join(' · '));
  return partes.join('\n');
}

function actualizarGmail() {
  const d = datosFormulario();
  const url = new URL('https://mail.google.com/mail/');
  url.search = new URLSearchParams({ view: 'cm', to: CORREO, su: T('asunto'), body: cuerpoCorreo(d) });
  $('#gmail').href = url.toString();
}

function iniciarContacto() {
  $('#copiar').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(CORREO); avisar(T('copiado')); }
    catch (e) { avisar(T('noCopiado')); }
  });

  const form = $('#form-contacto');
  const estado = $('#form-estado');
  form.addEventListener('input', actualizarGmail);
  actualizarGmail();

  // Abre el programa de correo del visitante con el mensaje ya escrito
  $('#redactar').addEventListener('click', () => {
    const d = datosFormulario();
    location.href = `mailto:${CORREO}?subject=${encodeURIComponent(T('asunto'))}&body=${encodeURIComponent(cuerpoCorreo(d))}`;
  });

  // Envía el mensaje con FormSubmit: llega directo al correo de Camilo
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const d = datosFormulario();
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email);
    if (!d.nombre || !correoValido || !d.mensaje) {
      estado.textContent = T('faltan');
      estado.className = 'form__estado mono is-error';
      return;
    }
    if (form._honey.value) return;          // lo llenó un bot

    const boton = form.querySelector('[type="submit"]');
    boton.disabled = true;
    estado.textContent = T('enviando');
    estado.className = 'form__estado mono';
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CORREO}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nombre: d.nombre, email: d.email, empresa: d.empresa || '-', mensaje: d.mensaje,
          _subject: `${T('asunto')}: ${d.nombre}`, _template: 'table', _captcha: 'false'
        })
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) === 'false') throw new Error(json.message || res.status);
      form.reset();
      actualizarGmail();
      estado.textContent = T('enviado');
      estado.className = 'form__estado mono is-ok';
    } catch (e) {
      estado.textContent = T('errorEnvio');
      estado.className = 'form__estado mono is-error';
    } finally {
      boton.disabled = false;
    }
  });
}

/* ---------- Arranque ---------- */
iniciarTema();
iniciarIdioma();
iniciarNavegacion();
pintarContenido();
iniciarFicha();
iniciarStack();
iniciarContacto();
observarApariciones();
iniciarContadores();
iniciarFlujo();
