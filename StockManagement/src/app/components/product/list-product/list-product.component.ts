import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product/product.service";
import {ToastrService} from "ngx-toastr";
import {Product} from "../../../Model/Product";
import {ActivatedRoute} from "@angular/router";
import {LoaderService} from "../../../services/loader/loader.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteProductComponent} from "../delete-product/delete-product.component";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  products: Product[];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;

  //new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number =4;
  theTotalElements: number = 0;
 hasId : boolean = false;
  constructor(private productService: ProductService,
              private toaster: ToastrService,
              private activatedRoute: ActivatedRoute,
              public loaderService: LoaderService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        if(params['added'] !== undefined && params['added'] ==='true'){
          this.toaster.success("Product added successfully!");
        }
      }
    )
    this.activatedRoute.queryParams.subscribe(
      params => {
        if(params['deleted'] !== undefined && params['deleted'] ==='true'){
          this.toaster.success("Product Deleted successfully!");
          this.listProducts();
        }
      }
    )
    this.activatedRoute.paramMap.pipe(
    ).subscribe(() =>{
      this.listProducts();
    })
  }

  listProducts() {

    this.hasId = this.activatedRoute.snapshot.paramMap.has("id");

    if(this.hasId) {
      this.handleListProducts();
    }else {
      this.getAllProducts();
    }

  }

  handleListProducts() {
    //check if "id" parameter is available
    const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get the "id" param string. convert to a number using the "+" symbol
      // @ts-ignore
      this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get("id");
    }

    //check if we have a different category than previous
    //note angular will reuse a component if its is currently being viewed


    //if we have a different category id than previous
    //then set thePageNumber back to 1

    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    //now get the products for the given category id
    this.productService
      .getAvailableProductListPaginate(this.thePageNumber - 1,
        this.thePageSize,
        this.previousCategoryId, 10)
      .subscribe(this.processResult());
  }

  processResult() {
    return (data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  openDeleteDialog(id: number) {
    this.dialog.open(DeleteProductComponent, {
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

  private getAllProducts() {
    this.thePageNumber = 1;
    this.productService.getAllProducts(this.thePageNumber-1, this.thePageSize)
      .subscribe(this.processResult());
  }
}
