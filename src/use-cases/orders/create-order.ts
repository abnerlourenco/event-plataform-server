import type {
  Order,
  OrdersRepository,
} from '../../repositories/orders-repository.ts'
import type { SeatsRepository } from '../../repositories/seats-repository.ts'
import { AppError } from '../errors/app-error.ts'

interface CreateOrderRequest {
  userId: string
  eventId: string
  totalAmount: number
  seatIds: string[]
}

export class CreateOrderUseCase {
  private readonly ordersRepository: OrdersRepository
  private readonly seatsRepository: SeatsRepository

  constructor(
    ordersRepository: OrdersRepository,
    seatsRepository: SeatsRepository
  ) {
    this.ordersRepository = ordersRepository
    this.seatsRepository = seatsRepository
  }

  async execute({
    userId,
    eventId,
    totalAmount,
    seatIds,
  }: CreateOrderRequest): Promise<Order> {
    if (totalAmount < 0) {
      throw new AppError('Total amount cannot be negative', 400)
    }

    if (seatIds.length === 0) {
      throw new AppError('At least one seat must be provided', 400)
    }

    await Promise.all(
      seatIds.map(async seatId => {
        const existingSeat = await this.seatsRepository.findById(seatId)

        if (!existingSeat) {
          throw new AppError(`Seat not found: ${seatId}`, 404)
        }

        if (existingSeat.eventId !== eventId) {
          throw new AppError(
            `Seat ${seatId} does not belong to this event`,
            400
          )
        }

        if (existingSeat.status !== 'AVAILABLE') {
          throw new AppError(`Seat ${seatId} is not available`, 409)
        }
      })
    )

    const order = await this.ordersRepository.create({
      userId,
      totalAmount,
      eventId,
      seatIds,
    })

    return order
  }
}
