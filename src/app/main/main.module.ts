import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { SharedModule } from './../shared/shared.module';
import { TradeComponent } from './trade/trade.component';
import { MainRoutingModule } from './main-routing.module';
import { FilterComponent } from './survivor-list/filter/filter.component';
import { SurvivorListComponent } from './survivor-list/survivor-list.component';
import { TradeOfferComponent } from './trade/trade-offer/trade-offer.component';
import { PriceTableComponent } from './trade/price-table/price-table.component';
import { DataCardComponent } from './global-reports/data-card/data-card.component';
import { GlobalReportsComponent } from './global-reports/global-reports.component';
import { CreateEditSurvivorComponent } from './create-edit-survivor/create-edit-survivor.component';

@NgModule({
  declarations: [
    TradeComponent,
    FilterComponent,
    DataCardComponent,
    PriceTableComponent,
    TradeOfferComponent,
    SurvivorListComponent,
    GlobalReportsComponent,
    CreateEditSurvivorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    NgxMaskModule.forRoot()
  ]
})

export class MainModule { }
