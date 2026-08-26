import { Router } from 'express'
import { authenticateRoutes } from './authenticate-routes.ts'
import { usersRoutes } from './users-routes.ts'

const router = Router()

router.use('/users', usersRoutes)
router.use('/session', authenticateRoutes)

export { router }
