import { TmdbMoviesRepository } from '../../repositories/tmdb/tmdb-movies-repository.ts'
import { GetNowPlayingMoviesUseCase } from '../movies/get-now-playing-movies.ts'

export function makeGetNowPlayingMoviesUseCase() {
  const moviesRepository = new TmdbMoviesRepository()

  return new GetNowPlayingMoviesUseCase(moviesRepository)
}
