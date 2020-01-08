import { Component, OnInit } from '@angular/core';
import { Eticket } from '@app/model/eticket';
import { BasketService } from '@app/services/basket.service';
import { Basket } from '@app/model/basket';

@Component({
  selector: 'app-basket-detail',
  templateUrl: './basket-detail.component.html',
  styles: []
})
export class BasketDetailComponent implements OnInit {

  eticketInfo: Array<{ eticket: Eticket, rateTypePrice: string, choicePrice: number, quantity: number; }> = []; // tableau initialisé à vide
  totalAmount: number;
  totalEtickets: number;
  basket: Basket;
  customerId = 999;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.eticketInfo = this.basketService.eticketInfo;
    this.totalEtickets = this.basketService.totalEtickets;
  }

  getTotalAmount() {
    return this.basketService.totalAmount;
  }
  add(eticket: Eticket, rateTypePrice: string, choicePrice: number, event: Event) {
    event.stopPropagation(); // bloqué la propagation du au fait d'avoir mis
    //      [routerLink]="['/eticket', eticket.slug]" sur la <div> mère
    //      au lieu de <img> - pas propre => solution navigate ou
    //      choisir que seule la photo permettra de passer à DetailEticket

    // Ajoute le ticket au panier
    this.basketService.addEticketMix(eticket, rateTypePrice, choicePrice);
    console.log('add', this.eticketInfo.length);
  }

  remove(eticket: Eticket, rateTypePrice: string, choicePrice: number, event: Event) {
    event.stopPropagation();

    // retire le ticket du panier
    this.basketService.removeEticketMix(eticket, rateTypePrice, choicePrice);
    console.log('min', this.eticketInfo.length);
  }

  validBasket() {

    this.eticketInfo.forEach (c =>
          {this.basket.price = c.choicePrice;
           this.basket.quantity = c.quantity;
           this.basket.reference = c.eticket.name;

           this.basketService.addBasket( this.basket, this.customerId ).subscribe(
            () => {
            console.log('Suceees creation');
            },
            (error) => {
              console.log('une erreur est arrive : ' + error.error[0] + this.gestionError(error.error[0]));
            },
          );

  });
}
gestionError(erreur: string) {
  if (erreur === 'ERR_0004') { // pas de prénom
    return ' il faut un prénom';
  }
  if (erreur === 'ERR_0005') { // pas de nom
    return ' il faut un nom';
  }
}
}
