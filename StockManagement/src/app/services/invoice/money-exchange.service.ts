import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MoneyExchangeService {
  API_KEY = environment.API_KEY;
  constructor(private http: HttpClient) { }

  getCurrency(name: string) : Observable<any> {
    const currencyUrl=`https://restcountries.com/v3.1/name/${name}`;
    return this.http.get<any>(currencyUrl);
  }

  /*convert(to: string, from: string, amount: number) : Observable<any> {
    let myHeaders = new HttpHeaders();
    myHeaders.append("apikey", "9QTWoFzwxAPCAxdwt6daA6xfZSPqXP7s");
    const convertUrl = `https://api.apilayer.com/currency_data/convert?to=${to}&from=${from}&amount=${amount}`;
    return this.http.get(convertUrl, {headers: myHeaders});
  }*/
}
