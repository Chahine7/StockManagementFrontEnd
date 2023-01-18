import { Component, OnInit } from '@angular/core';
import {Country} from "../../../Model/Country";
import {LoaderService} from "../../../services/loader/loader.service";
import {CustomerService} from "../../../services/customer/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AddCustomerRequest} from "../../../dto/Customer/AddCustomerRequest";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import axios from "axios";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  countries: Country[];
  customerImage : any;
  customerRequestPayload: AddCustomerRequest;
  constructor(public loaderService: LoaderService,
              private customerService: CustomerService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toaster: ToastrService) {
    this.customerRequestPayload = {
      designation: '',
      identifier: '',
      numTel: '',
      country_id: 210,
      customerImage:'',
      email:'',
    }
  }

  ngOnInit(): void {

    this.listCountries();
  }
  addCustomerForm = new FormGroup({
    designation : new FormControl('', Validators.required),
    identifier: new FormControl('', Validators.required),
    numTel: new FormControl('', Validators.required),
    country_id: new FormControl(210,Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
  })

  listCountries (){
    this.customerService.getAllCountries().subscribe(
      (data ) =>
    this.countries = data
    );

  }
  addCustomer() {

    this.customerRequestPayload.identifier=<string> this.addCustomerForm.get('identifier')?.value;
    this.customerRequestPayload.designation=<string> this.addCustomerForm.get('designation')?.value;
    this.customerRequestPayload.numTel=<string> this.addCustomerForm.get('numTel')?.value;
    this.customerRequestPayload.email=<string> this.addCustomerForm.get('email')?.value;
    this.customerRequestPayload.country_id=<number> this.addCustomerForm.get('country_id')?.value;
    this.customerRequestPayload.customerImage=this.customerImage;

    this.customerService.addCustomer(this.customerRequestPayload).subscribe(
      () => {
        this.router.navigate(['/customers'],
          {queryParams: {added: 'true'}}).then(r => console.log(r));
      },error => {
        console.log(error);
        this.toaster.error('Adding Customer Failed! Please try again');
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
        this.customerImage = data;


        console.log(this.customerImage)
      } catch (error) {
        console.error(error)


      }
    }
  }
}
