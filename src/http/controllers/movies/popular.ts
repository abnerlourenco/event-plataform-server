import type { Request, Response } from 'express'
import { z } from 'zod'
import { makeGetPopularMoviesUseCase } from '../../../use-cases/factories/make-get-popular-movies-use-case.ts'

const pageQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(500).default(1),
})

export async function getPopularMovies(request: Request, response: Response) {
  const { page } = pageQuerySchema.parse(request.query)
  const getPopularMoviesUseCase = makeGetPopularMoviesUseCase()
  const result = await getPopularMoviesUseCase.execute(page)

  return response.status(200).json(result)
}
