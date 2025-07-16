'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MembershipPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    plan: 'gold'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would integrate with Google Sheets API
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Thank you for joining ROYOMBER Membership! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
        plan: 'gold'
      });
    } catch (error) {
      setMessage('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
            Exclusive Membership Program
          </div>
        </div>

        {/* Membership Benefits */}
        <div style={{
          background: 'rgba(38,34,24,0.22)',
          border: '1.5px solid #e6c87b55',
          borderRadius: '18px',
          marginBottom: '30px',
          boxShadow: '0 2px 24px #e6c87b15',
          padding: '30px 20px'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            color: '#e6c87b',
            textAlign: 'center',
            marginBottom: '25px',
            fontFamily: 'Playfair Display, serif'
          }}>
            Membership Benefits
          </h3>

          <div style={{
            display: 'grid',
            gap: '15px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              background: '#232340',
              borderRadius: '10px'
            }}>
              <span style={{ color: '#e6c87b', marginRight: '12px', fontSize: '1.2rem' }}>✓</span>
              <span style={{ color: '#fffbe6' }}>Priority customer support</span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              background: '#232340',
              borderRadius: '10px'
            }}>
              <span style={{ color: '#e6c87b', marginRight: '12px', fontSize: '1.2rem' }}>✓</span>
              <span style={{ color: '#fffbe6' }}>Exclusive access to limited editions</span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              background: '#232340',
              borderRadius: '10px'
            }}>
              <span style={{ color: '#e6c87b', marginRight: '12px', fontSize: '1.2rem' }}>✓</span>
              <span style={{ color: '#fffbe6' }}>10% discount on all purchases</span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              background: '#232340',
              borderRadius: '10px'
            }}>
              <span style={{ color: '#e6c87b', marginRight: '12px', fontSize: '1.2rem' }}>✓</span>
              <span style={{ color: '#fffbe6' }}>Free personalization & monogramming</span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              background: '#232340',
              borderRadius: '10px'
            }}>
              <span style={{ color: '#e6c87b', marginRight: '12px', fontSize: '1.2rem' }}>✓</span>
              <span style={{ color: '#fffbe6' }}>Complimentary maintenance service</span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              background: '#232340',
              borderRadius: '10px'
            }}>
              <span style={{ color: '#e6c87b', marginRight: '12px', fontSize: '1.2rem' }}>✓</span>
              <span style={{ color: '#fffbe6' }}>Early access to new collections</span>
            </div>
          </div>
        </div>

        {/* Membership Plans */}
        <div style={{
          background: 'rgba(38,34,24,0.22)',
          border: '1.5px solid #e6c87b55',
          borderRadius: '18px',
          marginBottom: '30px',
          boxShadow: '0 2px 24px #e6c87b15',
          padding: '30px 20px'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            color: '#e6c87b',
            textAlign: 'center',
            marginBottom: '25px',
            fontFamily: 'Playfair Display, serif'
          }}>
            Membership Plans
          </h3>

          <div style={{ display: 'grid', gap: '15px' }}>
            <div style={{
              padding: '20px',
              background: '#232340',
              borderRadius: '15px',
              border: formData.plan === 'gold' ? '2px solid #e6c87b' : '1px solid #444',
              cursor: 'pointer'
            }}
            onClick={() => setFormData(prev => ({ ...prev, plan: 'gold' }))}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <h4 style={{ color: '#e6c87b', fontSize: '1.2rem', margin: 0 }}>Gold Membership</h4>
                <span style={{ color: '#fffbe6', fontSize: '1.1rem', fontWeight: 'bold' }}>₹2,999/year</span>
              </div>
              <p style={{ color: '#cccccc', margin: 0, fontSize: '0.9rem' }}>
                All benefits included. Perfect for umbrella enthusiasts.
              </p>
            </div>

            <div style={{
              padding: '20px',
              background: '#232340',
              borderRadius: '15px',
              border: formData.plan === 'platinum' ? '2px solid #e6c87b' : '1px solid #444',
              cursor: 'pointer'
            }}
            onClick={() => setFormData(prev => ({ ...prev, plan: 'platinum' }))}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <h4 style={{ color: '#e6c87b', fontSize: '1.2rem', margin: 0 }}>Platinum Membership</h4>
                <span style={{ color: '#fffbe6', fontSize: '1.1rem', fontWeight: 'bold' }}>₹4,999/year</span>
              </div>
              <p style={{ color: '#cccccc', margin: 0, fontSize: '0.9rem' }}>
                Premium benefits + VIP events + 15% discount on all purchases.
              </p>
            </div>
          </div>
        </div>

        {/* Membership Form */}
        <div style={{
          background: 'rgba(38,34,24,0.22)',
          border: '1.5px solid #e6c87b55',
          borderRadius: '18px',
          boxShadow: '0 2px 24px #e6c87b15',
          padding: '30px 20px'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            color: '#e6c87b',
            textAlign: 'center',
            marginBottom: '25px',
            fontFamily: 'Playfair Display, serif'
          }}>
            Join ROYOMBER Membership
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

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#e6c87b',
                fontSize: '1rem'
              }}>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '1px solid #e6c87b55',
                  borderRadius: '8px',
                  background: '#232340',
                  color: '#fffbe6',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#e6c87b',
                fontSize: '1rem'
              }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '1px solid #e6c87b55',
                  borderRadius: '8px',
                  background: '#232340',
                  color: '#fffbe6',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#e6c87b',
                fontSize: '1rem'
              }}>
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '1px solid #e6c87b55',
                  borderRadius: '8px',
                  background: '#232340',
                  color: '#fffbe6',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#e6c87b',
                fontSize: '1rem'
              }}>
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '1px solid #e6c87b55',
                  borderRadius: '8px',
                  background: '#232340',
                  color: '#fffbe6',
                  fontSize: '1rem',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '15px',
              marginBottom: '30px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#e6c87b',
                  fontSize: '1rem'
                }}>
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '1px solid #e6c87b55',
                    borderRadius: '8px',
                    background: '#232340',
                    color: '#fffbe6',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#e6c87b',
                  fontSize: '1rem'
                }}>
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '1px solid #e6c87b55',
                    borderRadius: '8px',
                    background: '#232340',
                    color: '#fffbe6',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                background: isSubmitting 
                  ? '#666' 
                  : 'linear-gradient(90deg,#e6c87b 70%,#bfa045 100%)',
                color: '#181828',
                border: 'none',
                padding: '16px',
                borderRadius: '10px',
                fontSize: '1.13rem',
                fontWeight: 'bold',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'box-shadow 0.3s, transform 0.2s'
              }}
              onMouseOver={(e) => {
                if (!isSubmitting) {
                  e.target.style.boxShadow = '0 0 18px 4px #e6c87b77';
                  e.target.style.transform = 'translateY(-2px) scale(1.02)';
                }
              }}
              onMouseOut={(e) => {
                if (!isSubmitting) {
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'none';
                }
              }}
            >
              {isSubmitting ? 'JOINING...' : 'JOIN MEMBERSHIP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
