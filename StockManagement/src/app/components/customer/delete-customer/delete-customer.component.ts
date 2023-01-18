import {Component, Inject, OnInit} from '@angular/core';
import {Customer} from "../../../Model/Customer";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {CustomerService} from "../../../services/customer/customer.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LoaderService} from "../../../services/loader/loader.service";

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {

  customer : Customer = new Customer();
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id:number},
              private customerService: CustomerService, private router: Router,
              private toaster: ToastrService, private dialog: MatDialog, public loaderService:LoaderService) { }

  ngOnInit(): void {
    this.customerService.getCustomer(this.data.id).subscribe(
      data => {
        this.customer = data;
      }
    )
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomerById(id).subscribe(
      data => {
        this.router.navigate(['/customers'],
          {queryParams: {deleted: 'true'}}).then(r => console.log(r));

        this.dialog.closeAll();
      }, error => {
        console.log(error);
        this.toaster.error('Deleting Customer Failed! Please try again later');
      }
    )
  }
}

