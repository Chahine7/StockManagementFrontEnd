import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Customer} from "../../../Model/Customer";
import {CustomerService} from "../../../services/customer/customer.service";
import {Order} from "../../../Model/Order";
import {InvoiceService} from "../../../services/invoice/invoice.service";
import {LoaderService} from "../../../services/loader/loader.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-paid-bill',
  templateUrl: './paid-bill.component.html',
  styleUrls: ['./paid-bill.component.css']
})
export class PaidBillComponent implements OnInit, AfterViewInit {
  listOfCustomers : Customer[];
  customer: Customer;
  displayedColumns: string[] = ['orderTrackingNumber', 'totalQuantity', 'totalPrice', 'showOrder'];
  orders : Order[] = [];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  paymentId: any;
  PayerID: any;
  constructor(private customerService: CustomerService,
              private orderService: InvoiceService,
              private activatedRoute: ActivatedRoute,
private invoiceService: InvoiceService,
              private toaster: ToastrService,
              public loaderService: LoaderService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.customerService.getAllCustomers(0, 20).subscribe(
      data => { this.listOfCustomers = data._embedded.customers}
    )/* this.activatedRoute.queryParams.subscribe(params => {
this.paymentId = params["paymentId"]
this.PayerID = params["PayerID"]
});
    this.invoiceService.completePayment(this.paymentId, this.PayerID).subscribe(data => {this.toaster.success("Order Paid Successfully!")})*/

  }

  getPaidOrders(id : number){
    this.orderService.getAllPaidOrders(id).subscribe(data => {
      this.orders = data._embedded.orders;
      console.log(this.orders)
    })
  }
  selectCustomer(id: number) {
    this.customerService.getCustomer(id).subscribe(
      data => {
        this.customer = data;
        this.orderService.getAllPaidOrders(id).subscribe(data => {
          this.orders = data._embedded.orders;
          this.dataSource = new MatTableDataSource(this.orders);
          this.cdr.detectChanges();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      }
    )
  }
  ngAfterViewInit() {


  }
}
