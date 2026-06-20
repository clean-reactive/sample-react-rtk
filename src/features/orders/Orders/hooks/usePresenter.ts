import type { Presenter } from "../Orders.types";
import { useIsOrdersMutatingSelector, useOrderIdsSelector } from "../../hooks";
import { useGetOrdersQuery } from "../../repositories";

export const usePresenter = (): Presenter => {
  const { isFetching } = useGetOrdersQuery();
  const isMutating = useIsOrdersMutatingSelector();
  const orderIds = useOrderIdsSelector();

  const isProcessing = isFetching || isMutating;

  let statusLabel = "idle";
  if (isFetching) {
    statusLabel = "fetching";
  } else if (isMutating) {
    statusLabel = "mutating";
  }

  return {
    isLoading: isFetching,
    isMutating,
    isProcessing,
    statusLabel,
    orderIds,
  };
};
