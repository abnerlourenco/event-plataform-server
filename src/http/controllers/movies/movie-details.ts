import type { Request, Response } from 'express'
import { z } from 'zod'
import { makeGetMovieByIdUseCase } from '../../../use-cases/factories/make-get-movie-by-id-use-case.ts'

export async function getMovieById(request: Request, response: Response) {
  const { movieId } = z
    .object({
      movieId: z.coerce.number().int().positive(),
    })
    .parse(request.params)

  const getMovieByIdUseCase = makeGetMovieByIdUseCase()
  const movie = await getMovieByIdUseCase.execute(movieId)

  return response.status(200).json(movie)
}