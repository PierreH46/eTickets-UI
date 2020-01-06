import { Component, OnInit, Input } from '@angular/core';
import { Eticket } from '../model/eticket';
import { BasketService } from '../services/basket.service';
import { Customer, Profil } from '@app/model/customer';
import { Rate, PriceType } from '@app/model/rate';

const customr = {
  id: '12',
  lastname: 'toto',
  firstname: 'titi',
  profil: Profil.EXTERNAL,
  email: 'ludo@gmail.com',
  phoneNumber: '0671878998',
  adress: {
      num: 6,
      street: 'rue docteur Strauss',
      postalCode: 98500,
      city: 'ORION'
    },
  relatives: [
      {
        id: '1',
        lastname: 'GENE_Ludo_1',
        firstname: 'CARLOTTINE',
        email: 'genev@gmail.com',
        phoneNumber: '0671872457'
      },
      {
        id: '2',
        lastname: 'MORILLE_Ludo_1',
        firstname: 'LUDOVIC',
        email: 'MORILLE@gmail.com',
        phoneNumber: '0674552457'
      }
    ],
    password: 'password'
};

@Component({
  selector: 'app-eticket-item',
  templateUrl: './eticket-item.component.html',
  styles: []
})
export class EticketItemComponent implements OnInit {

  @Input() eticket: Eticket;
  // @Input() customer: Customer;
  customer: Customer;
  numEticketItem: number;
  profilRates: Rate[] = [];
  adultRate: Rate = null;
  childRate: Rate = null;
  uniqueRate: Rate = null;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.numEticketItem = 0; // ToDO - initialiser avec le panier !!

    // this.customer.profil = Profil.EXTERNAL;
    this.customer = customr;

    if (this.customer.profil === Profil.EXTERNAL) {
      this.profilRates = this.eticket.rates.filter(
        rate => (rate.typePrice === PriceType.EXTERNAL_ADULT_PRICE) ||
                (rate.typePrice === PriceType.EXTERNAL_CHILD_PRICE) ||
                (rate.typePrice === PriceType.EXTERNAL_UNIQUE_PRICE)
      );
      console.log('profilRates : ');
      console.log(this.profilRates);
      /*
      var mySubString = str.substring(
        str.lastIndexOf(":") + 1, 
        str.lastIndexOf(";")
        */

    } else {
      this.profilRates = this.eticket.rates.filter(
        rate => (rate.typePrice === PriceType.INTERNAL_ADULT_PRICE) ||
                (rate.typePrice === PriceType.INTERNAL_CHILD_PRICE) ||
                (rate.typePrice === PriceType.INTERNAL_UNIQUE_PRICE)
      );
      console.log('profilRates : ');
      console.log(this.profilRates);
    };


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
