import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/services/authentication.service';
import { Customer } from '@app/model/customer';
import { Relative } from '@app/model/relative';
import { RelativeService } from '@app/services/relative.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styles: []
})
export class CustomerDetailComponent implements OnInit {

  customer: Customer;
  relatives: Relative[] = [];
  relative: Relative;

  constructor(private autent: AuthenticationService,
              private router: Router,
              private relativeService: RelativeService ) { }

  ngOnInit() {
    this.customer = this.autent.currentUserValue;
    this.relativeService.getAllRelatives(this.customer.id).subscribe( (relative) => {
      this.relatives = relative;
      console.log(this.customer.id, this.relatives);
      });
  }

  gotoRelativeForm(event?: Event) {
    if (event) { event.preventDefault(); }
    this.router.navigate(['/nouveauRelative']);
  }

  gotoEticketList(event?: Event) {
    if (event) { event.preventDefault(); }
    this.router.navigate(['']);
  }

  onDelete(email: string, event?: Event) {
    event.stopPropagation();
    this.relativeService.deleteRelativeByMail(this.customer.id, email).subscribe(
      () => {
      this.router.navigate(['/client']);
      },
      (error) => {
        console.log('une erreur est arrive : ' + error.error[0] );
      },
    );
  }
}
