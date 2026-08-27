import { DrizzleOrdersRepository } from '../../repositories/drizzle/drizzle-orders-repository.ts'
import { ListOrdersUseCase } from '../orders/list-orders.ts'

export function makeListOrdersUseCase() {
  const ordersRepository = new DrizzleOrdersRepository()

  return new ListOrdersUseCase(ordersRepository)
}
