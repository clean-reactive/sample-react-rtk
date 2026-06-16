import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { Orders } from "./Orders";
import { useController, usePresenter } from "./hooks";
import { ordersTestId } from "../testIds";
import type { OrderEntityId } from "../repositories";

vi.mock("./hooks/useController");
vi.mock("./hooks/usePresenter");
vi.mock("../components/Order/Order", () => ({
  Order: (props: { orderId: OrderEntityId }) => (
    <div data-testid={`order-${props.orderId}`}>Order {props.orderId}</div>
  ),
}));
vi.mock("../components/OrdersResourcePicker", () => ({
  OrdersResourcePicker: () => <div data-testid="orders-resource-picker" />,
}));
vi.mock("../components/OrdersStatistics", () => ({
  OrdersStatistics: () => <div data-testid="orders-statistics" />,
}));

describe(`${Orders.displayName}`, () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useController).mockReturnValue({
      moduleDestroyed: vi.fn(),
    });
  });

  it("renders loading state", () => {
    vi.mocked(usePresenter).mockReturnValue({
      isLoading: true,
      isMutating: false,
      isProcessing: true,
      statusLabel: "loading",
      orderIds: [],
    });

    render(<Orders />);

    expect(screen.getByTestId(ordersTestId)).toBeInTheDocument();
    expect(screen.getByText("loading")).toBeInTheDocument();
  });

  it("renders multiple orders", () => {
    const orderIds = ["1", "2", "3"] as OrderEntityId[];
    vi.mocked(usePresenter).mockReturnValue({
      isLoading: false,
      isMutating: false,
      isProcessing: false,
      statusLabel: "idle",
      orderIds,
    });

    render(<Orders />);

    expect(screen.getByTestId(ordersTestId)).toBeInTheDocument();
    expect(screen.getByText("idle")).toBeInTheDocument();
    orderIds.forEach((id) => {
      expect(screen.getByTestId(`order-${id}`)).toBeInTheDocument();
    });
  });

  it("renders empty state", () => {
    vi.mocked(usePresenter).mockReturnValue({
      isLoading: false,
      isMutating: false,
      isProcessing: false,
      statusLabel: "idle",
      orderIds: [],
    });

    render(<Orders />);

    expect(screen.getByTestId(ordersTestId)).toBeInTheDocument();
    expect(screen.getByText("idle")).toBeInTheDocument();
    expect(screen.queryByTestId(/^order-/)).not.toBeInTheDocument();
  });

  it("calls moduleDestroyed on unmount", () => {
    vi.mocked(usePresenter).mockReturnValue({
      isLoading: false,
      isMutating: false,
      isProcessing: false,
      statusLabel: "idle",
      orderIds: [],
    });

    const controller = useController();
    const { unmount } = render(<Orders />);
    unmount();

    expect(controller.moduleDestroyed).toHaveBeenCalledTimes(1);
  });
});
