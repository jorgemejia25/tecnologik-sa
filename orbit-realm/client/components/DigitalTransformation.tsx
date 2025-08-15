import { motion } from 'framer-motion';
import {
  Target,
  Database,
  Thermometer,
  ShoppingCart,
  BarChart3,
  Users,
  Shield,
  Clock,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Eye,
  Cpu,
  Truck,
  Package,
  AlertTriangle,
  Calendar,
  Award,
  Gauge
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

export default function DigitalTransformation() {
  const objective = {
    title: 'Estrategia de Transformación Digital',
    description: 'Modernizar los procesos operativos, comerciales y de control sanitario mediante soluciones digitales que mejoren la eficiencia, la trazabilidad, la experiencia del cliente y la toma de decisiones.'
  };

  const keyComponents = [
    {
      icon: Eye,
      title: 'Diagnóstico y Evaluación Inicial',
      description: 'Análisis integral de procesos actuales',
      details: [
        'Analizar procesos: compras, producción, almacenamiento, distribución, ventas y postventa',
        'Identificar cuellos de botella y riesgos sanitarios',
        'Evaluar pérdida de producto e ineficiencias logísticas',
        'Determinar nivel de madurez digital actual'
      ],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Database,
      title: 'Infraestructura Tecnológica',
      description: 'Sistemas ERP, WMS y TMS integrados',
      details: [
        'ERP con módulos de inventario, ventas, compras y contabilidad',
        'Sistema WMS para control de almacén en frío y rotación FIFO/FEFO',
        'TMS para optimización de rutas y control de temperaturas',
        'Integración completa entre todos los sistemas'
      ],
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: Thermometer,
      title: 'Trazabilidad y Control Sanitario',
      description: 'IoT y monitoreo en tiempo real',
      details: [
        'Sensores IoT en cámaras frigoríficas y camiones',
        'Registro automático de temperatura y humedad',
        'Escaneo de lotes por código QR o RFID',
        'Cumplimiento de normas sanitarias digitales'
      ],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: ShoppingCart,
      title: 'Digitalización Comercial',
      description: 'E-commerce B2B y CRM integrado',
      details: [
        'Plataforma e-commerce B2B para distribuidores y restaurantes',
        'CRM para seguimiento de clientes y oportunidades',
        'Catálogos actualizados con precios por cliente',
        'Automatización de facturación electrónica'
      ],
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: BarChart3,
      title: 'Analítica y Toma de Decisiones',
      description: 'Business Intelligence y predictive analytics',
      details: [
        'Cuadros de mando con KPIs clave',
        'Análisis de rotación de inventario y mermas',
        'Seguimiento de cumplimiento de entregas',
        'Modelos predictivos para demanda estacional'
      ],
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: Users,
      title: 'Cultura y Cambio Organizacional',
      description: 'Capacitación y gestión del cambio',
      details: [
        'Plan de capacitación en competencias digitales',
        'Líder de transformación digital designado',
        'Gestión del cambio con comunicación clara',
        'Implementación por piloto y etapas'
      ],
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      icon: Shield,
      title: 'Ciberseguridad',
      description: 'ISO 27001:2022 y protección de datos',
      details: [
        'Control de accesos a sistemas críticos',
        'Aplicación de ISO 27001:2022 / 93 Controles',
        'Backups automatizados y cifrado de datos',
        'Protección específica de infraestructura IoT'
      ],
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50'
    }
  ];

  const roadmap = [
    {
      stage: 1,
      title: 'Planificación',
      activities: 'Diagnóstico, selección de soluciones, diseño de roadmap',
      duration: '1–2 meses',
      status: 'pending'
    },
    {
      stage: 2,
      title: 'Implementación ERP + WMS',
      activities: 'Configuración, migración de datos, capacitación',
      duration: '3–6 meses',
      status: 'pending'
    },
    {
      stage: 3,
      title: 'Trazabilidad y Sensores',
      activities: 'IoT + integración con ERP',
      duration: '2–4 meses',
      status: 'pending'
    },
    {
      stage: 4,
      title: 'CRM y Canal Digital B2B',
      activities: 'Diseño e implementación de ecommerce y CRM',
      duration: '2–3 meses',
      status: 'pending'
    },
    {
      stage: 5,
      title: 'BI y Analítica',
      activities: 'Dashboards e informes automáticos',
      duration: '1–2 meses',
      status: 'pending'
    },
    {
      stage: 6,
      title: 'Mejora Continua',
      activities: 'Monitoreo, ajuste y automatización',
      duration: 'Permanente',
      status: 'pending'
    }
  ];

  const successIndicators = [
    {
      icon: Clock,
      metric: '% de pedidos entregados a tiempo',
      target: '> 95%',
      color: 'text-blue-600'
    },
    {
      icon: AlertTriangle,
      metric: 'Reducción de mermas por temperatura',
      target: '< 2%',
      color: 'text-emerald-600'
    },
    {
      icon: TrendingUp,
      metric: 'Incremento en ventas canal digital B2B',
      target: '+ 25%',
      color: 'text-purple-600'
    },
    {
      icon: Gauge,
      metric: 'Tiempo promedio de facturación',
      target: '- 50%',
      color: 'text-orange-600'
    },
    {
      icon: Award,
      metric: 'Satisfacción del cliente (NPS)',
      target: '> 8.5',
      color: 'text-red-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section id="transformacion-digital" className="py-24 bg-gradient-to-br from-blue-50/50 to-purple-50/30">
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
            <span className="gradient-text">{objective.title}</span>
          </h2>
          <p className="mx-auto max-w-4xl text-lg text-muted-foreground leading-relaxed">
            {objective.description}
          </p>
        </motion.div>

        <Tabs defaultValue="components" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-auto gap-2 md:gap-0 bg-white/50 backdrop-blur-sm p-2">
            <TabsTrigger value="components" className="text-sm">Componentes Clave</TabsTrigger>
            <TabsTrigger value="roadmap" className="text-sm">Hoja de Ruta</TabsTrigger>
            <TabsTrigger value="indicators" className="text-sm">Indicadores de Éxito</TabsTrigger>
            <TabsTrigger value="benefits" className="text-sm">Beneficios</TabsTrigger>
          </TabsList>

          {/* Key Components Tab */}
          <TabsContent value="components" className="mt-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {keyComponents.map((component, index) => {
                const IconComponent = component.icon;
                return (
                  <motion.div
                    key={component.title}
                    variants={itemVariants}
                    className="group"
                  >
                    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                      <CardHeader className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${component.color} opacity-5`} />
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${component.color} mb-4`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-lg font-bold text-foreground group-hover:text-tech-primary transition-colors">
                          {component.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {component.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-2">
                          {component.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </TabsContent>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Hoja de Ruta Simplificada</h3>
                <p className="text-muted-foreground">Implementación estructurada en 6 etapas estratégicas</p>
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {roadmap.map((stage, index) => (
                  <motion.div
                    key={stage.stage}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative"
                  >
                    <Card className="h-full border-l-4 border-l-tech-primary hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-tech-primary text-white text-sm font-bold">
                            {stage.stage}
                          </div>
                          <div>
                            <CardTitle className="text-lg font-bold text-foreground">{stage.title}</CardTitle>
                            <Badge variant="outline" className="mt-1">{stage.duration}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">{stage.activities}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Success Indicators Tab */}
          <TabsContent value="indicators" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Indicadores de Éxito</h3>
                <p className="text-muted-foreground">Métricas clave para medir el impacto de la transformación digital</p>
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {successIndicators.map((indicator, index) => {
                  const IconComponent = indicator.icon;
                  return (
                    <motion.div
                      key={indicator.metric}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${indicator.color.replace('text-', 'from-').replace('-600', '-500')} to-${indicator.color.replace('text-', '').replace('600', '700')} mb-4`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-foreground mb-2 text-sm leading-tight">{indicator.metric}</h4>
                        <div className={`text-2xl font-bold ${indicator.color} mb-1`}>{indicator.target}</div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </TabsContent>

          {/* Benefits Tab */}
          <TabsContent value="benefits" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Beneficios de la Transformación</h3>
                <p className="text-muted-foreground">Impacto directo en la operación y resultados del negocio</p>
              </div>
              
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <Card className="p-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <TrendingUp className="h-6 w-6 text-emerald-500" />
                      Beneficios Operativos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Mayor eficiencia en procesos de almacenamiento y distribución</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Reducción significativa de mermas por control de temperatura</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Optimización de rutas y tiempos de entrega</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Automatización de procesos administrativos</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Target className="h-6 w-6 text-blue-500" />
                      Beneficios Estratégicos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Mejor experiencia del cliente con entregas puntuales</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Trazabilidad completa para cumplimiento sanitario</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Nuevos canales de venta digitales B2B</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Toma de decisiones basada en datos en tiempo real</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
