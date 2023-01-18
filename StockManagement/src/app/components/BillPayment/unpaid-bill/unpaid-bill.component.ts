import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Customer} from "../../../Model/Customer";
import {CustomerService} from "../../../services/customer/customer.service";
import {Order} from "../../../Model/Order";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {InvoiceService} from "../../../services/invoice/invoice.service";
import {LoaderService} from "../../../services/loader/loader.service";

@Component({
  selector: 'app-unpaid-bill',
  templateUrl: './unpaid-bill.component.html',
  styleUrls: ['./unpaid-bill.component.css']
})
export class UnpaidBillComponent implements OnInit {
  listOfCustomers: Customer[];
  customer: Customer;
  displayedColumns: string[] = ['orderTrackingNumber', 'totalQuantity', 'totalPrice', 'showOrder'];
  orders: Order[] = [];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private customerService: CustomerService,
              private orderService: InvoiceService,
              public loaderService: LoaderService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.customerService.getAllCustomers(0, 20).subscribe(
      data => {
        this.listOfCustomers = data._embedded.customers
      }
    )
  }

  getPaidOrders(id: number) {
    this.orderService.getAllPaidOrders(id).subscribe(data => {
      this.orders = data._embedded.orders;
      console.log(this.orders)
    })
  }

  selectCustomer(id: number) {
    this.customerService.getCustomer(id).subscribe(
      data => {
        this.customer = data;
        this.orderService.getAllNotPaidOrdersByCustomer(id).subscribe(data => {
          this.orders = data._embedded.orders;
          this.dataSource = new MatTableDataSource(this.orders);
          this.cdr.detectChanges();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      }
    )
  }
}
