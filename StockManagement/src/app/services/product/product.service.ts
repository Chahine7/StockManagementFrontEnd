import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Category} from "../../Model/Category";
import {Product} from "../../Model/Product";
import {EditProductRequest} from "../../dto/Product/EditProductRequest";
import {AddProductRequest} from "../../dto/Product/AddProductRequest";
import { OrderItem } from 'src/app/Model/OrderItem';
import {UpdateQuantity} from "../../dto/Product/UpdateQuantity";
import {Country} from "../../Model/Country";




@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private categoryUrl = environment.categoryUrl;
  private productUrl = environment.productUrl;
  private productListUrl = environment.productListUrl;
  private baseUrl = "http://localhost:8888/PRODUCT-SERVICE";
  private topProductsUrl = "http://localhost:8888/INVOICE-SERVICE/orderItems/search/findTopFiveBestSeller";

  constructor(private http: HttpClient) {
  }



  // POST REQUESTS

  addProduct(addProductRequest: AddProductRequest): Observable<any> {
    return this.http.post(this.productUrl, addProductRequest, {responseType: 'text'});
  }

  // PATCH REQUEST

  editProduct (editProductRequest: EditProductRequest): Observable<any>{
    return this.http.patch(this.productUrl, editProductRequest, {responseType : 'text'});
  }
// GET REQUESTS

  //GET 1 PRODUCT BY ID
  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl+"/products/"+productId);

  }

  //GET LIST OF ALL THE  PRODUCTS
  getAllProducts(thePage: number, thePageSize: number): Observable<GetResponseProduct> {
    return this.http.get<GetResponseProduct>(this.productListUrl + `?page=${thePage}&size=${thePageSize}`);
  }

  //GET LIST OF ALL THE  CATEGORIES
  getAllCategories(): Observable<Category[]> {
    return this.http.get<GetResponseCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.categories)
    );
  }

  //GET LIST OF ALL THE AVAILABLE AND WITH STOCK > 10 BY CATEGORY  PRODUCTS

  getAvailableProductListPaginate(thePage: number
    , thePageSize: number,
                                  categoryId: number, qty: number): Observable<GetResponseProduct> {

    //build url based on category id, page and size
    const searchUrl = `${this.baseUrl}/products/search/findByCategoryIdAndAvailableTrueAndStockQuantityGreaterThanEqual?id=${categoryId}&qty=${qty}&page=${thePage}&size=${thePageSize}`;
    return this.http.get<GetResponseProduct>(searchUrl);
  }

  //GET LIST OF ALL THE NOT AVAILABLE AND WITH STOCK < 10 BY CATEGORY  PRODUCTS

  findByAvailableFalseAndCategoryIdOrStockQuantityLessThanAndCategoryId(thePage: number, thePageSize: number, qty: number, categoryId: number): Observable<GetResponseProduct> {
    //build url based on category id, page and size
    const searchUrl = `${this.baseUrl}/products/search/findByAvailableFalseAndCategoryIdOrStockQuantityLessThanAndCategoryId?id=${categoryId}&qty=${qty}&id1=${categoryId}`
      + `&page=${thePage}&size=${thePageSize}`;
    return this.http.get<GetResponseProduct>(searchUrl);
  }


  // DELETE PRODUCT REQUEST

  deleteProductById(id : number): Observable<any>{
    return this.http.delete(this.productUrl+`/${id}`, {responseType: 'text'});
  }

  // Get top Ten Products
getTop10Products() : Observable<OrderItemResponse>{
return this.http.get<OrderItemResponse>(this.topProductsUrl);
}

  // Get top Ten Products
  getTop10ProductsOccurrences(designation: string) : Observable<number>{
    return this.http.get<number>(`http://localhost:8888/INVOICE-SERVICE/orderItems/search/getNumberOfOccurrences?designation=${designation}`);
  }

// update products Quantity

  updateProductsQuantity(products: UpdateQuantity[]) : Observable<any> {
    return this.http.put(this.productUrl, products, {responseType : "text"});
  }

  // Get each product category
  getProductCategory(id : number) : Observable<Category>{
    return  this.http.get<Category>(this.productListUrl+`/${id}/category`);
  }
}
interface GetResponseCategory {
  _embedded : {
    categories : Category[];
  }
}
interface OrderItemResponse {
  _embedded : {
    orderItems : OrderItem[];
  }
}
interface GetResponseProduct {
  _embedded :{
    products : Product[];
  },
  page: {
    //size of this page
    size: number,

    totalElements: number,

    //total pages available
    totalPages: number,

    //current page number
    number: number
  }
}
