'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders');
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders);
      } else {
        setError('Failed to load orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, updates) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, updates })
      });

      const data = await response.json();
      
      if (data.success) {
        // Refresh orders
        fetchOrders();
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order status');
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'ALL') return true;
    return order.order_status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return '#4ade80';
      case 'CONFIRMED': return '#60a5fa';
      case 'PENDING': return '#f59e0b';
      case 'CANCELLED': return '#ef4444';
      case 'SHIPPED': return '#8b5cf6';
      case 'DELIVERED': return '#10b981';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div style={{
        background: '#181828',
        color: '#e6c87b',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: '#181828',
      color: '#e6c87b',
      minHeight: '100vh',
      fontFamily: 'Montserrat, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #e6c87b, #d4af37)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Order Management
          </h1>
          
          <Link 
            href="/products"
            style={{
              background: 'linear-gradient(135deg, #e6c87b, #d4af37)',
              color: '#181828',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            ← Back to Products
          </Link>
        </div>

        {/* Filters */}
        <div style={{
          background: '#232340',
          borderRadius: '10px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>Filter Orders</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {['ALL', 'PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                style={{
                  background: filter === status ? '#e6c87b' : 'transparent',
                  color: filter === status ? '#181828' : '#e6c87b',
                  border: '2px solid #e6c87b',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}
              >
                {status} ({orders.filter(o => status === 'ALL' || o.order_status === status).length})
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: '#232340',
            borderRadius: '10px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{orders.length}</div>
            <div style={{ color: '#cccccc' }}>Total Orders</div>
          </div>
          
          <div style={{
            background: '#232340',
            borderRadius: '10px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              ₹{orders.reduce((sum, order) => sum + (parseFloat(order.total_amount) || 0), 0).toLocaleString()}
            </div>
            <div style={{ color: '#cccccc' }}>Total Revenue</div>
          </div>
          
          <div style={{
            background: '#232340',
            borderRadius: '10px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {orders.filter(o => o.payment_status === 'COMPLETED').length}
            </div>
            <div style={{ color: '#cccccc' }}>Paid Orders</div>
          </div>
        </div>

        {/* Orders Table */}
        {error ? (
          <div style={{
            background: '#232340',
            borderRadius: '10px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
            <p>{error}</p>
            <button 
              onClick={fetchOrders}
              style={{
                background: '#e6c87b',
                color: '#181828',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              Retry
            </button>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div style={{
            background: '#232340',
            borderRadius: '10px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📋</div>
            <h3>No Orders Found</h3>
            <p style={{ color: '#cccccc' }}>
              {filter === 'ALL' ? 'No orders have been placed yet.' : `No orders with status: ${filter}`}
            </p>
          </div>
        ) : (
          <div style={{
            background: '#232340',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <thead>
                  <tr style={{ background: '#181828' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #e6c87b' }}>Order ID</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #e6c87b' }}>Product</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #e6c87b' }}>Customer</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #e6c87b' }}>Amount</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #e6c87b' }}>Payment</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #e6c87b' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #e6c87b' }}>Date</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #e6c87b' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr key={order.order_id} style={{
                      borderBottom: '1px solid #333',
                      background: index % 2 === 0 ? '#232340' : '#1e1e36'
                    }}>
                      <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                        {order.order_id}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 'bold' }}>{order.product_name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#cccccc' }}>Qty: {order.quantity}</div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div>{order.customer_name || 'N/A'}</div>
                        <div style={{ fontSize: '0.8rem', color: '#cccccc' }}>{order.customer_email}</div>
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 'bold' }}>
                        ₹{parseFloat(order.total_amount || 0).toLocaleString()}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          background: order.payment_status === 'COMPLETED' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                          color: order.payment_status === 'COMPLETED' ? '#4ade80' : '#f59e0b'
                        }}>
                          {order.payment_status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <select
                          value={order.order_status}
                          onChange={(e) => updateOrderStatus(order.order_id, { orderStatus: e.target.value })}
                          style={{
                            background: '#181828',
                            color: getStatusColor(order.order_status),
                            border: `2px solid ${getStatusColor(order.order_status)}`,
                            borderRadius: '4px',
                            padding: '4px 8px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                          }}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.9rem' }}>
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <button
                          onClick={() => {
                            const details = `Order: ${order.order_id}\nProduct: ${order.product_name}\nCustomer: ${order.customer_name}\nAmount: ₹${order.total_amount}\nTransaction: ${order.upi_transaction_id}\nDate: ${new Date(order.created_at).toLocaleString()}`;
                            alert(details);
                          }}
                          style={{
                            background: 'transparent',
                            color: '#e6c87b',
                            border: '1px solid #e6c87b',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
