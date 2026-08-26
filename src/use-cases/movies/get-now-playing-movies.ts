import type {
  MoviesRepository,
  MoviesSearchResult,
} from '../../repositories/movies-repository.ts'

export class GetNowPlayingMoviesUseCase {
  private readonly moviesRepository: MoviesRepository

  constructor(moviesRepository: MoviesRepository) {
    this.moviesRepository = moviesRepository
  }

  async execute(page: number): Promise<MoviesSearchResult> {
    return await this.moviesRepository.findNowPlaying(page)
  }
}
