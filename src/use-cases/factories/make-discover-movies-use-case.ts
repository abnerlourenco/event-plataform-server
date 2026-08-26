import { TmdbMoviesRepository } from '../../repositories/tmdb/tmdb-movies-repository.ts'
import { DiscoverMoviesUseCase } from '../movies/discover-movies.ts'

export function makeDiscoverMoviesUseCase() {
  const moviesRepository = new TmdbMoviesRepository()

  return new DiscoverMoviesUseCase(moviesRepository)
}
