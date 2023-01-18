import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListProductComponent} from "./components/product/list-product/list-product.component";
import {CreateProductComponent} from "./components/product/create-product/create-product.component";
import {TopSoldProductsComponent} from "./components/product/top-selled-products/top-sold-products.component";
import {LowStockProductsComponent} from "./components/product/low-stock-products/low-stock-products.component";
import {ListCustomersComponent} from "./components/customer/list-customers/list-customers.component";
import {AddCustomerComponent} from "./components/customer/add-customer/add-customer.component";
import {TopCustomerComponent} from "./components/customer/top-customer/top-customer.component";
import {CreateInvoiceComponent} from "./components/invoice/create-invoice/create-invoice.component";
import {PaidBillComponent} from "./components/BillPayment/paid-bill/paid-bill.component";
import {UnpaidBillComponent} from "./components/BillPayment/unpaid-bill/unpaid-bill.component";
import {InvoiceDetailsComponent} from "./components/invoice/invoice-details/invoice-details.component";
import {DashboardComponent} from "./components/Dashboard/dashboard/dashboard.component";
const routes: Routes = [
  {path:'', component: DashboardComponent},

  {path:'category/:id', component: ListProductComponent},

  {path:'category', component: ListProductComponent},

  {path:'products', component:ListProductComponent},
  {path :'products/add', component: CreateProductComponent},
  {path :'products/lowStock', component: LowStockProductsComponent},
  {path:'category/lowStock/:id', component: LowStockProductsComponent},
  {path :'products/Top/sold', component: TopSoldProductsComponent},

  {path:'country/:id', component: ListCustomersComponent},
  {path:'country', component: ListCustomersComponent},
  {path:'customers', component: ListCustomersComponent},
  {path:'customers/add', component: AddCustomerComponent},
  {path:'customers/top', component: TopCustomerComponent},

  {path:'invoice/add', component: CreateInvoiceComponent},
  {path:'invoice/:orderTrackingNumber', component: InvoiceDetailsComponent},
  {path:'bills/paid', component: PaidBillComponent},
  {path:'bills/unpaid', component: UnpaidBillComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
