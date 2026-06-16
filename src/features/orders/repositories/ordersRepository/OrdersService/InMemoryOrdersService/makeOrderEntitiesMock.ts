import { factoryT, fields } from "factory-t";
import type {
  OrderEntity,
  OrderEntityId,
  ItemEntity,
  ItemEntityId,
} from "../../ordersRepository.types";
import { randomFrom1To100 } from "../../../../../../utils/testing";

export const itemEntityFactory = factoryT<ItemEntity>({
  id: (ctx) => `${ctx.index}` as ItemEntityId,
  productId: fields.sequence(
    randomFrom1To100.slice(randomFrom1To100.length / 2).map((v) => v.toString()),
  ),
  quantity: fields.sequence(randomFrom1To100),
});

export const orderEntityFactory = factoryT<OrderEntity>({
  id: (ctx) => `${ctx.index}` as OrderEntityId,
  userId: fields.sequence(randomFrom1To100.map((n) => n.toString())),
  itemEntities: [],
});

export const makeOrderEntitiesMock = (
  ordersCount: number = 5,
  itemsCount: number = 7,
): OrderEntity[] => {
  let orders: OrderEntity[] = [];

  for (let i = 0; i < ordersCount; i++) {
    const item = orderEntityFactory.item({
      itemEntities: itemEntityFactory.list({ count: itemsCount }),
    });
    orders = [...orders, item];
  }

  return orders;
};
