import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EticketsListComponent } from './components/etickets-list/etickets-list.component';
import { EticketItemComponent } from './components/eticket-item/eticket-item.component';
import { BasketIconComponent } from './buttons/basket-icon/basket-icon.component';
import { UserIconComponent } from './buttons/user-icon/user-icon.component';
import { RadiobtnsComponent } from './buttons/radiobtns/radiobtns.component';
import { BasicAuthInterceptor } from './helpers/basic-auth.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { LoginComponent } from './login/login.component';
import { BasketDetailComponent } from './components/basket-detail/basket-detail.component';
import { RelativeListComponent } from './components/relative-list/relative-list.component';
import { RelativeFormComponent } from './components/relative-form/relative-form.component';
import {TableModule} from 'primeng/table';
import { BasketIconRelativeComponent } from './buttons/basket-icon-relative/basket-icon-relative.component';
import { Eticket2ItemComponent } from './components/eticket2-item/eticket2-item.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { ButtonGotoEticketlistComponent } from './buttons/button-goto-eticketlist/button-goto-eticketlist.component';
import { Login2Component } from './login2/login2.component';
import { EticketDetailComponent } from './components/eticket-detail/eticket-detail.component';
import { DetailsCommandeComponent } from './components/details-commande/details-commande.component';


@NgModule({
  declarations: [
    AppComponent,
    EticketsListComponent,
    EticketItemComponent,
    BasketIconComponent,
    UserIconComponent,
    LoginComponent,
    RadiobtnsComponent,
    BasketDetailComponent,
    RelativeListComponent,
    RelativeFormComponent,
    BasketIconRelativeComponent,
    Eticket2ItemComponent,
    CustomerDetailComponent,
    ButtonGotoEticketlistComponent,
    Login2Component,
    EticketDetailComponent,
    DetailsCommandeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TableModule
  ],
  providers: [
    // { provide: 'BACKEND_URL', useValue: 'http://localhost:3004'}, // JsonServer
    { provide: 'BACKEND_URL', useValue: 'http://localhost:8080'},
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
