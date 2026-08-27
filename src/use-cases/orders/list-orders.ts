import type {
  Order,
  OrdersRepository,
} from '../../repositories/orders-repository.ts'

export class ListOrdersUseCase {
  private readonly ordersRepository: OrdersRepository

  constructor(ordersRepository: OrdersRepository) {
    this.ordersRepository = ordersRepository
  }

  async execute(userId: string): Promise<Order[]> {
    return (await this.ordersRepository.findByUser(userId)) ?? []
  }
}
