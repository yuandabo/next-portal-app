import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt", // 推荐使用 jwt
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("{ auth, request: { nextUrl } }", {
        auth,
        request: { nextUrl },
      });

      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
      },
      async authorize(credentials) {
        console.log("credentials", credentials);

        if (credentials?.username === "admin") {
          return { id: "1", name: "Admin User", email: "admin@example.com" };
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
