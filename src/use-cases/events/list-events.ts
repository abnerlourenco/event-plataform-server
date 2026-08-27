import type {
  Event,
  EventsRepository,
} from '../../repositories/events-repository.ts'

export class ListEventsUseCase {
  private readonly eventsRepository: EventsRepository

  constructor(eventsRepository: EventsRepository) {
    this.eventsRepository = eventsRepository
  }

  async execute(): Promise<Event[]> {
    const events = await this.eventsRepository.findAll()

    return events ?? []
  }
}
