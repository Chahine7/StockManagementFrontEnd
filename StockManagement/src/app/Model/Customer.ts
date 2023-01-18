import {Country} from "./Country";

export class Customer{
  id: number;
  identifier : string;
  designation : string;
  numTel : string;
  customerImage : string;
  email : string;
  totalMoneySpent: number;
  country: Country;
}
