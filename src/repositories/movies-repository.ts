export interface Movie {
  id: number
  title: string
  originalTitle: string
  overview: string
  posterPath: string | null
  backdropPath: string | null
  releaseDate: string
}

export interface DiscoverMoviesFilters {
  genre?: number
  year?: number
  page: number
}

export interface MoviesSearchResult {
  movies: Movie[]
  page: number
  totalPages: number
  totalResults: number
}

export interface MoviesRepository {
  findNowPlaying(page: number): Promise<MoviesSearchResult>
  findPopular(page: number): Promise<MoviesSearchResult>
  findUpcoming(page: number): Promise<MoviesSearchResult>
  discover(filters: DiscoverMoviesFilters): Promise<MoviesSearchResult>
}
