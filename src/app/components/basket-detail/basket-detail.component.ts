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
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket-detail',
  templateUrl: './basket-detail.component.html',
  styles: []
})
export class BasketDetailComponent implements OnInit {

  // tableau de commande initialisé à vide
  eticketInfo: Array<{ eticket: Eticket, rateTypePrice: TypePrice,
                      choicePrice: number, emailRelative: string, quantity: number  }> = [];
  totalAmount: number;
  totalEtickets: number;
  basket: Basket;
  rate: RateDTO;
  rate2: Rate2;
  customer: Customer;
  date = new Date();
  newStock: number;
  eticketUp: Eticket;
  listeRate: RateDTO[];
  emailR: string;
  quantityKO: number;
  nameKO: string;
  rateTypePriceKO: string;
  verifB: boolean;
  verifBMess: boolean;

  constructor(private basketService: BasketService, private autent: AuthenticationService,
              private eticketService: EticketService, private route: Router) { }

  ngOnInit() {
    this.eticketInfo = this.basketService.eticketInfo;
    this.totalEtickets = this.basketService.totalEtickets;
    this.customer = this.autent.currentUserValue;
    const index = this.eticketInfo.findIndex(e => e.emailRelative !== null);
    if (index !== -1) { // trouvé
      this.emailR = this.eticketInfo[index].emailRelative;
    } else { // non trouvé
      this.emailR = null;
    }
  }

  //  calcul du montant total du basket
  getTotalAmount() {
    return this.basketService.totalAmount;
  }

  // Ajoute le ticket au panier
  add(eticket: Eticket, rateTypePrice: TypePrice, choicePrice: number, emailRelative: string, event: Event) {
    // Ajoute le ticket au panier parle service
    this.basketService.addEticketMix(eticket, rateTypePrice, choicePrice, emailRelative);
    }

    // retire le ticket du panier
  remove(eticket: Eticket, rateTypePrice: TypePrice, choicePrice: number, event: Event) {
    event.stopPropagation();
    // retire le ticket du panier par le service
    this.basketService.removeEticketMix(eticket, rateTypePrice, choicePrice);
    }

    // Vérifie le stock des tickets commandés
    verifBasket() {
      this.verifBMess = false;
      this.verifB = false;
      this.eticketInfo.forEach (c => {
          // récupration du stock
          this.eticketService.getRateFromETicket(c.eticket.id).subscribe(
              (rates) => {
              this.listeRate = rates
        // Garde uniquement les informations correspondant au profil customer (internal ou external) ou relative
                .filter(rate =>
                (c.emailRelative !== null) ? isRelative(rate) :
                (this.customer.profil === Profil.EXTERNAL ? isExternal(rate) : isInternal(rate)));
              const index = this.listeRate.findIndex(e =>
                    (e.typePrice === c.rateTypePrice));
              this.newStock = this.listeRate[index].quantity - c.quantity;
              // vérification en fonction du seuil minimal
              if (this.newStock < 10) {
                this.rateTypePriceKO = c.rateTypePrice;
                this.nameKO = c.eticket.name;
                this.quantityKO = c.quantity;
                this.verifB = false;
                this.verifBMess = true; return; } else {
                  this.verifB = true;
                }
              },
            (error) => {
              console.log('Erreur lors du Get : ' + error.error[0] + this.gestionError(error.error[0]));
              },
            );
    });
  }

  validBasket2() {
      this.eticketInfo.forEach (c => {
    this.basket = new Basket (null, c.quantity, false, c.eticket.category, c.eticket.name,
        c.choicePrice, c.rateTypePrice, this.date, c.emailRelative );
        // persistence du basket
    this.basketService.addBasket(this.basket, this.customer.id).subscribe(
      () => {
        // Mise à jour du stok
                  this.listeRate
      // Garde uniquement les informations correspondant au profil customer (internal ou external) ou relative
                  .filter(rate =>
                  (c.emailRelative !== null) ? isRelative(rate) :
                  (this.customer.profil === Profil.EXTERNAL ? isExternal(rate) : isInternal(rate)));
                  const index = this.listeRate.findIndex(e =>
                    (e.typePrice === c.rateTypePrice));
                  this.newStock = this.listeRate[index].quantity - c.quantity;
                  this.rate2 = new Rate2(c.eticket.name, c.rateTypePrice, c.choicePrice, this.newStock);
                  this.eticketService.updateStockEticket(this.rate2, c.eticket.id, c.rateTypePrice)
                    .subscribe(() => {console.log('Succes modification'); },
                      (error) => {
                        console.log('Erreur lors de l update: ' + error.error[0] + this.gestionError(error.error[0]));
                            },
                        );
                },
            (error) => {
              console.log('Erreur lors de l add Basket : ' + error.error[0] + this.gestionError(error.error[0]));
            },
          );
  });
    this.basketService.isValid = true;
    this.route.navigate(['/commande']);

}

  validBasket() {
    this.eticketInfo.forEach (c => {
    this.basket = new Basket (null, c.quantity, false, c.eticket.category, c.eticket.name,
        c.choicePrice, c.rateTypePrice, this.date, c.emailRelative );

        // persistence du basket
    this.basketService.addBasket(this.basket, this.customer.id).subscribe(
      () => {
        // Mise à jour du stok
             this.eticketService.getRateFromETicket(c.eticket.id).subscribe(
                (rates) => {
                  this.listeRate = rates
      // Garde uniquement les informations correspondant au profil customer (internal ou external) ou relative
                  .filter(rate =>
                  (c.emailRelative !== null) ? isRelative(rate) :
                  (this.customer.profil === Profil.EXTERNAL ? isExternal(rate) : isInternal(rate)));
                  const index = this.listeRate.findIndex(e =>
                    (e.typePrice === c.rateTypePrice));
                  this.newStock = this.listeRate[index].quantity - c.quantity;
                  this.rate2 = new Rate2(c.eticket.name, c.rateTypePrice, c.choicePrice, this.newStock);
                  this.eticketService.updateStockEticket(this.rate2, c.eticket.id, c.rateTypePrice)
                    .subscribe(() => {console.log('Succes modification'); },
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
    this.route.navigate(['/commande']);
}

// Gestin des erreurs
gestionError(erreur: string) {
  if (erreur === 'ERR_0022') { // informations sur le ticket
    return ' Les informations du ticket ne sont pas disponibles';
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
function isRelative(rate: Rate): boolean {
  return (rate.typePrice === TypePrice.RELATIVE_ADULT_PRICE) ||
         (rate.typePrice === TypePrice.RELATIVE_CHILD_PRICE) ||
         (rate.typePrice === TypePrice.RELATIVE_UNIQUE_PRICE);
}

