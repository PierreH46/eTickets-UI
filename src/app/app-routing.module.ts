import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EticketsListComponent } from './etickets-list/etickets-list.component';


const routes: Routes = [
  {path: '', redirectTo: 'etickets', pathMatch: 'full' },
  {path: 'etickets', component: EticketsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
