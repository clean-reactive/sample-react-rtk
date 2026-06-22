import type { Presenter } from "../Orders.types";
import { useIsOrdersMutatingSelector, useOrderIdsSelector } from "../../hooks";
import { useGetOrdersQuery } from "../../repositories";

export const usePresenter = (): Presenter => {
  const { isLoading, isFetching } = useGetOrdersQuery();
  const isMutating = useIsOrdersMutatingSelector();
  const orderIds = useOrderIdsSelector();

  const isProcessing = isLoading || isFetching || isMutating;

  let statusLabel = "idle";
  if (isLoading) {
    statusLabel = "loading";
  } else if (isFetching) {
    statusLabel = "fetching";
  } else if (isMutating) {
    statusLabel = "mutating";
  }

  return {
    isProcessing,
    statusLabel,
    orderIds,
  };
};
