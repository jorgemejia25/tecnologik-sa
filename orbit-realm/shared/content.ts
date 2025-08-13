export type Stat = { value: string; label: string };

export type HeroContent = {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  features: string[];
  primaryCta: string;
  secondaryCta: string;
  stats: Stat[];
};

export type SiteContent = {
  hero: HeroContent;
  header?: {
    brandLetter: string;
    brandName: string;
    nav: Array<{ name: string; href: string }>;
  };
  benefitsSection?: {
    badge: string;
    title: string;
    subtitle: string;
    categories: Array<{
      icon: string; // icon name (lucide)
      title: string;
      color: string; // tailwind gradient classes portion
      benefits: Array<{ icon: string; title: string; description: string }>;
    }>;
  };
  continuity?: {
    badge: string;
    title: string;
    subtitle: string;
    processes: Array<{
      icon: string;
      acronym: string;
      title: string;
      subtitle: string;
      description: string;
      color: string;
    }>;
    benefits: Array<{ icon: string; title: string; description: string }>;
  };
  digitalTransformation?: {
    objectiveTitle: string;
    objectiveDescription: string;
    keyComponents: Array<{
      icon: string;
      title: string;
      description: string;
      details: string[];
      color: string;
    }>;
    roadmap: Array<{ stage: number; title: string; activities: string; duration: string }>;
    successIndicators: Array<{ icon: string; metric: string; target: string; color: string }>;
    benefitsOperativos: string[];
    benefitsEstrategicos: string[];
  };
  services?: {
    headerTitle: string;
    headerSubtitle: string;
    items: Array<{
  icon?: string; // nombre del ícono lucide
      title: string;
      description: string;
      features: string[];
    }>;
  };
  methodology?: {
    headerTitle: string;
    headerSubtitle: string;
    steps: Array<{
      title: string;
      description: string;
      details: string;
    }>;
    benefits: Array<{
      title: string;
      description: string;
    }>;
  };
  integrations?: {
    headerTitle: string;
    headerSubtitle: string;
    brands: Array<{
      name: string;
      logo: string;
      category: string;
    }>;
  };
  certifications?: {
    headerTitle: string;
    headerSubtitle: string;
    items: Array<{
      name: string;
      description: string;
      badge: string;
    }>;
  };
  footer?: {
    newsletterTitle: string;
    newsletterText: string;
    brand: {
      logoLetter: string;
      companyName: string;
      description: string;
    };
    contact: {
  email: string;
  phone: string; // teléfono principal
  phoneNumbers?: string[]; // lista completa de teléfonos (opcional)
  location: string;
    };
    navigation: {
      services: Array<{ name: string; href: string }>;
      company: Array<{ name: string; href: string }>;
      support: Array<{ name: string; href: string }>;
    };
    socials?: Array<{ name: 'LinkedIn' | 'Twitter' | 'Facebook'; href: string }>;
    copyright: string;
  };
};

export const defaultContent: SiteContent = {
  hero: {
  badge: "Líder en consultoría tecnológica empresarial",
  title: "Hacemos que la gestión de tu",
  highlight: "empresa sea eficiente",
    subtitle:
      "En Tecnologik S.A. transformamos la infraestructura tecnológica de tu empresa con soluciones integrales de evaluación, ciberseguridad y optimización que impulsan el crecimiento sostenible.",
    features: [
      "Evaluación integral de infraestructura",
      "Ciberseguridad empresarial avanzada",
      "Optimización de procesos tecnológicos",
    ],
    primaryCta: "Comenzar evaluación gratuita",
    secondaryCta: "Ver nuestros servicios",
    stats: [
      { value: "200+", label: "Empresas atendidas" },
      { value: "99.9%", label: "Uptime garantizado" },
      { value: "24/7", label: "Soporte técnico" },
    ],
  },
  header: {
    brandLetter: 'T',
    brandName: 'Tecnologik',
    nav: [
      { name: 'Servicios', href: '#servicios' },
      { name: 'Metodología', href: '#metodologia' },
      { name: 'Certificaciones', href: '#certificaciones' },
      { name: 'Integraciones', href: '#integraciones' },
    ],
  },
  benefitsSection: {
  badge: 'Impacto real en tu organización',
  title: 'Beneficios',
  subtitle: 'Transforma tu empresa con tecnología que impulsa el crecimiento, optimiza costos y proporciona ventajas competitivas sostenibles.',
    categories: [
      {
        icon: 'Zap',
        title: 'AUTOMATIZACIÓN',
        color: 'from-blue-500 to-blue-600',
        benefits: [
          { icon: 'Settings', title: 'Optimización de procesos', description: 'Automatización de tareas repetitivas para mayor eficiencia' },
          { icon: 'Gauge', title: 'Aumento de la agilidad', description: 'Respuesta más rápida a cambios del mercado' }
        ]
      },
      {
        icon: 'Database',
        title: 'DEMOCRATIZACIÓN DE DATOS',
        color: 'from-blue-400 to-blue-500',
        benefits: [
          { icon: 'Share2', title: 'Datos habilitados para líneas de negocio', description: 'Acceso descentralizado a información crítica' },
          { icon: 'Shield', title: 'Resiliencia operativa', description: 'Continuidad del negocio garantizada' }
        ]
      },
      {
        icon: 'TrendingUp',
        title: 'MODERNIZACIÓN DEL ANÁLISIS',
        color: 'from-blue-600 to-blue-700',
        benefits: [
          { icon: 'Brain', title: 'Toma de decisiones estratégicas', description: 'Análisis avanzado para decisiones informadas' },
          { icon: 'Trophy', title: 'Ventaja competitiva', description: 'Diferenciación en el mercado mediante tecnología' }
        ]
      },
      {
        icon: 'DollarSign',
        title: 'COSTOS',
        color: 'from-blue-700 to-blue-800',
        benefits: [
          { icon: 'Users', title: 'Aumento de colaboración y productividad', description: 'Equipos más eficientes y conectados' },
          { icon: 'PiggyBank', title: 'Ahorro de costos', description: 'Reducción significativa en gastos operativos' }
        ]
      }
    ]
  },
  continuity: {
    badge: 'Metodología estructurada y probada',
    title: 'Proceso de Gestión Integral',
    subtitle: 'Metodología completa para la continuidad del negocio que asegura la resistencia operacional y la recuperación efectiva ante cualquier eventualidad.',
    processes: [
      { icon: 'Building', acronym: 'BCM', title: 'Business Continuity Management', subtitle: 'Administración de Continuidad de negocio', description: 'Brindar respuesta efectiva para recuperar o continuar las operaciones', color: 'from-blue-500 to-blue-600' },
      { icon: 'FileText', acronym: 'BCP', title: 'Business Continuity Planning', subtitle: 'Plan de continuidad del negocio', description: 'Proceso y documentación de procedimientos para responder a eventos de interrupción de operaciones', color: 'from-blue-400 to-blue-500' },
      { icon: 'HardDrive', acronym: 'DRP', title: 'Disaster Recovery Plan', subtitle: 'Plan de recuperación ante desastres', description: 'Documentación y actividades a desarrollar para la recuperación de información', color: 'from-blue-600 to-blue-700' },
      { icon: 'AlertTriangle', acronym: 'RIA', title: 'Risk Impact Analysis', subtitle: 'Evaluación de riesgo', description: 'Análisis de amenazas, peligros potenciales e interrupción de la continuidad de los procesos de negocios', color: 'from-blue-700 to-blue-800' },
      { icon: 'TrendingDown', acronym: 'BIA', title: 'Business Impact Analysis', subtitle: 'Análisis de Impacto', description: 'Análisis de impacto operacional y financiero al negocio, identificación y mitigación de impactos negativos', color: 'from-blue-800 to-blue-900' }
    ],
    benefits: [
      { icon: 'Shield', title: 'Protección Integral', description: 'Salvaguarda completa de operaciones críticas' },
      { icon: 'Clock', title: 'Respuesta Rápida', description: 'Tiempos de recuperación minimizados' },
      { icon: 'Target', title: 'Objetivos Claros', description: 'Métricas definidas de continuidad' }
    ]
  },
  digitalTransformation: {
    objectiveTitle: 'Estrategia de Transformación Digital',
    objectiveDescription: 'Modernizar los procesos operativos, comerciales y de control sanitario mediante soluciones digitales que mejoren la eficiencia, la trazabilidad, la experiencia del cliente y la toma de decisiones.',
    keyComponents: [
      { icon: 'Eye', title: 'Diagnóstico y Evaluación Inicial', description: 'Análisis integral de procesos actuales', details: ['Analizar procesos: compras, producción, almacenamiento, distribución, ventas y postventa','Identificar cuellos de botella y riesgos sanitarios','Evaluar pérdida de producto e ineficiencias logísticas','Determinar nivel de madurez digital actual'], color: 'from-blue-500 to-blue-600' },
      { icon: 'Database', title: 'Infraestructura Tecnológica', description: 'Sistemas ERP, WMS y TMS integrados', details: ['ERP con módulos de inventario, ventas, compras y contabilidad','Sistema WMS para control de almacén en frío y rotación FIFO/FEFO','TMS para optimización de rutas y control de temperaturas','Integración completa entre todos los sistemas'], color: 'from-emerald-500 to-emerald-600' },
      { icon: 'Thermometer', title: 'Trazabilidad y Control Sanitario', description: 'IoT y monitoreo en tiempo real', details: ['Sensores IoT en cámaras frigoríficas y camiones','Registro automático de temperatura y humedad','Escaneo de lotes por código QR o RFID','Cumplimiento de normas sanitarias digitales'], color: 'from-purple-500 to-purple-600' },
      { icon: 'ShoppingCart', title: 'Digitalización Comercial', description: 'E-commerce B2B y CRM integrado', details: ['Plataforma e-commerce B2B para distribuidores y restaurantes','CRM para seguimiento de clientes y oportunidades','Catálogos actualizados con precios por cliente','Automatización de facturación electrónica'], color: 'from-orange-500 to-orange-600' },
      { icon: 'BarChart3', title: 'Analítica y Toma de Decisiones', description: 'Business Intelligence y predictive analytics', details: ['Cuadros de mando con KPIs clave','Análisis de rotación de inventario y mermas','Seguimiento de cumplimiento de entregas','Modelos predictivos para demanda estacional'], color: 'from-red-500 to-red-600' },
      { icon: 'Users', title: 'Cultura y Cambio Organizacional', description: 'Capacitación y gestión del cambio', details: ['Plan de capacitación en competencias digitales','Líder de transformación digital designado','Gestión del cambio con comunicación clara','Implementación por piloto y etapas'], color: 'from-indigo-500 to-indigo-600' },
      { icon: 'Shield', title: 'Ciberseguridad', description: 'ISO 27001:2022 y protección de datos', details: ['Control de accesos a sistemas críticos','Aplicación de ISO 27001:2022 / 93 Controles','Backups automatizados y cifrado de datos','Protección específica de infraestructura IoT'], color: 'from-teal-500 to-teal-600' }
    ],
    roadmap: [
      { stage: 1, title: 'Planificación', activities: 'Diagnóstico, selección de soluciones, diseño de roadmap', duration: '1–2 meses' },
      { stage: 2, title: 'Implementación ERP + WMS', activities: 'Configuración, migración de datos, capacitación', duration: '3–6 meses' },
      { stage: 3, title: 'Trazabilidad y Sensores', activities: 'IoT + integración con ERP', duration: '2–4 meses' },
      { stage: 4, title: 'CRM y Canal Digital B2B', activities: 'Diseño e implementación de ecommerce y CRM', duration: '2–3 meses' },
      { stage: 5, title: 'BI y Analítica', activities: 'Dashboards e informes automáticos', duration: '1–2 meses' },
      { stage: 6, title: 'Mejora Continua', activities: 'Monitoreo, ajuste y automatización', duration: 'Permanente' }
    ],
    successIndicators: [
      { icon: 'Clock', metric: '% de pedidos entregados a tiempo', target: '> 95%', color: 'text-blue-600' },
      { icon: 'AlertTriangle', metric: 'Reducción de mermas por temperatura', target: '< 2%', color: 'text-emerald-600' },
      { icon: 'TrendingUp', metric: 'Incremento en ventas canal digital B2B', target: '+ 25%', color: 'text-purple-600' },
      { icon: 'Gauge', metric: 'Tiempo promedio de facturación', target: '- 50%', color: 'text-orange-600' },
      { icon: 'Award', metric: 'Satisfacción del cliente (NPS)', target: '> 8.5', color: 'text-red-600' }
    ],
    benefitsOperativos: ['Mayor eficiencia en procesos de almacenamiento y distribución','Reducción significativa de mermas por control de temperatura','Optimización de rutas y tiempos de entrega','Automatización de procesos administrativos'],
    benefitsEstrategicos: ['Mejor experiencia del cliente con entregas puntuales','Trazabilidad completa para cumplimiento sanitario','Nuevos canales de venta digitales B2B','Toma de decisiones basada en datos en tiempo real']
  },
  services: {
    headerTitle: "Nuestros Servicios",
    headerSubtitle:
      "Soluciones tecnológicas integrales diseñadas para transformar y optimizar la infraestructura digital de tu empresa.",
    items: [
      {
  icon: 'Server',
        title: 'Evaluación de Infraestructura',
        description: 'Evaluaciones del estado actual de infraestructura tecnológica, capacidad, rendimiento y escalabilidad.',
        features: [
          'Evaluación de capacidad y rendimiento',
          'Análisis de escalabilidad completo',
          'Auditoría integral de recursos tecnológicos',
          'Identificación de cuellos de botella y limitaciones'
        ]
      },
      {
  icon: 'Shield',
        title: 'Seguridad Informática',
        description: 'Seguridad informática y cumplimiento de normativas (ISO 27001:2022 / NIST 2.0).',
        features: [
          'Cumplimiento ISO 27001:2022',
          'Implementación NIST 2.0',
          'Evaluación de controles de seguridad',
          'Identificación de riesgos y vulnerabilidades',
          'Protección de datos y gestión del ciclo de vida de la información'
        ]
      },
      {
  icon: 'TrendingUp',
        title: 'Optimización y Mejora',
        description: 'Oportunidades de mejora en optimización de recursos, maximizar la eficiencia operativa y abordar necesidades no atendidas.',
        features: [
          'Optimización de recursos tecnológicos',
          'Maximización de la eficiencia operativa',
          'Identificación de necesidades no atendidas',
          'Estrategias de mejora continua y escalabilidad'
        ]
      }
    ],
  },
  methodology: {
    headerTitle: 'Nuestra Metodología',
    headerSubtitle: 'Un enfoque estructurado y probado que garantiza resultados exitosos en cada proyecto de transformación tecnológica.',
    steps: [
      { title: 'Sistemas de Evaluación', description: 'Objetivos, alcance y planificación', details: 'Definimos objetivos claros, establecemos el alcance del proyecto y desarrollamos una planificación detallada para la evaluación integral.' },
      { title: 'Revisión Integral', description: 'Políticas, procedimientos y controles internos', details: 'Evaluamos políticas existentes, analizamos procedimientos operativos, revisamos controles internos y identificamos riesgos asociados.' },
      { title: 'Presentación de Situación Actual', description: 'Marcos de referencia COBIT, ITIL, ISO 27001', details: 'Presentamos la situación actual utilizando marcos de referencia reconocidos como COBIT, ITIL e ISO 27001 para una evaluación estandarizada.' },
      { title: 'Recomendaciones', description: 'Estrategias para mejora continua', details: 'Desarrollamos recomendaciones específicas y estrategias personalizadas para la mejora continua de la infraestructura tecnológica.' },
      { title: 'Entrega y Aceptación', description: 'Informe de resultados de evaluación', details: 'Entregamos un informe detallado de los resultados de la evaluación y gestionamos la aceptación formal del cliente.' },
      { title: 'Integración e Implementación', description: 'Soluciones y seguimiento a largo plazo', details: 'Integramos e implementamos las soluciones recomendadas con seguimiento continuo a mediano y largo plazo para asegurar el éxito.' }
    ],
    benefits: [
      { title: 'Tiempo de implementación reducido', description: 'Metodología probada que acelera los tiempos de entrega' },
      { title: 'Resultados medibles', description: 'KPIs claros y reportes detallados de progreso' },
      { title: 'Innovación continua', description: 'Adopción de las mejores prácticas del mercado' }
    ]
  },
  integrations: {
    headerTitle: "Integraciones con Marcas Líderes",
    headerSubtitle:
      "Trabajamos con las principales tecnologías del mercado para ofrecerte soluciones robustas y confiables.",
    brands: [
      { name: "Microsoft", logo: "https://img.icons8.com/fluency/96/microsoft.png", category: "Cloud & Productivity" },
      { name: "Amazon AWS", logo: "https://img.icons8.com/color/96/amazon-web-services.png", category: "Cloud Infrastructure" },
      { name: "Google Cloud", logo: "https://img.icons8.com/color/96/google-cloud.png", category: "Cloud Platform" },
      { name: "VMware", logo: "https://img.icons8.com/color/96/vmware.png", category: "Virtualization" },
      { name: "Cisco", logo: "https://img.icons8.com/color/96/cisco.png", category: "Networking" },
      { name: "IBM", logo: "https://img.icons8.com/color/96/ibm.png", category: "Enterprise Solutions" },
      { name: "Oracle", logo: "https://img.icons8.com/color/96/oracle-logo.png", category: "Database & ERP" },
      { name: "Salesforce", logo: "https://img.icons8.com/color/96/salesforce.png", category: "CRM" },
    ],
  },
  certifications: {
    headerTitle: "Compromiso con la Excelencia",
    headerSubtitle:
      "Nuestro equipo se mantiene actualizado con las últimas certificaciones y mejores prácticas del sector, garantizando que siempre recibas soluciones basadas en los estándares más altos de la industria.",
    items: [
      { name: "ISO 27001:2022", description: "Gestión de Seguridad de la Información", badge: "ISO" },
      { name: "NIST Cybersecurity Framework 2.0", description: "Marco de Ciberseguridad", badge: "NIST" },
      { name: "COBIT 2019", description: "Gobierno y Gestión de TI", badge: "COBIT" },
      { name: "ITIL 4", description: "Gestión de Servicios de TI", badge: "ITIL" },
    ],
  },
  footer: {
    newsletterTitle: "Mantente actualizado con las últimas tendencias tecnológicas",
    newsletterText:
      "Recibe insights exclusivos, mejores prácticas y actualizaciones sobre infraestructura tecnológica directamente en tu bandeja de entrada.",
    brand: {
      logoLetter: "T",
      companyName: "Tecnologik S.A.",
      description:
        "Transformamos la infraestructura tecnológica de tu empresa con soluciones integrales que impulsan el crecimiento sostenible y la eficiencia operacional.",
    },
    contact: {
      email: "info@tecnologik.net",
      phone: "+(502) 2372-2114",
      phoneNumbers: [
        "+(502) 2372-2114",
        "+(502) 2372-2115",
        "+(502) 4770-1350",
        "+(502) 5590-6934"
      ],
      location: "Diagonal 6 12-42 zona 10\nEdificio Design Center\nTorre 1 Oficina 402\nCiudad de Guatemala",
    },
    navigation: {
      services: [
        { name: 'Evaluación de Infraestructura', href: '#servicios' },
        { name: 'Seguridad Informática', href: '#servicios' },
        { name: 'Optimización y Mejora', href: '#servicios' }
      ],
      company: [
        { name: 'Metodología', href: '#metodologia' },
        { name: 'Certificaciones', href: '#certificaciones' },
        { name: 'Integraciones', href: '#integraciones' }
      ],
      support: [
        { name: 'Centro de Ayuda', href: '#' },
        { name: 'Soporte Técnico', href: '#' },
        { name: 'Estado del Servicio', href: '#' }
      ],
    },
    socials: [
      { name: 'LinkedIn', href: '#' },
      { name: 'Twitter', href: '#' },
      { name: 'Facebook', href: '#' },
    ],
    copyright: "© 2024 Tecnologik S.A. Todos los derechos reservados.",
  },
};
