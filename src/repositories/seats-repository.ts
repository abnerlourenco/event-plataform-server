export type SeatStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD'

export interface Seat {
  id: string
  eventId: string
  orderId: string | null
  status: SeatStatus
  seatNumber: string
}

export interface CreateSeatData {
  eventId: string
  seatnumber: string
}

export interface SeatsRepository {
  findById(id: string): Promise<Seat | null>
  create(data: CreateSeatData): Promise<void>
  findByEventId(eventId: string): Promise<Seat[] | null>
  findByOrderId(orderId: string): Promise<Seat[] | null>
  updateStatusById(id: string, status: SeatStatus): Promise<void>
  updateIdByIdAndEventId(
    id: string,
    eventId: string,
    orderId: string
  ): Promise<void>
  updateStatusByOrderId(orderId: string, status: SeatStatus): Promise<void>
}
