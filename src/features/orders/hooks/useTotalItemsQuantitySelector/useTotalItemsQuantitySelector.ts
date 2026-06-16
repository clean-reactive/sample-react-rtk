import type { OrderEntity } from "../../repositories";
import { useOrdersSelector } from "../useOrdersSelector";

export const useTotalItemsQuantitySelector = (): number => {
  const data = useOrdersSelector();
  return select(data);
};

export const select = (orders: OrderEntity[]): number => {
  return orders.reduce(
    (acc, entity) =>
      acc + entity.itemEntities.reduce((itemAcc, item) => itemAcc + item.quantity, 0),
    0,
  );
};
