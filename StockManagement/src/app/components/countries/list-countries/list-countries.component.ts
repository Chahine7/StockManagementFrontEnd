import { Component, OnInit } from '@angular/core';
import {Category} from "../../../Model/Category";
import {ProductService} from "../../../services/product/product.service";
import {Country} from "../../../Model/Country";
import {CustomerService} from "../../../services/customer/customer.service";

@Component({
  selector: 'app-list-countries',
  templateUrl: './list-countries.component.html',
  styleUrls: ['./list-countries.component.css']
})
export class ListCountriesComponent implements OnInit {

  countries : Country[];
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getAllCountries();
  }

  getAllCountries(){
    this.customerService.getAllCountries().subscribe(
      data => {
        this.countries = data;
      }
    )
  }
}
