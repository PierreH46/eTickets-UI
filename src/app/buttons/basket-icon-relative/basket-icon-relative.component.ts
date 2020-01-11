import { Component, OnInit } from '@angular/core';
import { BasketService } from '@app/services/basket.service';

@Component({
  selector: 'app-basket-icon-relative',
  templateUrl: './basket-icon-relative.component.html',
  styles: []
})
export class BasketIconRelativeComponent implements OnInit {

  constructor(private basketService: BasketService) { }

  ngOnInit() {
  }
  getTotalEtickets() {
    return this.basketService.totalEtickets;
  }
}

