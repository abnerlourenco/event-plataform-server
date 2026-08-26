import { TmdbMoviesRepository } from '../../repositories/tmdb/tmdb-movies-repository.ts'
import { GetPopularMoviesUseCase } from '../movies/get-popular-movies.ts'

export function makeGetPopularMoviesUseCase() {
  const moviesRepository = new TmdbMoviesRepository()

  return new GetPopularMoviesUseCase(moviesRepository)
}
