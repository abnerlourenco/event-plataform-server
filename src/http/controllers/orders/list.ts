import type { Request, Response } from 'express'
import { makeListOrdersUseCase } from '../../../use-cases/factories/make-list-orders-use-case.ts'

export async function listOrders(request: Request, response: Response) {
  const listOrdersUseCase = makeListOrdersUseCase()
  const orders = await listOrdersUseCase.execute(request.user.id)

  return response.status(200).json(orders)
}
