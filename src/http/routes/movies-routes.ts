import { Router } from 'express'
import { discoverMovies } from '../controllers/movies/discover.ts'
import { getMovieById } from '../controllers/movies/movie-details.ts'
import { getNowPlayingMovies } from '../controllers/movies/now-playing.ts'
import { getPopularMovies } from '../controllers/movies/popular.ts'
import { getUpcomingMovies } from '../controllers/movies/upcoming.ts'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated.ts'
import { ensureOrganizer } from '../middlewares/ensure-organizer.ts'

const moviesRoutes = Router()

moviesRoutes.get(
  '/now-playing',
  ensureAuthenticated,
  ensureOrganizer,
  getNowPlayingMovies
)
moviesRoutes.get(
  '/popular',
  ensureAuthenticated,
  ensureOrganizer,
  getPopularMovies
)
moviesRoutes.get(
  '/upcoming',
  ensureAuthenticated,
  ensureOrganizer,
  getUpcomingMovies
)
moviesRoutes.get(
  '/discover',
  ensureAuthenticated,
  ensureOrganizer,
  discoverMovies
)
moviesRoutes.get(
  '/:movieId',
  ensureAuthenticated,
  ensureOrganizer,
  getMovieById
)

export { moviesRoutes }
