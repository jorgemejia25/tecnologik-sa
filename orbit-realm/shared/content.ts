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
  services?: {
    headerTitle: string;
    headerSubtitle: string;
    items: Array<{
      title: string;
      description: string;
      features: string[];
    }>;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
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
      phone: string;
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
    badge: "Líder en consultoría tecnológica empresariall",
    title: "Hacemos que la gestión de tu",
    highlight: "empresa sea eficiente nvl 2",
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
  services: {
    headerTitle: "Nuestros Servicios",
    headerSubtitle:
      "Soluciones tecnológicas integrales diseñadas para transformar y optimizar la infraestructura digital de tu empresa.",
    items: [
      {
        title: "Evaluación de Infraestructura",
        description: "Análisis exhaustivo del estado actual de tu infraestructura tecnológica.",
        features: [
          "Evaluación de capacidad y rendimiento",
          "Análisis de escalabilidad",
          "Auditoría de recursos tecnológicos",
          "Identificación de cuellos de botella",
        ],
      },
      {
        title: "Ciberseguridad",
        description: "Servicios integrales de seguridad informática y cumplimiento normativo.",
        features: [
          "Cumplimiento ISO 27001:2022",
          "Implementación NIST 2.0",
          "Evaluación de vulnerabilidades",
          "Gestión del ciclo de vida de datos",
        ],
      },
      {
        title: "Optimización y Mejora",
        description: "Identificación de oportunidades para maximizar la eficiencia operacional.",
        features: [
          "Optimización de recursos",
          "Maximización de eficiencia",
          "Análisis de necesidades no cubiertas",
          "Estrategias de mejora continua",
        ],
      },
    ],
    ctaTitle: "¿Listo para transformar tu infraestructura tecnológica?",
    ctaText:
      "Programa una consulta gratuita con nuestros expertos y descubre cómo podemos optimizar la gestión tecnológica de tu empresa.",
    ctaButton: "Agendar consulta gratuita",
  },
  methodology: {
    headerTitle: "Nuestra Metodología",
    headerSubtitle:
      "Un enfoque estructurado y probado que garantiza resultados exitosos en cada proyecto de transformación tecnológica.",
    steps: [
      {
        title: "Análisis",
        description: "Evaluación exhaustiva de tu infraestructura actual",
        details:
          "Realizamos un diagnóstico completo de todos los componentes tecnológicos, identificando fortalezas, debilidades y oportunidades de mejora.",
      },
      {
        title: "Planificación",
        description: "Desarrollo de estrategias personalizadas",
        details:
          "Diseñamos un plan detallado con objetivos claros, cronogramas realistas y métricas de éxito específicas para tu organización.",
      },
      {
        title: "Implementación",
        description: "Ejecución de soluciones tecnológicas",
        details:
          "Ejecutamos las mejoras de manera estructurada, minimizando interrupciones y asegurando la continuidad operacional.",
      },
      {
        title: "Optimización",
        description: "Monitoreo y mejora continua",
        details:
          "Implementamos sistemas de monitoreo continuo y realizamos ajustes regulares para mantener el rendimiento óptimo.",
      },
    ],
    benefits: [
      { title: "Tiempo de implementación reducido", description: "Metodología probada que acelera los tiempos de entrega" },
      { title: "Resultados medibles", description: "KPIs claros y reportes detallados de progreso" },
      { title: "Innovación continua", description: "Adopción de las mejores prácticas del mercado" },
    ],
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
      email: "contacto@tecnologik.com",
      phone: "+57 (1) 234-5678",
      location: "Bogotá, Colombia",
    },
    navigation: {
      services: [
        { name: 'Evaluación de Infraestructura', href: '#servicios' },
        { name: 'Ciberseguridad', href: '#servicios' },
        { name: 'Optimización', href: '#servicios' },
        { name: 'Consultoría', href: '#servicios' },
      ],
      company: [
        { name: 'Sobre Nosotros', href: '#' },
        { name: 'Metodología', href: '#metodologia' },
        { name: 'Certificaciones', href: '#certificaciones' },
        { name: 'Casos de Éxito', href: '#' },
      ],
      support: [
        { name: 'Centro de Ayuda', href: '#' },
        { name: 'Documentación', href: '#' },
        { name: 'Soporte Técnico', href: '#' },
        { name: 'Estado del Servicio', href: '#' },
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
