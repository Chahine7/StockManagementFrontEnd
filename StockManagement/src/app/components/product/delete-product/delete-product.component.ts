import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ProductService} from "../../../services/product/product.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Product} from "../../../Model/Product";
import {LoaderService} from "../../../services/loader/loader.service";

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  product : Product = new Product();
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id:number},
              private productService: ProductService, private router: Router,
              private toaster: ToastrService, private dialog: MatDialog,
              public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.productService.getProduct(this.data.id).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  deleteProduct(id: number) {
    this.productService.deleteProductById(id).subscribe(
      data => {
        this.router.navigate(['/products'],
          {queryParams: {deleted: 'true'}}).then(r => console.log(r));

        this.dialog.closeAll();
      }, error => {
        console.log(error);
        this.toaster.error('Deleting Product Failed! Please try again later');
      }
    )
  }
}
