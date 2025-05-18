// src/app/adquisiciones/adquisiciones.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';  // ← ruta corregida


export interface Adquisicion {
  id: number;
  presupuesto: number;
  unidad: string;
  tipo_bien_servicio: string;   // igual al JSON
  cantidad: number;
  valor_unitario: number;       // igual al JSON
  valor_total: number;          // igual al JSON
  fecha_adquisicion: string;    // igual al JSON
  proveedor: string;
  documentacion: string;
  activa: boolean;               // igual al JSON
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

@Injectable({ providedIn: 'root' })
export class AdquisicionesService {
  private base = `${environment.apiUrl}/acquisitions`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Adquisicion[]> {
    return this.http.get<Adquisicion[]>(`${this.base}/`);
  }

  get(id: number): Observable<Adquisicion> {
    return this.http.get<Adquisicion>(`${this.base}/${id}/`);
  }

  create(data: Partial<Adquisicion>): Observable<Adquisicion> {
    return this.http.post<Adquisicion>(`${this.base}/`, data);
  }

  update(id: number, data: Partial<Adquisicion>): Observable<Adquisicion> {
    return this.http.patch<Adquisicion>(`${this.base}/${id}/`, data);
  }

  deactivate(id: number): Observable<Adquisicion> {
    return this.update(id, { activa: false });
  }
}
