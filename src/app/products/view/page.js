'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, Suspense } from 'react';
import Image from 'next/image';

function ProductViewPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams?.get('id');
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoomModalOpen, setZoomModalOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState('');

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products`);
      const data = await response.json();
      
      if (data.success) {
        const foundProduct = data.products.find(p => p.id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Product not found');
        }
      } else {
        setError('Failed to load product');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Error loading product');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId, fetchProduct]);

  const openZoomModal = (imageSrc) => {
    setZoomedImage(imageSrc);
    setZoomModalOpen(true);
  };

  const closeZoomModal = () => {
    setZoomModalOpen(false);
  };

  const goToPayment = async () => {
    if (product.stockQuantity === 0) return;
    
    try {
      // Create order first
      const orderData = {
        productId: product.id,
        productName: product.name,
        quantity: 1,
        unitPrice: product.basePrice,
        totalAmount: product.basePrice,
        paymentMethod: 'UPI'
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();
      
      if (data.success) {
        // Redirect to payment with order ID
        const price = product.basePrice?.toString() || '0';
        router.push(`/payment?name=${encodeURIComponent(product.name)}&price=${price}&orderId=${data.orderId}&productId=${product.id}`);
      } else {
        alert('Failed to create order. Please try again.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating order. Please try again.');
    }
  };

  // For now, we'll use the single imageUrl from Google Sheets
  // In the future, you could add an image gallery field to the sheets
  const productImages = product?.imageUrl ? [product.imageUrl] : ['/products/product1.jpg'];

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
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
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
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
          <p>{error || 'Product not found'}</p>
          <button 
            onClick={() => router.push('/products')}
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
            Back to Products
          </button>
        </div>
      </div>
    );
  }

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
        <div style={{
          background: 'rgba(38,34,24,0.22)',
          border: '1.5px solid #e6c87b55',
          borderRadius: '18px',
          marginTop: '26px',
          boxShadow: '0 2px 24px #e6c87b15',
          padding: '34px 18px 32px 18px',
          textAlign: 'center'
        }}>
          {/* Image Gallery with Side Scroll */}
          <div style={{
            width: '100%',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            marginBottom: '22px',
            scrollbarWidth: 'thin',
            scrollbarColor: '#e6c87b55 #232340'
          }}>
            <div style={{
              display: 'inline-flex',
              gap: '12px',
              padding: '5px 0'
            }}>
              {productImages.map((image, index) => (
                <div 
                  key={index}
                  style={{
                    width: '300px',
                    height: '300px',
                    background: '#232340',
                    borderRadius: '18px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    boxShadow: '0 2px 16px #0006',
                    cursor: 'pointer'
                  }}
                  onClick={() => openZoomModal(image)}
                >
                  <Image 
                    src={image}
                    alt={product.name}
                    width={150}
                    height={150}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '14px',
            color: '#e6c87b'
          }}>
            {product.name}
          </div>
          
          <div style={{
            fontSize: '1.06rem',
            color: '#fffbe6',
            marginBottom: '28px'
          }}>
            Product ID: {product.id}
          </div>
          
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            margin: '0 auto 28px auto'
          }}>
            <tbody>
              <tr style={{ background: '#232340' }}>
                <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                  <b>Category</b>
                </td>
                <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                  {product.category}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                  <b>Weight</b>
                </td>
                <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                  {product.weight}
                </td>
              </tr>
              <tr style={{ background: '#232340' }}>
                <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                  <b>Dimensions</b>
                </td>
                <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                  {product.dimensions}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                  <b>Warranty</b>
                </td>
                <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                  {product.warrantyPeriod}
                </td>
              </tr>
              {product.materials && (
                <>
                  <tr style={{ background: '#232340' }}>
                    <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                      <b>Canopy</b>
                    </td>
                    <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                      {product.materials.canopy}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                      <b>Handle</b>
                    </td>
                    <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                      {product.materials.handle}
                    </td>
                  </tr>
                  <tr style={{ background: '#232340' }}>
                    <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                      <b>Frame</b>
                    </td>
                    <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                      {product.materials.frame}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          
          <div style={{
            color: '#fffbe6',
            fontSize: '1.09rem',
            marginBottom: '30px',
            lineHeight: 1.7,
            padding: '0 10px'
          }}>
            {product.description}
          </div>
          
          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div style={{
              marginBottom: '30px',
              padding: '0 10px'
            }}>
              <div style={{
                fontSize: '1.1rem',
                color: '#e6c87b',
                fontWeight: 'bold',
                marginBottom: '15px'
              }}>
                Key Features:
              </div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {product.features.map((feature, index) => (
                  <li key={index} style={{
                    color: '#fffbe6',
                    fontSize: '1rem',
                    marginBottom: '8px',
                    paddingLeft: '20px',
                    position: 'relative'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      color: '#e6c87b'
                    }}>
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Stock Status */}
          {product.stockQuantity <= 5 && (
            <div style={{
              fontSize: '1rem',
              color: product.stockQuantity === 0 ? '#ef4444' : '#f59e0b',
              marginBottom: '20px',
              fontWeight: 600,
              textAlign: 'center'
            }}>
              {product.stockQuantity === 0 ? 'Out of Stock' : `Only ${product.stockQuantity} left in stock`}
            </div>
          )}
          
          <div style={{
            fontSize: '1.32rem',
            color: '#fffbe6',
            fontWeight: 'bold',
            marginBottom: '32px'
          }}>
            ₹{product.basePrice?.toLocaleString()}
          </div>
          
          <button
            onClick={goToPayment}
            disabled={product.stockQuantity === 0}
            style={{
              background: product.stockQuantity === 0 ? '#666' : 'linear-gradient(90deg,#e6c87b 70%,#bfa045 100%)',
              color: '#181828',
              border: 'none',
              padding: '16px 44px',
              borderRadius: '10px',
              fontSize: '1.13rem',
              fontWeight: 'bold',
              cursor: product.stockQuantity === 0 ? 'not-allowed' : 'pointer',
              opacity: product.stockQuantity === 0 ? 0.6 : 1,
              transition: 'all 0.3s ease',
              marginBottom: '20px'
            }}
            onMouseOver={(e) => {
              if (product.stockQuantity > 0) {
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 8px 25px rgba(230, 200, 123, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (product.stockQuantity > 0) {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            {product.stockQuantity === 0 ? 'OUT OF STOCK' : 'BUY NOW'}
          </button>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {zoomModalOpen && (
        <div style={{
          display: 'block',
          position: 'fixed',
          zIndex: 1000,
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.9)'
        }}>
          <span
            onClick={closeZoomModal}
            style={{
              position: 'absolute',
              top: '15px',
              right: '35px',
              color: '#f1f1f1',
              fontSize: '40px',
              fontWeight: 'bold',
              transition: '0.3s',
              cursor: 'pointer'
            }}
          >
            &times;
          </span>
          <Image
            src={zoomedImage}
            alt="Zoomed product"
            width={800}
            height={600}
            style={{
              margin: 'auto',
              display: 'block',
              maxWidth: '90%',
              maxHeight: '90%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
      )}

      <style jsx>{`
        @media (max-width: 700px) {
          .container { 
            padding: 15px 8px; 
          }
          .prod-title { 
            font-size: 1.2rem; 
          }
          .features-table td { 
            font-size: 0.97rem; 
          }
          .prod-desc { 
            font-size: 0.98rem; 
          }
          .prod-price { 
            font-size: 1.01rem; 
          }
          .buy-btn { 
            font-size: 1.01rem; 
            padding: 12px 18px;
          }
          .main-img-box { 
            width: 250px; 
            height: 250px; 
          }
        }
      `}</style>
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
      <div>Loading product details...</div>
    </div>
  );
}

export default function ProductViewPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProductViewPageContent />
    </Suspense>
  );
}
