import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { SurvivorListComponent } from './survivor-list/survivor-list.component';
import { GlobalReportsComponent } from './global-reports/global-reports.component';
import { CreateEditSurvivorComponent } from './create-edit-survivor/create-edit-survivor.component';

@NgModule({
  declarations: [
    SurvivorListComponent,
    GlobalReportsComponent,
    CreateEditSurvivorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule
  ]
})

export class MainModule { }
