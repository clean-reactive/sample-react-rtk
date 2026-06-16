import { QueryStatus } from "@reduxjs/toolkit/query/react";
import { useAppSelector } from "../../../../hooks";
import {
  useGetOrdersQuery,
  ordersRepository,
  deleteOrderCacheKey,
  deleteOrderItemCacheKey,
} from "../../repositories";

export const useIsOrdersProcessingSelector = (): boolean => {
  const { isLoading: isLoadingWhileGetOrders } = useGetOrdersQuery();
  const isDeletingOrder = useAppSelector((state) => {
    const mutations = state[ordersRepository.reducerPath].mutations ?? {};
    return Object.entries(mutations).some(
      ([key, m]) => key.startsWith(`${deleteOrderCacheKey}:`) && m?.status === QueryStatus.pending,
    );
  });
  const isDeletingOrderItem = useAppSelector((state) => {
    const mutations = state[ordersRepository.reducerPath].mutations ?? {};
    return Object.entries(mutations).some(
      ([key, m]) =>
        key.startsWith(`${deleteOrderItemCacheKey}:`) && m?.status === QueryStatus.pending,
    );
  });
  return isLoadingWhileGetOrders || isDeletingOrder || isDeletingOrderItem;
};
