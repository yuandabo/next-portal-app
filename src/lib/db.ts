// # Prisma 客户端实例
import { PrismaClient } from "@prisma/client";

/**
 * 解决 Next.js 开发环境下 HMR 导致的 Prisma Client 多实例问题：
 * - 生产：单例，由 Vercel / Node 进程管理
 * - 开发：挂到 globalThis，避免每次热更新都 new PrismaClient()
 */
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const db =
  globalThis.prisma ??
  new PrismaClient({
    log: ["error", "warn"], // 开发可改为 ["query","info","warn","error"]
    // datasources: { db: { url: process.env.DATABASE_URL } }, // 若需重写
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

/**
 * 使用示例：
 *   const products = await db.product.findMany();
 */
