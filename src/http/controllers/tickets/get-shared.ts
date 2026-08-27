import type { Request, Response } from 'express'
import { z } from 'zod'
import { makeGetSharedTicketUseCase } from '../../../use-cases/factories/make-get-shared-ticket-use-case.ts'

export async function getSharedTicket(request: Request, response: Response) {
  const { ticketId } = z.object({ ticketId: z.uuid() }).parse(request.params)

  const getSharedTicketUseCase = makeGetSharedTicketUseCase()
  const ticket = await getSharedTicketUseCase.execute(ticketId)

  return response.status(200).json(ticket)
}
