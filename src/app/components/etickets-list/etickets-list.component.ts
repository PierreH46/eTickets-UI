import { Component, OnInit } from '@angular/core';
import { Eticket, Category } from '../../model/eticket';
import { EticketService } from '../../services/eticket.service';
import { BasketService } from '@app/services/basket.service';
import { Eticket2 } from '@app/model/eticket2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-etickets-list',
  templateUrl: './etickets-list.component.html',
  styles: []
})
export class EticketsListComponent implements OnInit {

  etickets: Eticket[];

  cinemaEtickets: Eticket[];
  loisirsEtickets: Eticket[];
  theatreEtickets: Eticket[];
  concertEtickets: Eticket[];
  emailMap: string;


  constructor(private eticketService: EticketService, private basketService: BasketService,
              private route: ActivatedRoute) { }

  ngOnInit() {
  //  if (this.basketService.isValid) {
  //    return this.basketService.initBasket();
  //  }

 // Recherche information sur la relative par l'email envoyé pour la modification

 this.emailMap = this.route.snapshot.paramMap.get('email');
 console.log('email relative', this.emailMap);

 this.eticketService.getAllEtickets()
      .subscribe(listEtickets => {
        this.etickets = listEtickets;
        this.cinemaEtickets = this.etickets.filter(e => e.category === Category.CINEMA);
        this.loisirsEtickets = this.etickets.filter(e => e.category === Category.LOISIRS);
        this.theatreEtickets = this.etickets.filter(e => e.category === Category.THEATRE);
        this.concertEtickets = this.etickets.filter(e => e.category === Category.CONCERT);
      });
  }
}
