import type { OrderEntityId } from "../repositories";

export interface Presenter {
  orderIds: OrderEntityId[];
  isProcessing: boolean;
  statusLabel: string;
}

export interface Controller {
  moduleDestroyed(): void;
}
