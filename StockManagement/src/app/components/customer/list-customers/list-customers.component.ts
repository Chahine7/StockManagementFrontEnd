import { Component, OnInit } from '@angular/core';
import {Customer} from "../../../Model/Customer";
import {CustomerService} from "../../../services/customer/customer.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {LoaderService} from "../../../services/loader/loader.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteCustomerComponent} from "../delete-customer/delete-customer.component";

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {

  customers: Customer[];
  currentCountryId: number = 1;
  previousCountryId: number = 1;

  //new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number =5;
  theTotalElements: number = 0;
  hasId : boolean = false;
  constructor(private customerService: CustomerService,
              private toaster: ToastrService,
              private activatedRoute: ActivatedRoute,
              public loaderService: LoaderService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        if(params['added'] !== undefined && params['added'] ==='true'){
          this.toaster.success("Customer added successfully!");
        }
      }
    )
    this.activatedRoute.queryParams.subscribe(
      params => {
        if(params['deleted'] !== undefined && params['deleted'] ==='true'){
          this.toaster.success("Customer Deleted successfully!");
          this.listCustomers();
        }
      }
    )
    this.activatedRoute.paramMap.pipe(
    ).subscribe(() =>{
      this.listCustomers();
    })
  }

  listCustomers() {
    this.hasId = this.activatedRoute.snapshot.paramMap.has("id");

    if(this.hasId) {
      this.handleListCustomers();
    }else {
      this.handleAllCustomers();
    }


  }

  handleListCustomers() {
    //check if "id" parameter is available
    const hasCountryId: boolean = this.activatedRoute.snapshot.paramMap.has('id');

    if (hasCountryId) {
      //get the "id" param string. convert to a number using the "+" symbol
      // @ts-ignore
      this.currentCountryId = +this.activatedRoute.snapshot.paramMap.get("id");
    }
    if (this.previousCountryId != this.currentCountryId) {
      this.thePageNumber = 1;
    }
    this.previousCountryId = this.currentCountryId;

    //now get the products for the given category id
    this.customerService
      .getCustomerListPaginate(this.thePageNumber - 1,
        this.thePageSize,
        this.previousCountryId)
      .subscribe(this.processResult());
  }

  processResult() {
    return (data: { _embedded: { customers: Customer[]; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.customers = data._embedded.customers;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  openDeleteDialog(id: number) {
    this.dialog.open(DeleteCustomerComponent, {
      height: 'auto',
      width : 'auto',
      data: {id: id},
    })
    this.dialog.afterAllClosed.subscribe(
      () => {
        this.ngOnInit();
      }
    )
  }

  private handleAllCustomers() {
    this.thePageNumber = 1 ;
    this.customerService
      .getAllCustomers(this.thePageNumber-1, this.thePageSize)
      .subscribe(this.processResult());
  }
}

