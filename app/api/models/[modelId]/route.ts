import { NextRequest, NextResponse } from 'next/server';
import modelsData from '../../../../data/models.json';

export async function GET(
  request: NextRequest,
  { params }: { params: { modelId: string } }
) {
  const modelId = params.modelId;
  
  console.log('API route for model ID:', modelId);
  
  // Find the model by ID
  const model = modelsData.find((m: Record<string, unknown>) => m.id === modelId);
  
  // If model not found, return 404
  if (!model) {
    console.log('Model not found, returning 404');
    return new NextResponse(null, { status: 404 });
  }
  
  // Return the model data
  return NextResponse.json(model);
} 