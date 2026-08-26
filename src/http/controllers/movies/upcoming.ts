import type { Request, Response } from 'express'
import { z } from 'zod'
import { makeGetUpcomingMoviesUseCase } from '../../../use-cases/factories/make-get-upcoming-movies-use-case.ts'

const pageQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(500).default(1),
})

export async function getUpcomingMovies(request: Request, response: Response) {
  const { page } = pageQuerySchema.parse(request.query)
  const getUpcomingMoviesUseCase = makeGetUpcomingMoviesUseCase()
  const result = await getUpcomingMoviesUseCase.execute(page)

  return response.status(200).json(result)
}
