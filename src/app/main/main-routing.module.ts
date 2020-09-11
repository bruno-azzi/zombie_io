import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurvivorListComponent } from './survivor-list/survivor-list.component';
import { GlobalReportsComponent } from './global-reports/global-reports.component';
import { CreateEditSurvivorComponent } from './create-edit-survivor/create-edit-survivor.component';

const routes: Routes = [
  {
    path: '',
    component: GlobalReportsComponent
  },
  {
    path: 'add',
    component: CreateEditSurvivorComponent
  },
  {
    path: 'list',
    component: SurvivorListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule { }
