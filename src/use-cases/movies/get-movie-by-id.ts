import type {
  Movie,
  MoviesRepository,
} from '../../repositories/movies-repository.ts'

export class GetMovieByIdUseCase {
  private readonly moviesRepository: MoviesRepository

  constructor(moviesRepository: MoviesRepository) {
    this.moviesRepository = moviesRepository
  }

  async execute(id: number): Promise<Movie> {
    return await this.moviesRepository.findById(id)
  }
}
