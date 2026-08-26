export type TicketStatus = 'VALID' | 'USED' | 'CANCELLED'

export interface Ticket {
  id: string
  orderId: string
  eventId: string
  hashCode: string
  qrCodeUrl: string
  status: TicketStatus
  seatId: string
  validatedAt: Date
}

export interface CreateTicketData {
  orderId: string
  eventId: string
  seatId: string
}

export interface TicketsRepository {
  findById(id: string): Promise<Ticket | null>
  create(data: CreateTicketData): Promise<void>
}
