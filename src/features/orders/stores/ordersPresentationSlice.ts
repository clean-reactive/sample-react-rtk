import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrdersResource, OrdersPresentationEntity } from "./OrdersPresentationEntity.types";

const initialState: OrdersPresentationEntity = {
  ordersResource: "local",
};

export const ordersPresentationSlice = createSlice({
  name: "ordersPresentation",
  initialState,
  reducers: {
    setOrdersResource(state, action: PayloadAction<OrdersResource>) {
      state.ordersResource = action.payload;
    },
  },
});

export const { setOrdersResource } = ordersPresentationSlice.actions;
