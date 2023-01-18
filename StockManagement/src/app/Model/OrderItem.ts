import {CartItem} from "./CartItem";


export class OrderItem {
  productImage: string;
    unitPrice: number;
  stockQuantity: number;
    productId: number;
    designation : string;
    constructor(cartItem: CartItem) {
          this.productImage = cartItem.productImage;
          this.stockQuantity = cartItem.stockQuantity;
          this.unitPrice = cartItem.unitPrice;
          this.productId = cartItem.id;
          this.designation = cartItem.designation;

    }
}
