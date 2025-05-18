import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdquisicionesComponent } from './adquisiciones/adquisiciones.component';
import { AdquisicionFormComponent } from './adquisicion-form/adquisicion-form.component';

@NgModule({
  declarations: [
    AdquisicionesComponent,
    AdquisicionFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AdquisicionesModule { }
