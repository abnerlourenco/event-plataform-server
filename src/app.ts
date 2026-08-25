import cors from 'cors'
import express from 'express'
import { errorHandler } from './http/middlewares/error-handler.ts'
import { router } from './http/routes/index.ts'

const app = express()

app.use(cors())

app.use(express.json())

app.use(router)

app.get('/health', (_request, response) => {
  return response.status(200).json({ message: 'OK' })
})

app.use(errorHandler)

export { app }
