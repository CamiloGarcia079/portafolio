/*
 * Traducciones del portafolio.
 * El español está escrito directamente en index.html: al cargar, la página guarda
 * esos textos como versión "es". Aquí solo va la versión en inglés de cada clave.
 * Los textos que arma JavaScript (registro del flujo, avisos, formulario) usan T().
 */
const EN = {
  'skip': 'Skip to content',
  'nav.sobre': 'About', 'nav.habilidades': 'Skills', 'nav.proyectos': 'Projects',
  'nav.stack': 'Technologies', 'nav.trayectoria': 'Journey', 'nav.contacto': 'Contact',
  'aria.tema': 'Switch light or dark theme',

  'hero.status': 'Professional internship at Globant starting December 2026',
  'hero.rol': 'Software Development and Artificial Intelligence Technician',
  'hero.lead': 'I build <strong>software that handles repetitive work on its own</strong>: assistants that serve customers over chat, systems that connect tools together and secure web applications. I am a Junior Developer focused on <strong>automation, bots and web development</strong>.',
  'hero.ver': 'See projects', 'hero.contacto': 'Contact me',
  'hero.s1': 'automated tests that check my code', 'hero.s2': 'year of intensive training',
  'hero.s3': 'projects with AI or automation',

  'flow.espera': 'waiting', 'flow.n1': 'JS code', 'flow.n2': 'save order', 'flow.n3t': 'Kitchen',
  'flow.n3': 'notify', 'flow.n4t': 'Customer', 'flow.n4': 'confirmation',
  'flow.cap': 'This is how an automation works: an order arrives by chat and is processed on its own.',
  'flow.run': 'Run workflow',

  'sobre.t': 'About me',
  'sobre.big': 'If a task is repeated every day, it can be automated. That idea drives almost everything I build.',
  'sobre.p1': 'I am a <strong>Software Development and Artificial Intelligence Technician</strong>, trained for one intensive year at <strong>CampusLands</strong>. In that time I went from simple web pages to complete systems: secure applications, chat assistants and AI-powered tools.',
  'sobre.p2': 'In <strong>December 2026 I start my professional internship at Globant</strong>. I want to be where I can take manual work off people and teams, so they can spend their time on what really matters.',
  'sobre.p3': 'I work well in teams, explain technical topics in simple words and deliver projects that someone else can understand and run without help.',
  'f.titulo': 'Degree', 'f.titulo.v': 'Software Development and AI Technician',
  'f.paso': 'Next step', 'f.paso.v': 'Internship · Globant', 'f.ubic': 'Location',
  'f.idiomas': 'Languages', 'f.idiomas.v': 'Spanish (native) · English A2',
  'f.rol': 'Role', 'f.rol.v': 'Junior Developer', 'f.enfoque': 'Focus', 'f.enfoque.v': 'Automation, bots and web',
  'sobre.cv': 'Download résumé',

  'hab.t': 'Skills',
  'hab.intro': 'What I bring to a team beyond code. Each skill comes with a real example.',
  'hab.que': 'What I can do for your team',
  'p1.t': 'Automate processes', 'p1.d': 'Turn manual, repetitive tasks into processes that run on their own and keep a record.',
  'p2.t': 'Bots and AI assistants', 'p2.d': 'Assistants that serve people over chat, understand what they are asked and answer with real data.',
  'p3.t': 'Web applications', 'p3.d': 'Systems with users, permissions and protected data, tested before delivery.',

  'proy.t': 'Featured projects',
  'proy.intro': 'Each project has a simulation so you can see how it works, even if you are not technical.',
  'proy.otros': 'Other projects',

  'stack.t': 'Technologies',
  'stack.intro': 'The tools I build with, explained in simple words. Tap one to see which project I used it in.',
  'stack.sel': 'Select a technology.',

  'tray.t': 'Journey',
  'tray.1f': 'Next · Dec 2026', 'tray.1t': 'Professional internship · Globant',
  'tray.1d': 'Start of my professional practice as a developer at a global technology company.',
  'tray.2t': 'Software Development and AI Technician · CampusLands',
  'tray.2d': 'One year of intensive training: programming in Java, Python, JavaScript and TypeScript, databases, automation with n8n and applied artificial intelligence.',
  'tray.3f': 'Agent Challenge 2026', 'tray.3t': 'Platica.mx with CampusLands · Aduana-Copilot',
  'tray.3d': 'Pair challenge: an AI assistant that calculates how much it costs to import medicines. I built the assistant and the interface.',
  'tray.4t': '"Visual Agents" · GUARDIAN',
  'tray.4d': 'In-person AI hackathon: a road safety system using computer vision. My role was making sure the team’s parts worked together and presenting the final result.',

  'cont.t1': 'Let’s talk about what', 'cont.t2': 'can be automated.',
  'cont.p': 'Write to me right here and the message reaches my inbox. If you prefer, compose the email from your own account.',
  'cont.copiar': 'Copy email', 'cont.cv': 'Résumé',
  'form.nombre': 'Name', 'form.correo': 'Your email', 'form.empresa': 'Company (optional)', 'form.mensaje': 'Message',
  'form.enviar': 'Send message', 'form.redactar': 'Compose from my email', 'form.gmail': 'Open in Gmail',
  'footer': 'HTML, CSS and JavaScript, no frameworks',
  'modal.repo': 'View repository'
};

/* Textos que arma JavaScript */
const TXT = {
  es: {
    detalle: 'Ver detalle', repo: 'Repositorio', problema: 'El problema', hice: 'Qué hice', simple: 'En palabras simples',
    copiado: 'Correo copiado', noCopiado: 'No se pudo copiar: kaliko2411@gmail.com',
    enviando: 'Enviando…', enviado: 'Mensaje enviado. Te respondo pronto.',
    errorEnvio: 'No se pudo enviar. Usa "Redactar desde mi correo".',
    faltan: 'Completa nombre, correo válido y mensaje.',
    asunto: 'Contacto desde tu portafolio', principal: 'Proyecto principal', ejemplo: 'Ejemplo real',
    flow: ['<b>ejecución iniciada</b>', 'mensaje de <b>@cliente</b>: "2 cafés y 1 pandebono"', 'router: acción = <b>confirmar_pedido</b>',
      'sheets: total $9.500 · pedido <b>PED-20261212-48213</b>', 'cocina notificada: pedido en preparación',
      'cliente notificado: <span class="ok">pedido confirmado</span>'],
    flowOk: 'ok · 5 nodos', flowRun: 'ejecutando'
  },
  en: {
    detalle: 'View details', repo: 'Repository', problema: 'The problem', hice: 'What I did', simple: 'In simple words',
    copiado: 'Email copied', noCopiado: 'Could not copy: kaliko2411@gmail.com',
    enviando: 'Sending…', enviado: 'Message sent. I will reply soon.',
    errorEnvio: 'Could not send. Use "Compose from my email".',
    faltan: 'Please fill in name, a valid email and a message.',
    asunto: 'Contact from your portfolio', principal: 'Main project', ejemplo: 'Real example',
    flow: ['<b>run started</b>', 'message from <b>@customer</b>: "2 coffees and 1 pandebono"', 'router: action = <b>confirm_order</b>',
      'sheets: total $9,500 · order <b>PED-20261212-48213</b>', 'kitchen notified: order being prepared',
      'customer notified: <span class="ok">order confirmed</span>'],
    flowOk: 'ok · 5 nodes', flowRun: 'running'
  }
};

const idioma = () => (document.documentElement.lang === 'en' ? 'en' : 'es');
const T = (clave) => TXT[idioma()][clave];
/* Elige el texto según el idioma: L({ es: '...', en: '...' }) */
const L = (obj) => (obj && typeof obj === 'object' && 'es' in obj ? obj[idioma()] : obj);

/* Guarda el español del HTML y aplica el idioma pedido */
const ES = {};
function aplicarIdioma(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const k = el.dataset.i18n;
    if (!(k in ES)) ES[k] = el.innerHTML.trim();
    el.innerHTML = lang === 'en' && EN[k] ? EN[k] : ES[k];
  });
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    const [attr, k] = el.dataset.i18nAttr.split(':');
    const clave = 'attr:' + k;
    if (!(clave in ES)) ES[clave] = el.getAttribute(attr);
    el.setAttribute(attr, lang === 'en' && EN[k] ? EN[k] : ES[clave]);
  });
  document.querySelectorAll('.lang button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.lang === lang));
}
