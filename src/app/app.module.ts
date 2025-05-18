import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AdquisicionesModule } from './adquisiciones/adquisiciones.module';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    // otros componentes globales
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AdquisicionesModule,
    ReactiveFormsModule,          // si aún lo necesitas aquí
    // …
  ],
  providers: [
    provideHttpClient(withFetch()) // ← nuevo proveedor funcional
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
