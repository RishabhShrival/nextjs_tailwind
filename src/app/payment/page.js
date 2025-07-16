'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { useSession } from 'next-auth/react';

function PaymentPageContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');
  
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'upi'
  });

  useEffect(() => {
    const name = searchParams?.get('name') || 'Selected Product';
    const price = searchParams?.get('price') || '13500';
    setProductName(name);
    setProductPrice(price);
    
    // Pre-fill user details if logged in
    if (session?.user) {
      setOrderDetails(prev => ({
        ...prev,
        name: session.user.name || '',
        email: session.user.email || ''
      }));
    }
  }, [searchParams, session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would integrate with actual payment gateway
      // For UPI, you might redirect to payment app or show QR code
      
      setMessage('Order placed successfully! We will contact you soon for delivery details.');
      
      // You could also save order to Google Sheets here
      
    } catch (error) {
      setMessage('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const generateUPILink = () => {
    const upiId = 'royomber@paytm'; // Replace with actual UPI ID
    const amount = productPrice;
    const note = `Payment for ${productName}`;
    return `upi://pay?pa=${upiId}&am=${amount}&tn=${encodeURIComponent(note)}&cu=INR`;
  };

  return (
    <div style={{
      background: '#181828',
      color: '#e6c87b',
      fontFamily: 'Montserrat, sans-serif',
      margin: 0,
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: '30px 10px 40px 10px'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#e6c87b',
            fontFamily: 'Playfair Display, serif',
            marginBottom: '10px'
          }}>
            ROYOMBER
          </div>
          <div style={{
            fontSize: '1.1rem',
            color: '#fffbe6',
            marginBottom: '20px'
          }}>
            Complete Your Order
          </div>
        </div>

        {/* Order Summary */}
        <div style={{
          background: 'rgba(38,34,24,0.22)',
          border: '1.5px solid #e6c87b55',
          borderRadius: '18px',
          marginBottom: '25px',
          boxShadow: '0 2px 24px #e6c87b15',
          padding: '25px 20px'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            color: '#e6c87b',
            marginBottom: '20px',
            fontFamily: 'Playfair Display, serif'
          }}>
            Order Summary
          </h3>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px',
            background: '#232340',
            borderRadius: '10px',
            marginBottom: '15px'
          }}>
            <div>
              <div style={{ color: '#fffbe6', fontSize: '1.1rem', fontWeight: 'bold' }}>
                {productName}
              </div>
              <div style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                Luxury Umbrella
              </div>
            </div>
            <div style={{
              color: '#e6c87b',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}>
              ₹{parseInt(productPrice).toLocaleString()}
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 0',
            borderTop: '1px solid #e6c87b55',
            marginTop: '15px'
          }}>
            <span style={{ color: '#fffbe6', fontSize: '1.1rem' }}>Shipping:</span>
            <span style={{ color: '#e6c87b', fontSize: '1.1rem' }}>Free</span>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '15px 0',
            borderTop: '2px solid #e6c87b',
            marginTop: '10px'
          }}>
            <span style={{ color: '#fffbe6', fontSize: '1.2rem', fontWeight: 'bold' }}>Total:</span>
            <span style={{ color: '#e6c87b', fontSize: '1.3rem', fontWeight: 'bold' }}>
              ₹{parseInt(productPrice).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Customer Details Form */}
        <div style={{
          background: 'rgba(38,34,24,0.22)',
          border: '1.5px solid #e6c87b55',
          borderRadius: '18px',
          marginBottom: '25px',
          boxShadow: '0 2px 24px #e6c87b15',
          padding: '25px 20px'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            color: '#e6c87b',
            marginBottom: '20px',
            fontFamily: 'Playfair Display, serif'
          }}>
            Delivery Details
          </h3>

          {message && (
            <div style={{
              padding: '15px',
              marginBottom: '20px',
              backgroundColor: '#232340',
              border: '1px solid #e6c87b',
              borderRadius: '10px',
              color: '#fffbe6',
              textAlign: 'center'
            }}>
              {message}
            </div>
          )}

          <form onSubmit={handlePayment}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                color: '#e6c87b',
                fontSize: '0.95rem'
              }}>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={orderDetails.name}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e6c87b55',
                  borderRadius: '6px',
                  background: '#232340',
                  color: '#fffbe6',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                color: '#e6c87b',
                fontSize: '0.95rem'
              }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={orderDetails.email}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e6c87b55',
                  borderRadius: '6px',
                  background: '#232340',
                  color: '#fffbe6',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                color: '#e6c87b',
                fontSize: '0.95rem'
              }}>
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={orderDetails.phone}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e6c87b55',
                  borderRadius: '6px',
                  background: '#232340',
                  color: '#fffbe6',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                color: '#e6c87b',
                fontSize: '0.95rem'
              }}>
                Delivery Address *
              </label>
              <textarea
                name="address"
                value={orderDetails.address}
                onChange={handleInputChange}
                required
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e6c87b55',
                  borderRadius: '6px',
                  background: '#232340',
                  color: '#fffbe6',
                  fontSize: '0.95rem',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '25px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  color: '#e6c87b',
                  fontSize: '0.95rem'
                }}>
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={orderDetails.city}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e6c87b55',
                    borderRadius: '6px',
                    background: '#232340',
                    color: '#fffbe6',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  color: '#e6c87b',
                  fontSize: '0.95rem'
                }}>
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={orderDetails.pincode}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e6c87b55',
                    borderRadius: '6px',
                    background: '#232340',
                    color: '#fffbe6',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '12px',
                color: '#e6c87b',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}>
                Payment Method
              </label>
              
              <div style={{ display: 'grid', gap: '10px' }}>
                <div style={{
                  padding: '12px',
                  background: orderDetails.paymentMethod === 'upi' ? '#232340' : '#1a1a2e',
                  border: orderDetails.paymentMethod === 'upi' ? '2px solid #e6c87b' : '1px solid #444',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                onClick={() => setOrderDetails(prev => ({ ...prev, paymentMethod: 'upi' }))}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="upi"
                      checked={orderDetails.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      style={{ marginRight: '10px' }}
                    />
                    <span style={{ color: '#fffbe6', fontSize: '1rem' }}>UPI Payment</span>
                  </div>
                </div>
                
                <div style={{
                  padding: '12px',
                  background: orderDetails.paymentMethod === 'cod' ? '#232340' : '#1a1a2e',
                  border: orderDetails.paymentMethod === 'cod' ? '2px solid #e6c87b' : '1px solid #444',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                onClick={() => setOrderDetails(prev => ({ ...prev, paymentMethod: 'cod' }))}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="cod"
                      checked={orderDetails.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      style={{ marginRight: '10px' }}
                    />
                    <span style={{ color: '#fffbe6', fontSize: '1rem' }}>Cash on Delivery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* UPI Payment Button */}
            {orderDetails.paymentMethod === 'upi' && (
              <a
                href={generateUPILink()}
                style={{
                  display: 'block',
                  width: '100%',
                  background: 'linear-gradient(90deg,#e6c87b 70%,#bfa045 100%)',
                  color: '#181828',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '10px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textDecoration: 'none',
                  marginBottom: '15px',
                  transition: 'box-shadow 0.3s, transform 0.2s'
                }}
                onMouseOver={(e) => {
                  e.target.style.boxShadow = '0 0 18px 4px #e6c87b77';
                  e.target.style.transform = 'translateY(-2px) scale(1.02)';
                }}
                onMouseOut={(e) => {
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'none';
                }}
              >
                PAY WITH UPI
              </a>
            )}

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={isProcessing}
              style={{
                width: '100%',
                background: isProcessing 
                  ? '#666' 
                  : 'linear-gradient(90deg,#e6c87b 70%,#bfa045 100%)',
                color: '#181828',
                border: 'none',
                padding: '14px',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                transition: 'box-shadow 0.3s, transform 0.2s'
              }}
              onMouseOver={(e) => {
                if (!isProcessing) {
                  e.target.style.boxShadow = '0 0 18px 4px #e6c87b77';
                  e.target.style.transform = 'translateY(-2px) scale(1.02)';
                }
              }}
              onMouseOut={(e) => {
                if (!isProcessing) {
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'none';
                }
              }}
            >
              {isProcessing ? 'PROCESSING...' : 
               orderDetails.paymentMethod === 'cod' ? 'PLACE ORDER (COD)' : 'CONFIRM ORDER'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div style={{
      background: '#181828',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#e6c87b'
    }}>
      <div>Loading payment details...</div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PaymentPageContent />
    </Suspense>
  );
}
