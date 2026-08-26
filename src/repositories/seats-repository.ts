export type SeatStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD'

export interface Seat {
  id: string
  eventId: string
  status: SeatStatus
  seatNumber: number
}

export interface CreateSeatData {
  eventId: string
  seatnumber: number
}

export interface SeatsRepository {
  create(data: CreateSeatData): Promise<void>
  findByEventId(eventId: string): Promise<Seat[] | null>
}
