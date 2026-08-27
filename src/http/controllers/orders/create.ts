import type { Request, Response } from 'express'
import { z } from 'zod'
import { makeCreateOrderUseCase } from '../../../use-cases/factories/make-create-order-use-case.ts'

const createOrderBodySchema = z.object({
  eventId: z.uuid(),
  totalAmount: z.coerce.number().nonnegative(),
  seatIds: z.array(z.uuid()).min(1),
})

export async function createOrder(request: Request, response: Response) {
  const { eventId, totalAmount, seatIds } = createOrderBodySchema.parse(
    request.body
  )

  const createOrderUseCase = makeCreateOrderUseCase()

  const order = await createOrderUseCase.execute({
    userId: request.user.id,
    eventId,
    totalAmount,
    seatIds,
  })

  return response.status(201).json(order)
}
