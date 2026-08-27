import type { TicketsRepository } from '../../repositories/tickets-repository.ts'
import { isValidTicketSignature } from '../../utils/ticket-security.ts'
import { AppError } from '../errors/app-error.ts'

interface ValidateTicketRequest {
  hashCode?: string
  qrCode?: string
  eventId: string
  validatedBy: string
}

interface TicketQrPayload {
  hashCode: string
  orderId: string
  eventId: string
  seatId: string
  signature: string
}

export class ValidateTicketUseCase {
  private readonly ticketsRepository: TicketsRepository

  constructor(ticketsRepository: TicketsRepository) {
    this.ticketsRepository = ticketsRepository
  }

  async execute({
    hashCode,
    qrCode,
    eventId,
    validatedBy,
  }: ValidateTicketRequest) {
    let ticketHash = hashCode
    let qrPayload: TicketQrPayload | undefined

    if (!ticketHash && qrCode) {
      try {
        qrPayload = JSON.parse(qrCode) as TicketQrPayload
        ticketHash = qrPayload.hashCode
      } catch {
        throw new AppError('Invalid QR Code', 400)
      }
    }

    if (!ticketHash) {
      throw new AppError('Hash code or QR Code is required', 400)
    }

    const ticket = await this.ticketsRepository.findByHashCode(ticketHash)

    if (!ticket) {
      throw new AppError('Ticket not found', 404)
    }

    if (ticket.eventId !== eventId) {
      throw new AppError('Ticket does not belong to this event', 403)
    }

    if (ticket.status === 'USED') {
      throw new AppError('Ticket already used', 409)
    }

    if (ticket.status !== 'VALID') {
      throw new AppError('Ticket is not valid', 409)
    }

    if (qrPayload) {
      const isValidSignature = isValidTicketSignature(
        qrPayload.signature,
        qrPayload.hashCode,
        qrPayload.orderId,
        qrPayload.eventId,
        qrPayload.seatId
      )

      if (
        !isValidSignature ||
        qrPayload.eventId !== ticket.eventId ||
        qrPayload.seatId !== ticket.seatId ||
        qrPayload.orderId !== ticket.orderId
      ) {
        throw new AppError('Invalid QR Code signature', 403)
      }
    }

    const markedAsUsed = await this.ticketsRepository.markAsUsed(
      ticket.id,
      validatedBy,
      new Date()
    )

    if (!markedAsUsed) {
      throw new AppError('Ticket already used', 409)
    }

    return { message: 'Ticket validated successfully' }
  }
}
