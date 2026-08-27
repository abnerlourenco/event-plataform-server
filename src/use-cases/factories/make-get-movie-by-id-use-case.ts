import { TmdbMoviesRepository } from '../../repositories/tmdb/tmdb-movies-repository.ts'
import { GetMovieByIdUseCase } from '../movies/get-movie-by-id.ts'

export function makeGetMovieByIdUseCase() {
  const moviesRepository = new TmdbMoviesRepository()

  return new GetMovieByIdUseCase(moviesRepository)
}
