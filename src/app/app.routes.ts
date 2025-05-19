// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AdquisicionesComponent } from './adquisiciones/adquisiciones/adquisiciones.component';
import { AdquisicionFormComponent } from './adquisiciones/adquisicion-form/adquisicion-form.component';
import { AdquisicionHistorialComponent } from './adquisiciones/adquisiciones-historial/adquisicion-historial.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'adquisiciones', pathMatch: 'full' },
  { path: 'adquisiciones', component: AdquisicionesComponent },
  { path: 'adquisiciones/nuevo', component: AdquisicionFormComponent },
  { path: 'adquisiciones/editar/:id', component: AdquisicionFormComponent },
  { path: 'adquisiciones/:id/historial', component: AdquisicionHistorialComponent }
];
