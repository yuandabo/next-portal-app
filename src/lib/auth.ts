// src/lib/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;
        // ...验证逻辑
        // 示例: 查询用户并返回用户对象或null
        const user = await db.user.findUnique({
          where: { email },
        });
        if (user && user.password === password) {
          // 不要在生产环境中明文比较密码，应该使用哈希
          return user;
        }
        return null;
      },
    }),
  ],
});
