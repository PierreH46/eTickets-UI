import { Component, OnInit } from '@angular/core';
import { Eticket } from '@app/model/eticket';
import { BasketService } from '@app/services/basket.service';
import { Basket } from '@app/model/basket';
import { AuthenticationService } from '@app/services/authentication.service';
import { Customer } from '@app/model/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket-detail',
  templateUrl: './basket-detail.component.html',
  styles: []
})
export class BasketDetailComponent implements OnInit {

  // tableau de commande initialisé à vide
  eticketInfo: Array<{ eticket: Eticket, rateTypePrice: string, choicePrice: number, quantity: number; }> = [];
  totalAmount: number;
  totalEtickets: number;
  basket: Basket;
 // basket = new Basket;
  customer: Customer;
  date = new Date();

  constructor(private basketService: BasketService,
              private autent: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.eticketInfo = this.basketService.eticketInfo;
    this.totalEtickets = this.basketService.totalEtickets;
    this.customer = this.autent.currentUserValue;
  }


  //  console.log('dans le basket', customer);
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

  validBasket(event: Event) {
    console.log(this.eticketInfo);
    this.eticketInfo.forEach (c => {
      this.basket = new Basket (null, c.quantity, false, c.eticket.category, c.eticket.name,
        c.choicePrice, /*c.rateTypePrice*/ null, this.date );
      console.log('basket', this.basket);
      console.log('customer', this.customer);

      this.basketService.addBasket( this.basket, this.customer.id ).subscribe(
            () => {console.log('Suceees creation');},
            (error) => {
              console.log('une erreur est arrive : ' + error.error[0] + this.gestionError(error.error[0]));
            },
      );
    });
    // reinitialisation du basket
    this.basketService.initBasket();
    this.router.navigate(['/panier-valide']);
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
