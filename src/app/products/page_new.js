'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products);
      } else {
        setError('Failed to load products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error loading products');
    } finally {
      setLoading(false);
    }
  };

  const goToView = (id) => {
    router.push(`/products/view?id=${id}`);
  };

  const goToCustomize = () => {
    router.push('/customize');
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
            fontSize: '2rem', 
            marginBottom: '1rem',
            animation: 'pulse 2s infinite'
          }}>
            ⏳
          </div>
          <p>Loading products...</p>
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
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
          <p>{error}</p>
          <button 
            onClick={fetchProducts}
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
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '30px 20px 40px 20px'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '50px'
        }}>
          <div style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #e6c87b, #d4af37)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '20px',
            fontFamily: 'Playfair Display, serif'
          }}>
            LUXURY UMBRELLAS
          </div>
          <div style={{
            fontSize: '1.2rem',
            color: '#cccccc',
            marginBottom: '40px',
            fontStyle: 'italic'
          }}>
            Handcrafted Excellence • British Heritage • Premium Materials
          </div>

          {/* Customize Button */}
          <button
            onClick={goToCustomize}
            style={{
              background: 'linear-gradient(90deg,#e6c87b 70%,#bfa045 100%)',
              color: '#181828',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '40px'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 8px 25px rgba(230, 200, 123, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            ✨ CREATE YOUR CUSTOM UMBRELLA ✨
          </button>
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px',
          justifyItems: 'center'
        }}>
          {products.map((product) => (
            <div 
              key={product.id}
              style={{
                background: '#232340',
                borderRadius: '20px',
                boxShadow: '0 6px 32px #0005',
                width: '100%',
                maxWidth: '400px',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 45px rgba(230, 200, 123, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 32px #0005';
              }}
            >
              {/* Product Image */}
              <div style={{
                height: '280px',
                background: 'linear-gradient(135deg, #e6c87b22, #bfa04522)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}>
                <Image 
                  src={product.imageUrl}
                  alt={product.name}
                  width={280}
                  height={280}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 2px 16px #0007)',
                    transition: 'transform 0.2s',
                    background: '#181828',
                    display: 'block'
                  }}
                />
              </div>
              
              {/* Product Details */}
              <div style={{
                background: '#181828',
                borderRadius: '14px',
                padding: '20px',
                width: '100%',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '1.4rem',
                  color: '#e6c87b',
                  fontWeight: 700,
                  marginBottom: '8px',
                  fontFamily: 'Playfair Display, serif'
                }}>
                  {product.name}
                </div>
                <div style={{
                  fontSize: '0.95rem',
                  color: '#cccccc',
                  marginBottom: '15px',
                  lineHeight: 1.4
                }}>
                  {product.description}
                </div>
                <div style={{
                  fontSize: '1.3rem',
                  color: '#fffbe6',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  marginBottom: '20px'
                }}>
                  ₹{product.basePrice?.toLocaleString()}
                </div>
                
                {/* Stock Status */}
                {product.stockQuantity <= 5 && (
                  <div style={{
                    fontSize: '0.8rem',
                    color: product.stockQuantity === 0 ? '#ef4444' : '#f59e0b',
                    marginBottom: '15px',
                    fontWeight: 600
                  }}>
                    {product.stockQuantity === 0 ? 'Out of Stock' : `Only ${product.stockQuantity} left`}
                  </div>
                )}
                
                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button
                    onClick={() => goToView(product.id)}
                    disabled={product.stockQuantity === 0}
                    style={{
                      background: product.stockQuantity === 0 ? '#666' : 'linear-gradient(135deg, #e6c87b, #d4af37)',
                      color: '#181828',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      cursor: product.stockQuantity === 0 ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      opacity: product.stockQuantity === 0 ? 0.6 : 1
                    }}
                    onMouseOver={(e) => {
                      if (product.stockQuantity > 0) {
                        e.target.style.transform = 'scale(1.05)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (product.stockQuantity > 0) {
                        e.target.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    {product.stockQuantity === 0 ? 'OUT OF STOCK' : 'VIEW DETAILS'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && !loading && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#cccccc'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏪</div>
            <h3 style={{ marginBottom: '1rem' }}>No Products Available</h3>
            <p>Products will appear here once they are added to Google Sheets.</p>
            <Link href="/admin/seed-products" style={{
              display: 'inline-block',
              marginTop: '1rem',
              background: '#e6c87b',
              color: '#181828',
              padding: '10px 20px',
              borderRadius: '5px',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              Seed Products from Local Data
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
