import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EticketsListComponent } from './components/etickets-list/etickets-list.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { BasketDetailComponent } from './components/basket-detail/basket-detail.component';
import { RelativeListComponent } from './components/relative-list/relative-list.component';
import { RelativeFormComponent } from './components/relative-form/relative-form.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { DetailsCommandeComponent } from './components/details-commande/details-commande.component';




const routes: Routes = [

  { path: '', component: EticketsListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'listeRelative', component: RelativeListComponent },
  { path: 'nouveauRelative', component: RelativeFormComponent },
  { path: 'panier', component: BasketDetailComponent },
  { path: 'client', component: CustomerDetailComponent },
  {path: 'modifier/:email', component: RelativeFormComponent},
  {path: 'liste/:email', component: EticketsListComponent},
  {path: 'commande', component: DetailsCommandeComponent},
        // otherwise redirect to home
  { path: '**', redirectTo: '' }
//  {path: '', redirectTo: 'etickets', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
