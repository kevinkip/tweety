import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

// hack for next.js hot reloading.
// nextjs can hot reload and create a bunch of Prisma Client instances
// and then just stop working.

//helps it by saving it in globalThis var which isn't affected by hot reload
const client = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;

