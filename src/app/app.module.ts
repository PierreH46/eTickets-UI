import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EticketsListComponent } from './etickets-list/etickets-list.component';
import { EticketItemComponent } from './eticket-item/eticket-item.component';
import { BasketIconComponent } from './basket-icon/basket-icon.component';
import { UserIconComponent } from './user-icon/user-icon.component';
import { RadiobtnsComponent } from './radiobtns/radiobtns.component';
import { LoginComponent } from './login/login.component';
import { ApiService } from './services/api.service';
import { TokenInterceptor } from './helpers/interceptor';



@NgModule({
  declarations: [
    AppComponent,
    EticketsListComponent,
    EticketItemComponent,
    BasketIconComponent,
    UserIconComponent,
    LoginComponent,
    RadiobtnsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ApiService,
    { provide: 'BACKEND_URL', useValue: 'http://localhost:3004'}, // JsonServer
    // { provide: 'BACKEND_URL', useValue: 'http://localhost:8080'}
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    //fakeBackendProvider

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
