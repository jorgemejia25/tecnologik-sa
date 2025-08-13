import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook
} from 'lucide-react';
import type { SiteContent } from '@shared/content';

interface FooterProps { data?: SiteContent['footer']; }

export default function Footer({ data }: FooterProps) {
  const socialMap = { LinkedIn: Linkedin, Twitter: Twitter, Facebook: Facebook } as const;
  const socialLinks = (data?.socials || []).map(s => ({ ...s, Icon: socialMap[s.name] }));

  return (
    <footer className="bg-gradient-to-b from-background to-blue-50/30 border-t border-blue-200/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <div className="gradient-bg w-10 h-10 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">{data?.brand.logoLetter || 'T'}</span>
                </div>
                <span className="text-xl font-bold text-foreground">{data?.brand.companyName || 'Tecnologik S.A.'}</span>
              </Link>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {data?.brand.description || 'Transformamos la infraestructura tecnológica de tu empresa con soluciones integrales.'}
              </p>

              {/* Contact Information (solo email aquí, ubicación aparece en su propia columna) */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-tech-primary flex-shrink-0" />
                  <a href={`mailto:${data?.contact.email || 'info@tecnologik.net'}`} className="text-muted-foreground hover:text-tech-primary transition-colors">
                    {data?.contact.email || 'info@tecnologik.net'}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Phone Numbers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <h4 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                <Phone className="h-5 w-5 text-tech-primary" />
                Teléfonos
              </h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                {(data?.contact.phoneNumbers || [data?.contact.phone || '+(502) 0000-0000']).map(p => (
                  <div key={p}>{p}</div>
                ))}
              </div>
            </motion.div>

            {/* Location & Social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <h4 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-tech-primary" />
                Ubicación
              </h4>
              <div className="text-sm text-muted-foreground mb-8 leading-relaxed whitespace-pre-line">
                {data?.contact.location || 'Ciudad'}
              </div>

              <h4 className="font-semibold text-foreground mb-4">Síguenos</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.Icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-9 h-9 bg-tech-primary/10 rounded-lg flex items-center justify-center text-tech-primary hover:bg-tech-primary hover:text-white transition-colors"
                      title={social.name}
                    >
                      <IconComponent className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-blue-200/30 py-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              {data?.copyright || '© 2024 Tecnologik S.A. Todos los derechos reservados.'}
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-tech-primary transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-tech-primary transition-colors">
                Términos de Servicio
              </a>
              <a href="#" className="hover:text-tech-primary transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
