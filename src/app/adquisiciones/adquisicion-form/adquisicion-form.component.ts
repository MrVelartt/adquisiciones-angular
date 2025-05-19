import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AdquisicionesService, Adquisicion } from '../adquisicion.service';

@Component({
  selector: 'app-adquisicion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './adquisicion-form.component.html'
})
export class AdquisicionFormComponent implements OnInit {
  adquisicionForm!: FormGroup;
  private editId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private svc: AdquisicionesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 1. Inicializa el formulario
    this.adquisicionForm = this.fb.group({
      presupuesto: [0, [Validators.required, Validators.min(0)]],
      unidad: ['', Validators.required],
      tipo_bien_servicio: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      valor_unitario: [0, [Validators.required, Validators.min(0)]],
      valor_total: [{ value: 0, disabled: true }],
      fecha_adquisicion: ['', Validators.required],
      proveedor: ['', Validators.required],
      documentacion: [''],
      activa: [true]
    });


    this.onChanges();

    // 2. Comprueba si hay parámetro id para modo edición
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editId = +idParam;
      this.svc.get(this.editId).subscribe(adq => {
        this.adquisicionForm.patchValue(adq);
      }, err => {
        alert('Error al cargar la adquisición: ' + err.message);
      });
    }
  }

  private onChanges(): void {
    this.adquisicionForm.get('cantidad')!
      .valueChanges
      .subscribe(() => this.calcularTotal());
    this.adquisicionForm.get('valor_unitario')!
      .valueChanges
      .subscribe(() => this.calcularTotal());
  }

  private calcularTotal(): void {
    const c = Number(this.adquisicionForm.get('cantidad')!.value) || 0;
    const v = Number(this.adquisicionForm.get('valor_unitario')!.value) || 0;
    this.adquisicionForm.get('valor_total')!
      .setValue(c * v, { emitEvent: false });
  }

  onSubmit(): void {
    if (this.adquisicionForm.invalid) {
      this.adquisicionForm.markAllAsTouched();
      return;
    }

    const raw = this.adquisicionForm.getRawValue();
    const payload: Partial<Adquisicion> = {
      presupuesto: Number(raw.presupuesto),       
      unidad: raw.unidad,
      tipo_bien_servicio: raw.tipo_bien_servicio,
      cantidad: Number(raw.cantidad),
      valor_unitario: Number(raw.valor_unitario), 
      valor_total: Number(raw.valor_total),       
      fecha_adquisicion: raw.fecha_adquisicion,
      proveedor: raw.proveedor,
      documentacion: raw.documentacion,
      activa: Boolean(raw.activa)
    };

    const action$ = this.editId
      ? this.svc.update(this.editId, payload)
      : this.svc.create(payload);

    action$.subscribe({
      next: () => this.router.navigate(['/adquisiciones']),
      error: err => {
        if (err.status === 400 && err.error) {
          console.error('Validación falló:', err.error);

        }
        alert('Error al guardar la adquisición: ' + err.message);
      }
    });
  }
}
