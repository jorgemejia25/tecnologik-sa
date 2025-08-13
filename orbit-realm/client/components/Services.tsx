import { motion, type Variants } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import type { SiteContent } from '@shared/content';
import { getIconComponent } from '../lib/icon-map';

interface ServicesProps { data?: SiteContent['services']; }

const COLOR_PRESETS = [
  { color: 'from-blue-500 to-blue-600', text: 'text-blue-600' },
  { color: 'from-emerald-500 to-emerald-600', text: 'text-emerald-600' },
  { color: 'from-purple-500 to-purple-600', text: 'text-purple-600' }
];

export default function Services({ data }: ServicesProps) {
  const services = (data?.items || []).map((s, i) => {
    const preset = COLOR_PRESETS[i % COLOR_PRESETS.length];
    return {
      Icon: s.icon ? getIconComponent(s.icon) : null,
      title: s.title,
      description: s.description,
      features: s.features,
      color: preset.color,
      textColor: preset.text
    };
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
            {(() => {
              const raw = data?.headerTitle ?? 'Nuestros Servicios';
              if (!raw.toLowerCase().includes('servicio')) {
                return (<><span>{raw}</span> <span className="gradient-text">Servicios</span></>);
              }
              // Resaltar última ocurrencia de "Servicios"
              const idx = raw.toLowerCase().lastIndexOf('servicios');
              if (idx === -1) return raw;
              const before = raw.slice(0, idx);
              const highlighted = raw.slice(idx, idx + 'Servicios'.length);
              const after = raw.slice(idx + 'Servicios'.length);
              return (<><span>{before}</span><span className="gradient-text">{highlighted}</span><span>{after}</span></>);
            })()}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {data?.headerSubtitle || 'Soluciones tecnológicas integrales diseñadas para transformar y optimizar la infraestructura digital de tu empresa.'}
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
          {services.map((service) => {
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  <CardHeader className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5`} />
                    {service.Icon && (
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} mb-4`}>
                        <service.Icon className="h-6 w-6 text-white" />
                      </div>
                    )}
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
