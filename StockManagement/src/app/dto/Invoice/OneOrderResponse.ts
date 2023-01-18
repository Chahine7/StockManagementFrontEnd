export interface OneOrderResponse {
  "id" : number,
  "orderTrackingNumber" : string,
  "totalQuantity" : number,
  "totalPrice" : number,
  "status" : boolean,
  "paidAt" : Date,
  "customerId" : number
}
