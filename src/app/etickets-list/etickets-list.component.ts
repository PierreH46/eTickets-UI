import { Component, OnInit } from '@angular/core';
import { Eticket, Category } from '../model/eticket';
import { EticketService } from '../services/eticket.service';

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


  constructor(private eticketService: EticketService) { }


  ngOnInit() {
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
