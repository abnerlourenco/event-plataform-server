import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  POSTGRES_URL: z.string(),
  JWT_SECRET_TOKEN: z.string().min(32),
  TMDB_API_TOKEN: z.string().min(1),
})

export const env = envSchema.parse(process.env)
