import { motion, type Variants } from 'framer-motion';
import { CheckCircle2, TrendingUp, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import type { SiteContent } from '@shared/content';
import { getIconComponent } from '../lib/icon-map';

interface DigitalTransformationProps { data?: SiteContent['digitalTransformation']; }

export default function DigitalTransformation({ data }: DigitalTransformationProps) {
  const keyComponents = (data?.keyComponents || []).map(k => ({
    ...k,
    Icon: getIconComponent(k.icon)
  }));
  const roadmap = data?.roadmap || [];
  const successIndicators = (data?.successIndicators || []).map(i => ({
    ...i,
    Icon: getIconComponent(i.icon)
  }));
  const benefitsOperativos = data?.benefitsOperativos || [];
  const benefitsEstrategicos = data?.benefitsEstrategicos || [];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
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
            <span className="gradient-text">{data?.objectiveTitle || 'Estrategia de Transformación Digital'}</span>
          </h2>
          <p className="mx-auto max-w-4xl text-lg text-muted-foreground leading-relaxed">
            {data?.objectiveDescription || 'Modernizar procesos mediante soluciones digitales.'}
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
              {keyComponents.map((component) => {
                const IconComponent = component.Icon;
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
                  const IconComponent = indicator.Icon;
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
                    {benefitsOperativos.map((b, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{b}</span>
                      </div>
                    ))}
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
                    {benefitsEstrategicos.map((b, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{b}</span>
                      </div>
                    ))}
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
