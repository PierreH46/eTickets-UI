import { Component, OnInit } from '@angular/core';
import { Eticket } from '@app/model/eticket';
import { BasketService } from '@app/services/basket.service';
import { AuthenticationService } from '@app/services/authentication.service';
import { Customer } from '@app/model/customer';
import { EticketService } from '@app/services/eticket.service';
import { TypePrice } from '@app/model/rate';
import { Router } from '@angular/router';
import { RelativeService } from '@app/services/relative.service';
import { Relative } from '@app/model/relative';
import { FormGroup, FormControl } from '@angular/forms';

interface Info {
  eticket: Eticket;
  rateTypePrice: TypePrice;
  choicePrice: number;
  emailRelative: string;
  quantity: number;

  }

@Component({
  selector: 'app-details-commande',
  templateUrl: './details-commande.component.html',
  styles: []
})

export class DetailsCommandeComponent implements OnInit {

  relativeForm = new FormGroup({
    id : new FormControl(''),
    lastname : new FormControl(''),
    firstname : new FormControl(''),
    email : new FormControl(''),
    phoneNumber : new FormControl('')
  });

   get id() { return this.relativeForm.get('id'); }
  get lastname() { return this.relativeForm.get('lastname'); }
  get firstname() { return this.relativeForm.get('firstname'); }
  get email() { return this.relativeForm.get('email'); }
  get phoneNumber() { return this.relativeForm.get('phoneNumber'); }


  // tableau de commande initialisé à vide
  eticketInfo: Array<{ eticket: Eticket, rateTypePrice: TypePrice,
                      choicePrice: number, emailRelative: string, quantity: number  }> = [];
  infoTicket: Info;
  totalAmount: number;
  totalEtickets: number;
  customer: Customer;
  emailRelative: string;
  relative: Relative;

  constructor(private basketService: BasketService, private autent: AuthenticationService,
              private eticketService: EticketService, private route: Router,
              private relativeService: RelativeService) { }

  ngOnInit() {
    this.eticketInfo = this.basketService.eticketInfo;
    this.infoTicket = this.eticketInfo[0];
    this.totalEtickets = this.basketService.totalEtickets;
    this.customer = this.autent.currentUserValue;
    this.emailRelative = this.infoTicket.emailRelative;
    if (this.emailRelative) {

      this.relativeService.getRelativeByMail(this.customer.id, this.emailRelative).subscribe( (relative) => {
  this.relative = relative;

  this.relativeForm.controls['id'].setValue(this.relative.id);
  this.relativeForm.controls['lastname'].setValue(this.relative.lastname);
  this.relativeForm.controls['firstname'].setValue(this.relative.firstname);
  this.relativeForm.controls['email'].setValue(this.relative.email);
  this.relativeForm.controls['phoneNumber'].setValue(this.relative.phoneNumber);
} );
  }

  }
  //  calcul du montant total du basket
  getTotalAmount() {
    return this.basketService.totalAmount;
  }

discardBasket() {
  return this.basketService.initBasket();
}
}


