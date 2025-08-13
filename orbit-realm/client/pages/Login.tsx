import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch CSRF token required by Auth.js REST endpoints
    fetch("/api/auth/csrf", { credentials: "include" }).then(async (res) => {
      try {
        const data = await res.json();
        const token = (data?.csrfToken && typeof data.csrfToken === "object")
          ? data.csrfToken?.value
          : data?.csrfToken;
        setCsrfToken(token ?? "");
      } catch {
        // ignore
      }
    });
    // Read error from URL (e.g. ?error=CredentialsSignin)
    const usp = new URLSearchParams(window.location.search);
    const err = usp.get("error");
    if (err) setError("Credenciales inválidas");
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
  // submit credentials
    
    try {
      const formData = new URLSearchParams({
        csrfToken,
        callbackUrl: "/admin",
        username,
        password,
        json: "true",
        redirect: "false",
      });
      
      
    let res = await fetch("/api/auth/callback/credentials?json=true&redirect=false", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json, text/plain, */*",
        },
        credentials: "include",
        body: formData.toString(),
      });

      

      // If server responded with a redirect, do NOT navigate.
      // Instead parse potential error from the Location header and show it inline.
      if (res.status >= 300 && res.status < 400) {
        const loc = res.headers.get("location") || "";
        console.log("↩️ LOGIN REDIRECT BLOCKED - Location:", loc);
        const q = loc.includes("?") ? loc.split("?")[1] : "";
        const params = new URLSearchParams(q);
        const err = params.get("error");
        if (err) {
          setError("Credenciales inválidas");
          setUsername("");
          setPassword("");
          setLoading(false);
          return;
        }
        // No error param. Continue to try to parse body/handle as normal without redirecting.
      }

      let data: any = null;
  const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        try {
          data = await res.json();
          
        } catch {
          data = null;
        }
      }

      // Early error handling from Auth.js (some adapters return 200 with an error payload)
      if (data?.error || res.status === 401) {
        console.log("❌ LOGIN FAILED - Error en respuesta:", data?.error || "401");
        setError("Credenciales inválidas");
        setUsername("");
        setPassword("");
        setLoading(false);
        return;
      }

      // Success path: Auth.js returns a URL to navigate to
      if (res.ok && data?.url) {
        console.log("✅ LOGIN SUCCESS - Redirigiendo a:", data.url);
        window.location.href = data.url || "/admin";
        return;
      }

      // Fallback: if status is OK and no error/URL, verify session and then redirect
      if (res.ok && !data?.error) {
        try {
          const sres = await fetch("/api/auth/session", { credentials: "include" });
          const sdata = await sres.json();
          if (sres.ok && sdata?.user) {
            
            window.location.href = "/admin";
            return;
          }
        } catch (e) {
          
        }
      }

      // Error path: show message
      if (res.status >= 400) {
        
        setError(res.status === 401 ? "Credenciales inválidas" : "No se pudo iniciar sesión. Intenta de nuevo.");
        setUsername("");
        setPassword("");
      } else {
        // Retry once on possible CSRF mismatch (400) by refreshing token
        if (res.status === 400) {
          try {
            const r = await fetch("/api/auth/csrf", { credentials: "include" });
            const dj = await r.json();
            const newToken = (dj?.csrfToken && typeof dj.csrfToken === "object") ? dj.csrfToken?.value : dj?.csrfToken;
            if (newToken) {
              const retryBody = new URLSearchParams({
                csrfToken: String(newToken),
                callbackUrl: "/admin",
                username,
                password,
                json: "true",
              }).toString();
              res = await fetch("/api/auth/callback/credentials?json=true&redirect=false", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  Accept: "application/json, text/plain, */*",
                },
                credentials: "include",
                body: retryBody,
              });
              const ct2 = res.headers.get("content-type") || "";
              if (ct2.includes("application/json")) {
                try { data = await res.json(); } catch { data = null; }
              }
              if (data?.error || res.status === 401) {
                setError("Credenciales inválidas");
                setUsername("");
                setPassword("");
                setLoading(false);
                return;
              }
              if (res.ok && data?.url) {
                window.location.href = data.url || "/admin";
                return;
              }
              if (res.ok && !data?.error) {
                try {
                  const sres = await fetch("/api/auth/session", { credentials: "include" });
                  const sdata = await sres.json();
                  if (sres.ok && sdata?.user) {
                    window.location.href = "/admin";
                    return;
                  }
                } catch {}
              }
            }
          } catch {}
        }
        
        setError("No se pudo iniciar sesión. Intenta de nuevo.");
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      
      setError("Error de red. Intenta de nuevo.");
      setUsername("");
      setPassword("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <input type="hidden" name="csrfToken" value={csrfToken} />
            <div className="space-y-2">
              <label className="text-sm font-medium">Usuario</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Contraseña</label>
              <Input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin"
                required
              />
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <Button type="submit" className="w-full" disabled={!csrfToken || loading}>
              {loading ? "Entrando…" : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
