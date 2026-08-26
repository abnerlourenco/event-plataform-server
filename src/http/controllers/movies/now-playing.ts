import type { Request, Response } from 'express'
import { z } from 'zod'
import { makeGetNowPlayingMoviesUseCase } from '../../../use-cases/factories/make-get-now-playing-movies-use-case.ts'

const pageQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(500).default(1),
})

export async function getNowPlayingMovies(
  request: Request,
  response: Response
) {
  const { page } = pageQuerySchema.parse(request.query)
  const getNowPlayingMoviesUseCase = makeGetNowPlayingMoviesUseCase()
  const result = await getNowPlayingMoviesUseCase.execute(page)

  return response.status(200).json(result)
}
