import { Injectable } from '@angular/core';
import {CartItem} from "../../Model/CartItem";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import { map } from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {Purchase} from "../../Model/Purchase";
import {Order} from "../../Model/Order";
import {OneOrderResponse} from "../../dto/Invoice/OneOrderResponse";
import {OrderItem} from "../../Model/OrderItem";



@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  storage : Storage = localStorage;
  constructor(private http:HttpClient) {
    // @ts-ignore
    let data = JSON.parse(this.storage.getItem("cartItems"));

    if(data != null){
      this.cartItems = data ;

      this.computeCartTotals();
    }
  }

  addToCart(cartItem: CartItem){

    let alreadyExistInCart: boolean = false;

    let existingCartItem : CartItem | undefined = undefined;

   if(this.cartItems.length >0){
     existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id);

     alreadyExistInCart = (existingCartItem != undefined);
   }
   if(alreadyExistInCart){

     // @ts-ignore
     existingCartItem.stockQuantity++;
   }
   else {
     this.cartItems.push(cartItem);
   }
   this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue: number = 0 ;
    let totalQuantityValue: number =0 ;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.stockQuantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.stockQuantity;

    }
    //publish new values ... all subscribers will receive the new data

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // persist cart data

    this.persistCartItems();

  }

  decrementQuantity(item: CartItem) {
    item.stockQuantity--;
    if(item.stockQuantity ==0){
      this.remove(item);
    }
    else {
      this.computeCartTotals();
    }
  }

  remove(item: CartItem) {

    //get index of item in the array

    const itemIndex = this.cartItems.findIndex(tmpItem => tmpItem.id === item.id);

    // if found, remove the item from the array at the given index
    if(itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }

  persistCartItems(){
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  placeOrder(purchase: Purchase) : Observable<any>{
   const purchaseUrl = "http://localhost:8888/INVOICE-SERVICE/api/checkout/purchase";
    return this.http.post<Purchase>(purchaseUrl, purchase);
  }


  getAllPaidOrders(id: number) : Observable<OrdersResponse> {
    const paidOrdersUrl = `http://localhost:8888/INVOICE-SERVICE/orders/search/findByStatusTrueAndCustomerId?id=${id}`;
    return this.http.get<OrdersResponse>(paidOrdersUrl);
  }

  getAllNotPaidOrdersByCustomer(id: number) : Observable<OrdersResponse> {
    const paidOrdersUrl = `http://localhost:8888/INVOICE-SERVICE/orders/search/findByStatusFalseAndCustomerId?id=${id}`;
    return this.http.get<OrdersResponse>(paidOrdersUrl);
  }

getOneOrder(orderTrackingNumber: string) : Observable<OneOrderResponse>{
const oneOrderUrl = `http://localhost:8888/INVOICE-SERVICE/orders/search/findByOrderTrackingNumber?orderTrackingNumber=${orderTrackingNumber}`;
return this.http.get<OneOrderResponse>(oneOrderUrl);
  }
getOrderItems(id: number) : Observable<OrderItemResponse>{
  const orderItemsUrl = `http://localhost:8888/INVOICE-SERVICE/orders/${id}/orderItems`;
    return this.http.get<OrderItemResponse>(orderItemsUrl);
}
   makePayment(id: number) : Observable<any>{
        return this.http.post(`http://localhost:8888/PAYMENT-SERVICE/paypal/${id}/pay`, {}, {responseType:'text'})   }

  /* completePayment(paymentId : number, payerId: number) : Observable<any>{
      return this.http.post<any>('http://localhost:8888/PAYMENT-SERVICE/paypal/complete/payment?paymentId=' + paymentId + '&payerId=' + payerId , {});
  }*/

}
interface OrdersResponse {
  _embedded : {
    orders : Order[]
  }
}

interface OrderItemResponse {
  _embedded : {
    orderItems : OrderItem[]
  }
}
