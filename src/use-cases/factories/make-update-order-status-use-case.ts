import { DrizzleOrdersRepository } from '../../repositories/drizzle/drizzle-orders-repository.ts'
import { DrizzleSeatsRepository } from '../../repositories/drizzle/drizzle-seats-repository.ts'
import { DrizzleTicketsRepository } from '../../repositories/drizzle/drizzle-tickets-repository.ts'
import { UpdateOrderStatusUseCase } from '../orders/update-order-status.ts'

export function makeUpdateOrderStatusUseCase() {
  const ordersRepository = new DrizzleOrdersRepository()
  const seatsRepository = new DrizzleSeatsRepository()
  const ticketsRepository = new DrizzleTicketsRepository()

  return new UpdateOrderStatusUseCase(
    ordersRepository,
    seatsRepository,
    ticketsRepository
  )
}
