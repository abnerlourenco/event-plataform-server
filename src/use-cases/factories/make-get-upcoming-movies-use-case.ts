import { TmdbMoviesRepository } from '../../repositories/tmdb/tmdb-movies-repository.ts'
import { GetUpcomingMoviesUseCase } from '../movies/get-upcoming-movies.ts'

export function makeGetUpcomingMoviesUseCase() {
  const moviesRepository = new TmdbMoviesRepository()

  return new GetUpcomingMoviesUseCase(moviesRepository)
}
