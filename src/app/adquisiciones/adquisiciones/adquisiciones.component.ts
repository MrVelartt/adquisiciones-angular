// src/app/adquisiciones/adquisiciones/adquisiciones.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AdquisicionesService, Adquisicion } from '../adquisicion.service'; // ← ruta corregida

@Component({
  selector: 'app-adquisiciones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './adquisiciones.component.html'
})
export class AdquisicionesComponent implements OnInit {
  adquisiciones: Adquisicion[] = [];

  constructor(
    private svc: AdquisicionesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.svc.getAll().subscribe(list => {
      this.adquisiciones = list.filter(a => a.activa);
      console.log('Adquisiciones activas cargadas:', this.adquisiciones);
      console.log('PRUEBAAA');

    });
  }

  crear(): void {
    console.log('Navegando a creación de nueva adquisición');
    this.router.navigate(['/adquisiciones/nuevo']);
  }

  editar(id: number): void {
    console.log(`Navegando a editar adquisición con id: ${id}`);
    this.router.navigate(['/adquisiciones/editar', id]);
  }

  desactivar(id: number): void {
    console.log(`Desactivando adquisición con id: ${id}`);
    this.svc.deactivate(id).subscribe(() => {
      console.log(`Adquisición con id ${id} desactivada`);
      this.load();
    });
  }
}

