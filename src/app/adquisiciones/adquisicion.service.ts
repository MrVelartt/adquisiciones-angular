import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environments'; 

export interface Adquisicion {
  id: number;
  presupuesto: number;
  unidad: string;
  tipo_bien_servicio: string;
  cantidad: number;
  valor_unitario: number;
  valor_total: number;
  fecha_adquisicion: string;
  proveedor: string;
  documentacion: string;
  activa: boolean;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

export interface Version {
  id: number;
  fecha: string;
  usuario: string;
  comentario: string;
  datos: Partial<Adquisicion>;
  showDetails?: boolean;
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

  /**
   * Obtiene el historial (versiones) de una adquisición
   */
  getHistory(id: number): Observable<Version[]> {
    return this.http
      .get<{ count: number; results: Version[] }>(`${this.base}/${id}/historial/`)
      .pipe(
        map(response => response.results)
      );
  }
}
