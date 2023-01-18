import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AddCustomerRequest} from "../../dto/Customer/AddCustomerRequest";
import {map, Observable} from "rxjs";
import {Category} from "../../Model/Category";
import {Product} from "../../Model/Product";
import {Country} from "../../Model/Country";
import {Customer} from "../../Model/Customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private CUSTOMER_URL = environment.customerUrl;
  private CUSTOMER_LIST_URL = environment.customerListUrl;
  private COUNTRY_URL = environment.countryUrl;
  private COUNTRY_LIST_URL = environment.countryListUrl;
  private baseUrl = "http://localhost:8888/CLIENT-SERVICE";
  constructor(private http: HttpClient) { }


  // POST REQUEST

  addCustomer(addCustomerRequest: AddCustomerRequest) : Observable<any>{
return this.http.post(this.CUSTOMER_URL, addCustomerRequest, { responseType : 'text'});
  }

  //GET LIST OF ALL THE  COUNTRIES
  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.COUNTRY_LIST_URL);
  }


  getCustomerListPaginate(thePage: number, thePageSize: number,
                                  countryId: number): Observable<GetResponseCustomer> {

    //build url based on country id, page and size
    const searchUrl = `${this.baseUrl}/customers/search/findByCountryId?id=${countryId}&page=${thePage}&size=${thePageSize}`;
    return this.http.get<GetResponseCustomer>(searchUrl);
  }

  //GET LIST OF ALL THE  CUSTOMERS
  getAllCustomers(thePage: number, thePageSize: number): Observable<GetResponseCustomer> {
    return this.http.get<GetResponseCustomer>(this.CUSTOMER_LIST_URL + `?page=${thePage}&size=${thePageSize}`);
  }

  // DELETE customer REQUEST

  deleteCustomerById(id : number): Observable<any>{
    return this.http.delete(this.CUSTOMER_URL+`/${id}`, {responseType: 'text'});
  }

  getCustomer(id: number) : Observable<Customer>{
      return this.http.get<Customer>(this.CUSTOMER_LIST_URL+`/${id}`);
  }

getCustomerCountry(id : number) : Observable<Country>{
    return  this.http.get<Country>(this.CUSTOMER_LIST_URL+`/${id}/country`);
}
  // Get Top 10 Customers

  getTop10Customers() : Observable<GetResponseCustomer>{

    const searchUrl = `${this.baseUrl}/customers/search/findFirst10ByOrderByTotalMoneySpentDesc`;
    return this.http.get<GetResponseCustomer>(searchUrl);
  }
}






interface GetResponseCountry {
  _embedded : {
    countries : Country[];
  }
}

interface GetResponseCustomer {
  _embedded :{
    customers : Customer[];
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

