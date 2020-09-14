import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { InputComponent } from './input/input.component';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './button/button.component';
import { FooterComponent } from './footer/footer.component';
import { SectionTitleComponent } from './section-title/section-title.component';

@NgModule({
  declarations: [
    InputComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    SectionTitleComponent
  ],
  exports: [
    InputComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    SectionTitleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})

export class SharedModule { }
