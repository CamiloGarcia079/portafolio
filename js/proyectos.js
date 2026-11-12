/*
 * Datos del portafolio en español (es) e inglés (en).
 * main.js lee estas listas y arma las tarjetas: agregar o cambiar algo es editar aquí.
 */

/* ---------- Proyectos destacados (cada uno tiene su simulación en demos.js) ---------- */
const PROYECTOS = [
  {
    id: 'f1',
    destacado: true,
    repo: 'https://github.com/santiagoosorio0708e-wq/Formula1-java',
    stack: ['Java 21', 'Swing', 'Threads', 'CyclicBarrier', 'SQLite', 'Gson'],
    titulo: { es: 'Fórmula 1 en Java', en: 'Formula 1 in Java' },
    etiqueta: { es: 'Java · Concurrencia · Simulación', en: 'Java · Concurrency · Simulation' },
    simple: {
      es: 'Un programa de escritorio que simula una carrera de Fórmula 1 completa, con clima que cambia y paradas en boxes.',
      en: 'A desktop program that simulates a full Formula 1 race, with changing weather and pit stops.'
    },
    resumen: {
      es: 'Cada piloto corre en su propio hilo de ejecución, con clima dinámico, consumo de combustible, desgaste de neumáticos y pit stops.',
      en: 'Each driver runs on its own thread, with dynamic weather, fuel consumption, tyre wear and pit stops.'
    },
    metrica: { es: '20 pilotos · 10 equipos · 7 circuitos · un hilo por piloto', en: '20 drivers · 10 teams · 7 circuits · one thread per driver' },
    rol: { es: 'En pareja con Daniel Osorio.', en: 'Built in a pair with Daniel Osorio.' },
    problema: {
      es: 'Simular una carrera donde muchos autos avanzan al mismo tiempo, cada uno con su ritmo, sin que el programa se trabe ni los datos se mezclen.',
      en: 'Simulate a race where many cars move at the same time, each at its own pace, without the program freezing or the data getting mixed up.'
    },
    hice: {
      es: ['Un hilo (HiloCarrera) por piloto; un CyclicBarrier sincroniza a todos al cerrar cada vuelta.',
        'El clima cambia durante la carrera (seco, nublado, lluvioso, extremo) y multiplica el tiempo de vuelta.',
        'Combustible y neumáticos se gastan; cuando llegan al límite el auto entra a boxes.',
        'CRUD de pilotos, equipos, vehículos y circuitos, podio y clasificación en tiempo real con Swing.',
        'Historial de carreras guardado con SQLite y Gson.'],
      en: ['One thread (HiloCarrera) per driver; a CyclicBarrier syncs them all at the end of each lap.',
        'Weather changes during the race (dry, cloudy, rainy, extreme) and multiplies the lap time.',
        'Fuel and tyres wear out; when they hit the limit the car pits.',
        'Create, edit and delete drivers, teams, cars and circuits, plus a podium and live standings in Swing.',
        'Race history saved with SQLite and Gson.']
    }
  },
  {
    id: 'vitalroute',
    repo: 'https://github.com/santiagoosorio0708e-wq/Vital-Route',
    stack: ['TypeScript', 'Node.js', 'Express', 'Socket.IO', 'React', 'MySQL'],
    titulo: { es: 'VitalRoute', en: 'VitalRoute' },
    etiqueta: { es: 'IA · Tiempo real', en: 'AI · Real time' },
    simple: {
      es: 'Ayuda a decidir a qué clínica llevar a un paciente en una emergencia y avisa a todos los involucrados al instante.',
      en: 'Helps decide which clinic a patient should go to in an emergency and alerts everyone involved instantly.'
    },
    resumen: {
      es: 'Triaje de emergencias y despacho a la clínica adecuada, con un centro de mando que se actualiza en vivo.',
      en: 'Emergency triage and dispatch to the right clinic, with a command center that updates live.'
    },
    metrica: { es: 'tiempo real con WebSockets · mapa en vivo · agente de IA', en: 'real time with WebSockets · live map · AI agent' },
    rol: { es: 'En pareja con Daniel Osorio. Mi parte: servidor, tiempo real, panel y agente (43 commits).', en: 'Pair project with Daniel Osorio. My part: server, real time, dashboard and agent (43 commits).' },
    problema: {
      es: 'En una emergencia hay que decidir rápido a qué clínica llevar al paciente y avisar a todos al mismo tiempo.',
      en: 'In an emergency you must quickly decide which clinic to take the patient to and notify everyone at once.'
    },
    hice: {
      es: ['Servidor en Node.js con Express y TypeScript, con rutas de despacho y estado de la red.',
        'Comunicación en tiempo real con Socket.IO: canales separados para ambulancias, clínicas y centro de mando.',
        'Panel en React con mapa, alertas de trauma, inventario y bitácora de eventos.',
        'Un agente de IA propio con una herramienta de despacho, que reporta el costo de cada tarea.'],
      en: ['Node.js server with Express and TypeScript, with dispatch and network status routes.',
        'Real-time communication with Socket.IO: separate channels for ambulances, clinics and the command center.',
        'React dashboard with a map, trauma alerts, inventory and event log.',
        'A custom AI agent with a dispatch tool that reports the cost of each task.']
    }
  },
  {
    id: 'deliverybot',
    repo: 'https://github.com/CamiloGarcia079/Proyecto_DeliveryBot_GarciaCamilo',
    stack: ['n8n', 'JavaScript', 'Telegram Bot API', 'Google Sheets'],
    titulo: { es: 'DeliveryBot', en: 'DeliveryBot' },
    etiqueta: { es: 'Automatización · Bot', en: 'Automation · Bot' },
    simple: {
      es: 'Un asistente en Telegram que toma los pedidos de una cafetería sin que nadie tenga que contestar el chat.',
      en: 'A Telegram assistant that takes a coffee shop’s orders without anyone having to answer the chat.'
    },
    resumen: {
      es: 'Muestra el menú, arma el carrito, calcula el total, guarda el pedido y avisa a cocina y al cliente.',
      en: 'Shows the menu, builds the cart, calculates the total, saves the order and notifies kitchen and customer.'
    },
    metrica: { es: '39 pasos automáticos en n8n · Google Sheets como base de datos', en: '39 automated steps in n8n · Google Sheets as database' },
    problema: {
      es: 'En una cafetería pequeña los pedidos por chat se toman a mano: alguien responde, anota, suma y avisa a cocina.',
      en: 'In a small coffee shop chat orders are taken by hand: someone replies, writes it down, adds it up and tells the kitchen.'
    },
    hice: {
      es: ['Flujo completo en n8n: un nodo de código decide la acción y un Switch la reparte a su rama.',
        'Carrito por usuario, total calculado con los precios de la hoja y número de pedido generado.',
        'Aviso a cocina y al cliente en cada cambio de estado del pedido.',
        'El negocio cambia el menú en Google Sheets sin tocar código.'],
      en: ['Full workflow in n8n: a code node decides the action and a Switch routes it to its branch.',
        'Per-user cart, total calculated from the sheet prices and a generated order number.',
        'Kitchen and customer are notified on every order status change.',
        'The business edits the menu in Google Sheets without touching code.']
    }
  },
  {
    id: 'renta',
    repo: 'https://github.com/CamiloGarcia079/Evaluacion-Springboot-Herramientas---Camilo-Garcia-Almeida',
    stack: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'MySQL', 'Docker'],
    titulo: { es: 'Renta de Herramientas', en: 'Tool Rental Platform' },
    etiqueta: { es: 'Java · Spring Boot', en: 'Java · Spring Boot' },
    simple: {
      es: 'Una plataforma para alquilar maquinaria en línea: reservar por fechas, pagar con factura y devolver el equipo.',
      en: 'An online platform to rent machinery: book by date, pay with an invoice and return the equipment.'
    },
    resumen: {
      es: 'Reservas por fechas sin cruces, pagos con IVA, devoluciones con mora y reporte de daños, con tres tipos de usuario.',
      en: 'Date bookings without overlaps, payments with VAT, returns with late fees and damage reports, with three user types.'
    },
    metrica: { es: '113 pruebas automáticas · 3 roles · se instala con un comando', en: '113 automated tests · 3 roles · installs with one command' },
    rol: { es: 'Entrega individual.', en: 'Individual project.' },
    problema: {
      es: 'En un alquiler de equipos los problemas aparecen al final: reservas cruzadas, cobros a mano y daños sin registro.',
      en: 'In equipment rental the problems show up at the end: overlapping bookings, manual billing and unrecorded damage.'
    },
    hice: {
      es: ['API por módulos de negocio con roles de administrador, proveedor y cliente.',
        'El precio se calcula en el servidor y el cliente sale de su sesión segura (JWT), no del navegador.',
        'Factura con IVA del 19 % y registro de cada cambio de estado de la reserva.',
        'Arranque con un solo script o con Docker, y documentación con Swagger y Postman.'],
      en: ['API split by business modules with admin, provider and customer roles.',
        'Prices are calculated on the server and the customer comes from their secure session (JWT), not the browser.',
        'Invoices with 19% VAT and a log of every booking status change.',
        'Starts with a single script or with Docker, documented with Swagger and Postman.']
    }
  }
];

/* ---------- Lenguajes que domino (tarjetas grandes) ---------- */
const LENGUAJES = [
  { n: 'Java', logo: 'Openjdk', uso: { es: 'APIs y aplicaciones de escritorio', en: 'APIs and desktop apps' }, donde: 'Fórmula 1, Renta de Herramientas, MindConnect' },
  { n: 'Python', logo: 'Python', uso: { es: 'Inteligencia artificial', en: 'Artificial intelligence' }, donde: 'Analizador de CVs, Tribuna Global, Aduana-Copilot' },
  { n: 'TypeScript', logo: 'Typescript', uso: { es: 'Servidores y paneles en tiempo real', en: 'Servers and real-time dashboards' }, donde: 'VitalRoute, Aduana-Copilot' },
  { n: 'JavaScript', logo: 'Javascript', uso: { es: 'Web y automatización', en: 'Web and automation' }, donde: 'DeliveryBot, Banco ACME, este portafolio' },
  { n: 'SQL', logo: 'db', uso: { es: 'Bases de datos', en: 'Databases' }, donde: 'Renta de Herramientas, VitalRoute, MindConnect' }
];

/* ---------- Habilidades blandas, cada una con evidencia real ---------- */
const HABILIDADES = [
  { icono: 'M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3z',
    t: { es: 'Liderazgo y coordinación', en: 'Leadership and coordination' },
    d: { es: 'Organizo al equipo para que cada parte encaje y se entregue a tiempo.', en: 'I organize the team so every part fits together and ships on time.' },
    e: { es: 'Coordiné la integración y la presentación final en el hackathon GUARDIAN y hoy lidero mi equipo de proyecto.', en: 'I coordinated integration and the final pitch at the GUARDIAN hackathon, and I currently lead my project team.' } },
  { icono: 'M4 5h16v10H8l-4 4V5zM8 9h8M8 12h5',
    t: { es: 'Comunicación clara', en: 'Clear communication' },
    d: { es: 'Explico lo técnico en palabras simples, sin importar quién escuche.', en: 'I explain technical topics in plain words, whoever is listening.' },
    e: { es: 'Cada proyecto tiene una guía para que cualquiera lo entienda y lo ejecute sin preguntarme.', en: 'Every project has a guide so anyone can understand and run it without asking me.' } },
  { icono: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3 2.7-5 6-5s6 2 6 5M12 20c0-3 2.2-5 5-5 2.6 0 5 1.8 5 5',
    t: { es: 'Trabajo en equipo', en: 'Teamwork' },
    d: { es: 'Me adapto a cómo trabaja el equipo y cuido los acuerdos.', en: 'I adapt to how the team works and keep agreements.' },
    e: { es: 'La mayoría de mis proyectos son en pareja o en equipo, con tareas repartidas y revisiones entre nosotros.', en: 'Most of my projects were built in pairs or teams, with split tasks and peer reviews.' } },
  { icono: 'M12 4v16M4 12h16M7 7l10 10M17 7 7 17',
    t: { es: 'Aprendizaje rápido', en: 'Fast learner' },
    d: { es: 'Aprendo herramientas nuevas por mi cuenta y las aplico en poco tiempo.', en: 'I pick up new tools on my own and apply them quickly.' },
    e: { es: 'En un año pasé de páginas web sencillas a sistemas seguros, bots e inteligencia artificial.', en: 'In one year I went from simple web pages to secure systems, bots and artificial intelligence.' } },
  { icono: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm9 16-4-4',
    t: { es: 'Resolución de problemas', en: 'Problem solving' },
    d: { es: 'Cuando algo falla, busco la causa real y dejo escrito cómo lo resolví.', en: 'When something breaks, I find the real cause and document the fix.' },
    e: { es: 'En DeliveryBot encontré por qué la hoja de cálculo no guardaba los pedidos y cambié la forma de hacerlo.', en: 'In DeliveryBot I found why the spreadsheet was not saving orders and changed the approach.' } },
  { icono: 'M5 12l4 4L19 6',
    t: { es: 'Responsabilidad y calidad', en: 'Ownership and quality' },
    d: { es: 'Entrego cosas que funcionan y lo compruebo antes de decir que están listas.', en: 'I deliver things that work and verify them before calling them done.' },
    e: { es: 'Mis proyectos suman más de 850 pruebas automáticas que revisan el código en segundos.', en: 'My projects add up to 850+ automated tests that check the code in seconds.' } }
];

/* ---------- Tecnologías: nombre, proyectos donde se usó y logo (js/logos.js) ---------- */
const STACK = [
  { grupo: { es: 'Frameworks', en: 'Frameworks' },
    simple: { es: 'Herramientas que aceleran la construcción de aplicaciones.', en: 'Tools that speed up building applications.' },
    items: [
      ['Spring Boot', 'Renta de Herramientas, MindConnect', 'Springboot'],
      ['Spring Security · JWT', 'Renta de Herramientas, MindConnect', 'Springsecurity'],
      ['Express', 'VitalRoute, Aduana-Copilot', 'Express'],
      ['React', 'VitalRoute, Aduana-Copilot', 'React'],
      ['Streamlit', 'Analizador de CVs, Tribuna Global', 'Streamlit']] },
  { grupo: { es: 'Automatización e IA', en: 'Automation and AI' },
    simple: { es: 'Para que los procesos se hagan solos y para usar inteligencia artificial.', en: 'To make processes run on their own and to use artificial intelligence.' },
    items: [
      ['n8n', 'DeliveryBot', 'N8n'],
      ['Telegram Bot API', 'DeliveryBot', 'Telegram'],
      ['LangChain', 'Analizador de CVs, Tribuna Global', 'Langchain'],
      ['Gemini', 'Analizador de CVs, Tribuna Global, GUARDIAN', 'Googlegemini'],
      ['Pydantic', 'Analizador de CVs', 'Pydantic']] },
  { grupo: { es: 'Datos', en: 'Data' },
    simple: { es: 'Donde se guarda y organiza la información.', en: 'Where information is stored and organized.' },
    items: [
      ['MySQL', 'Renta de Herramientas, VitalRoute', 'Mysql'],
      ['PostgreSQL', 'MindConnect, Plataforma SST', 'Postgresql'],
      ['Flyway', 'MindConnect', 'Flyway'],
      ['Google Sheets', 'DeliveryBot', 'Googlesheets']] },
  { grupo: { es: 'Calidad y entrega', en: 'Quality and delivery' },
    simple: { es: 'Para comprobar que todo funciona y entregarlo listo para usar.', en: 'To check that everything works and ship it ready to use.' },
    items: [
      ['JUnit 5', 'Renta de Herramientas, MindConnect', 'Junit5'],
      ['pytest', 'Analizador de CVs, Tribuna Global, Aduana-Copilot', 'Pytest'],
      ['Docker', 'Renta de Herramientas, VitalRoute', 'Docker'],
      ['Postman', 'Renta de Herramientas, VitalRoute', 'Postman'],
      ['Git · GitHub', '*', 'Github']] }
];
