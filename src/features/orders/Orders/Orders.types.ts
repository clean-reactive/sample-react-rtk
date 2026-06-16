import type { OrderEntityId } from "../repositories";

export interface Presenter {
  orderIds: OrderEntityId[];
  isLoading: boolean;
  isMutating: boolean;
  isProcessing: boolean;
  statusLabel: string;
}

export interface Controller {
  moduleDestroyed(): void;
}
