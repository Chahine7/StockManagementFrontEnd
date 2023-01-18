import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], })

export class AppComponent  {
  status: boolean = false;
  search: boolean = false;
  constructor(){}
  onToggleSideNav() {
    this.status = !this.status;
  }

  onSearchToggle() {
    this.search = !this.search;
  }


}
