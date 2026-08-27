export interface Event {
  id: string
  organizerId: string
  title: string
  description: string | null
  dateTime: Date
  location: string
  bannerUrl: string | null
  capacity: number
  price: number
  eventProvider: string | null
  externalId: string | null
  createdAt: Date
}

export interface CreateEventData {
  organizerId: string
  title: string
  description?: string | null
  dateTime: Date
  location: string
  bannerUrl?: string | null
  capacity: number
  price: number
  eventProvider: string | null
  externalId: string | null
}

export interface EventsRepository {
  findById(id: string): Promise<Event | null>
  findByOrganizerId(organizerId: string): Promise<Event[] | null>
  findAll(): Promise<Event[] | null>
  create(data: CreateEventData): Promise<void>
}
