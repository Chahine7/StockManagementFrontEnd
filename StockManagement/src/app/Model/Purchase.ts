import {Customer} from "./Customer";

import {Order} from "./Order";

import {OrderItem} from "./OrderItem";

export class Purchase {
  customer: Customer;
  order: Order;
  orderItems: OrderItem[];
}
