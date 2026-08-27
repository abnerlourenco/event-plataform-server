import cors from 'cors'
import express from 'express'
import { env } from './env.ts'
import { errorHandler } from './http/middlewares/error-handler.ts'
import { router } from './http/routes/index.ts'

const app = express()

const allowedOrigins = env.CORS_ORIGINS.split(',')
  .map(origin => origin.trim().replace(/\/$/, ''))
  .filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ''))) {
        callback(null, true)
        return
      }

      callback(null, false)
    },
  })
)

app.use(express.json())

app.use(router)

app.get('/health', (_request, response) => {
  return response.status(200).json({ message: 'OK' })
})

app.use(errorHandler)

export { app }
