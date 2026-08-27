import { DrizzleOrdersRepository } from '../../repositories/drizzle/drizzle-orders-repository.ts'
import { UpdateOrderStatusUseCase } from '../orders/update-order-status.ts'

export function makeUpdateOrderStatusUseCase() {
  const ordersRepository = new DrizzleOrdersRepository()

  return new UpdateOrderStatusUseCase(ordersRepository)
}
