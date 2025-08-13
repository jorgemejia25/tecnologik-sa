import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [jsonText, setJsonText] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
  const res = await fetch("/api/auth/session", { credentials: "include" });
        if (!res.ok) throw new Error("session error");
  const data = await res.json();
  const role = data?.user?.role;
  if (data?.user && role === "admin") setAuthorized(true);
        else window.location.replace("/login");
        // Load current content
        try {
          const cres = await fetch("/api/content", { credentials: "include" });
          if (cres.ok) {
            const cjson = await cres.json();
            setJsonText(JSON.stringify(cjson, null, 2));
          }
        } catch {}
      } catch {
        window.location.replace("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-8">Cargando…</div>;
  if (!authorized) return null;

  async function save() {
    setSaveStatus("saving");
    setErrorMsg("");
    try {
      // Validate JSON first
      const parsed = JSON.parse(jsonText);
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(parsed),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Error al guardar");
      setSaveStatus("saved");
      // Optional: brief reset back to idle
      setTimeout(() => setSaveStatus("idle"), 1500);
    } catch (e: any) {
      setSaveStatus("error");
      setErrorMsg(e?.message || "Error inesperado");
    }
  }

  async function signOut() {
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
    <div className="p-8">
      <Card className="max-w-5xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Editor de contenido (JSON)</CardTitle>
            <Button variant="outline" onClick={signOut}>Cerrar sesión</Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Edita el JSON de la página de inicio. Cambios visibles al guardar y recargar "/".
          </p>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="w-full h-[480px] font-mono text-sm p-3 border rounded-md"
            spellCheck={false}
          />
          <div className="mt-4 flex items-center gap-3">
            <Button onClick={save} disabled={saveStatus === "saving"}>
              {saveStatus === "saving" ? "Guardando…" : "Guardar"}
            </Button>
            {saveStatus === "saved" && (
              <span className="text-green-600 text-sm">Guardado</span>
            )}
            {saveStatus === "error" && (
              <span className="text-red-600 text-sm">{errorMsg}</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Formato esperado mínimo: {"{ hero: { badge, title, highlight, subtitle, features, primaryCta, secondaryCta, stats } }"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
