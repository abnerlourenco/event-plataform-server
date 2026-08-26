import type { Request, Response } from 'express'
import { z } from 'zod'
import { makeDiscoverMoviesUseCase } from '../../../use-cases/factories/make-discover-movies-use-case.ts'

const discoverMoviesQuerySchema = z.object({
  genre: z.coerce.number().int().positive().optional(),
  year: z.coerce.number().int().min(1888).max(2100).optional(),
  page: z.coerce.number().int().min(1).max(500).default(1),
})

export async function discoverMovies(request: Request, response: Response) {
  const { genre, year, page } = discoverMoviesQuerySchema.parse(request.query)

  const discoverMoviesUseCase = makeDiscoverMoviesUseCase()
  const result = await discoverMoviesUseCase.execute({ genre, year, page })

  return response.status(200).json(result)
}
