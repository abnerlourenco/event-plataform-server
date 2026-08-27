import { DrizzleEventsRepository } from '../../repositories/drizzle/drizzle-events-repository.ts'
import { ListEventsUseCase } from '../events/list-events.ts'

export function makeListEventsUseCase() {
  const eventsRepository = new DrizzleEventsRepository()

  return new ListEventsUseCase(eventsRepository)
}
