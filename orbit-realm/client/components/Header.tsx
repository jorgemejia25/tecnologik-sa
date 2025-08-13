import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Servicios', href: '#servicios' },
    { name: 'Metodología', href: '#metodologia' },
    { name: 'Certificaciones', href: '#certificaciones' },
    { name: 'Integraciones', href: '#integraciones' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 blur-bg border-b border-border/10 bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center flex-shrink-0"
          >
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="gradient-bg w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm sm:text-base">T</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-foreground truncate">Tecnologik</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="ml-10 flex items-baseline space-x-8"
            >
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="text-muted-foreground hover:text-tech-primary transition-colors duration-200 text-sm font-medium"
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block"
          >
            <Button
              className="gradient-bg text-white hover:shadow-lg hover:shadow-tech-primary/25 transition-all duration-300"
              size="sm"
            >
              Contactar
            </Button>
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.div
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`relative p-2 rounded-lg transition-all duration-300 ${
                  isMenuOpen
                    ? 'bg-tech-primary/10 text-tech-primary shadow-lg'
                    : 'text-foreground hover:bg-tech-primary/5'
                }`}
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-blue-200/30 mt-2 pt-6 pb-6 bg-gradient-to-b from-white/5 to-blue-50/10 rounded-b-xl"
          >
            <div className="flex flex-col space-y-1">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group relative px-4 py-3 text-muted-foreground hover:text-tech-primary transition-all duration-200 text-base font-medium rounded-lg hover:bg-tech-primary/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">{item.name}</span>
                  <motion.div
                    className="absolute inset-0 bg-tech-primary/5 rounded-lg opacity-0 group-hover:opacity-100"
                    initial={false}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="pt-4 px-4"
              >
                <Button
                  className="w-full gradient-bg text-white hover:shadow-lg hover:shadow-tech-primary/25 transition-all duration-300 py-3 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contactar
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
