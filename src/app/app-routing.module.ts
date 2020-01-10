import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EticketsListComponent } from './etickets-list/etickets-list.component';
//import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './login/login.component';




const routes: Routes = [
  { path: '', component: EticketsListComponent},//, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
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
