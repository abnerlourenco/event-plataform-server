import { Router } from 'express'
import { createUser } from '../controllers/users/create.ts'

const usersRoutes = Router()

usersRoutes.post('/', createUser)

export { usersRoutes }
