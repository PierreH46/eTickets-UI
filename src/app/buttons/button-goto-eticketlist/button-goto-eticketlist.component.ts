import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-goto-eticketlist',
  templateUrl: './button-goto-eticketlist.component.html',
  styles: []
})
export class ButtonGotoEticketlistComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  gotoEticketList(event?: Event) {
    if (event) { event.preventDefault(); }
    this.router.navigate(['']);
  }
}
