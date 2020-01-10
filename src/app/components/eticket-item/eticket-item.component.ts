import { Component, OnInit, Input } from '@angular/core';
import { Eticket } from '../../model/eticket';
import { BasketService } from '../../services/basket.service';
import { Customer, Profil } from '@app/model/customer';
import { Rate, TypePrice } from '@app/model/rate';
import { AuthenticationService } from '@app/services/authentication.service';


interface AddToBasketButton {
  price: number;
  typePrice: TypePrice;
  numEtickets: number;
}
//interface AddToBasketButton2 {
//  rateAdd: Rate;
//  numEtickets: number;
//}

@Component({
  selector: 'app-eticket-item',
  templateUrl: './eticket-item.component.html',
  styles: []
})
export class EticketItemComponent implements OnInit {

  @Input() eticket: Eticket;
  customer: Customer;
  numTik: number;

  //rateTypePrice: TypePrice;

  // Propriété contenant la liste de tous les boutons à afficher
  addToBasketButtons: AddToBasketButton[] = [];
  //addToBasketButtons2: AddToBasketButton2[] = [];

  constructor(private basketService: BasketService,
              private autent: AuthenticationService) { }

  ngOnInit() {
    // ToDO - initialiser numEtickets avec le panier !!

    this.customer = this.autent.currentUserValue;
    this.addToBasketButtons = this.eticket.rates
      // Garde uniquement les rates correspondant au profil customer (internal ou external)
      .filter(rate => this.customer.profil === Profil.EXTERNAL ? isExternal(rate) : isInternal(rate))
      // Transforme chaque "rate" en infos pour afficher le bouton correspondant
      .map(rate => ({
        price: rate.price,
        typePrice: rate.typePrice,
        numEtickets: 0

      }));
 //   this.addToBasketButtons2 = this.eticket.rates
 //     // Garde uniquement les rates correspondant au profil customer (internal ou external)
 //     .filter(rate => this.customer.profil === Profil.EXTERNAL ? isExternal(rate) : isInternal(rate))
 //     // Transforme chaque "rate" en infos pour afficher le bouton correspondant
 //     .map(rate => ({
 //       price: rate.price,
 //       typePrice: rate.typePrice,
 //       numEtickets: 0
//
//      }));
  }

  add(rateTypePrice: TypePrice, choicePrice: number,  event: Event) {
    event.stopPropagation(); // bloqué la propagation du au fait d'avoir mis
    //      [routerLink]="['/eticket', eticket.slug]" sur la <div> mère
    //      au lieu de <img> - pas propre => solution navigate ou
    //      choisir que seule la photo permettra de passer à DetailEticket

    //  Incrémente le compteur affiché dans l'UI
    const index = this.addToBasketButtons.findIndex(button => button.typePrice === rateTypePrice);
    this.addToBasketButtons[index].numEtickets++;

    // Ajoute le ticket au panier
    this.basketService.addEticketMix(this.eticket, rateTypePrice, choicePrice);
    this.numTik = this.basketService.getNumForEticket(this.eticket.id, rateTypePrice);
    console.log('numTik',this.numTik);
  }

  remove(rateTypePrice: TypePrice, choicePrice: number, event: Event) {
    event.stopPropagation();

    // Décrémente le compteur affiché dans l'UI
    const index = this.addToBasketButtons.findIndex(button => button.typePrice === rateTypePrice);
    this.addToBasketButtons[index].numEtickets--;

    // Ajoute le ticket au panier
    this.basketService.removeEticketMix(this.eticket, rateTypePrice, choicePrice);
    this.numTik = this.basketService.getNumForEticket(this.eticket.id, rateTypePrice);
    console.log('numTik',this.numTik);
  }
}

function isExternal(rate: Rate): boolean {
  return (rate.typePrice === TypePrice.EXTERNAL_ADULT_PRICE) ||
         (rate.typePrice === TypePrice.EXTERNAL_CHILD_PRICE) ||
         (rate.typePrice === TypePrice.EXTERNAL_UNIQUE_PRICE);
}

function isInternal(rate: Rate): boolean {
  return (rate.typePrice === TypePrice.INTERNAL_ADULT_PRICE) ||
         (rate.typePrice === TypePrice.INTERNAL_CHILD_PRICE) ||
         (rate.typePrice === TypePrice.INTERNAL_UNIQUE_PRICE);
}
