import { Router } from 'express'
import { createEvent } from '../controllers/events/create.ts'
import { listEvents } from '../controllers/events/list.ts'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated.ts'
import { ensureOrganizer } from '../middlewares/ensure-organizer.ts'

const eventsRoutes = Router()

eventsRoutes.get('/', ensureAuthenticated, ensureOrganizer, listEvents)
eventsRoutes.post('/', ensureAuthenticated, ensureOrganizer, createEvent)

export { eventsRoutes }
