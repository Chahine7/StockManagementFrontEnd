import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CustomerService} from "../../../services/customer/customer.service";
import {Customer} from "../../../Model/Customer";
import {LoaderService} from "../../../services/loader/loader.service";

@Component({
  selector: 'app-top-customer',
  templateUrl: './top-customer.component.html',
  styleUrls: ['./top-customer.component.css']
})
export class TopCustomerComponent implements OnInit{

  customers : Customer[];
  constructor(private customerService: CustomerService, public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.customerService.getTop10Customers().subscribe(data=>{
      this.customers = data._embedded.customers
    }
    );

  }


}

