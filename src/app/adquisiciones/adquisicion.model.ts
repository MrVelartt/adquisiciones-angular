export interface Adquisicion {
    id?: number; // Opcional, para cuando venga del backend
    presupuesto: number;
    unidad: string;
    tipoBienServicio: string;
    cantidad: number;
    valorUnitario: number;
    valorTotal: number;
    fechaAdquisicion: string; // ISO string, ej: "2023-07-20"
    proveedor: string;
    documentacion: string;
    activo?: boolean; // para manejar estado de desactivación
    historial?: any[]; // opcional para almacenar cambios históricos
  }