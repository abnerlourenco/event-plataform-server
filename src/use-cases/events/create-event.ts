import type { EventsRepository } from '../../repositories/events-repository.ts'
import { AppError } from '../errors/app-error.ts'

interface CreateEventRequest {
  organizerId: string
  title: string
  description?: string | null
  dateTime: Date
  location: string
  bannerUrl?: string | null
  capacity: number
  price: number
  eventProvider?: string | null
  externalId?: string | null
  hasSeats?: boolean
}

export class CreateEventUseCase {
  private readonly eventsRepository: EventsRepository

  constructor(eventsRepository: EventsRepository) {
    this.eventsRepository = eventsRepository
  }

  async execute({
    organizerId,
    title,
    description,
    dateTime,
    location,
    bannerUrl,
    capacity,
    price,
    eventProvider,
    externalId,
    hasSeats,
  }: CreateEventRequest): Promise<void> {
    if (!title.trim() || !location.trim()) {
      throw new AppError('Title and location are required', 400)
    }

    if (!dateTime) {
      throw new AppError('Event date/time is required', 400)
    }

    if (!capacity || capacity <= 0) {
      throw new AppError('Event capacity must be greater than zero', 400)
    }

    if (price < 0) {
      throw new AppError('Event price cannot be negative', 400)
    }

    await this.eventsRepository.create({
      organizerId,
      title,
      description,
      dateTime,
      location,
      bannerUrl,
      capacity,
      price,
      eventProvider,
      externalId,
      hasSeats,
    })
  }
}
