import { useEffect, useState } from 'react';
import type { SiteContent } from '@shared/content';

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/content');
        if (!res.ok) throw new Error('Error al cargar contenido');
        const data = await res.json();
        if (!cancelled) setContent(data);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Error desconocido');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { content, loading, error };
}
