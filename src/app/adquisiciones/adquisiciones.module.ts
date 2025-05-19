import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdquisicionesComponent } from './adquisiciones/adquisiciones.component';
import { AdquisicionFormComponent } from './adquisicion-form/adquisicion-form.component';
import { AdquisicionHistorialComponent } from './adquisiciones-historial/adquisicion-historial.component';

@NgModule({
  declarations: [
    AdquisicionesComponent,
    AdquisicionFormComponent,
    AdquisicionHistorialComponent  
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule 
  ],
  exports: [
    AdquisicionesComponent,
    AdquisicionFormComponent,
    AdquisicionHistorialComponent
  ]
})
export class AdquisicionesModule { }