export interface ExcelTransaction {
  ID: string;
  Monto: number;
  Tarjeta: string;
  Cuotas: number;
  "Fecha de Creación": string;
  "Fecha de Actualización": string;
  "Método de Pago": string;
}

export interface Transaction {
  id: string;
  amount: number;
  card: string;
  installments: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  paymentMethod: string;
} 