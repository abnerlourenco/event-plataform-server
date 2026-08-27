import { DrizzleEventsRepository } from '../../repositories/drizzle/drizzle-events-repository.ts'
import { DrizzleSeatsRepository } from '../../repositories/drizzle/drizzle-seats-repository.ts'
import { CreateEventUseCase } from '../events/create-event.ts'

export function makeCreateEventUseCase() {
  const eventsRepository = new DrizzleEventsRepository()
  const seatsRepository = new DrizzleSeatsRepository()

  return new CreateEventUseCase(eventsRepository, seatsRepository)
}
