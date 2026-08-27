export type TicketStatus = 'VALID' | 'USED' | 'CANCELLED'

export interface Ticket {
  id: string
  orderId: string | null
  eventId: string
  hashCode: string | null
  qrCodeUrl: string | null
  status: TicketStatus
  seatId: string
  validatedAt: Date | null
  validatedBy: string | null
}

export interface CreateTicketData {
  orderId: string
  eventId: string
  seatId: string
}

export interface TicketsRepository {
  findById(id: string): Promise<Ticket | null>
  create(data: CreateTicketData): Promise<void>
  updateStatusbyId(id: string, status: TicketStatus): Promise<void>
}
