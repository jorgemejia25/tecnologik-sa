import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { 
  Server, 
  Shield, 
  TrendingUp, 
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import type { SiteContent } from '@shared/content';
import { defaultContent } from '@shared/content';

export default function Services() {
  const [content, setContent] = useState(defaultContent.services);

  useEffect(() => {
    fetch('/api/content', { credentials: 'include' })
      .then(r => r.json())
      .then((data: SiteContent) => { if (data?.services) setContent(data.services); })
      .catch(() => {});
  }, []);
  
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
      transition: { duration: 0.6 }
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
            {content?.headerTitle?.split('Servicios')[0]}
            <span className="gradient-text">{content?.headerTitle?.includes('Servicios') ? 'Servicios' : ''}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {content?.headerSubtitle}
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
          {(content?.items ?? []).map((service, index) => {
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  <CardHeader className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-5`} />
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 mb-4`}>
                      {(index === 0 ? <Server className="h-6 w-6 text-white" /> : index === 1 ? <Shield className="h-6 w-6 text-white" /> : <TrendingUp className="h-6 w-6 text-white" />)}
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
                          <CheckCircle2 className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="outline" 
                      className="w-full border-current text-blue-600 hover:bg-current hover:text-white transition-colors group"
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-tech-primary to-tech-accent p-8 sm:p-12">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4">
                {content?.ctaTitle}
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                {content?.ctaText}
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-tech-primary hover:bg-blue-50 hover:shadow-lg transition-all duration-300"
              >
                {content?.ctaButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
              <div className="w-40 h-40 bg-white/10 rounded-full" />
            </div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2">
              <div className="w-32 h-32 bg-white/10 rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
