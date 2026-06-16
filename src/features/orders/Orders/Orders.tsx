import type { FC } from "react";
import { memo, useEffect } from "react";
import { ordersTestId } from "../testIds";
import { useController, usePresenter } from "./hooks";
import { Order, OrdersResourcePicker, OrdersStatistics } from "../components";

export const Orders: FC = memo(() => {
  const { isProcessing, statusLabel, orderIds } = usePresenter();
  const { moduleDestroyed } = useController();

  useEffect(() => {
    return () => moduleDestroyed();
  }, [moduleDestroyed]);

  return (
    <div className="w-140 max-w-full text-left" data-testid={ordersTestId}>
      <h2 className="text-lg font-bold tracking-widest uppercase mb-5">Orders</h2>
      <div className="mb-5">
        <div className="text-xs text-base-content/40 uppercase tracking-widest mb-2">Resource</div>
        <div className="flex items-center justify-between">
          <OrdersResourcePicker />
          <div className={`badge gap-1 ${isProcessing ? "badge-warning" : "badge-success"}`}>
            {isProcessing && <span className="loading loading-spinner loading-xs" />}
            {statusLabel}
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="text-xs text-base-content/40 uppercase tracking-widest mb-2">
          Statistics
        </div>
        <OrdersStatistics />
      </div>
      <div className="flex flex-col gap-3">
        {orderIds.map((orderId) => (
          <Order key={orderId} orderId={orderId} />
        ))}
      </div>
    </div>
  );
});

Orders.displayName = "Orders";
