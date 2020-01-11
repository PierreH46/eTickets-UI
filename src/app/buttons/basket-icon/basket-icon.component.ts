import { Component, OnInit, Input } from '@angular/core';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-basket-icon',
  templateUrl: './basket-icon.component.html',
  styleUrls: ['./basket-icon.component.scss']
})
export class BasketIconComponent implements OnInit {

  @Input() size: 'small' | 'medium' | 'large';

  constructor(private basketService: BasketService) { }

  ngOnInit() {
  }

  getTotalEtickets() {
    return this.basketService.totalEtickets;
  }
}
