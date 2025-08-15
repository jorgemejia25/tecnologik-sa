import { motion } from 'framer-motion';
import { 
  Zap, 
  Database, 
  TrendingUp, 
  DollarSign,
  Settings,
  Gauge,
  Share2,
  Shield,
  Brain,
  Trophy,
  Users,
  PiggyBank
} from 'lucide-react';

export default function Benefits() {
  const benefitCategories = [
    {
      icon: Zap,
      title: 'AUTOMATIZACIÓN',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      benefits: [
        {
          icon: Settings,
          title: 'Optimización de procesos',
          description: 'Automatización de tareas repetitivas para mayor eficiencia'
        },
        {
          icon: Gauge,
          title: 'Aumento de la agilidad',
          description: 'Respuesta más rápida a cambios del mercado'
        }
      ]
    },
    {
      icon: Database,
      title: 'DEMOCRATIZACIÓN DE DATOS',
      color: 'from-blue-400 to-blue-500',
      bgColor: 'bg-blue-50',
      benefits: [
        {
          icon: Share2,
          title: 'Datos habilitados para líneas de negocio',
          description: 'Acceso descentralizado a información crítica'
        },
        {
          icon: Shield,
          title: 'Resiliencia operativa',
          description: 'Continuidad del negocio garantizada'
        }
      ]
    },
    {
      icon: TrendingUp,
      title: 'MODERNIZACIÓN DEL ANÁLISIS',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      benefits: [
        {
          icon: Brain,
          title: 'Toma de decisiones estratégicas',
          description: 'Análisis avanzado para decisiones informadas'
        },
        {
          icon: Trophy,
          title: 'Ventaja competitiva',
          description: 'Diferenciación en el mercado mediante tecnología'
        }
      ]
    },
    {
      icon: DollarSign,
      title: 'COSTOS',
      color: 'from-blue-700 to-blue-800',
      bgColor: 'bg-blue-50',
      benefits: [
        {
          icon: Users,
          title: 'Aumento de colaboración y productividad',
          description: 'Equipos más eficientes y conectados'
        },
        {
          icon: PiggyBank,
          title: 'Ahorro de costos',
          description: 'Reducción significativa en gastos operativos'
        }
      ]
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
    <section id="beneficios" className="relative py-24 bg-gradient-to-b from-background to-blue-50/30 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-tech-primary/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-tech-accent/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-500/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
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
            Impacto real en tu organización
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
            <span className="gradient-text">Beneficios</span> de Nuestras Soluciones
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-muted-foreground">
            Transforma tu empresa con tecnología que impulsa el crecimiento, optimiza costos
            y proporciona ventajas competitivas sostenibles.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-4"
        >
          {benefitCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="group"
              >
                <div className="h-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-200/50 hover:border-tech-primary/30 hover:-translate-y-2">
                  {/* Category Header */}
                  <div className={`relative p-6 bg-gradient-to-br ${category.color} text-white overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/5"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <CategoryIcon className="h-5 w-5" />
                        </div>
                        <h3 className="text-base font-bold">{category.title}</h3>
                      </div>
                    </div>
                    {/* Decoration */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                  </div>

                  {/* Benefits List */}
                  <div className="p-6 space-y-5">
                    {category.benefits.map((benefit, benefitIndex) => {
                      const BenefitIcon = benefit.icon;
                      return (
                        <motion.div
                          key={benefit.title}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: categoryIndex * 0.1 + benefitIndex * 0.05
                          }}
                          className="flex gap-4"
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-tech-primary/10 flex items-center justify-center group-hover:bg-tech-primary/20 transition-colors">
                            <BenefitIcon className="h-5 w-5 text-tech-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-2 text-sm leading-tight">
                              {benefit.title}
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {benefit.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
