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
            fontWeight: 700,
            color: '#e6c87b',
            fontFamily: 'Playfair Display, serif',
            marginBottom: '15px'
          }}>
            ROYOMBER COLLECTION
          </div>
          <div style={{
            fontSize: '1.2rem',
            color: '#fffbe6',
            marginBottom: '30px'
          }}>
            Handcrafted luxury umbrellas for the distinguished
          </div>
          
          {/* Customize CTA */}
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
          
          {/* Product 1 - Heritage V1 */}
          <div 
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
              alignItems: 'center',
              padding: '30px 25px',
              position: 'relative'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 48px #e6c87b44';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 6px 32px #0005';
            }}
          >
            <div style={{
              width: '280px',
              height: '280px',
              background: '#181828',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '25px',
              overflow: 'hidden',
              border: '2px solid #e6c87b33'
            }}>
              <Image 
                src="/products/product1.jpg" 
                alt="Heritage V1"
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
                Heritage V1
              </div>
              <div style={{
                fontSize: '0.95rem',
                color: '#cccccc',
                marginBottom: '15px',
                lineHeight: 1.4
              }}>
                Carbon fiber shaft with Italian leather grip
              </div>
              <div style={{
                fontSize: '1.3rem',
                color: '#fffbe6',
                fontWeight: 600,
                letterSpacing: '0.02em',
                marginBottom: '20px'
              }}>
                ₹13,500
              </div>
              
              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToCustomize();
                  }}
                  style={{
                    background: 'linear-gradient(90deg,#e6c87b 70%,#bfa045 100%)',
                    color: '#181828',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(230, 200, 123, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  CUSTOMIZE
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToView(0);
                  }}
                  style={{
                    background: 'transparent',
                    border: '1px solid #e6c87b',
                    color: '#e6c87b',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(230, 200, 123, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  VIEW DETAILS
                </button>
              </div>
            </div>
          </div>

          {/* Product 2 - R-cres Series */}
          <div 
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
              alignItems: 'center',
              padding: '30px 25px',
              position: 'relative'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 48px #e6c87b44';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 6px 32px #0005';
            }}
          >
            <div style={{
              width: '280px',
              height: '280px',
              background: '#181828',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '25px',
              overflow: 'hidden',
              border: '2px solid #e6c87b33'
            }}>
              <Image 
                src="/products/product2.jpeg" 
                alt="R-cres Series"
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
                R-cres Series
              </div>
              <div style={{
                fontSize: '0.95rem',
                color: '#cccccc',
                marginBottom: '15px',
                lineHeight: 1.4
              }}>
                Advanced wind resistance with premium materials
              </div>
              <div style={{
                fontSize: '1.3rem',
                color: '#fffbe6',
                fontWeight: 600,
                letterSpacing: '0.02em',
                marginBottom: '20px'
              }}>
                ₹16,300
              </div>
              
              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToCustomize();
                  }}
                  style={{
                    background: 'linear-gradient(90deg,#e6c87b 70%,#bfa045 100%)',
                    color: '#181828',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(230, 200, 123, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  CUSTOMIZE
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToView(1);
                  }}
                  style={{
                    background: 'transparent',
                    border: '1px solid #e6c87b',
                    color: '#e6c87b',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(230, 200, 123, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  VIEW DETAILS
                </button>
              </div>
            </div>
          </div>

          {/* Product 3 - Elite Pro */}
          <div 
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
              alignItems: 'center',
              padding: '30px 25px',
              position: 'relative'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 48px #e6c87b44';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 6px 32px #0005';
            }}
          >
            <div style={{
              width: '280px',
              height: '280px',
              background: '#181828',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '25px',
              overflow: 'hidden',
              border: '2px solid #e6c87b33'
            }}>
              <Image 
                src="/products/product3.jpeg" 
                alt="Elite Pro"
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
                Elite Pro
              </div>
              <div style={{
                fontSize: '0.95rem',
                color: '#cccccc',
                marginBottom: '15px',
                lineHeight: 1.4
              }}>
                Titanium frame with smart auto mechanisms
              </div>
              <div style={{
                fontSize: '1.3rem',
                color: '#fffbe6',
                fontWeight: 600,
                letterSpacing: '0.02em',
                marginBottom: '20px'
              }}>
                ₹18,500
              </div>
              
              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToCustomize();
                  }}
                  style={{
                    background: 'linear-gradient(90deg,#e6c87b 70%,#bfa045 100%)',
                    color: '#181828',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(230, 200, 123, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  CUSTOMIZE
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToView(2);
                  }}
                  style={{
                    background: 'transparent',
                    border: '1px solid #e6c87b',
                    color: '#e6c87b',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(230, 200, 123, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  VIEW DETAILS
                </button>
              </div>
            </div>
          </div>

          {/* Product 4 - Royal Classic */}
          <div 
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
              alignItems: 'center',
              padding: '30px 25px',
              position: 'relative'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 48px #e6c87b44';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 6px 32px #0005';
            }}
          >
            <div style={{
              width: '280px',
              height: '280px',
              background: '#181828',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '25px',
              overflow: 'hidden',
              border: '2px solid #e6c87b33'
            }}>
              <Image 
                src="/products/product1.jpg" 
                alt="Royal Classic"
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
                Royal Classic
              </div>
              <div style={{
                fontSize: '0.95rem',
                color: '#cccccc',
                marginBottom: '15px',
                lineHeight: 1.4
              }}>
                Traditional British craftsmanship meets modern materials
              </div>
              <div style={{
                fontSize: '1.3rem',
                color: '#fffbe6',
                fontWeight: 600,
                letterSpacing: '0.02em',
                marginBottom: '20px'
              }}>
                ₹16,300
              </div>
              
              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToCustomize();
                  }}
                  style={{
                    background: 'linear-gradient(90deg,#e6c87b 70%,#bfa045 100%)',
                    color: '#181828',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(230, 200, 123, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  CUSTOMIZE
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToView(3);
                  }}
                  style={{
                    background: 'transparent',
                    border: '1px solid #e6c87b',
                    color: '#e6c87b',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(230, 200, 123, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  VIEW DETAILS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
