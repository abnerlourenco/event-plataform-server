export type SeatStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD'

export interface Seat {
  id: string
  eventId: string
  status: SeatStatus
  seatNumber: string
}

export interface CreateSeatData {
  eventId: string
  seatnumber: string
}

export interface SeatsRepository {
  create(data: CreateSeatData): Promise<void>
  findByEventId(eventId: string): Promise<Seat[] | null>
}
