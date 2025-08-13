/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Simple wrapper to obtain site content JSON (client-side usage)
// Returns any to avoid circular import of types; components merge with defaultContent
export async function fetchContent(): Promise<any> {
  const res = await fetch('/api/content', { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to load content');
  return res.json();
}
