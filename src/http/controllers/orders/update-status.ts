import type { Request, Response } from 'express'
import { z } from 'zod'
import { makeUpdateOrderStatusUseCase } from '../../../use-cases/factories/make-update-order-status-use-case.ts'

const updateOrderStatusBodySchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'CANCELLED']),
})

export async function updateOrderStatus(request: Request, response: Response) {
  const { status } = updateOrderStatusBodySchema.parse(request.body)
  const { orderId } = z
    .object({
      orderId: z.uuid(),
    })
    .parse(request.params)

  const updateOrderStatusUseCase = makeUpdateOrderStatusUseCase()

  await updateOrderStatusUseCase.execute({
    userId: request.user.id,
    orderId,
    status,
  })

  return response.status(204).send()
}
