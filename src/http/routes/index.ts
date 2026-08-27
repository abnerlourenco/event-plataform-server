import { Router } from 'express'
import { authenticateRoutes } from './authenticate-routes.ts'
import { eventsRoutes } from './events-routes.ts'
import { moviesRoutes } from './movies-routes.ts'
import { usersRoutes } from './users-routes.ts'

const router = Router()

router.use('/users', usersRoutes)
router.use('/session', authenticateRoutes)
router.use('/movies', moviesRoutes)
router.use('/events', eventsRoutes)

export { router }
