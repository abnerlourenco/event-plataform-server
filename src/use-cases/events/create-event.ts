import type { EventsRepository } from '../../repositories/events-repository.ts'
import type { SeatsRepository } from '../../repositories/seats-repository.ts'
import { AppError } from '../errors/app-error.ts'

export const EVENT_CAPACITY = 48
const SEAT_ROWS = ['A', 'B', 'C', 'D', 'E', 'F']
const SEATS_PER_ROW = 8

interface CreateEventRequest {
  organizerId: string
  title: string
  description?: string | null
  dateTime: Date
  location: string
  bannerUrl?: string | null
  capacity?: number
  price: number
  eventProvider: string | null
  externalId: string | null
}

export class CreateEventUseCase {
  private readonly eventsRepository: EventsRepository
  private readonly seatsRepository: SeatsRepository

  constructor(
    eventsRepository: EventsRepository,
    seatsRepository: SeatsRepository
  ) {
    this.eventsRepository = eventsRepository
    this.seatsRepository = seatsRepository
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
  }: CreateEventRequest): Promise<void> {
    if (!title.trim() || !location.trim()) {
      throw new AppError('Title and location are required', 400)
    }

    if (!dateTime) {
      throw new AppError('Event date/time is required', 400)
    }

    if (capacity !== EVENT_CAPACITY) {
      throw new AppError(
        `Event capacity must be exactly ${EVENT_CAPACITY} seats`,
        400
      )
    }

    if (price < 0) {
      throw new AppError('Event price cannot be negative', 400)
    }

    const event = await this.eventsRepository.create({
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
    })

    for (const row of SEAT_ROWS) {
      for (let seatNumber = 1; seatNumber <= SEATS_PER_ROW; seatNumber++) {
        await this.seatsRepository.create({
          eventId: event.id,
          seatnumber: `${row}${seatNumber}`,
        })
      }
    }
  }
}
