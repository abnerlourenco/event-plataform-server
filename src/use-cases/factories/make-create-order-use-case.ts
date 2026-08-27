import { DrizzleOrdersRepository } from '../../repositories/drizzle/drizzle-orders-repository.ts'
import { DrizzleSeatsRepository } from '../../repositories/drizzle/drizzle-seats-repository.ts'
import { CreateOrderUseCase } from '../orders/create-order.ts'

export function makeCreateOrderUseCase() {
  const ordersRepository = new DrizzleOrdersRepository()
  const seatsRepository = new DrizzleSeatsRepository()

  return new CreateOrderUseCase(ordersRepository, seatsRepository)
}
