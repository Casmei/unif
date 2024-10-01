import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
    token: string;
  }

  interface User extends DefaultSession["user"] {
    id: number;
    email_verified_at: Date | null;
    created_at: Date;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
    token: string;
  }
}
