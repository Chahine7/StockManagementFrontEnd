import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ProductService} from "../../../services/product/product.service";
import {Product} from "../../../Model/Product";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EditProductRequest} from "../../../dto/Product/EditProductRequest";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: Product = new Product();
  editProductForm: FormGroup;
  editRequest: EditProductRequest;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },
              private productService: ProductService, private router: Router,
              private toaster: ToastrService,
              private dialog: MatDialog) {
    this.editRequest = {
      id:0,
      stockQuantity:0,
      availability: false
    }
  }

  ngOnInit(): void {
    this.productService.getProduct(this.data.id).subscribe(
      data => {
        this.product = data;
      }
    )

    this.editProductForm = new FormGroup({
      available: new FormControl(this.product.available, Validators.required),
      stockQuantity: new FormControl(this.product.stockQuantity, Validators.required),
    })

  }

  editProduct() {
    this.editRequest.id = this.product.id;
    this.editRequest.availability = <boolean><unknown>this.editProductForm.get('available')?.value;
    this.editRequest.stockQuantity = <number>this.editProductForm.get('stockQuantity')?.value;
    console.log(this.editRequest);
    this.productService.editProduct(this.editRequest).subscribe(
      () => {
        this.router.navigate(['/products/lowStock'],
          {queryParams: {edited: 'true'}}).then(r => console.log(r));

        this.dialog.closeAll();

      }, error => {
        console.log(error);
        this.toaster.error('Editing Product Failed! Please try again later');
      }
    )
  }

}
