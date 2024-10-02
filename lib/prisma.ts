import ws from 'ws'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'

const prismaClientSingleton = () => {
  neonConfig.webSocketConstructor = ws
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
  return new PrismaClient({
    adapter: new PrismaNeon(pool),
    // log: ['query'],
  })
}

// Update the global declaration
declare global {
  var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined
}

// Use a fallback for globalThis if it's not available
const globalObj: typeof globalThis =
  typeof globalThis !== 'undefined' ? globalThis : global

export const prisma = globalObj.prismaGlobal || prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalObj.prismaGlobal = prisma
