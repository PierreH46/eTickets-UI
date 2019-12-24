import { Component, OnInit, Input } from '@angular/core';
import { Eticket } from '../model/eticket';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-eticket-item',
  templateUrl: './eticket-item.component.html',
  styles: []
})
export class EticketItemComponent implements OnInit {

  @Input() eticket: Eticket;
  numEticketItem: number;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.numEticketItem = 0; // ToDO - initialiser avec le panier !!
  }

  add(event: Event){
    event.stopPropagation(); // bloqué la propagation du au fait d'avoir mis
    //      [routerLink]="['/eticket', eticket.slug]" sur la <div> mère 
    //      au lieu de <img> - pas propre => solution navigate ou
    //      choisir que seule la photo permettra de passer à DetailEticket
    // increment du compteur affiché
    this.numEticketItem++;
    // appel à la methode du service 
    this.basketService.addEticket(this.eticket);
  };

  remove(event: Event){
    event.stopPropagation();
    this.numEticketItem--;
    this.basketService.removeEticket(this.eticket);
  }

}
