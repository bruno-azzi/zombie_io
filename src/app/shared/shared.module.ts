import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

import { MapComponent } from './map/map.component';
import { InputComponent } from './input/input.component';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './button/button.component';
import { FooterComponent } from './footer/footer.component';
import { SectionTitleComponent } from './section-title/section-title.component';
import { ConditionToggleComponent } from './condition-toggle/condition-toggle.component';

@NgModule({
  declarations: [
    MapComponent,
    InputComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    SectionTitleComponent,
    ConditionToggleComponent
  ],
  exports: [
    MapComponent,
    InputComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    SectionTitleComponent,
    ConditionToggleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapApiKey,
      libraries: ['places', 'geometry']
    }),
    ReactiveFormsModule
  ]
})

export class SharedModule { }
