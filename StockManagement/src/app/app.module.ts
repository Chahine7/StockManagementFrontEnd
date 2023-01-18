import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxWebstorageModule} from "ngx-webstorage";
import {ToastrModule} from "ngx-toastr";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ListProductComponent } from './components/product/list-product/list-product.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';
/*import { AdminComponent } from './components/admin/admin.component';*/
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import { TopSoldProductsComponent } from './components/product/top-selled-products/top-sold-products.component';
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {ProductService} from "./services/product/product.service";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDialogModule} from "@angular/material/dialog";
import {Interceptor} from "./services/loader/interceptor";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LowStockProductsComponent} from "./components/product/low-stock-products/low-stock-products.component";
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import {NgxMatFileInputModule} from "@angular-material-components/file-input";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { DeleteProductComponent } from './components/product/delete-product/delete-product.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { ListCustomersComponent } from './components/customer/list-customers/list-customers.component';
import { DeleteCustomerComponent } from './components/customer/delete-customer/delete-customer.component';
import { ListCountriesComponent } from './components/countries/list-countries/list-countries.component';
import { TopCustomerComponent } from './components/customer/top-customer/top-customer.component';
import { CreateInvoiceComponent } from './components/invoice/create-invoice/create-invoice.component';
import { AddItemComponent } from './components/invoice/add-item/add-item.component';
import {MatTableModule} from "@angular/material/table";
import { PaidBillComponent } from './components/BillPayment/paid-bill/paid-bill.component';
import { UnpaidBillComponent } from './components/BillPayment/unpaid-bill/unpaid-bill.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { InvoiceDetailsComponent } from './components/invoice/invoice-details/invoice-details.component';
import {NgxPayPalModule} from "ngx-paypal";
import { DashboardComponent } from './components/Dashboard/dashboard/dashboard.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    ListProductComponent,
    CreateProductComponent,
    ListCategoryComponent,
    LowStockProductsComponent,
    TopSoldProductsComponent,
    EditProductComponent,
    DeleteProductComponent,
    AddCustomerComponent,
    ListCustomersComponent,
    DeleteCustomerComponent,
    ListCountriesComponent,
    TopCustomerComponent,
    CreateInvoiceComponent,
    AddItemComponent,
    PaidBillComponent,
    UnpaidBillComponent,
    InvoiceDetailsComponent,
    DashboardComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
    NgbPaginationModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressSpinnerModule,
    FormsModule,
    NgxMatFileInputModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxPayPalModule,
    NgxChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatChipsModule,
    MatTooltipModule,


  ],
  providers: [
    ProductService,
    { provide:HTTP_INTERCEPTORS, useClass:Interceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
