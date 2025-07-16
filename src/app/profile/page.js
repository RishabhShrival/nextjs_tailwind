'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  if (status === 'loading') {
    return (
      <div style={{
        background: '#181828',
        color: '#e6c87b',
        fontFamily: 'Montserrat, sans-serif',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ fontSize: '1.2rem' }}>Loading...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div style={{
        background: '#181828',
        color: '#e6c87b',
        fontFamily: 'Montserrat, sans-serif',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{
          background: 'rgba(38,34,24,0.22)',
          border: '1.5px solid #e6c87b55',
          borderRadius: '18px',
          padding: '40px 30px',
          maxWidth: '400px'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            color: '#e6c87b',
            marginBottom: '20px',
            fontFamily: 'Playfair Display, serif'
          }}>
            Please Sign In
          </h2>
          <p style={{ color: '#fffbe6', marginBottom: '25px' }}>
            You need to be signed in to view your profile.
          </p>
          <button
            onClick={() => router.push('/auth/signin')}
            style={{
              background: 'linear-gradient(90deg,#e6c87b 70%,#bfa045 100%)',
              color: '#181828',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    // Here you would save to Google Sheets or your database
    setIsEditing(false);
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
            My Profile
          </div>
        </div>

        {/* Profile Information */}
        <div style={{
          background: 'rgba(38,34,24,0.22)',
          border: '1.5px solid #e6c87b55',
          borderRadius: '18px',
          marginBottom: '25px',
          boxShadow: '0 2px 24px #e6c87b15',
          padding: '30px 20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '25px'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              color: '#e6c87b',
              margin: 0,
              fontFamily: 'Playfair Display, serif'
            }}>
              Profile Details
            </h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              style={{
                background: 'transparent',
                border: '1px solid #e6c87b',
                color: '#e6c87b',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div style={{ display: 'grid', gap: '15px' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                color: '#e6c87b',
                fontSize: '0.95rem'
              }}>
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profileData.name || session.user.name || ''}
                  onChange={handleInputChange}
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
              ) : (
                <div style={{
                  padding: '10px 12px',
                  background: '#232340',
                  borderRadius: '6px',
                  color: '#fffbe6'
                }}>
                  {session.user.name || 'Not provided'}
                </div>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                color: '#e6c87b',
                fontSize: '0.95rem'
              }}>
                Email
              </label>
              <div style={{
                padding: '10px 12px',
                background: '#232340',
                borderRadius: '6px',
                color: '#fffbe6'
              }}>
                {session.user.email}
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                color: '#e6c87b',
                fontSize: '0.95rem'
              }}>
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
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
              ) : (
                <div style={{
                  padding: '10px 12px',
                  background: '#232340',
                  borderRadius: '6px',
                  color: '#fffbe6'
                }}>
                  {profileData.phone || 'Not provided'}
                </div>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                color: '#e6c87b',
                fontSize: '0.95rem'
              }}>
                Address
              </label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
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
              ) : (
                <div style={{
                  padding: '10px 12px',
                  background: '#232340',
                  borderRadius: '6px',
                  color: '#fffbe6',
                  minHeight: '60px'
                }}>
                  {profileData.address || 'Not provided'}
                </div>
              )}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  color: '#e6c87b',
                  fontSize: '0.95rem'
                }}>
                  City
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleInputChange}
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
                ) : (
                  <div style={{
                    padding: '10px 12px',
                    background: '#232340',
                    borderRadius: '6px',
                    color: '#fffbe6'
                  }}>
                    {profileData.city || 'Not provided'}
                  </div>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  color: '#e6c87b',
                  fontSize: '0.95rem'
                }}>
                  Pincode
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="pincode"
                    value={profileData.pincode}
                    onChange={handleInputChange}
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
                ) : (
                  <div style={{
                    padding: '10px 12px',
                    background: '#232340',
                    borderRadius: '6px',
                    color: '#fffbe6'
                  }}>
                    {profileData.pincode || 'Not provided'}
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <button
                onClick={handleSaveProfile}
                style={{
                  background: 'linear-gradient(90deg,#e6c87b 70%,#bfa045 100%)',
                  color: '#181828',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Account Actions */}
        <div style={{
          background: 'rgba(38,34,24,0.22)',
          border: '1.5px solid #e6c87b55',
          borderRadius: '18px',
          boxShadow: '0 2px 24px #e6c87b15',
          padding: '25px 20px'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            color: '#e6c87b',
            marginBottom: '20px',
            fontFamily: 'Playfair Display, serif'
          }}>
            Account Actions
          </h3>

          <div style={{ display: 'grid', gap: '12px' }}>
            <button
              onClick={() => router.push('/membership')}
              style={{
                background: 'transparent',
                border: '1px solid #e6c87b',
                color: '#e6c87b',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              Manage Membership
            </button>

            <button
              onClick={() => router.push('/products')}
              style={{
                background: 'transparent',
                border: '1px solid #e6c87b',
                color: '#e6c87b',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              Browse Products
            </button>

            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              style={{
                background: '#dc3545',
                border: 'none',
                color: '#fff',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}