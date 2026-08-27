import { DrizzleTicketsRepository } from '../../repositories/drizzle/drizzle-tickets-repository.ts'
import { GetSharedTicketUseCase } from '../tickets/get-shared-ticket.ts'

export function makeGetSharedTicketUseCase() {
  const ticketsRepository = new DrizzleTicketsRepository()

  return new GetSharedTicketUseCase(ticketsRepository)
}
