import Credentials from "@auth/core/providers/credentials";
import type { ExpressAuthConfig } from "@auth/express";

// Minimal Credentials-only config validating username/password === admin/admin
export const authConfig: ExpressAuthConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET || "dev-secret-please-change-me-32-chars",
  session: { strategy: "jwt" },
  // You must set AUTH_SECRET in env for JWT/session encryption.
  // In dev, we can proceed without, but Auth.js will warn. Set one in .env if available.
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
  async authorize(credentials) {
  const usernameRaw = (credentials?.username as string) ?? "";
  const passwordRaw = (credentials?.password as string) ?? "";
  const username = usernameRaw.trim();
  const password = passwordRaw.trim();
  if (username === "admin" && password === "admin") {
          // Minimal user object. id is required for credentials
          return { id: "admin", name: "Admin", email: "admin@example.com", role: "admin" };
        }
        return null;
      },
    }),
  ],
  // After successful sign in, redirect to /admin
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist role from user into the token on sign in
      if (user) {
        (token as any).role = (user as any).role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      // Expose role on the client session
      if (!session.user) session.user = {} as any;
      (session.user as any).role = (token as any).role || "user";
      return session;
    },
    async redirect({ url, baseUrl }) {
      // When signing in via credentials, go to /admin by default
      try {
        const u = new URL(url, baseUrl);
        if (u.pathname.startsWith("/api/auth")) return baseUrl + "/admin";
      } catch {
        // ignore
      }
      if (url.startsWith("/")) return baseUrl + "/admin";
      return baseUrl + "/admin";
    },
  },
};
