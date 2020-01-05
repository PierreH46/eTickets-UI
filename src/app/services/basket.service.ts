import { Injectable } from '@angular/core';
import { Eticket } from '../model/eticket';
import { EticketService } from './eticket.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  eticketInfo: Array<{ eticket: Eticket, quantity: number; }> = []; // tableau initialisé à vide
  totalAmount: number;
  totalEtickets: number;

  constructor(private eticketService: EticketService) {
    this.initBasket();
   }

  addEticket(eticket: Eticket, qty: number = 1) {
    // le produit en cours est-il déjà dans le panier ? à quelle position pour pouvoir le mettre à jour
    const index = this.eticketInfo.findIndex(pInfo => pInfo.eticket.id === eticket.id);

    if (index !== -1) { // trouvé
      // const pInfo = this.eticketInfo[index]; // produit + quantité
      this.eticketInfo[index].quantity += qty;
    } else { // pas trouvé
      this.eticketInfo.push( {eticket, quantity: qty});
    }

    // incremente le nombre total d'articles et recalcule le montant total
    this.totalEtickets += qty;
    // @TODO : this.totalAmount = this.totalAmount + (qty * eticket.price);

    // @TODO : enregistre le panier

  }

  removeEticket(eticket: Eticket) {
    // le produit en cours est-il déjà dans le panier ? à quelle position pour pouvoir le mettre à jour
    const index = this.eticketInfo.findIndex(pInfo => pInfo.eticket.id === eticket.id);
    if (index !== -1) { // trouvé
      this.eticketInfo[index].quantity--;
      if (this.eticketInfo[index].quantity === 0) {
        this.eticketInfo.splice(index, 1);
      }
    }
    // decremente le nombre total d'articles et recalcule le montant total
    this.totalEtickets--;
    // @TODO : this.totalAmount = this.totalAmount - eticket.price;

    // @TODO : enregistre le panier

  }

  initBasket() {
    this.eticketInfo = [];
    this.totalAmount = 0;
    this.totalEtickets = 0;
  }
}
