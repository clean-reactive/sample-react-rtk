import type { ApiHttpClient } from "../types";
import { HttpClient } from "../httpClient";
import type { ApiOrderDto } from "./OrdersApi.types";

const baseUrl = import.meta.env.BASE_URL;
export const ordersApiUrl = `${baseUrl}api/orders`;

export class OrdersApi {
  static make(): OrdersApi {
    return new OrdersApi(HttpClient.make());
  }

  private ordersApiUrl = ordersApiUrl;

  constructor(private readonly httpClient: ApiHttpClient) {}

  async getOrders(): Promise<ApiOrderDto[]> {
    const request = new Request(this.ordersApiUrl, { method: "GET" });
    const response = await this.httpClient.request(request);
    return response.json();
  }

  async getOrder(id: string): Promise<ApiOrderDto> {
    const request = new Request(`${this.ordersApiUrl}/${id}`, { method: "GET" });
    const response = await this.httpClient.request(request);
    return response.json();
  }

  async updateOrder(id: string, order: ApiOrderDto): Promise<void> {
    const request = new Request(`${this.ordersApiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    await this.httpClient.request(request);
  }

  async deleteOrder(id: string): Promise<void> {
    const request = new Request(`${this.ordersApiUrl}/${id}`, { method: "DELETE" });
    await this.httpClient.request(request);
  }
}
