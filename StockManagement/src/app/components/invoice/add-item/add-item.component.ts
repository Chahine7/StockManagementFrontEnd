import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Product} from "../../../Model/Product";
import {ProductService} from "../../../services/product/product.service";
import {CartItem} from "../../../Model/CartItem";
import {InvoiceService} from "../../../services/invoice/invoice.service";
import {MatDialog} from "@angular/material/dialog";
import {LoaderService} from "../../../services/loader/loader.service";
import {DialogRef} from "@angular/cdk/dialog";
import {CreateInvoiceComponent} from "../create-invoice/create-invoice.component";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  addItemForm: FormGroup;
  allProducts : Product[];
  product : Product;
  constructor(private productService : ProductService,
              private invoiceService:InvoiceService,
              private dialog: MatDialog, public loaderService: LoaderService) { }
  ngOnInit(): void {
    this.productService.getAllProducts(0, 20).subscribe(
      data => {
        this.allProducts =data._embedded.products;
      }
    )


  }
  addItem(product :Product) {
    const theCartItem = new CartItem(product);
    this.invoiceService.addToCart(theCartItem);
    this.dialog.closeAll();

  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe(
      data => {
        this.product = data;
      }
    )
  }
}
