import { NextRequest, NextResponse } from 'next/server';
import { filterTransactions } from '@/features/actions/filterTransactions';
import { transactions as transactionsService } from '@/features/services/endpoints/transactions';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Obtener todos los parámetros de filtrado
    const dateStr = searchParams.get('date');
    const cards = searchParams.get('card')?.split(',').filter(Boolean);
    const installments = searchParams.get('installments')?.split(',').filter(Boolean);
    const amountMin = searchParams.get('amountMin');
    const amountMax = searchParams.get('amountMax');
    const paymentMethods = searchParams.get('paymentMethod')?.split(',').filter(Boolean);

    // Obtener las transacciones
    const { data: transactions } = await transactionsService.getTransactions();

    // Preparar los parámetros de filtrado
    let dateRange;
    if (dateStr) {
      const [from, to] = dateStr.split('|').map(d => new Date(d));
      dateRange = { from, to };
    }

    // Aplicar filtros
    const filteredData = filterTransactions({
      transactions,
      dateRange,
      cards,
      installments,
      amountRange: amountMin && amountMax ? {
        min: Number(amountMin),
        max: Number(amountMax)
      } : undefined,
      paymentMethods
    });

    return NextResponse.json({ data: filteredData });
  } catch (error) {
    console.error('Error al filtrar transacciones:', error);
    return NextResponse.json(
      { error: 'Error al filtrar transacciones' },
      { status: 500 }
    );
  }
} 