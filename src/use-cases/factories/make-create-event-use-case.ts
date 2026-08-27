import { DrizzleEventsRepository } from '../../repositories/drizzle/drizzle-events-repository.ts'
import { CreateEventUseCase } from '../events/create-event.ts'

export function makeCreateEventUseCase() {
  const eventsRepository = new DrizzleEventsRepository()

  return new CreateEventUseCase(eventsRepository)
}
