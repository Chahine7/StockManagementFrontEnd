import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product/product.service";
import {Product} from "../../../Model/Product";
import {MatDialog} from "@angular/material/dialog";
import {LoaderService} from "../../../services/loader/loader.service";
import {EditProductComponent} from "../edit-product/edit-product.component";
import {ActivatedRoute} from "@angular/router";
import {Category} from "../../../Model/Category";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-low-stock-products',
  templateUrl: './low-stock-products.component.html',
  styleUrls: ['./low-stock-products.component.css']
})
export class LowStockProductsComponent implements OnInit {

  productsInDanger: Product[];

  thePageNumber: number = 1;
  thePageSize: number = 4;
  theTotalElements: number = 0;

  previousCategoryId : number = 1;
  currentCategoryId : number = 1;
  categories: Category[];

  constructor(private productService: ProductService,
              private dialog: MatDialog,
              public loaderService: LoaderService,
              private activatedRoute: ActivatedRoute,
              private toaster: ToastrService) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        if(params['edited']!== undefined && params['edited'] === 'true'){
          this.toaster.success("Product Edited Successfully!");
        }
      }
    )
    this.getAllProductCategories();
    this.activatedRoute.paramMap.pipe()
      .subscribe(() => {
        this.getProductsInDanger();
      })
  }

  getProductsInDanger() {
    this.handleProductsInDanger();
  }
  private handleProductsInDanger() {
    // check if category id present
    const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has('id');

    if(hasCategoryId) {
      //@ts-ignore
      this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get('id');

    }else {
      // no id available ... default to 1
      this.currentCategoryId = 1;
    }

    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    this.productService.findByAvailableFalseAndCategoryIdOrStockQuantityLessThanAndCategoryId(
      this.thePageNumber-1,
      this.thePageSize,
      10, this.previousCategoryId).subscribe(
        this.processResult())
  }
  processResult() {
    return (data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.productsInDanger = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }
  openDialog(id : number) {
    this.dialog.open(EditProductComponent, {
      height: '600px',
      width: '600px',
      data: {id : id},
    })
    this.dialog.afterAllClosed.subscribe(
      () => {
        this.ngOnInit();
      }
    )
  }



  private getAllProductCategories() {

      this.productService.getAllCategories().subscribe(
        data => {
          this.categories = data;
        }
      )
    }
}
