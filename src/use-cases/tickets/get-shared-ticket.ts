import type {
  Ticket,
  TicketsRepository,
} from '../../repositories/tickets-repository.ts'
import { AppError } from '../errors/app-error.ts'

export class GetSharedTicketUseCase {
  private readonly ticketsRepository: TicketsRepository

  constructor(ticketsRepository: TicketsRepository) {
    this.ticketsRepository = ticketsRepository
  }

  async execute(ticketId: string): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findById(ticketId)

    if (!ticket) {
      throw new AppError('Ticket not found', 404)
    }

    return ticket
  }
}
