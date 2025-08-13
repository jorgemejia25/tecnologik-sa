import { motion } from 'framer-motion';
import {
  Search,
  FileText,
  Settings,
  CheckCircle,
  ArrowRight,
  Clock,
  Target,
  Lightbulb,
  ClipboardList,
  BarChart3,
  TrendingUp,
  Users
} from 'lucide-react';

export default function Methodology() {
  const steps = [
    {
      icon: ClipboardList,
      title: 'Sistemas de Evaluación',
      description: 'Objetivos, alcance y planificación',
      details: 'Definimos objetivos claros, establecemos el alcance del proyecto y desarrollamos una planificación detallada para la evaluación integral.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Search,
      title: 'Revisión Integral',
      description: 'Políticas, procedimientos y controles internos',
      details: 'Evaluamos políticas existentes, analizamos procedimientos operativos, revisamos controles internos y identificamos riesgos asociados.',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: BarChart3,
      title: 'Presentación de Situación Actual',
      description: 'Marcos de referencia COBIT, ITIL, ISO 27001',
      details: 'Presentamos la situación actual utilizando marcos de referencia reconocidos como COBIT, ITIL e ISO 27001 para una evaluación estandarizada.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Recomendaciones',
      description: 'Estrategias para mejora continua',
      details: 'Desarrollamos recomendaciones específicas y estrategias personalizadas para la mejora continua de la infraestructura tecnológica.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: FileText,
      title: 'Entrega y Aceptación',
      description: 'Informe de resultados de evaluación',
      details: 'Entregamos un informe detallado de los resultados de la evaluación y gestionamos la aceptación formal del cliente.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Settings,
      title: 'Integración e Implementación',
      description: 'Soluciones y seguimiento a largo plazo',
      details: 'Integramos e implementamos las soluciones recomendadas con seguimiento continuo a mediano y largo plazo para asegurar el éxito.',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Tiempo de implementación reducido',
      description: 'Metodología probada que acelera los tiempos de entrega'
    },
    {
      icon: Target,
      title: 'Resultados medibles',
      description: 'KPIs claros y reportes detallados de progreso'
    },
    {
      icon: Lightbulb,
      title: 'Innovación continua',
      description: 'Adopción de las mejores prácticas del mercado'
    }
  ];

  return (
    <section id="metodologia" className="py-24 bg-blue-50/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Nuestra <span className="gradient-text">Metodología</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Un enfoque estructurado y probado que garantiza resultados exitosos 
            en cada proyecto de transformación tecnológica.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="mb-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Connection line */}
                  {index < steps.length - 1 && (
                    <div className="hidden xl:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-tech-primary/30 to-transparent z-0" />
                  )}
                  
                  <div className="relative z-10 text-center bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${step.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed">{step.details}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-tech-primary/10 mb-4">
                  <IconComponent className="h-5 w-5 text-tech-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
