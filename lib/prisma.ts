import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function parseDatabaseUrl(url: string) {
  // Parse: mysql://user:password@host:port/database
  const match = url.match(
    /mysql:\/\/([^:]+):([^@]*)@([^:]+):(\d+)\/(.+)/
  );
  if (!match) {
    throw new Error("Invalid DATABASE_URL format");
  }
  return {
    user: match[1],
    password: match[2],
    host: match[3],
    port: parseInt(match[4], 10),
    database: match[5],
  };
}

function createPrismaClient(): PrismaClient {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL environment variable is required");
  }

  const { host, port, user, password, database } = parseDatabaseUrl(dbUrl);

  const adapter = new PrismaMariaDb({
    host,
    port,
    user,
    password,
    database,
  });

  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
