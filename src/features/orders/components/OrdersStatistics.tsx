import type { FC } from "react";
import { totalItemQuantityTestId } from "../testIds";
import { useOrdersSelector, useTotalItemsQuantitySelector } from "../hooks";

export const OrdersStatistics: FC = () => {
  const orders = useOrdersSelector();

  const uniqueUsersCount = new Set(orders.map((order) => order.userId)).size;
  const ordersCount = orders.length;
  const itemLinesCount = orders.reduce((acc, order) => acc + order.itemEntities.length, 0);
  const totalItemsQuantity = useTotalItemsQuantitySelector();

  return (
    <div className="flex gap-2">
      <div className="badge badge-ghost gap-1">
        <span>{uniqueUsersCount}</span>
        <span>users</span>
      </div>
      <div className="badge badge-ghost gap-1">
        <span>{ordersCount}</span>
        <span>orders</span>
      </div>
      <div className="badge badge-ghost gap-1">
        <span>{itemLinesCount}</span>
        <span>items</span>
      </div>
      <div className="badge badge-ghost gap-1">
        <span data-testid={totalItemQuantityTestId}>{totalItemsQuantity}</span>
        <span>qty</span>
      </div>
    </div>
  );
};

OrdersStatistics.displayName = "OrdersStatistics";
