import { NextResponse } from 'next/server';
import { processPDFs } from '@/lib/pdf-processor';

export async function POST() {
  try {
    const results = await processPDFs();
    return NextResponse.json({
      success: true,
      message: 'Procesamiento completado con éxito',
      results
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
