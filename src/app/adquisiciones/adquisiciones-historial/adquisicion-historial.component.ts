import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AdquisicionesService, Version } from '../adquisicion.service';

@Component({
  selector: 'app-adquisicion-historial',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './adquisicion-historial.component.html',
})
export class AdquisicionHistorialComponent implements OnInit {
  history: Version[] = [];
  adquisicionId!: number;

  constructor(
    private svc: AdquisicionesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.adquisicionId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadHistory();
  }

  private loadHistory(): void {
    this.svc.getHistory(this.adquisicionId).subscribe(
      list => this.history = list,
      err => console.error('Error al cargar historial', err)
    );
  }

  trackById(index: number, item: Version): number {
    return item.id;
  }
}