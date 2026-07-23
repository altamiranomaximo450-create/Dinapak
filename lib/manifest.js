(function () {
  "use strict";

  window.__DINAPAK__ = {
    // Reemplazar por la URL real del Worker luego de hacer "npx wrangler deploy"
    // en la carpeta dinapak-ai-proxy/ (ver README).
    aiChatEndpoint: "https://dinapak-ai-proxy.TU-SUBDOMINIO.workers.dev",

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
