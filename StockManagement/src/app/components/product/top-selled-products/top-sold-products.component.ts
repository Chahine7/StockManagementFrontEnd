import { Component, OnInit } from '@angular/core';
import {OrderItem} from "../../../Model/OrderItem";
import {ProductService} from "../../../services/product/product.service";
import {LoaderService} from "../../../services/loader/loader.service";

@Component({
  selector: 'app-top-sold-products',
  templateUrl: './top-sold-products.component.html',
  styleUrls: ['./top-sold-products.component.css']
})
export class TopSoldProductsComponent implements OnInit {

  topProducts : OrderItem[];

  constructor(private productService: ProductService,public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.getTopProducts();
  }

  getTopProducts(){
    this.productService.getTop10Products().subscribe(
      data =>{
        this.topProducts = data._embedded.orderItems;
      }
    )
  }

}
