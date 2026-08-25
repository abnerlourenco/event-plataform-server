import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../env.ts'

export const pg = postgres(env.POSTGRES_URL)

export const db = drizzle({ client: pg })
