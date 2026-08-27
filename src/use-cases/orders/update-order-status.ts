import type {
  OrderStatus,
  OrdersRepository,
} from '../../repositories/orders-repository.ts'
import type { SeatsRepository } from '../../repositories/seats-repository.ts'
import type { TicketsRepository } from '../../repositories/tickets-repository.ts'
import { AppError } from '../errors/app-error.ts'

interface UpdateOrderStatusRequest {
  userId: string
  orderId: string
  status: OrderStatus
}

export class UpdateOrderStatusUseCase {
  private readonly ordersRepository: OrdersRepository
  private readonly seatsRepository: SeatsRepository
  private readonly ticketsRepository: TicketsRepository

  constructor(
    ordersRepository: OrdersRepository,
    seatsRepository: SeatsRepository,
    ticketsRepository: TicketsRepository
  ) {
    this.ordersRepository = ordersRepository
    this.seatsRepository = seatsRepository
    this.ticketsRepository = ticketsRepository
  }

  async execute({
    userId,
    orderId,
    status,
  }: UpdateOrderStatusRequest): Promise<void> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new AppError('Order not found', 404)
    }

    if (order.userId !== userId) {
      throw new AppError('You do not have permission to update this order', 403)
    }

    if (order.status === 'APPROVED' && status !== 'APPROVED') {
      throw new AppError('Approved orders cannot change status', 409)
    }

    if (status === 'APPROVED') {
      const seats = await this.seatsRepository.findByOrderId(order.id)
      await this.seatsRepository.updateStatusByOrderId(order.id, 'SOLD')

      for (const seat of seats ?? []) {
        await this.ticketsRepository.create({
          orderId: order.id,
          eventId: order.eventId,
          seatId: seat.id,
        })
      }
    }

    if (status === 'CANCELLED') {
      await this.seatsRepository.updateStatusByOrderId(order.id, 'AVAILABLE')
    }

    await this.ordersRepository.updateStatusById(order.id, status)
  }
}
