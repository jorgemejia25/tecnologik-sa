import { motion } from 'framer-motion';
import { 
  Server, 
  Shield, 
  TrendingUp, 
  ArrowRight,
  CheckCircle2,
  Cpu,
  Lock,
  BarChart3
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export default function Services() {
  const services = [
    {
      icon: Server,
      title: 'Evaluación de Infraestructura',
      description: 'Evaluaciones del estado actual de infraestructura tecnológica, capacidad, rendimiento y escalabilidad.',
      features: [
        'Evaluación de capacidad y rendimiento',
        'Análisis de escalabilidad completo',
        'Auditoría integral de recursos tecnológicos',
        'Identificación de cuellos de botella y limitaciones'
      ],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      icon: Shield,
      title: 'Seguridad Informática',
      description: 'Seguridad informática y cumplimiento de normativas (ISO 27001:2022 / NIST 2.0).',
      features: [
        'Cumplimiento ISO 27001:2022',
        'Implementación NIST 2.0',
        'Evaluación de controles de seguridad',
        'Identificación de riesgos y vulnerabilidades',
        'Protección de datos y gestión del ciclo de vida de la información'
      ],
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    {
      icon: TrendingUp,
      title: 'Optimización y Mejora',
      description: 'Oportunidades de mejora en optimización de recursos, maximizar la eficiencia operativa y abordar necesidades no atendidas.',
      features: [
        'Optimización de recursos tecnológicos',
        'Maximización de la eficiencia operativa',
        'Identificación de necesidades no atendidas',
        'Estrategias de mejora continua y escalabilidad'
      ],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="servicios" className="py-24 bg-background">
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
            Nuestros <span className="gradient-text">Servicios</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Soluciones tecnológicas integrales diseñadas para transformar y optimizar 
            la infraestructura digital de tu empresa.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  <CardHeader className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5`} />
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} mb-4`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-tech-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className={`h-4 w-4 mt-0.5 ${service.textColor} flex-shrink-0`} />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="outline" 
                      className={`w-full border-current ${service.textColor} hover:bg-current hover:text-white transition-colors group`}
                    >
                      Más información
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
