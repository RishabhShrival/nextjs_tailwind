import sheetsDB from '@/lib/sheets-db';
import { NextResponse } from 'next/server';

// GET /api/orders - Get all orders or specific order by ID
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');

    if (orderId) {
      // Get specific order
      const order = await sheetsDB.getOrderById(orderId);
      if (!order) {
        return NextResponse.json({ 
          success: false, 
          message: 'Order not found' 
        }, { status: 404 });
      }
      return NextResponse.json({ success: true, order });
    } else {
      // Get all orders
      const orders = await sheetsDB.getAllOrders();
      return NextResponse.json({ success: true, orders });
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch orders',
      error: error.message 
    }, { status: 500 });
  }
}

// POST /api/orders - Create new order
export async function POST(request) {
  try {
    const orderData = await request.json();
    
    // Validate required fields
    if (!orderData.productId || !orderData.productName || !orderData.totalAmount) {
      return NextResponse.json({ 
        success: false, 
        message: 'Missing required fields: productId, productName, totalAmount' 
      }, { status: 400 });
    }

    const result = await sheetsDB.createOrder(orderData);
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Order created successfully',
        orderId: result.orderId 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to create order',
        error: result.error 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to create order',
      error: error.message 
    }, { status: 500 });
  }
}

// PUT /api/orders - Update order status
export async function PUT(request) {
  try {
    const { orderId, updates } = await request.json();
    
    if (!orderId) {
      return NextResponse.json({ 
        success: false, 
        message: 'Order ID is required' 
      }, { status: 400 });
    }

    const result = await sheetsDB.updateOrderStatus(orderId, updates);
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Order updated successfully' 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to update order',
        error: result.error 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update order',
      error: error.message 
    }, { status: 500 });
  }
}
