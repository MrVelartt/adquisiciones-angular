import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdquisicionesService, Adquisicion } from '../adquisicion.service';

@Component({
  selector: 'app-adquisiciones',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './adquisiciones.component.html'
})
export class AdquisicionesComponent implements OnInit {
  adquisiciones: Adquisicion[] = [];
  filtro: string = '';

  constructor(
    private svc: AdquisicionesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.svc.getAll().subscribe({
      next: list => {
        this.adquisiciones = list
          .filter(a => a.activa)
          .sort((a, b) => a.id - b.id);
      },
      error: () => {}
    });
  }
  
  crear(): void {
    this.router.navigate(['/adquisiciones/nuevo']);
  }

  editar(id: number): void {
    this.router.navigate(['/adquisiciones/editar', id]);
  }

  desactivar(id: number): void {
    this.svc.deactivate(id).subscribe({
      next: () => {
        this.load();
      },
      error: () => {}
    });
  }

  historial(id: number): void {
    this.router.navigate(['/adquisiciones', id, 'historial']);
  }

  ejecutarAccion(accion: string, id: number): void {
    switch (accion) {
      case 'editar':
        this.editar(id);
        break;
      case 'desactivar':
        this.desactivar(id);
        break;
      case 'historial':
        this.historial(id);
        break;
      default:
 
        break;
    }
  }

  get adquisicionesFiltradas(): Adquisicion[] {
    const f = this.filtro.toLowerCase();
    return this.adquisiciones.filter(a =>
      a.proveedor.toLowerCase().includes(f) ||
      a.tipo_bien_servicio.toLowerCase().includes(f) ||
      a.unidad.toLowerCase().includes(f)
    );
  }
}
