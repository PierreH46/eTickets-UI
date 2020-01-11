import { Component, OnInit } from '@angular/core';
import { Eticket } from '@app/model/eticket';
import { BasketService } from '@app/services/basket.service';
import { Basket } from '@app/model/basket';
import { AuthenticationService } from '@app/services/authentication.service';
import { Customer, Profil } from '@app/model/customer';
import { EticketService } from '@app/services/eticket.service';
import { Rate, TypePrice } from '@app/model/rate';
import { RateDTO } from '@app/model/rate-dto';
import { Rate2 } from '@app/model/rate2';

@Component({
  selector: 'app-basket-detail',
  templateUrl: './basket-detail.component.html',
  styles: []
})
export class BasketDetailComponent implements OnInit {

  // tableau de commande initialisé à vide
  eticketInfo: Array<{ eticket: Eticket, rateTypePrice: TypePrice,
                      choicePrice: number, quantity: number, relativeName: string }> = [];
  totalAmount: number;
  totalEtickets: number;
  basket: Basket;
  // basket = new Basket;
  rate: RateDTO;
  rate2: Rate2;
  customer: Customer;
  date = new Date();
  newStock: number;
  eticketUp: Eticket;
  listeRate: RateDTO[];

  constructor(private basketService: BasketService, private autent: AuthenticationService,
              private eticketService: EticketService) { }

  ngOnInit() {
    this.eticketInfo = this.basketService.eticketInfo;
    this.totalEtickets = this.basketService.totalEtickets;
    this.customer = this.autent.currentUserValue;
  }

  //  console.log('dans le basket', customer);
  getTotalAmount() {
    return this.basketService.totalAmount;
  }
  add(eticket: Eticket, rateTypePrice: TypePrice, choicePrice: number, event: Event) {
    event.stopPropagation(); // bloqué la propagation du au fait d'avoir mis
    //      [routerLink]="['/eticket', eticket.slug]" sur la <div> mère
    //      au lieu de <img> - pas propre => solution navigate ou
    //      choisir que seule la photo permettra de passer à DetailEticket

    // Ajoute le ticket au panier
    this.basketService.addEticketMix(eticket, rateTypePrice, choicePrice);
    }

  remove(eticket: Eticket, rateTypePrice: TypePrice, choicePrice: number, event: Event) {
    event.stopPropagation();

    // retire le ticket du panier
    this.basketService.removeEticketMix(eticket, rateTypePrice, choicePrice);
    }

  validBasket() {
    console.log(this.eticketInfo);
    this.eticketInfo.forEach (c => {
    this.basket = new Basket (null, c.quantity, false, c.eticket.category, c.eticket.name,
        c.choicePrice, c.rateTypePrice, this.date );
    console.log('basket', this.basket);
 //   console.log('basket', this.basket);
 //   console.log('customer', this.customer);
        // persistence du basket
    this.basketService.addBasket(this.basket, this.customer.id).subscribe(
      () => {(console.log('Succes creation'));
        // Mise à jour du stok
             this.eticketService.getRateFromETicket(c.eticket.id).subscribe(
                (rates) => {

                  this.listeRate = rates
      // Garde uniquement les rates correspondant au profil customer (internal ou external)
      .filter(rate1 => this.customer.profil === Profil.EXTERNAL ? isExternal(rate1) : isInternal(rate1));
      // Transforme chaque "rate" en infos pour afficher le bouton correspondant
//      .map(rate2 => ({
//        price: rate2.price,
//        typePrice: rate2.typePrice,
//        quantity: rate2.quantity
//
//      }));
                  console.log('Succes récupration rate');
                  console.log('rates' , this.listeRate);
                  const index = this.listeRate.findIndex(e =>
                    (e.typePrice === c.rateTypePrice));
                  console.log('index' , index);
                  console.log('rate choice' , c.choicePrice );
                  console.log('rate price' ,c.rateTypePrice );
                  console.log('quantity ticket' , c.quantity );
                  console.log('stock ticket' , this.listeRate[index].quantity );
                  this.newStock = this.listeRate[index].quantity - c.quantity;
                  console.log('quantity restant' , this.newStock );
                  this.rate2 = new Rate2(c.rateTypePrice, c.choicePrice, this.newStock);
                  console.log('rate' , this.rate2);

                  this.eticketService.updateStockEticket(this.rate2, c.eticket.id, c.rateTypePrice).subscribe(
                      () => {console.log('Succes modification'); },
                      (error) => {
                        console.log('Erreur lors de l update: ' + error.error[0] + this.gestionError(error.error[0]));
                            },
                        );
                  },
                  (error) => {
                    console.log('Erreur lors du Get : ' + error.error[0] + this.gestionError(error.error[0]));
                  },
                  );
              },
            (error) => {
              console.log('Erreur lors de l add Basket : ' + error.error[0] + this.gestionError(error.error[0]));
            },
          );
  });
    this.basketService.isValid = true;
}
// Gestin des erreurs a faire (regarder library_form_components)
gestionError(erreur: string) {
  if (erreur === 'ERR_0004') { // pas de prénom
    return ' il faut un prénom';
  }
  if (erreur === 'ERR_0005') { // pas de nom
    return ' il faut un nom';
  }
}
discardBasket() {
  return this.basketService.initBasket();
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

