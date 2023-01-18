import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../../services/customer/customer.service";
import {Customer} from "../../../Model/Customer";
import {Order} from "../../../Model/Order";
import {LoaderService} from "../../../services/loader/loader.service";
import {MatDialog} from "@angular/material/dialog";
import {AddItemComponent} from "../add-item/add-item.component";
import {InvoiceService} from "../../../services/invoice/invoice.service";
import {CartItem} from "../../../Model/CartItem";
import {OrderItem} from "../../../Model/OrderItem";
import {Purchase} from "../../../Model/Purchase";
import {response} from "express";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {MatTable} from "@angular/material/table";
import {ProductService} from "../../../services/product/product.service";
import {Product} from "../../../Model/Product";
import {UpdateQuantity} from "../../../dto/Product/UpdateQuantity";

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {

  customer : Customer = new Customer();
  image: any;
  orderForm: FormGroup;
  public totalPrice: number;
  public totalQuantity: number;
   public cartItems: CartItem[]=[];

   public theCountry: string;
  displayedColumns: string[] = ['designation', 'productImage', 'stockQuantity', 'Subtotal'];
  footerColumns: string[] = ['designation','Subtotal'];
  dataSource : any;
  @ViewChild(MatTable) table: MatTable<any>;
  constructor(private formBuilder: FormBuilder
              ,private customerService: CustomerService,
              public loaderService: LoaderService,
              private dialog: MatDialog,
              private invoiceService: InvoiceService,
              private toaster: ToastrService,
              private router: Router, private productService: ProductService) { }

  listOfCustomers : Customer[];
  ngOnInit(): void {
    this.customerService.getAllCustomers(0, 20).subscribe(
      data => {
        this.listOfCustomers = data._embedded.customers;
        console.log(this.listOfCustomers)
      }
    )
    this.initForm();
    this.listCartDetails();
  }
  public initForm() {
    this.orderForm = this.formBuilder.group({
      customer : this.formBuilder.group({
        id : new FormControl(null, [Validators.required])
      })
    })
  }



  openModal() {
    this.dialog.open(AddItemComponent, {
      height: '400px',
      width : '400px',
    }).afterClosed().subscribe(res => {

      this.table.renderRows()
    });
  }

  listCartDetails(){
    this.cartItems = this.invoiceService.cartItems;
    this.dataSource = this.cartItems;
    this.invoiceService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.invoiceService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.invoiceService.computeCartTotals();
  }

  onSubmit() {

    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    const cartItems = this.invoiceService.cartItems;

    let orderItems : OrderItem[] = cartItems.map(tmpCartItem => new OrderItem(tmpCartItem))


    let purchase = new Purchase();

    purchase.customer = this.orderForm.controls['customer']?.value;

    purchase.order = order;
    purchase.orderItems = orderItems;

    console.log(purchase);
    this.invoiceService.placeOrder(purchase).subscribe(
      {next : response => {
            this.toaster.success( `Your Order has been added successfully.\n
            Order Tracking number: ${response.orderTrackingNumber}`);

            this.updateStockQuantity(cartItems);
            this.resetCart();
        }
      }
    )
  }


  private resetCart() {
    // reset cart data
    this.invoiceService.cartItems = [];
    this.invoiceService.totalPrice.next(0);
    this.invoiceService.totalQuantity.next(0);

    // reset the form
    this.orderForm.reset();

    // navigate back to the products page

      this.router.navigateByUrl("/customers/top");
  }

  incrementQuantity(item: CartItem) {
      this.invoiceService.addToCart(item);
  this.table.renderRows();
  }

  decrementQuantity(item: CartItem) {
this.invoiceService.decrementQuantity(item);
this.table.renderRows();
  }
  remove(item : CartItem) {
    this.invoiceService.remove(item);
    this.table.renderRows()

  }
  get id(){

    const id = this.orderForm.get('customer.id');
    if(id) return id;
    return id;
  }
  updateStockQuantity(cartItems: CartItem[]){
    let updateQuantityRequest: UpdateQuantity[] = cartItems.map(item => new UpdateQuantity(item.designation, item.stockQuantity));

    this.productService.updateProductsQuantity(updateQuantityRequest).subscribe(data => {
      console.log(updateQuantityRequest);
    })

  }

  selectCustomer(id: number) {
    this.customerService.getCustomer(id).subscribe(
      data => {
        this.customer  =data;
        this.image = data.customerImage;

      }
    )
  }
}
