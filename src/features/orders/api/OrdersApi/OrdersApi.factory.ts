import { factoryT, fields } from "factory-t";
import type { ApiOrderDto, ApiOrderItemDto } from "./OrdersApi.types";
import { randomFrom1To100 } from "../../../../utils/testing";

export const orderDtoFactory = factoryT<ApiOrderDto>({
  id: (ctx) => `${ctx.index}`,
  userId: fields.sequence(randomFrom1To100.map((n) => n.toString())),
  items: () => orderItemDtoFactory.list({ count: 3 }),
});

export const orderItemDtoFactory = factoryT<ApiOrderItemDto>({
  id: (ctx) => `${ctx.index}`,
  productId: fields.sequence(
    randomFrom1To100.slice(randomFrom1To100.length / 2).map((v) => v.toString()),
  ),
  quantity: fields.sequence(randomFrom1To100),
});
