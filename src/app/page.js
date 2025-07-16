'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function HomePage() {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setMobileMenuActive(!mobileMenuActive);
  };

  return (
    <>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        backgroundColor: 'var(--dark-blue)',
        borderBottom: '1px solid rgba(230,200,123,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo Image */}
          <Image
            src="/logo.png"
            alt="ROYOMBER Logo"
            width={50}
            height={50}
            style={{ marginRight: '15px' }}
          />
          <div style={{
            color: 'var(--gold)',
            fontSize: '28px',
            fontWeight: 'bold',
            fontFamily: 'var(--font-title)',
            letterSpacing: '1.5px'
          }}>
            ROYOMBER
          </div>
        </div>
        
        {/* Hamburger Menu
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            zIndex: 1001
          }}
          onClick={toggleMenu}
        >
          <span style={{
            display: 'block',
            width: '30px',
            height: '3px',
            marginBottom: '5px',
            position: 'relative',
            background: 'var(--gold)',
            borderRadius: '3px',
            zIndex: 1,
            transformOrigin: '4px 0px',
            transition: 'transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0), background 0.5s cubic-bezier(0.77,0.2,0.05,1.0), opacity 0.55s ease'
          }}></span>
          <span style={{
            display: 'block',
            width: '30px',
            height: '3px',
            marginBottom: '5px',
            position: 'relative',
            background: 'var(--gold)',
            borderRadius: '3px',
            zIndex: 1,
            transformOrigin: '4px 0px',
            transition: 'transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0), background 0.5s cubic-bezier(0.77,0.2,0.05,1.0), opacity 0.55s ease'
          }}></span>
          <span style={{
            display: 'block',
            width: '30px',
            height: '3px',
            marginBottom: '0',
            position: 'relative',
            background: 'var(--gold)',
            borderRadius: '3px',
            zIndex: 1,
            transformOrigin: '4px 0px',
            transition: 'transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0), background 0.5s cubic-bezier(0.77,0.2,0.05,1.0), opacity 0.55s ease'
          }}></span>
        </div> */}
      </header>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--dark-blue)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        transform: mobileMenuActive ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.5s ease'
      }}>
        <Link href="/" style={{ color: 'var(--white-text)', fontSize: '2rem', margin: '15px 0', fontFamily: 'var(--font-title)' }}>Home</Link>
        <Link href="/products" style={{ color: 'var(--white-text)', fontSize: '2rem', margin: '15px 0', fontFamily: 'var(--font-title)' }}>Products</Link>
        <Link href="/about" style={{ color: 'var(--white-text)', fontSize: '2rem', margin: '15px 0', fontFamily: 'var(--font-title)' }}>About</Link>
        <Link href="/membership" style={{ color: 'var(--white-text)', fontSize: '2rem', margin: '15px 0', fontFamily: 'var(--font-title)' }}>Membership</Link>
        {session ? (
          <Link href="/profile" style={{ color: 'var(--white-text)', fontSize: '2rem', margin: '15px 0', fontFamily: 'var(--font-title)' }}>Profile</Link>
        ) : (
          <Link href="/auth/signin" style={{ color: 'var(--white-text)', fontSize: '2rem', margin: '15px 0', fontFamily: 'var(--font-title)' }}>Sign In</Link>
        )}
      </div>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <Image
          src="/hero.jpg"
          alt="ROYOMBER Luxury Umbrella"
          fill
          style={{
            objectFit: 'cover',
            filter: 'brightness(0.6) grayscale(0.2)',
            zIndex: -1
          }}
        />
        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '800px',
          padding: '0 20px',
          animation: 'fadeIn 2s ease-out'
        }}>
          <h1 style={{
            fontSize: '4.5rem',
            fontFamily: 'var(--font-title)',
            letterSpacing: '3px',
            color: 'var(--white-text)',
            marginBottom: '25px',
            textShadow: '0 0 15px rgba(230,200,123,0.3)'
          }}>
            CRAFTED FOR ELEGANCE
          </h1>
          <p style={{
            fontSize: '1.5rem',
            color: 'var(--grey-text)',
            marginBottom: '40px'
          }}>
            Experience the perfect blend of craftsmanship, luxury, and protection
          </p>
          <Link 
            href="/products"
            style={{
              background: 'linear-gradient(45deg, var(--gold), #bfa045)',
              color: 'var(--dark-blue)',
              padding: '15px 35px',
              textDecoration: 'none',
              fontWeight: 'bold',
              borderRadius: '5px',
              fontSize: '1.2rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 5px 15px rgba(212,175,127,0.4)',
              letterSpacing: '0.5px',
              display: 'inline-block',
              minWidth: '220px'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-5px) scale(1.02)';
              e.target.style.boxShadow = '0 8px 25px rgba(212,175,127,0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'none';
              e.target.style.boxShadow = '0 5px 15px rgba(212,175,127,0.4)';
            }}
          >
            VIEW COLLECTION
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '80px 40px',
        backgroundColor: 'var(--darker-blue)'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-title)',
          fontSize: '2.5rem',
          color: 'var(--gold)',
          textAlign: 'center',
          marginBottom: '50px',
          letterSpacing: '1px'
        }}>
          EXQUISITE CRAFTSMANSHIP
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            { icon: '🛡️', title: 'Carbon Fiber Shaft', desc: 'Ultra-lightweight yet incredibly strong. The same material used in aerospace. Feels light in hand, strong in wind.' },
            { icon: '🧵', title: 'Hand-stitched Binding', desc: 'Every umbrella edge is handcrafted by skilled artisans. No machine-cut mass feel. You feel the hand behind the design.' },
            { icon: '🔆', title: 'UV Protection Canopy', desc: 'UV-coated internal lining with UPF 50+ protection. Designed for Indian sun, Dubai heat, and Paris rain.' },
            { icon: '🖋️', title: 'Custom Monogram', desc: 'Your initials on a brass ring or tag. A unique identity — nobody else has the same umbrella as yours.' },
            { icon: '🏷️', title: 'Serial Numbered', desc: 'Each umbrella has a unique serial code with ROYOMBER digital certificate. A piece of collectible design.' },
            { icon: '📦', title: 'Luxury Packaging', desc: 'Comes with inner sleeve bag and premium gift box. Feels like unboxing a luxury watch.' }
          ].map((feature, index) => (
            <div key={index} style={{
              background: 'rgba(24, 24, 40, 0.5)',
              border: '1px solid rgba(230,200,123,0.2)',
              borderRadius: '8px',
              padding: '30px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{
                fontSize: '2.5rem',
                color: 'var(--gold)',
                marginBottom: '20px'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-title)',
                fontSize: '1.5rem',
                color: 'var(--light-gold)',
                marginBottom: '15px'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: 'var(--white-text)',
                fontSize: '1rem',
                lineHeight: '1.6'
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Membership Section */}
      <section style={{
        padding: '80px 40px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-title)',
            fontSize: '2.5rem',
            color: 'var(--gold)',
            marginBottom: '20px'
          }}>
            EXCLUSIVE MEMBERSHIP
          </h2>
          <p style={{
            color: 'var(--white-text)',
            fontSize: '1.1rem',
            marginBottom: '30px'
          }}>
            Join the ROYOMBER family and enjoy premium benefits that enhance your ownership experience.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            margin: '40px 0',
            textAlign: 'left'
          }}>
            {[
              '1-Year Craft Warranty with free repair of minor damage',
              'Priority access to limited edition collections',
              'Complimentary cleaning and maintenance service',
              'Exclusive invitations to ROYOMBER events',
              'Special discounts on future purchases',
              'Personalized customer service'
            ].map((benefit, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '15px'
              }}>
                <span style={{
                  color: 'var(--gold)',
                  fontSize: '1.2rem',
                  marginRight: '10px',
                  marginTop: '5px'
                }}>
                  ✓
                </span>
                <p style={{
                  color: 'var(--white-text)'
                }}>
                  {benefit}
                </p>
              </div>
            ))}
          </div>
          
          <Link 
            href="/membership"
            style={{
              background: 'linear-gradient(45deg, var(--gold), #bfa045)',
              color: 'var(--dark-blue)',
              padding: '15px 35px',
              textDecoration: 'none',
              fontWeight: 'bold',
              borderRadius: '5px',
              fontSize: '1.2rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 5px 15px rgba(212,175,127,0.4)',
              letterSpacing: '0.5px',
              display: 'inline-block',
              minWidth: '220px'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-5px) scale(1.02)';
              e.target.style.boxShadow = '0 8px 25px rgba(212,175,127,0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'none';
              e.target.style.boxShadow = '0 5px 15px rgba(212,175,127,0.4)';
            }}
          >
            JOIN MEMBERSHIP
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--darker-blue)',
        padding: '40px',
        textAlign: 'center',
        borderTop: '1px solid rgba(230,200,123,0.1)'
      }}>
        <Image
          src="/logo.png"
          alt="ROYOMBER Logo"
          width={80}
          height={80}
          style={{ marginBottom: '20px' }}
        />
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          margin: '20px 0'
        }}>
          <Link href="/" style={{ color: 'var(--light-gold)', fontSize: '1rem' }}>Home</Link>
          <Link href="/products" style={{ color: 'var(--light-gold)', fontSize: '1rem' }}>Products</Link>
          <Link href="/about" style={{ color: 'var(--light-gold)', fontSize: '1rem' }}>About</Link>
          <Link href="/membership" style={{ color: 'var(--light-gold)', fontSize: '1rem' }}>Membership</Link>
          {session ? (
            <Link href="/profile" style={{ color: 'var(--light-gold)', fontSize: '1rem' }}>Profile</Link>
          ) : (
            <Link href="/auth/signin" style={{ color: 'var(--light-gold)', fontSize: '1rem' }}>Sign In</Link>
          )}
        </div>
        
        <p style={{
          color: 'var(--grey-text)',
          fontSize: '0.9rem',
          marginTop: '20px'
        }}>
          © 2025 ROYOMBER. All rights reserved.
        </p>
        <p style={{
          color: 'var(--grey-text)',
          fontSize: '0.9rem'
        }}>
          Email: info@royomber.com | Instagram: @royomber_official | Twitter: @royomber
        </p>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem !important;
          }
          p {
            font-size: 1.1rem !important;
          }
        }
      `}</style>
    </>
  );
}
