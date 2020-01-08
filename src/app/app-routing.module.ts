import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EticketsListComponent } from './components/etickets-list/etickets-list.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { BasketDetailComponent } from './components/basket-detail/basket-detail.component';
import { RelativeListComponent } from './components/relative-list/relative-list.component';
import { RelativeFormComponent } from './components/relative-form/relative-form.component';




const routes: Routes = [
  { path: '', component: EticketsListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'listeRelative', component: RelativeListComponent },
  { path: 'nouveauRelative', component: RelativeFormComponent },
  { path: 'panier', component: BasketDetailComponent },
        // otherwise redirect to home
  { path: '**', redirectTo: '' }
//  {path: '', redirectTo: 'etickets', pathMatch: 'full' },
//  {path: 'etickets', component: EticketsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
