import NextAuth from "next-auth";
import { authConfig } from "../../auth.config";

const nextAuth = NextAuth({ ...authConfig });

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = nextAuth;
