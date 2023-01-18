import {Product} from "./Product";

export class CartItem {
  id: number;
  designation: string;
  unitPrice:number;
  productImage: string;
  stockQuantity: number;
  qty: number;
  constructor(product: Product) {
    this.id  = product.id;
    this.designation = product.designation;
    this.productImage = product.productImage;
    this.unitPrice = product.unitPrice;
    this.stockQuantity = 1;
    this.qty = product.stockQuantity;
  }
}
