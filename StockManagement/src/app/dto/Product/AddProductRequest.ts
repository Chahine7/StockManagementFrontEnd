export interface AddProductRequest {
  designation: string,
  stockQuantity: number,
  unitPrice: number,
  productImage: string,
  category_id: number,
  available: boolean,
}
