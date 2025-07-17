import { products } from '@/data/products';
import { createProduct, getAllProducts } from '@/lib/sheets-db';

export async function POST(request) {
  try {
    const { action } = await request.json();

    if (action === 'seed_products') {
      const results = [];
      
      // Create each product in Google Sheets
      for (const product of products) {
        const result = await createProduct(product);
        results.push({
          id: product.id,
          name: product.name,
          success: !!result
        });
      }

      return Response.json({
        success: true,
        message: `Seeded ${results.filter(r => r.success).length} products to Google Sheets`,
        results
      });
    }

    if (action === 'get_products') {
      const sheetProducts = await getAllProducts();
      return Response.json({
        success: true,
        products: sheetProducts,
        count: sheetProducts.length
      });
    }

    return Response.json({
      success: false,
      message: 'Invalid action. Use "seed_products" or "get_products"'
    });

  } catch (error) {
    console.error('Products API error:', error);
    return Response.json({
      success: false,
      message: 'Failed to process request',
      error: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const sheetProducts = await getAllProducts();
    return Response.json({
      success: true,
      products: sheetProducts,
      count: sheetProducts.length
    });
  } catch (error) {
    console.error('Products API error:', error);
    return Response.json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    }, { status: 500 });
  }
}
