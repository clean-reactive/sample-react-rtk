import type { OrdersResource } from "../stores";

export const isOrdersResource = (resource: unknown): resource is OrdersResource =>
  resource === "local" || resource === "remote";
