import { env } from '../../env.ts'
import { AppError } from '../../use-cases/errors/app-error.ts'
import type {
  DiscoverMoviesFilters,
  Movie,
  MoviesRepository,
  MoviesSearchResult,
} from '../movies-repository.ts'

interface TmdbMoviesResponse {
  page: number
  total_pages: number
  total_results: number
  results: Array<{
    id: number
    title: string
    original_title: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    release_date: string
    genre_ids: number[]
  }>
}

export class TmdbMoviesRepository implements MoviesRepository {
  async findById(id: number): Promise<Movie> {
    const result = await this.requestMovie(`/movie/${id}`)

    return {
      id: result.id,
      title: result.title,
      originalTitle: result.original_title,
      overview: result.overview,
      posterPath: result.poster_path,
      backdropPath: result.backdrop_path,
      releaseDate: result.release_date,
    }
  }

  async findNowPlaying(page: number): Promise<MoviesSearchResult> {
    return await this.requestMovies('/movie/now_playing', {
      page: String(page),
    })
  }

  async findPopular(page: number): Promise<MoviesSearchResult> {
    return await this.requestMovies('/movie/popular', { page: String(page) })
  }

  async findUpcoming(page: number): Promise<MoviesSearchResult> {
    return await this.requestMovies('/movie/upcoming', { page: String(page) })
  }

  async discover({
    genre,
    year,
    page,
  }: DiscoverMoviesFilters): Promise<MoviesSearchResult> {
    const query: Record<string, string> = { page: String(page) }

    if (genre) {
      query.with_genres = String(genre)
    }

    if (year) {
      query.primary_release_year = String(year)
    }

    return await this.requestMovies('/discover/movie', query)
  }

  private async requestMovies(
    path: string,
    query: Record<string, string>
  ): Promise<MoviesSearchResult> {
    const url = new URL(`https://api.themoviedb.org/3${path}`)

    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, value)
    }

    let response: Response

    try {
      response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${env.TMDB_API_TOKEN}`,
          accept: 'application/json',
        },
      })
    } catch {
      throw new AppError('Unable to reach TMDB', 502)
    }

    if (!response.ok) {
      throw new AppError('Unable to retrieve movies from TMDB', 502)
    }

    const result = (await response.json()) as TmdbMoviesResponse
    return {
      movies: result.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        originalTitle: movie.original_title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        releaseDate: movie.release_date,
      })),
      page: result.page,
      totalPages: result.total_pages,
      totalResults: result.total_results,
    }
  }

  private async requestMovie(path: string): Promise<TmdbMovieResponse> {
    const url = new URL(`https://api.themoviedb.org/3${path}`)

    let response: Response

    try {
      response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${env.TMDB_API_TOKEN}`,
          accept: 'application/json',
        },
      })
    } catch {
      throw new AppError('Unable to reach TMDB', 502)
    }

    if (response.status === 404) {
      throw new AppError('Movie not found', 404)
    }

    if (!response.ok) {
      throw new AppError('Unable to retrieve movie from TMDB', 502)
    }

    return (await response.json()) as TmdbMovieResponse
  }
}

interface TmdbMovieResponse {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
}
