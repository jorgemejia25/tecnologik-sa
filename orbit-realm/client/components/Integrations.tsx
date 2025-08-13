import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { SiteContent } from '@shared/content';
import { defaultContent } from '@shared/content';

export default function Integrations() {
  const [content, setContent] = useState(defaultContent.integrations);
  const [certs, setCerts] = useState(defaultContent.certifications);
  useEffect(() => {
    fetch('/api/content', { credentials: 'include' })
      .then(r => r.json())
      .then((data: SiteContent) => {
        if (data?.integrations) setContent(data.integrations);
        if (data?.certifications) setCerts(data.certifications);
      })
      .catch(() => {});
  }, []);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="integraciones" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Integrations Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            <span className="gradient-text">{content?.headerTitle?.split(' ')[0]}</span> {content?.headerTitle?.split(' ').slice(1).join(' ')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {content?.headerSubtitle}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4 mb-20"
        >
          {(content?.brands ?? []).map((brand, index) => (
            <motion.div
              key={brand.name}
              variants={itemVariants}
              className="group relative bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{brand.name}</h3>
                <p className="text-xs text-muted-foreground">{brand.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4" id="certificaciones">
            <span className="gradient-text">{certs?.headerTitle?.split(' ')[0]}</span> {certs?.headerTitle?.split(' ').slice(1).join(' ')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {certs?.headerSubtitle}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {(certs?.items ?? []).map((cert, index) => (
            <motion.div
              key={cert.name}
              variants={itemVariants}
              className="relative bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg p-6 border border-blue-200/50 hover:border-tech-primary/30 transition-colors duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-tech-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-tech-primary">{cert.badge}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
                  <div className="flex items-center gap-1">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-tech-primary" fill="currentColor"><path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4z"/></svg>
                    <span className="text-xs text-tech-primary font-medium">Certificado</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-tech-primary/5 to-tech-accent/5 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Compromiso con la Excelencia
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Nuestro equipo se mantiene actualizado con las últimas certificaciones y 
              mejores prácticas del sector, garantizando que siempre recibas soluciones 
              basadas en los estándares más altos de la industria.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
