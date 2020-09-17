import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TradeComponent } from './trade/trade.component';
import { SurvivorListComponent } from './survivor-list/survivor-list.component';
import { GlobalReportsComponent } from './global-reports/global-reports.component';
import { CreateEditSurvivorComponent } from './create-edit-survivor/create-edit-survivor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: GlobalReportsComponent
  },
  {
    path: 'add',
    component: CreateEditSurvivorComponent
  },
  {
    path: 'survivors/:id',
    component: CreateEditSurvivorComponent
  },
  {
    path: 'survivors',
    component: SurvivorListComponent
  },
  {
    path: 'trade',
    component: TradeComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule { }
