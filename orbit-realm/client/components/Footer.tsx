import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook,
  ArrowRight
} from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import type { SiteContent } from '@shared/content';
import { defaultContent } from '@shared/content';

export default function Footer() {
  const [footer, setFooter] = useState(defaultContent.footer);

  useEffect(() => {
    fetch('/api/content', { credentials: 'include' })
      .then(r => r.json())
      .then((data: SiteContent) => { if (data?.footer) setFooter(data.footer); })
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-gradient-to-b from-background to-blue-50/30 border-t border-border/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-12 border-b border-border/10"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {footer?.newsletterTitle}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {footer?.newsletterText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-tech-primary"
              />
              <Button className="gradient-bg text-white hover:shadow-lg hover:shadow-tech-primary/25 transition-all duration-300 group">
                Suscribirse
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="gradient-bg w-8 h-8 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{footer?.brand.logoLetter}</span>
                </div>
                <span className="text-xl font-bold text-foreground">{footer?.brand.companyName}</span>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-md">
                {footer?.brand.description}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-tech-primary" />
                  {footer?.contact.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-tech-primary" />
                  {footer?.contact.phone}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-tech-primary" />
                  {footer?.contact.location}
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-sm font-semibold text-foreground mb-4">Servicios</h3>
              <ul className="space-y-3">
                {(footer?.navigation.services ?? []).map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-tech-primary transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-sm font-semibold text-foreground mb-4">Empresa</h3>
              <ul className="space-y-3">
                {(footer?.navigation.company ?? []).map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-tech-primary transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-sm font-semibold text-foreground mb-4">Soporte</h3>
              <ul className="space-y-3">
                {(footer?.navigation.support ?? []).map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-tech-primary transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-sm font-semibold text-foreground mb-4">Síguenos</h3>
              <div className="flex gap-3">
                {(footer?.socials ?? []).map((social) => {
                  const IconComponent = social.name === 'LinkedIn' ? Linkedin : social.name === 'Twitter' ? Twitter : Facebook;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-8 h-8 bg-tech-primary/10 rounded-lg flex items-center justify-center text-tech-primary hover:bg-tech-primary hover:text-white transition-colors"
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
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-border/10 py-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              {footer?.copyright}
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
