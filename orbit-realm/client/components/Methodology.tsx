import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  FileText, 
  Settings, 
  CheckCircle, 
  Clock,
  Target,
  Lightbulb
} from 'lucide-react';
import type { SiteContent } from '@shared/content';
import { defaultContent } from '@shared/content';

export default function Methodology() {
  const [content, setContent] = useState(defaultContent.methodology);
  useEffect(() => {
    fetch('/api/content', { credentials: 'include' })
      .then(r => r.json())
      .then((data: SiteContent) => { if (data?.methodology) setContent(data.methodology); })
      .catch(() => {});
  }, []);

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
            {content?.headerTitle?.split('Metodología')[0]}
            <span className="gradient-text">{content?.headerTitle?.includes('Metodología') ? 'Metodología' : ''}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {content?.headerSubtitle}
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="mb-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {(content?.steps ?? []).map((step, index, arr) => {
              const IconComponent = index === 0 ? Search : index === 1 ? FileText : index === 2 ? Settings : CheckCircle;
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
                  {index < arr.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-tech-primary/30 to-transparent z-0" />
                  )}
                  
                  <div className="relative z-10 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
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
          {(content?.benefits ?? []).map((benefit, index) => {
            const IconComponent = index === 0 ? Clock : index === 1 ? Target : Lightbulb;
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
