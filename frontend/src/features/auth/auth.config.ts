import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const response = await fetch("http://0.0.0.0:8080/api/login", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-type": "application/json" },
          });

          const user = await response.json();

          if (user.token) {
            return { token: user.token, ...user.user };
          }

          console.log("RETORNOU NULL");

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async jwt({ token: initialToken, user }) {
      const token = initialToken as JWT;
      if (user) {
        token.user = user;
        token.token = user.token;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.token = token.token;

      return session;
    },
  },
});
