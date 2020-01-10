import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

import { Customer } from './model/customer';
import { BasketService } from './services/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eTickets-UI';
  currentUser: Customer;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private basketService: BasketService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      this.basketService.initBasket();
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
