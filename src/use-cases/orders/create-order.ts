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

    const validSeatIds = seatIds ?? []

    if (validSeatIds.length === 0) {
      throw new AppError('At least one seat must be provided', 400)
    }

    for (const selectedSeatId of validSeatIds) {
      const seat = await this.seatsRepository.findById(selectedSeatId)

      if (!seat) {
        throw new AppError(`Seat not found: ${selectedSeatId}`, 404)
      }

      if (seat.eventId !== eventId) {
        throw new AppError(
          `Seat ${selectedSeatId} does not belong to this event`,
          400
        )
      }

      if (seat.status !== 'AVAILABLE') {
        throw new AppError(`Seat ${selectedSeatId} is not available`, 409)
      }
    }

    for (const selectedSeatId of validSeatIds) {
      await this.seatsRepository.updateStatusById(selectedSeatId, 'RESERVED')
    }

    return await this.ordersRepository.create({
      userId,
      totalAmount,
      eventId,
    })
  }
}
