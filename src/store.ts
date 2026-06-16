import { configureStore } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-internal-modules
import { ordersRepository } from "./features/orders/repositories";
// eslint-disable-next-line import/no-internal-modules
import { ordersPresentationSlice } from "./features/orders/stores";

export const makeStore = () => {
  return configureStore({
    reducer: {
      ordersPresentation: ordersPresentationSlice.reducer,
      [ordersRepository.reducerPath]: ordersRepository.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(ordersRepository.middleware),
    enhancers: (getDefaultEnhancers) =>
      // 'tick' uses queueMicrotask, avoiding requestAnimationFrame/cancelAnimationFrame
      // which may not be available in all environments (e.g. jsdom in tests)
      getDefaultEnhancers({ autoBatch: { type: "tick" } }),
  });
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
