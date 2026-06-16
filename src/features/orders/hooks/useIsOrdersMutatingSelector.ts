import { QueryStatus } from "@reduxjs/toolkit/query/react";
import { useAppSelector } from "../../../hooks";
import { ordersRepository, deleteOrderCacheKey, deleteOrderItemCacheKey } from "../repositories";

export const useIsOrdersMutatingSelector = (): boolean => {
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
  return isDeletingOrder || isDeletingOrderItem;
};
