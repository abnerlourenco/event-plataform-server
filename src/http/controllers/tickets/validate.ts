import type { Request, Response } from 'express'
import { z } from 'zod'
import { makeValidateTicketUseCase } from '../../../use-cases/factories/make-validate-ticket-use-case.ts'

const validateTicketBodySchema = z
  .object({
    eventId: z.uuid(),
    hashCode: z
      .string()
      .regex(/^[A-Z0-9]{8}$/)
      .optional(),
    qrCode: z.string().min(1).optional(),
  })
  .refine(data => data.hashCode || data.qrCode, {
    message: 'Hash code or QR Code is required',
    path: ['hashCode'],
  })

export async function validateTicket(request: Request, response: Response) {
  const { eventId, hashCode, qrCode } = validateTicketBodySchema.parse(
    request.body
  )
  const validateTicketUseCase = makeValidateTicketUseCase()

  const result = await validateTicketUseCase.execute({
    eventId,
    hashCode,
    qrCode,
    validatedBy: request.user.id,
  })

  return response.status(200).json(result)
}
