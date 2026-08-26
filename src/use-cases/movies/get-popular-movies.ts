import type {
  MoviesRepository,
  MoviesSearchResult,
} from '../../repositories/movies-repository.ts'

export class GetPopularMoviesUseCase {
  private readonly moviesRepository: MoviesRepository

  constructor(moviesRepository: MoviesRepository) {
    this.moviesRepository = moviesRepository
  }

  async execute(page: number): Promise<MoviesSearchResult> {
    return await this.moviesRepository.findPopular(page)
  }
}
