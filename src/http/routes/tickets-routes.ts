import { Router } from 'express'
import { getSharedTicket } from '../controllers/tickets/get-shared.ts'

const ticketsRoutes = Router()

ticketsRoutes.get('/:ticketId', getSharedTicket)

export { ticketsRoutes }
