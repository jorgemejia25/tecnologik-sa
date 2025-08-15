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

export default function Footer() {
  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Facebook', icon: Facebook, href: '#' }
  ];

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
                  <span className="text-white font-bold">T</span>
                </div>
                <span className="text-xl font-bold text-foreground">Tecnologik S.A.</span>
              </Link>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Transformamos la infraestructura tecnológica de tu empresa con soluciones
                integrales que impulsan el crecimiento sostenible y la eficiencia operacional.
              </p>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-tech-primary flex-shrink-0" />
                  <a href="mailto:info@tecnologik.net" className="text-muted-foreground hover:text-tech-primary transition-colors">
                    info@tecnologik.net
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-4 h-4 flex-shrink-0"></span>
                  <a href="https://www.tecnologik.net" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-tech-primary transition-colors">
                    www.tecnologik.net
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
                <div>+(502) 2372-2114</div>
                <div>+(502) 2372-2115</div>
                <div>+(502) 4770-1350</div>
                <div>+(502) 5590-6934</div>
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
              <div className="text-sm text-muted-foreground mb-8 leading-relaxed">
                <div>Diagonal 6 12-42 zona 10</div>
                <div>Edificio Design Center</div>
                <div>Torre 1 Oficina 402</div>
                <div className="font-medium text-foreground mt-2">Ciudad de Guatemala</div>
              </div>

              <h4 className="font-semibold text-foreground mb-4">Síguenos</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
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
              © 2024 Tecnologik S.A. Todos los derechos reservados.
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
