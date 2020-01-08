import { Component, OnInit } from '@angular/core';
import { Relative } from '@app/model/relative';
import { RelativeService } from '@app/services/relative.service';

@Component({
  selector: 'app-relative-list',
  templateUrl: './relative-list.component.html',
  styles: []
})
export class RelativeListComponent implements OnInit {

  relatives: Relative[] = [];
  customerId = 999;

  constructor(private relativeService: RelativeService) { }

  ngOnInit() {
    this.relativeService.getAllRelatives(this.customerId).subscribe( (toto) => {
      this.relatives = toto;
      console.log(this.customerId);
      });

  }

}
