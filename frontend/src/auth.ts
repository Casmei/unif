import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
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

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
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
