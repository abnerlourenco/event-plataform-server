import { Router } from 'express'
import { authenticateUser } from '../controllers/users/authenticate-user.ts'

const authenticateRoutes = Router()

authenticateRoutes.post('/', authenticateUser)

export { authenticateRoutes }
