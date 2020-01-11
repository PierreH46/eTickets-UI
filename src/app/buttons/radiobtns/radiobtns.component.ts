import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-radiobtns',
  templateUrl: './radiobtns.component.html',
  styles: []
})
export class RadiobtnsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  private selectedLink: string="Adult";

  setradio(e: string): void
{

      this.selectedLink = e;

}

  isSelected(name: string): boolean
{

      if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown
          return false;
}

      return (this.selectedLink === name); // if current radio button is selected, return true, else return false
  }
}
