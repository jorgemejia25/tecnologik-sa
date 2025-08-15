import { motion } from 'framer-motion';
import { 
  Shield, 
  FileText, 
  HardDrive, 
  AlertTriangle, 
  TrendingDown,
  CheckCircle,
  ArrowRight,
  Building,
  Clock,
  Target
} from 'lucide-react';

export default function BusinessContinuity() {
  const processes = [
    {
      icon: Building,
      acronym: 'BCM',
      title: 'Business Continuity Management',
      subtitle: 'Administración de Continuidad de negocio',
      description: 'Brindar respuesta efectiva para recuperar o continuar las operaciones',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: FileText,
      acronym: 'BCP',
      title: 'Business Continuity Planning',
      subtitle: 'Plan de continuidad del negocio',
      description: 'Proceso y documentación de procedimientos para responder a eventos de interrupción de operaciones',
      color: 'from-blue-400 to-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: HardDrive,
      acronym: 'DRP',
      title: 'Disaster Recovery Plan',
      subtitle: 'Plan de recuperación ante desastres',
      description: 'Documentación y actividades a desarrollar para la recuperación de información',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: AlertTriangle,
      acronym: 'RIA',
      title: 'Risk Impact Analysis',
      subtitle: 'Evaluación de riesgo',
      description: 'Análisis de amenazas, peligros potenciales e interrupción de la continuidad de los procesos de negocios',
      color: 'from-blue-700 to-blue-800',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: TrendingDown,
      acronym: 'BIA',
      title: 'Business Impact Analysis',
      subtitle: 'Análisis de Impacto',
      description: 'Análisis de impacto operacional y financiero al negocio, identificación y mitigación de impactos negativos',
      color: 'from-blue-800 to-blue-900',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Protección Integral',
      description: 'Salvaguarda completa de operaciones críticas'
    },
    {
      icon: Clock,
      title: 'Respuesta Rápida',
      description: 'Tiempos de recuperación minimizados'
    },
    {
      icon: Target,
      title: 'Objetivos Claros',
      description: 'Métricas definidas de continuidad'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="continuidad-negocio" className="relative py-24 bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-tech-primary/3 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-tech-accent/3 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-blue-500/3 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center rounded-full bg-blue-100/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-tech-primary mb-8 border border-blue-200/50"
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tech-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tech-primary"></span>
            </span>
            Metodología estructurada y probada
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
            <span className="gradient-text">Proceso de Gestión Integral</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-muted-foreground">
            Metodología completa para la continuidad del negocio que asegura la resistencia
            operacional y la recuperación efectiva ante cualquier eventualidad.
          </p>
        </motion.div>

        {/* Process Grid */}
        <div className="flex justify-center mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-6xl"
          >
            {processes.map((process, index) => {
              const IconComponent = process.icon;
              return (
                <motion.div
                  key={process.acronym}
                  variants={itemVariants}
                  className="group"
                >
                  <div className="h-full bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200/50 hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:border-tech-primary/30">
                    {/* Header with Acronym */}
                    <div className={`relative p-6 bg-gradient-to-br ${process.color} text-white overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/5"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">{process.acronym}</div>
                          </div>
                        </div>
                        <h3 className="text-base font-bold mb-1 leading-tight">{process.title}</h3>
                        <p className="text-sm opacity-90 leading-tight">{process.subtitle}</p>
                      </div>
                      {/* Decoration */}
                      <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                      <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/5 rounded-full"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {process.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Beneficios de Nuestro Enfoque Integral
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un sistema robusto que garantiza la continuidad operacional 
              y minimiza el impacto de interrupciones no planificadas.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-4xl">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-200/50 hover:border-tech-primary/30 hover:-translate-y-1"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-tech-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-tech-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
