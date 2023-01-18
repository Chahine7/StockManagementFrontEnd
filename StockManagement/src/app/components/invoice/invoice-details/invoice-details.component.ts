import {Component,OnInit} from '@angular/core';

import {InvoiceService} from "../../../services/invoice/invoice.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderItem} from "../../../Model/OrderItem";
import {OneOrderResponse} from "../../../dto/Invoice/OneOrderResponse";
import {LoaderService} from "../../../services/loader/loader.service";
import {Customer} from "../../../Model/Customer";
import {CustomerService} from "../../../services/customer/customer.service";
import {Country} from "../../../Model/Country";
import {MoneyExchangeService} from "../../../services/invoice/money-exchange.service";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {

  order: OneOrderResponse = new class implements OneOrderResponse {
    id: number;
    orderTrackingNumber: string;
    paidAt: Date;
    status: boolean;
    totalPrice: number;
    totalQuantity: number;
    customerId: number;
  };
  orderItems: OrderItem[] = [];
  customer: Customer = new Customer();
  country: Country = new Country();
  currency: any;
  result: any;
  sdk: any;

  constructor(private invoiceService: InvoiceService,
              private route: ActivatedRoute,
              public loaderService: LoaderService,
              private customerService: CustomerService,
              private currencyService: MoneyExchangeService,
              private router: Router,
              private toaster: ToastrService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getOrder();
    })
  }

  getOrder() {
    // @ts-ignore
    const orderTrackingNumber: string = this.route.snapshot.paramMap.get('orderTrackingNumber');

    this.invoiceService.getOneOrder(orderTrackingNumber).subscribe(
      data => {
        this.order = data;
        this.invoiceService.getOrderItems(this.order.id).subscribe(data => {
          this.orderItems = data._embedded.orderItems
        })
        this.customerService.getCustomer(this.order.customerId).subscribe(data => {
          this.customer = data
        });
        this.customerService.getCustomerCountry(this.order.customerId).subscribe(data => {
            this.country = data
            this.currencyService.getCurrency(this.country.designation).subscribe(async data => {
              this.currency = (data[0].currencies)
              console.log(data)
              console.log(this.currency);
              console.log(Object.keys(this.currency)[0]);
            });
          }
        )
      }
    )
  }

  async convert() {
    let myHeaders = new Headers();
    myHeaders.append("apikey", "9QTWoFzwxAPCAxdwt6daA6xfZSPqXP7s");

    let requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    // @ts-ignore
    const res = await fetch(`https://api.apilayer.com/currency_data/convert?to=${Object.keys(this.currency)[0]}&from=TND&amount=${this.order.totalPrice}`, requestOptions)
    this.result = await res.json()
    console.log(this.result.result)
    this.order.totalPrice = this.result.result;

  }

  goBack() {
    history.back();
  }


  openPDF(): void {
    let DATA: any = document.getElementById("data");
    let buttons = DATA.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].style.display = 'none';
    }
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(`${this.order.orderTrackingNumber}-details.pdf`);

    })
  }
  pay(id : number) {
          this.invoiceService.makePayment(id).subscribe(data => {
            console.log(data)
          this.ngOnInit();
            this.toaster.success(`${data}`)
          })
  }

}
