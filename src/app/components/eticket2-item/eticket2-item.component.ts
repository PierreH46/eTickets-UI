import { Component, OnInit, Input } from '@angular/core';
import { TypePrice, Rate } from '@app/model/rate';
import { Eticket } from '@app/model/eticket';
import { Customer, Profil } from '@app/model/customer';
import { BasketService } from '@app/services/basket.service';
import { AuthenticationService } from '@app/services/authentication.service';
import { CustomerService } from '@app/services/customer.service';

interface AddToBasketButton {
  price: number;
  typePrice: TypePrice;
  numEtickets: number;
}
interface AddBasketButton2 {
  price: number;
  typePrice: TypePrice;
  quantity: number;
}

@Component({
  selector: 'app-eticket2-item',
  templateUrl: './eticket2-item.component.html',
  styles: []
})
export class Eticket2ItemComponent implements OnInit {

  @Input() eticket: Eticket;
  @Input() emailRelative: string;
  customer: Customer;

  // Propriété contenant la liste de tous les boutons à afficher
  AddBasketButton2: AddBasketButton2[] = [];

  constructor(private basketService: BasketService,
              private autent: AuthenticationService,
              private customerService: CustomerService) { }

  ngOnInit() {
    // ToDO - initialiser numEtickets avec le panier !!
    this.customer = this.autent.currentUserValue;
    this.AddBasketButton2 = this.eticket.rates
      // Garde uniquement les rates correspondant au profil customer (internal ou external) ou à la relative
      .filter(rate =>
        (this.emailRelative !== null)
        ? isRelative(rate) :
        (this.customer.profil === Profil.EXTERNAL ? isExternal(rate) : isInternal(rate)))

             // Transforme chaque "rate" en infos pour afficher le bouton correspondant
      .map(rate => ({
        price: rate.price,
        typePrice: rate.typePrice,
        quantity: 0,
      }));
  }

  add2(rateTypePrice: TypePrice, choicePrice: number,  event: Event) {
    event.stopPropagation();
    //  Incrémente le compteur affiché dans l'UI
    const index = this.AddBasketButton2.findIndex(button => button.typePrice === rateTypePrice);
    this.AddBasketButton2[index].quantity++;

    // Ajoute le ticket au panier
    this.basketService.addEticketMix(this.eticket, rateTypePrice, choicePrice, this.emailRelative);
  }

  remove2(rateTypePrice: TypePrice, choicePrice: number, event: Event) {
    event.stopPropagation();

    // Décrémente le compteur affiché dans l'UI
    const index = this.AddBasketButton2.findIndex(button => button.typePrice === rateTypePrice);
    this.AddBasketButton2[index].quantity--;

    // Ajoute le ticket au panier
    this.basketService.removeEticketMix(this.eticket, rateTypePrice, choicePrice);
  }
}
// Fonction aiguillage pour le choix du TypePrice (externe, interne ou relative)
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

function isRelative(rate: Rate): boolean {
  return (rate.typePrice === TypePrice.RELATIVE_ADULT_PRICE) ||
         (rate.typePrice === TypePrice.RELATIVE_CHILD_PRICE) ||
         (rate.typePrice === TypePrice.RELATIVE_UNIQUE_PRICE);
}
