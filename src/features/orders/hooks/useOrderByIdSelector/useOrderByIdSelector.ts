import type { OrderEntity, OrderEntityId } from "../../repositories";
import { useOrdersSelector } from "../useOrdersSelector";

export const useOrderByIdSelector = (orderId: OrderEntityId): OrderEntity | undefined => {
  const data = useOrdersSelector();

  return data.find((orderEntity) => orderEntity.id === orderId);
};
