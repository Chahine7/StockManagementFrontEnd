import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product/product.service";
import {Category} from "../../../Model/Category";

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  categories : Category[];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProductCategories();
  }

  getAllProductCategories(){
    this.productService.getAllCategories().subscribe(
      data => {
        this.categories = data;
      }
    )
  }
}
