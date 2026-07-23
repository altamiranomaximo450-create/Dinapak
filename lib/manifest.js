(function () {
  "use strict";

  window.__DINAPAK__ = {
    // Reemplazar por la URL real del Worker luego de hacer "npx wrangler deploy"
    // en la carpeta dinapak-ai-proxy/ (ver README). Si se deja así, el chat
    // funciona igual con las respuestas automáticas de abajo (chatFaq).
    aiChatEndpoint: "https://dinapak-ai-proxy.TU-SUBDOMINIO.workers.dev",

    // Chat de soporte — preguntas frecuentes. FUNCIONA SIN INTERNET NI SERVIDOR.
    // Podés editar las preguntas (q), palabras clave (keywords) y respuestas (a).
    // Las primeras que tienen "chip: true" aparecen como botones para clickear.
    chatFaq: [
      {
        chip: true,
        q: "¿Qué servicios ofrecen?",
        keywords: ["servicio", "servicios", "hacen", "ofrecen", "trabajos", "rubro", "que hacen"],
        a: "Hacemos obra llave en mano, construcción tradicional, proyecto y dirección de obra, edificios e industrias, construcción en seco (durlock), cielorrasos desmontables, instalaciones eléctricas, persianas y ventanas de PVC, refacciones y mantenimiento edilicio."
      },
      {
        chip: true,
        q: "¿Cómo pido un presupuesto?",
        keywords: ["presupuesto", "cotizacion", "cotizar", "precio", "cuanto", "cuesta", "sale", "vale", "valor"],
        a: "Podés pedir tu presupuesto completando el formulario de esta página (sección Presupuesto) o escribiéndonos directo por WhatsApp al (011) 4687-7629. Cada obra es distinta, así que lo cotizamos según lo que necesites."
      },
      {
        chip: true,
        q: "¿Dónde están y qué horario tienen?",
        keywords: ["donde", "ubicacion", "direccion", "estan", "queda", "horario", "atienden", "abierto", "hora"],
        a: "Estamos en Espinosa 2145, Planta Baja, CABA. Atendemos de lunes a viernes de 09:00 a 17:30. Tel: (011) 4687-7629 / (011) 4585-2027."
      },
      {
        chip: true,
        q: "¿Hacen obras llave en mano?",
        keywords: ["llave en mano", "llave", "proyecto completo", "de principio a fin", "todo", "integral"],
        a: "Sí. Hacemos la obra llave en mano de punta a punta: proyecto, dirección de obra, análisis de costos y ejecución, todo con un mismo responsable. Sirve para viviendas, locales, industrias y edificios."
      },
      {
        chip: true,
        q: "¿Trabajan con durlock / construcción en seco?",
        keywords: ["durlock", "seco", "tabique", "tabiques", "panel", "placa", "division", "divisiones"],
        a: "Sí. Hacemos construcción en seco: tabiques de durlock, divisiones y cielorrasos, rápidos de instalar y fáciles de mantener, tanto en obra nueva como en remodelación."
      },
      {
        q: "¿Hacen instalaciones eléctricas?",
        keywords: ["electrica", "electricas", "electricidad", "cableado", "luz", "iluminacion", "instalacion electrica"],
        a: "Sí. Hacemos instalaciones eléctricas e iluminación con asesoramiento técnico, para obra nueva o para actualizar una instalación existente."
      },
      {
        q: "¿Hacen refacciones sin parar la actividad?",
        keywords: ["refaccion", "refacciones", "reforma", "remodelacion", "remodelar", "arreglar", "arreglo", "sin parar"],
        a: "Sí. Hacemos refacciones en viviendas, comercios, industrias, hospitales e instituciones, y las coordinamos para no frenar la actividad diaria del lugar."
      },
      {
        q: "¿Hacen mantenimiento de edificios?",
        keywords: ["mantenimiento", "mantener", "edilicio", "edificio", "conservacion"],
        a: "Sí. Hacemos mantenimiento edilicio programado de edificios, locales comerciales y estaciones de servicio, siempre con la misma cuadrilla."
      },
      {
        q: "¿Instalan ventanas o persianas de PVC?",
        keywords: ["ventana", "ventanas", "persiana", "persianas", "pvc", "cerramiento", "cerramientos", "aberturas"],
        a: "Sí. Proveemos e instalamos persianas y ventanas de PVC a medida de cada obra."
      },
      {
        q: "¿Hacen cielorrasos?",
        keywords: ["cielorraso", "cielorrasos", "techo", "techos", "desmontable"],
        a: "Sí. Hacemos cielorrasos, incluidos los desmontables, que dejan accesible todo lo que corre por arriba: cableado, ductos e instalaciones."
      },
      {
        q: "¿Trabajan con empresas y licitaciones públicas?",
        keywords: ["empresa", "empresas", "licitacion", "licitaciones", "estado", "publico", "corporativo", "industria"],
        a: "Sí. Trabajamos con clientes privados (como La Anónima, Havanna y CORA) y también participamos en licitaciones públicas, siendo oferentes y adjudicatarios de organismos del Estado."
      },
      {
        q: "¿Cuánto tardan en hacer una obra?",
        keywords: ["tardan", "plazo", "plazos", "tiempo", "demora", "cuando", "dura"],
        a: "El plazo depende del tipo y tamaño de la obra. Si nos contás qué necesitás por el formulario o WhatsApp, te damos un estimado concreto."
      }
    ],

    brand: {
      name: "Dinapak",
      legalName: "DINAPAK S.R.L.",
      cuit: "30-70206997-8",
      slogan: "Construimos con criterio desde 1994.",
      founded: "1994",
      address: "Espinosa 2145, Planta Baja",
      addressZip: "C1416CEU, CABA",
      phone1: "(011) 4687-7629",
      phone2: "(011) 4585-2027",
      whatsapp: "5491146877629",
      email: "info@dinapak.com.ar",
      website: "dinapak.com.ar",
      hours: "Lunes a viernes, 09:00 → 17:30",
      rating: "4,3",
      reviews: "167"
    },

    services: [
      {
        id: "obra-llave-en-mano",
        name: "Obra Llave en Mano",
        category: "Obra",
        subtitle: "De punta a punta",
        icon: "crane",
        includes: ["Proyecto", "Dirección de obra", "Ejecución"],
        description: "Del plano a la llave en mano: proyecto, gerenciamiento, análisis de costos y ejecución bajo un mismo responsable.",
        accent: "amber"
      },
      {
        id: "construccion-tradicional",
        name: "Construcción Tradicional",
        category: "Obra",
        subtitle: "Obra civil clásica",
        icon: "brick",
        includes: ["Viviendas", "Locales comerciales", "Industrias"],
        description: "Obra tradicional para viviendas, locales comerciales, industrias y estaciones de servicio, con los tiempos y la solidez de siempre.",
        accent: "steel"
      },
      {
        id: "proyecto-direccion-obra",
        name: "Proyecto y Dirección de Obra",
        category: "Obra",
        subtitle: "Del papel al terreno",
        icon: "blueprint",
        includes: ["Proyecto arquitectónico", "Planos municipales", "Dirección de obra"],
        description: "Planificamos y dirigimos la obra de principio a fin, con planos municipales y análisis de costos incluidos.",
        accent: "amber"
      },
      {
        id: "edificios-industrias",
        name: "Edificios e Industrias",
        category: "Obra",
        subtitle: "Escala corporativa",
        icon: "building",
        includes: ["Edificios", "Industrias", "Estaciones de servicio"],
        description: "Obras de mayor escala para clientes corporativos e industriales, con la misma trazabilidad que una obra chica.",
        accent: "steel"
      },
      {
        id: "construccion-en-seco",
        name: "Construcción en Seco",
        category: "Instalaciones",
        subtitle: "Durlock y tabiques",
        icon: "panel",
        includes: ["Durlock", "Tabiques", "Cielorrasos desmontables"],
        description: "Divisiones y cielorrasos en seco, rápidos de instalar y fáciles de mantener, para obra nueva o remodelación.",
        accent: "amber"
      },
      {
        id: "cielorrasos-desmontables",
        name: "Cielorrasos Desmontables",
        category: "Instalaciones",
        subtitle: "Acceso técnico permanente",
        icon: "grid",
        includes: ["Perfilería", "Paneles", "Instalación"],
        description: "Cielorrasos técnicos desmontables que dejan accesible todo lo que corre por arriba: cableado, ductos, instalaciones.",
        accent: "steel"
      },
      {
        id: "instalaciones-electricas",
        name: "Instalaciones Eléctricas",
        category: "Instalaciones",
        subtitle: "Seguras y certificadas",
        icon: "bolt",
        includes: ["Instalaciones", "Iluminación", "Asesoramiento técnico"],
        description: "Instalación eléctrica e iluminación con asesoramiento técnico, para obra nueva o actualización de una existente.",
        accent: "amber"
      },
      {
        id: "persianas-ventanas-pvc",
        name: "Persianas y Ventanas de PVC",
        category: "Instalaciones",
        subtitle: "Cerramientos",
        icon: "window",
        includes: ["Persianas", "Ventanas de PVC", "Medición a medida"],
        description: "Provisión e instalación de persianas y ventanas de PVC, a medida de cada obra.",
        accent: "steel"
      },
      {
        id: "refacciones",
        name: "Refacciones",
        category: "Mantenimiento",
        subtitle: "Sin parar la actividad",
        icon: "wrench",
        includes: ["Viviendas", "Comercios", "Industrias, hospitales e instituciones"],
        description: "Refacciones en viviendas, comercios, industrias, hospitales e instituciones educativas, coordinadas para no frenar la actividad diaria.",
        accent: "amber"
      },
      {
        id: "mantenimiento-edilicio",
        name: "Mantenimiento Edilicio",
        category: "Mantenimiento",
        subtitle: "Trabajo continuo",
        icon: "gear",
        includes: ["Edificios", "Locales comerciales", "Estaciones de servicio"],
        description: "Mantenimiento programado de edificios, locales comerciales y estaciones de servicio, con la misma cuadrilla de siempre.",
        accent: "steel"
      }
    ],

    clients: [
      {
        group: "Sector privado",
        title: "Cadenas comerciales e industrias",
        detail: "La Anónima, Havanna, CORA, entre otros.",
        icon: "building",
        accent: "amber"
      },
      {
        group: "Sector público",
        title: "Licitaciones y organismos del Estado",
        detail: "Oferente y adjudicataria en licitaciones del Ministerio Público de la Defensa, 2023–2026.",
        icon: "document",
        accent: "steel"
      },
      {
        group: "Industrias y estaciones de servicio",
        title: "Obra y mantenimiento",
        detail: "Obra nueva, refacción y mantenimiento continuo.",
        icon: "factory",
        accent: "amber"
      },
      {
        group: "Instituciones y particulares",
        title: "Hospitales, educación, viviendas",
        detail: "Refacciones sin frenar la actividad diaria.",
        icon: "key",
        accent: "steel"
      }
    ]
  };
})();
