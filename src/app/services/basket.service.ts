import { Injectable } from '@angular/core';
import { Eticket } from '../model/eticket';
import { EticketService } from './eticket.service';
import { Basket } from '@app/model/basket';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Customer } from '@app/model/customer';
import { TypePrice } from '@app/model/rate';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

// tableau initialisé à vide
  eticketInfo: Array<{ eticket: Eticket, rateTypePrice: TypePrice,
                    choicePrice: number, quantity: number, relativeName: string }> = [];
  totalAmount: number;
  totalEtickets: number;
  isValid: boolean;
  relateName: string;

  constructor(private eticketService: EticketService, private http: HttpClient,
              private autent: AuthenticationService) {
    this.initBasket();
    this.isValid = false;
   }

  addEticketMix(eticket: Eticket, rateTypePrice: TypePrice, choicePrice: number, qty: number = 1) {
    // le produit en cours est-il déjà dans le panier ? à quelle position pour pouvoir le mettre à jour
    const index = this.eticketInfo.findIndex(pInfo =>
      ((pInfo.eticket.id === eticket.id) && (pInfo.rateTypePrice === rateTypePrice)));

    if (index !== -1) { // trouvé
      // const pInfo = this.eticketInfo[index]; // produit + quantité
      this.eticketInfo[index].quantity += qty;
    } else { // pas trouvé
      this.eticketInfo.push( {eticket, rateTypePrice, choicePrice, quantity: qty, relativeName: eticket.id });
    }

    // incremente le nombre total d'articles et recalcule le montant total
    this.totalEtickets += qty;
    this.totalAmount = this.totalAmount + (qty * choicePrice);

    // : enregistre le panier
    this.saveBasket();

  }

  removeEticketMix(eticket: Eticket, rateTypePrice: TypePrice, choicePrice: number) {
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

  // Renvoie le nb d'unités dans le panier pour un produit précis
  getNumForEticket(eticketId: string,rateTypePrice: TypePrice): number {
    console.log('typePrice', rateTypePrice);
    console.log('pinfo', this.eticketInfo);
    const index = this.eticketInfo.findIndex(pInf =>
      ((pInf.eticket.id === eticketId) && (pInf.rateTypePrice === rateTypePrice)));
    if (index !== -1) { // trouvé
      console.log('quantity',this.eticketInfo[index].quantity );
      return this.eticketInfo[index].quantity;
      } else { return 0; }
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
    this.isValid = false;

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
