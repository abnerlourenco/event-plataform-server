import { Router } from 'express'
import { createOrder } from '../controllers/orders/create.ts'
import { updateOrderStatus } from '../controllers/orders/update-status.ts'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated.ts'

const ordersRoutes = Router()

ordersRoutes.use(ensureAuthenticated)
ordersRoutes.post('/', createOrder)
ordersRoutes.patch('/:orderId/status', updateOrderStatus)

export { ordersRoutes }
