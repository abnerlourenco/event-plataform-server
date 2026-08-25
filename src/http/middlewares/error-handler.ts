import type { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { AppError } from '../../use-cases/errors/app-error.ts'

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next
) => {
  if (error instanceof ZodError) {
    return response
      .status(400)
      .json({ message: 'Validation error', issues: error.issues })
  }

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message })
  }

  console.error(error)

  return response.status(500).json({ message: 'Internal server error' })
}
