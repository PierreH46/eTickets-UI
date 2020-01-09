import { Injectable } from '@angular/core';
import { Eticket } from '../model/eticket';
import { EticketService } from './eticket.service';
import { Basket } from '@app/model/basket';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Customer } from '@app/model/customer';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  eticketInfo: Array<{ eticket: Eticket, rateTypePrice: string, choicePrice: number, quantity: number; }> = []; // tableau initialisé à vide
  totalAmount: number;
  totalEtickets: number;

  constructor(private eticketService: EticketService, private http: HttpClient,
              private autent: AuthenticationService) {
    this.initBasket();
   }

  addEticketMix(eticket: Eticket, rateTypePrice: string, choicePrice: number, qty: number = 1) {
    // le produit en cours est-il déjà dans le panier ? à quelle position pour pouvoir le mettre à jour
    const index = this.eticketInfo.findIndex(pInfo =>
      ((pInfo.eticket.id === eticket.id) && (pInfo.rateTypePrice === rateTypePrice)));

    if (index !== -1) { // trouvé
      // const pInfo = this.eticketInfo[index]; // produit + quantité
      this.eticketInfo[index].quantity += qty;
    } else { // pas trouvé
      this.eticketInfo.push( {eticket, rateTypePrice, choicePrice, quantity: qty});
    }

    // incremente le nombre total d'articles et recalcule le montant total
    this.totalEtickets += qty;
    this.totalAmount = this.totalAmount + (qty * choicePrice);

    // : enregistre le panier
    this.saveBasket();

  }

  removeEticketMix(eticket: Eticket, rateTypePrice: string, choicePrice: number) {
    // le produit en cours est-il déjà dans le panier ? à quelle position pour pouvoir le mettre à jour
    const index = this.eticketInfo.findIndex(pInfo =>
      ((pInfo.eticket.id === eticket.id) && (pInfo.rateTypePrice === rateTypePrice)));
    if (index !== -1) { // trouvé
      this.eticketInfo[index].quantity--;
      if (this.eticketInfo[index].quantity === 0) {
        this.eticketInfo.splice(index, 1);
      }
    }
    // decremente le nombre total d'articles et recalcule le montant total
    this.totalEtickets--;
    this.totalAmount = this.totalAmount - choicePrice;

    // : enregistre le panier

    this.saveBasket();
  }

  saveBasket() {
    // - Crée la version sérialisable avec Array.push()
    const storageFriendly: Array<{ eticketId: string, quantity: number; }> = [];
    this.eticketInfo.forEach(pInfo => {
      storageFriendly.push({
        eticketId: pInfo.eticket.id,
        quantity: pInfo.quantity
      });
    });

    // Enregistre dans localStorage
    localStorage.setItem('basket', JSON.stringify(storageFriendly));
  }

  initBasket() {
    this.eticketInfo = [];
    this.totalAmount = 0;
    this.totalEtickets = 0;

    const storedBasket = localStorage.getItem('basket');

 //   if (storedBasket) {   // Y a qqchose dans le storage
 //     const storedCartObj = JSON.parse(storedBasket);
 //     this.eticketService.getAllEtickets().subscribe(etickets => {
 //       storedCartObj.forEach(cartItem => {
 //         const eticket = etickets.find(p => p.id === cartItem.eticketId);
 //         this.addEticketMix(eticket, null, null,  cartItem.quantity);
 //       });
 //       console.log('storedCartObj', storedCartObj);
 //       console.log('this.productInfo', this.eticketInfo);
 //     });
  //  }
  }

 // POST : add a new relative to the server */
addBasket(basket: Basket, customerId: string): Observable<string> {
  return this.http.post<string>('http://localhost:8080/customers/' + customerId +
  '/basket2', basket);
  }

}
