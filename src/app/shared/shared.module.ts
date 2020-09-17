import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';
import { AgmCoreModule } from '@agm/core';
import { SelectDropDownModule } from 'ngx-select-dropdown';

import { MapComponent } from './map/map.component';
import { InputComponent } from './input/input.component';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './button/button.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ReportModalComponent } from './report-modal/report-modal.component';
import { SectionTitleComponent } from './section-title/section-title.component';
import { ConditionToggleComponent } from './condition-toggle/condition-toggle.component';

@NgModule({
  declarations: [
    MapComponent,
    InputComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    LoaderComponent,
    DropdownComponent,
    InventoryComponent,
    ReportModalComponent,
    SectionTitleComponent,
    ConditionToggleComponent
  ],
  exports: [
    MapComponent,
    InputComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    LoaderComponent,
    DropdownComponent,
    InventoryComponent,
    ReportModalComponent,
    SectionTitleComponent,
    ConditionToggleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    NgxMaskModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.mapApiKey,
      libraries: ['places', 'geometry']
    }),
  ]
})

export class SharedModule { }
