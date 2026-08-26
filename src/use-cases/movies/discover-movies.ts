import type {
  DiscoverMoviesFilters,
  MoviesRepository,
  MoviesSearchResult,
} from '../../repositories/movies-repository.ts'

export class DiscoverMoviesUseCase {
  private readonly moviesRepository: MoviesRepository

  constructor(moviesRepository: MoviesRepository) {
    this.moviesRepository = moviesRepository
  }

  async execute(filters: DiscoverMoviesFilters): Promise<MoviesSearchResult> {
    return await this.moviesRepository.discover(filters)
  }
}
