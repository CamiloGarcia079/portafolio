/*
 * Datos de los proyectos del portafolio.
 * Para agregar uno nuevo basta con sumar un objeto a esta lista:
 * main.js lee el arreglo y arma las tarjetas y la ficha de detalle.
 *
 * categorias: "ia", "backend" o "web" (sirven para los filtros).
 */
const PROYECTOS = [
  {
    id: 'vitalroute',
    titulo: 'VitalRoute',
    etiqueta: 'Agente IA · Tiempo real',
    categorias: ['ia', 'backend', 'web'],
    resumen: 'Triaje de emergencias y despacho a la clínica adecuada, con un centro de mando que se actualiza en vivo.',
    metrica: 'Socket.IO · mapa en vivo · agente con tools',
    rol: 'En pareja con Daniel Osorio. Mi parte: API gateway, WebSockets, panel y agente (43 commits).',
    problema: 'En una emergencia hay que decidir rápido a qué clínica llevar al paciente y avisar a todos los involucrados al mismo tiempo.',
    hice: [
      'API gateway en Node.js con Express y TypeScript, con controladores de despacho y de estado de la red.',
      'Comunicación en tiempo real con Socket.IO: salas separadas para ambulancias, clínicas y el centro de mando.',
      'Panel en React con un mapa de Leaflet, alertas de trauma, inventario y bitácora de eventos.',
      'Un agente propio con una herramienta de despacho, cliente de Grok y un modelo falso para ensayos, que reporta el costo de cada tarea.'
    ],
    stack: ['TypeScript', 'Node.js', 'Express', 'Socket.IO', 'React', 'MySQL', 'Python'],
    repo: 'https://github.com/santiagoosorio0708e-wq/Vital-Route'
  },
  {
    id: 'mindconnect',
    titulo: 'MindConnect API',
    etiqueta: 'Java · Arquitectura hexagonal',
    categorias: ['backend'],
    resumen: 'Backend para una plataforma de salud mental: historias clínicas, consultas, tratamientos y consentimientos.',
    metrica: '52 tablas · más de 600 pruebas · JWT por roles',
    problema: 'Un dominio grande (52 tablas) donde el código tiene que seguir siendo ordenado y fácil de probar.',
    hice: [
      'Tres módulos de Maven: dominio y aplicación sin Spring ni JPA, y la infraestructura aparte.',
      'Migraciones con Flyway, una por tabla, para que la base se cree igual en cualquier equipo.',
      'Seguridad con Spring Security y JWT: cualquier usuario autenticado consulta, solo un administrador modifica.',
      'Más de 600 pruebas que corren sin base de datos.'
    ],
    stack: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'Flyway', 'JUnit 5'],
    repo: 'https://github.com/CamiloGarcia079/trabajo-bound-context-con-spring-security'
  },
  {
    id: 'renta',
    titulo: 'Renta de Herramientas',
    etiqueta: 'Java · Spring Boot',
    categorias: ['backend', 'web'],
    resumen: 'Alquiler de maquinaria: reservas por fechas, pagos con IVA, devoluciones con mora y reporte de daños.',
    metrica: '113 pruebas · 3 roles · Docker Compose',
    problema: 'En un alquiler de equipos los problemas aparecen al final: reservas cruzadas, cobros a mano y daños sin registro.',
    hice: [
      'API por módulos de negocio (identidad, inventario, reservas, pagos, devoluciones) con roles de administrador, proveedor y cliente.',
      'El precio se calcula en el servidor con la tarifa guardada y el cliente sale del token, no del frontend.',
      'Factura con IVA del 19 % usando BigDecimal, y auditoría de cada cambio de estado de la reserva.',
      'Frontend en JavaScript, Swagger, colecciones de Postman y arranque con un solo script o con Docker Compose.'
    ],
    stack: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'MySQL', 'Docker', 'JavaScript'],
    repo: 'https://github.com/CamiloGarcia079/Evaluacion-Springboot-Herramientas---Camilo-Garcia-Almeida'
  },
  {
    id: 'aduana',
    titulo: 'Aduana-Copilot',
    etiqueta: 'Agente IA · Cotización',
    categorias: ['ia', 'web'],
    resumen: 'Cotiza la importación de medicamentos y dice la fuente de cada cifra. El modelo nunca hace las cuentas.',
    metrica: 'agente + motor de cálculo probado con pytest',
    rol: 'En pareja con Daniel Osorio, Reto Agente 2026. Mi parte: agente, gateway e interfaz.',
    problema: 'Saber cuánto cuesta de verdad importar un medicamento toma días: aranceles, impuestos y permisos viven en fuentes distintas.',
    hice: [
      'Un agente que entiende la petición, llama a las herramientas de buscar fracción y calcular cotización, y explica el resultado.',
      'La regla del proyecto: toda la aritmética está en funciones puras probadas contra casos calculados a mano.',
      'Interfaz en React que muestra la hoja de liquidación, los supuestos y la fuente y fecha de cada dato.'
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'Python', 'FastAPI', 'pytest'],
    repo: 'https://github.com/CamiloGarcia079/Aduana-Copilot-CamiloGarcia-DanielOsorio'
  },
  {
    id: 'deliverybot',
    titulo: 'DeliveryBot',
    etiqueta: 'Automatización · Bot',
    categorias: ['ia'],
    resumen: 'Bot de Telegram que toma pedidos de una cafetería, calcula el total y avisa a cocina y al cliente.',
    metrica: '39 nodos en n8n · Google Sheets como backend',
    problema: 'En una cafetería pequeña los pedidos por chat se toman a mano: alguien responde, anota, suma y avisa a cocina.',
    hice: [
      'Flujo completo en n8n: un nodo de código decide la acción y un Switch la reparte a su rama.',
      'Carrito por usuario, total calculado con los precios de la hoja y número de pedido generado.',
      'Notificación a cocina y aviso al cliente en cada cambio de estado del pedido.',
      'El negocio cambia el menú en Google Sheets sin tocar código.'
    ],
    stack: ['n8n', 'JavaScript', 'Telegram Bot API', 'Google Sheets'],
    repo: 'https://github.com/CamiloGarcia079/Proyecto_DeliveryBot_GarciaCamilo'
  },
  {
    id: 'cv',
    titulo: 'Analizador de CVs',
    etiqueta: 'Python · IA',
    categorias: ['ia'],
    resumen: 'Sube un CV en PDF, escribe el puesto y un modelo de lenguaje evalúa qué tan bien encaja el candidato.',
    metrica: 'salida validada con Pydantic · más de 60 pruebas',
    problema: 'Filtrar hojas de vida a mano contra un puesto es lento y poco consistente.',
    hice: [
      'Lectura del PDF con mensajes claros si está vacío, protegido o escaneado.',
      'Cadena de LangChain con salida estructurada en un modelo de Pydantic (perfil, fortalezas, porcentaje de ajuste).',
      'Respaldo entre modelos: si uno está saturado o sin cuota, prueba el siguiente.',
      'Pruebas con un modelo falso, para no gastar API.'
    ],
    stack: ['Python', 'LangChain', 'Gemini', 'Streamlit', 'Pydantic', 'pytest'],
    repo: 'https://github.com/CamiloGarcia079/Hojas-de-vida-Chatbot---IA---Camilo-'
  },
  {
    id: 'tribuna',
    titulo: 'Tribuna Global',
    etiqueta: 'Python · IA',
    categorias: ['ia'],
    resumen: 'Chatbot que guarda opiniones de aficionados sobre futbolistas y las clasifica por sentimiento.',
    metrica: 'más de 70 pruebas sin gastar API · escritura atómica',
    problema: 'Clasificar opiniones con un modelo sin guardar datos inventados cuando algo falla.',
    hice: [
      'El modelo solo devuelve el análisis; el id, la fecha y el resto del registro los pone el programa.',
      'Si la API, la validación o la escritura fallan, no se guarda nada: nunca un "neutro" inventado.',
      'Escritura atómica del archivo y reintentos que no duplican registros.',
      'Consulta con filtros, recuentos y descarga de las opiniones.'
    ],
    stack: ['Python', 'LangChain', 'Gemini', 'Streamlit', 'pytest'],
    repo: 'https://github.com/CamiloGarcia079/Tribuna-Global-Camilo-Garcia-A'
  },
  {
    id: 'banco',
    titulo: 'Banco ACME',
    etiqueta: 'JavaScript · Web',
    categorias: ['web'],
    resumen: 'Banca web sin frameworks: transferencias, pagos, metas de ahorro y tasas de cambio en un Web Worker.',
    metrica: 'módulos ES · clave dinámica · certificado imprimible',
    rol: 'En equipo con Andrés Felipe Guerra.',
    problema: 'Simular la experiencia completa de una banca digital usando solo el navegador.',
    hice: [
      'Registro con validaciones, sesión y recuperación de contraseña.',
      'Consignaciones, retiros, transferencias, pagos de servicios y comprobantes imprimibles.',
      'Clave dinámica de 6 dígitos que cambia cada 30 segundos.',
      'Tasas de cambio consultadas en un Web Worker para no bloquear la interfaz.'
    ],
    stack: ['JavaScript', 'HTML', 'CSS', 'Web Workers', 'localStorage'],
    repo: 'https://github.com/CamiloGarcia079/CAMILO-BANCO-EVALUACION'
  }
];

/* Tecnologías y en qué proyectos se usaron (sección Stack) */
const STACK = [
  { grupo: 'Backend', items: [
    ['Java', 'MindConnect, Renta de Herramientas, Gestor de tareas'],
    ['Spring Boot', 'MindConnect, Renta de Herramientas'],
    ['Spring Security · JWT', 'MindConnect, Renta de Herramientas'],
    ['Node.js · Express', 'VitalRoute, Aduana-Copilot'],
    ['Python', 'Analizador de CVs, Tribuna Global, Aduana-Copilot']
  ]},
  { grupo: 'Automatización e IA', items: [
    ['n8n', 'DeliveryBot'],
    ['Telegram Bot API', 'DeliveryBot'],
    ['LangChain', 'Analizador de CVs, Tribuna Global'],
    ['Gemini', 'Analizador de CVs, Tribuna Global, GUARDIAN'],
    ['Agentes con tools', 'VitalRoute, Aduana-Copilot']
  ]},
  { grupo: 'Frontend', items: [
    ['JavaScript', 'Banco ACME, Renta de Herramientas, este portafolio'],
    ['TypeScript', 'VitalRoute, Aduana-Copilot'],
    ['React', 'VitalRoute, Aduana-Copilot'],
    ['HTML · CSS', 'Banco ACME, este portafolio, 15 páginas']
  ]},
  { grupo: 'Datos', items: [
    ['MySQL', 'Renta de Herramientas, VitalRoute, Campus Pizza'],
    ['PostgreSQL', 'MindConnect, Plataforma SST'],
    ['Flyway', 'MindConnect'],
    ['Google Sheets', 'DeliveryBot']
  ]},
  { grupo: 'Calidad y entrega', items: [
    ['JUnit 5', 'MindConnect, Renta de Herramientas'],
    ['pytest', 'Analizador de CVs, Tribuna Global, Aduana-Copilot'],
    ['Docker', 'Renta de Herramientas, VitalRoute, Analizador de CVs'],
    ['Postman · Swagger', 'Renta de Herramientas, VitalRoute'],
    ['Git · GitHub', 'todos']
  ]}
];
