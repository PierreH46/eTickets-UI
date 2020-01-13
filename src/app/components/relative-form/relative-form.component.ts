import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Relative } from '@app/model/relative';
import { RelativeService } from '@app/services/relative.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '@app/model/customer';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-relative-form',
  templateUrl: './relative-form.component.html',
  styleUrls: ['./relative-form.component.scss']
})
export class RelativeFormComponent implements OnInit {

  emailMap: string;

  relativeForm = new FormGroup({
    id : new FormControl(''),
    lastname : new FormControl(''),
    firstname : new FormControl(''),
    email : new FormControl(''),
    phoneNumber : new FormControl('')
  });

  relative: Relative;
  customer: Customer;

  get id() { return this.relativeForm.get('id'); }
  get firstname() { return this.relativeForm.get('lastname'); }
  get lastname() { return this.relativeForm.get('firstname'); }
  get email() { return this.relativeForm.get('email'); }
  get phoneNumber() { return this.relativeForm.get('phoneNumber'); }

  constructor(private relativeService: RelativeService,
              private route: ActivatedRoute, private router: Router,
              private autent: AuthenticationService)   {
                this.customer = this.autent.currentUserValue;
              }

  ngOnInit() {
    // Recherche information sur la relative par l'email envoyé pour la modification

    this.emailMap = this.route.snapshot.paramMap.get('email');

    if ( this.emailMap && this.emailMap !== undefined && this.emailMap !== '') {
  this.relativeService.getRelativeByMail(this.customer.id, this.emailMap).subscribe( (relative) => {
  this.relative = relative;

  this.relativeForm.controls['id'].setValue(this.relative.id);
  this.relativeForm.controls['lastname'].setValue(this.relative.lastname);
  this.relativeForm.controls['firstname'].setValue(this.relative.firstname);
  this.relativeForm.controls['email'].setValue(this.relative.email);
  this.relativeForm.controls['phoneNumber'].setValue(this.relative.phoneNumber);
} );
}
}
  onSubmit() {
    console.warn(this.relativeForm.value);
    console.log(this.relativeForm.value.id);
    console.log(this.relativeForm.value.lastname);
    console.log(this.relativeForm.value.firstname);
    console.log(this.relativeForm.value.email);
    console.log(this.relativeForm.value.phoneNumber);

    const relativeDTO =
    new Relative (
      this.relativeForm.value.id,
      this.relativeForm.value.lastname,
      this.relativeForm.value.firstname,
      this.relativeForm.value.email,
      this.relativeForm.value.phoneNumber
      );

    if (this.emailMap === undefined || this.emailMap === '' || this.emailMap === null) {
       this.relativeService.addRelative( relativeDTO, this.customer.id ).subscribe(
        () => {
         this.router.navigate(['/client']);
        },
        (error) => {
          console.log('une erreur est arrive : ' + error.error[0] + this.gestionError(error.error[0]));
        },
      );
    } else {
      this.relativeService.updateRelativeByMail(relativeDTO, this.customer.id,this.emailMap).subscribe(
      () => {
        this.router.navigate(['/client']);
      },
      (error) => {
        console.log('une erreur est arrive : ' + error.error[0] + this.gestionError(error.error[0]));
      },
    );
    }
  }
  gestionError(erreur: string) {
    if (erreur === 'ERR_0034') {
      return ' Ce proche existe déjà';
    }
  }
  testButton() {
  }
}
