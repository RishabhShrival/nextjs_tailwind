'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get URL parameters
  const orderId = searchParams.get('orderId');
  const transactionId = searchParams.get('transactionId');
  const amount = searchParams.get('amount');
  const productName = searchParams.get('productName');

  useEffect(() => {
    if (orderId && transactionId) {
      updatePaymentStatus();
    } else {
      setError('Missing payment information');
      setLoading(false);
    }
  }, [orderId, transactionId]);

  const updatePaymentStatus = async () => {
    try {
      setLoading(true);
      
      // Update order status to COMPLETED
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderId,
          updates: {
            paymentStatus: 'COMPLETED',
            orderStatus: 'CONFIRMED',
            upiTransactionId: transactionId
          }
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Fetch updated order details
        const orderResponse = await fetch(`/api/orders?id=${orderId}`);
        const orderData = await orderResponse.json();
        
        if (orderData.success) {
          setOrderDetails(orderData.order);
        }
      } else {
        setError('Failed to update payment status');
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      setError('Error processing payment confirmation');
    } finally {
      setLoading(false);
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
          <div style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem',
            animation: 'pulse 2s infinite'
          }}>
            ⏳
          </div>
          <p>Processing payment confirmation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        background: '#181828',
        color: '#e6c87b',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '500px', padding: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
          <h2 style={{ marginBottom: '1rem' }}>Payment Error</h2>
          <p style={{ marginBottom: '2rem', color: '#cccccc' }}>{error}</p>
          <Link 
            href="/products"
            style={{
              background: '#e6c87b',
              color: '#181828',
              padding: '12px 24px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Back to Products
          </Link>
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
        maxWidth: '600px',
        margin: '0 auto',
        padding: '2rem',
        textAlign: 'center'
      }}>
        {/* Success Animation */}
        <div style={{
          fontSize: '4rem',
          marginBottom: '2rem',
          animation: 'bounce 1s ease-in-out'
        }}>
          ✅
        </div>

        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #e6c87b, #d4af37)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Payment Successful!
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: '#cccccc',
          marginBottom: '2rem'
        }}>
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* Order Details Card */}
        <div style={{
          background: '#232340',
          borderRadius: '15px',
          padding: '2rem',
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
            color: '#e6c87b'
          }}>
            Order Details
          </h3>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#cccccc' }}>Order ID:</span>
              <span style={{ fontWeight: 'bold' }}>{orderId}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#cccccc' }}>Product:</span>
              <span style={{ fontWeight: 'bold' }}>{productName || orderDetails?.product_name}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#cccccc' }}>Amount Paid:</span>
              <span style={{ fontWeight: 'bold', color: '#4ade80' }}>₹{amount || orderDetails?.total_amount}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#cccccc' }}>Transaction ID:</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{transactionId}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#cccccc' }}>Payment Status:</span>
              <span style={{ 
                fontWeight: 'bold', 
                color: '#4ade80',
                background: 'rgba(74, 222, 128, 0.1)',
                padding: '4px 8px',
                borderRadius: '4px'
              }}>
                COMPLETED
              </span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#cccccc' }}>Order Status:</span>
              <span style={{ 
                fontWeight: 'bold', 
                color: '#60a5fa',
                background: 'rgba(96, 165, 250, 0.1)',
                padding: '4px 8px',
                borderRadius: '4px'
              }}>
                CONFIRMED
              </span>
            </div>
          </div>
        </div>

        {/* What's Next Section */}
        <div style={{
          background: 'linear-gradient(135deg, #e6c87b22, #d4af3722)',
          borderRadius: '15px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h4 style={{ marginBottom: '1rem', color: '#e6c87b' }}>What happens next?</h4>
          <ul style={{ 
            textAlign: 'left', 
            color: '#cccccc', 
            lineHeight: '1.8',
            listStyle: 'none',
            padding: 0
          }}>
            <li>📧 You'll receive an order confirmation email shortly</li>
            <li>📦 Your umbrella will be prepared for shipping</li>
            <li>🚚 We'll notify you when your order ships</li>
            <li>🎯 Expected delivery: 3-5 business days</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            href="/products"
            style={{
              background: 'linear-gradient(135deg, #e6c87b, #d4af37)',
              color: '#181828',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Continue Shopping
          </Link>
          
          <Link 
            href="/admin/orders"
            style={{
              background: 'transparent',
              color: '#e6c87b',
              border: '2px solid #e6c87b',
              padding: '10px 22px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#e6c87b';
              e.target.style.color = '#181828';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#e6c87b';
            }}
          >
            View All Orders
          </Link>
        </div>

        {/* Support Section */}
        <div style={{
          marginTop: '3rem',
          padding: '1rem',
          fontSize: '0.9rem',
          color: '#999'
        }}>
          <p>
            Need help? Contact us at{' '}
            <a 
              href="mailto:support@royomber.com" 
              style={{ color: '#e6c87b', textDecoration: 'none' }}
            >
              support@royomber.com
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -20px, 0);
          }
          70% {
            transform: translate3d(0, -10px, 0);
          }
          90% {
            transform: translate3d(0, -4px, 0);
          }
        }
      `}</style>
    </div>
  );
}
