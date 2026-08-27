import { Router } from 'express'
import { getSharedTicket } from '../controllers/tickets/get-shared.ts'
import { validateTicket } from '../controllers/tickets/validate.ts'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated.ts'
import { ensureGatekeeper } from '../middlewares/ensure-gatekeeper.ts'

const ticketsRoutes = Router()

ticketsRoutes.get('/:ticketId', getSharedTicket)
ticketsRoutes.post(
  '/validate',
  ensureAuthenticated,
  ensureGatekeeper,
  validateTicket
)

export { ticketsRoutes }
