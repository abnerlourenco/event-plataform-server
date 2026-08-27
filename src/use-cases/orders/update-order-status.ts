import type {
  OrderStatus,
  OrdersRepository,
} from '../../repositories/orders-repository.ts'
import { AppError } from '../errors/app-error.ts'

interface UpdateOrderStatusRequest {
  userId: string
  orderId: string
  status: OrderStatus
}

export class UpdateOrderStatusUseCase {
  private readonly ordersRepository: OrdersRepository

  constructor(ordersRepository: OrdersRepository) {
    this.ordersRepository = ordersRepository
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

    await this.ordersRepository.updateStatusById(order.id, status)
  }
}
