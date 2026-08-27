import { DrizzleTicketsRepository } from '../../repositories/drizzle/drizzle-tickets-repository.ts'
import { ValidateTicketUseCase } from '../tickets/validate-ticket.ts'

export function makeValidateTicketUseCase() {
  const ticketsRepository = new DrizzleTicketsRepository()

  return new ValidateTicketUseCase(ticketsRepository)
}
