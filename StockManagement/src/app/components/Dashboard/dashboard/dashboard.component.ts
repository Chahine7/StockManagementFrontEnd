import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Customer} from "../../../Model/Customer";
import {CustomerService} from "../../../services/customer/customer.service";
import {ProductService} from "../../../services/product/product.service";
import {OrderItem} from "../../../Model/OrderItem";
import {LoaderService} from "../../../services/loader/loader.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  customers: Customer[] = [];
  products: OrderItem[] = [];
  saleData: any = [];
  productData : any = [];
  tmpArray: any = [];
  revenue: number = 0;
   order: number = 0;
  constructor(private customerService: CustomerService, private productService: ProductService,public  loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.getSales();
    setTimeout(() => {this.cloneArray()}, 5000)
  }
    getProducts() {
      this.productService.getTop10Products().subscribe( data => {
        this.products = data._embedded.orderItems

        this.products.forEach(p => {
          this.productService.getTop10ProductsOccurrences(p.designation).subscribe((data :number) =>{

            this.tmpArray.push({name: p.designation, value: data})
            this.order+=data;
          })
        })

      })
    }
  private getSales() {
    this.customerService.getTop10Customers().subscribe(data => {
      this.customers = data._embedded.customers
      let sales:any = [];
      this.customers.forEach(c =>{
        sales.push({name: c.designation,value: c.totalMoneySpent})
        this.revenue +=c.totalMoneySpent;
      })
      this.saleData = [...sales]
    })
  }
  private cloneArray() {
    this.productData = [...this.tmpArray]

  }
}
