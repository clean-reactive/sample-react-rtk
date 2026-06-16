import {
  type OrderEntityId,
  useDeleteOrderMutation,
  makeDeleteOrderFixedCacheKey,
} from "../repositories";

export const useIsDeleteOrderMutatingSelector = (orderId: OrderEntityId): boolean => {
  const [, { isLoading }] = useDeleteOrderMutation({
    fixedCacheKey: makeDeleteOrderFixedCacheKey(orderId),
  });
  return isLoading;
};
