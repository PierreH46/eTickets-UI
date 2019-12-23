import { Component, OnInit, Input } from '@angular/core';
import { Eticket } from '../model/eticket';

@Component({
  selector: 'app-eticket-item',
  templateUrl: './eticket-item.component.html',
  styles: []
})
export class EticketItemComponent implements OnInit {

  @Input() eticket: Eticket;
  
  constructor() { }

  ngOnInit() {
  }

}
