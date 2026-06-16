import { sleep } from "../../../../../../utils";
import type { OrderEntity, OrderEntityId, OrdersGateway } from "../../ordersRepository.types";
import { makeOrderEntitiesMock } from "./makeOrderEntitiesMock";

export class InMemoryOrdersService implements OrdersGateway {
  static instance: InMemoryOrdersService | null = null;
  static make(orders: OrderEntity[] = makeOrderEntitiesMock()): InMemoryOrdersService {
    if (InMemoryOrdersService.instance === null) {
      InMemoryOrdersService.instance = new InMemoryOrdersService(orders);
    }

    return InMemoryOrdersService.instance;
  }

  private orders = new Map<OrderEntityId, OrderEntity>();

  constructor(orders: OrderEntity[]) {
    this.setOrders(orders);
  }

  setOrders(orders: OrderEntity[]): void {
    orders.forEach((order) => this.orders.set(order.id, order));
  }

  async getOrders(): Promise<OrderEntity[]> {
    await sleep(1000);

    return Array.from(this.orders.values());
  }

  async deleteOrder(orderId: OrderEntityId): Promise<void> {
    await sleep(3000);

    if (!this.orders.has(orderId)) {
      throw new Error(`Order with id ${orderId} not found`);
    }
    this.orders.delete(orderId);
  }

  async deleteItem(orderId: OrderEntityId, itemId: string): Promise<void> {
    await sleep(2000);

    const order = this.orders.get(orderId);

    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }

    this.orders.set(orderId, {
      ...order,
      itemEntities: order.itemEntities.filter((item) => item.id !== itemId),
    });
  }
}
