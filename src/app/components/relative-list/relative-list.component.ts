import { Component, OnInit } from '@angular/core';
import { Relative } from '@app/model/relative';
import { RelativeService } from '@app/services/relative.service';
import { Customer } from '@app/model/customer';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-relative-list',
  templateUrl: './relative-list.component.html',
  styles: []
})
export class RelativeListComponent implements OnInit {

  relatives: Relative[] = [];
  customer: Customer;

  constructor(private relativeService: RelativeService, private autent: AuthenticationService) {
    this.customer = this.autent.currentUserValue;
  }

  ngOnInit() {
    this.relativeService.getAllRelatives(this.customer.id).subscribe( (relatives) => {
      this.relatives = relatives;
      });

  }

}
