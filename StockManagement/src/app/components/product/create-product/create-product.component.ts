import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product/product.service";
import {Category} from "../../../Model/Category";
import {AddProductRequest} from "../../../dto/Product/AddProductRequest";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import axios from "axios";
import {LoaderService} from "../../../services/loader/loader.service";


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {


public productCategories: Category[];
  productImage : any;
  private readonly productRequestPayload: AddProductRequest;
  constructor(private productService: ProductService,
              private router:Router,
              private toaster: ToastrService,
              public loaderService: LoaderService) {
    this.productRequestPayload={
      designation: '',
      unitPrice:0.0,
      stockQuantity:0,
      category_id:1,
      productImage:'',
      available: true,
    }
  }



  ngOnInit(): void {
    this.listCategories();
  }

  addProductForm = new FormGroup({
    designation : new FormControl('', Validators.required),
    stockQuantity: new FormControl(0, Validators.required),
    unitPrice: new FormControl(0, Validators.required),
    category_id: new FormControl(1,Validators.required),
      available: new FormControl(false,Validators.required),
  })

  listCategories(){
    this.productService.getAllCategories().subscribe(
      data => {
        this.productCategories = data;
        this.addProductForm.get('category_id')?.setValue(data[0].id);
      }
    )
  }
  addProduct() {
    this.productRequestPayload.designation= <string> this.addProductForm.get('designation')?.value;
    this.productRequestPayload.stockQuantity= <number>this.addProductForm.get('stockQuantity')?.value;
    this.productRequestPayload.unitPrice= <number> this.addProductForm.get('unitPrice')?.value;
    this.productRequestPayload.category_id= <number> this.addProductForm.get('category_id')?.value;
    this.productRequestPayload.available = <boolean><unknown>this.addProductForm.get('available')?.value;
    this.productRequestPayload.productImage= this.productImage;

    console.log(this.productRequestPayload)


    this.productService.addProduct(this.productRequestPayload).subscribe(
      () => {

        this.router.navigate(['/products'],
          {queryParams: {added: 'true'}}).then(r => console.log(r));
      },error => {
        console.log(error);
        this.toaster.error('Adding Product Failed! Please try again');
      }
    )
  }
  async onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file)
      const formData = new FormData()
      formData.append('image', file)


      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }

        const {data} = await axios.post('http://127.0.0.1:5000/api/upload', formData, config)

        console.log(data)
        this.productImage=data;


        console.log(this.productImage)
      } catch (error) {
        console.error(error)


      }
    }
  }
}
