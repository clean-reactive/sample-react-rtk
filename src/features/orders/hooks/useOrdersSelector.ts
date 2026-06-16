import { useGetOrdersQuery, type OrderEntity } from "../repositories";

const DEFAULT_ORDERS: OrderEntity[] = [];

export const useOrdersSelector = (): OrderEntity[] => {
  const { data } = useGetOrdersQuery();
  return data ?? DEFAULT_ORDERS;
};
