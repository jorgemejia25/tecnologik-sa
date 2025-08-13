import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import type { SiteContent } from '@shared/content';
import { defaultContent } from '@shared/content';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [header, setHeader] = useState(defaultContent.header);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    fetch('/api/content', { credentials: 'include' })
      .then(r => r.json())
      .then((data: SiteContent) => { if (data?.header) setHeader(data.header); })
      .catch(() => {});
    // Check session to decide if we show Sign out
    fetch('/api/auth/session', { credentials: 'include' })
      .then(r => r.json())
      .then((s) => setIsAuthed(Boolean(s?.user)))
      .catch(() => setIsAuthed(false));
  }, []);

  async function onSignOut() {
    try {
      const r = await fetch('/api/auth/csrf', { credentials: 'include' });
      const dj = await r.json();
      const token = (dj?.csrfToken && typeof dj.csrfToken === 'object') ? dj.csrfToken?.value : dj?.csrfToken;
      const body = new URLSearchParams({ csrfToken: String(token || ''), callbackUrl: '/login' }).toString();
      const res = await fetch('/api/auth/signout?callbackUrl=/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json, text/plain, */*' },
        credentials: 'include',
        body,
      });
      if (res.status >= 300 && res.status < 400) {
        const loc = res.headers.get('location') || '/login';
        window.location.href = loc;
        return;
      }
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        try {
          const data = await res.json();
          if (data?.url) {
            window.location.href = data.url;
            return;
          }
        } catch {}
      }
      window.location.href = '/login';
    } catch {
      window.location.href = '/login';
    }
  }

  return (
    <header className="fixed top-0 w-full z-50 blur-bg border-b border-border/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="gradient-bg w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">{header?.brandLetter}</span>
              </div>
              <span className="text-xl font-bold text-foreground">{header?.brandName}</span>
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
              {(header?.nav ?? []).map((item, index) => (
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
            <div className="flex items-center gap-3">
              <Button
                className="gradient-bg text-white hover:shadow-lg hover:shadow-tech-primary/25 transition-all duration-300"
                size="sm"
              >
                Contactar
              </Button>
              {isAuthed ? (
                <Button variant="outline" size="sm" onClick={onSignOut}>Cerrar sesión</Button>
              ) : (
                <Link to="/login" className="text-sm font-medium text-foreground hover:text-tech-primary">Iniciar sesión</Link>
              )}
            </div>
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/10 mt-2 pt-4 pb-6"
          >
            <div className="flex flex-col space-y-4">
              {(header?.nav ?? []).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-tech-primary transition-colors duration-200 text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button
                className="gradient-bg text-white hover:shadow-lg hover:shadow-tech-primary/25 transition-all duration-300 mt-4"
                size="sm"
              >
                Contactar
              </Button>
              {isAuthed ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setIsMenuOpen(false); onSignOut(); }}
                >
                  Cerrar sesión
                </Button>
              ) : (
                <Link
                  to="/login"
                  className="text-sm font-medium text-foreground hover:text-tech-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
