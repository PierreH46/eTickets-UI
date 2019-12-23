import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EticketsListComponent } from './etickets-list/etickets-list.component';
import { EticketItemComponent } from './eticket-item/eticket-item.component';

@NgModule({
  declarations: [
    AppComponent,
    EticketsListComponent,
    EticketItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    // { provide: 'BACKEND_URL', useValue: 'http://localhost:3005'} // JsonServer
    { provide: 'BACKEND_URL', useValue: 'http://localhost:8080'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
