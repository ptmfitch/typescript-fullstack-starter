import path from "path";

import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/** Resolve SQLite URL for Next.js (cwd) while keeping CLI-relative paths in .env. */
export function resolveSqliteDatabaseUrl(): string {
  const url = process.env.DATABASE_URL ?? "file:./dev.db";
  if (!url.startsWith("file:")) {
    return url;
  }
  if (url.startsWith("file:///")) {
    return url;
  }

  const relativePath = url.replace(/^file:(\.\/)?/, "");
  const absolutePath = path.resolve(process.cwd(), "prisma", relativePath);
  return `file:${absolutePath}`;
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({ datasourceUrl: resolveSqliteDatabaseUrl() });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
