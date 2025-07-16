'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Home, Info, Package, Users, User, X, Menu } from 'lucide-react';

const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
  },
  {
    title: "Membership",
    url: "/membership",
    icon: Users,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export function CustomSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={toggleSidebar}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1001,
          background: 'rgba(38,34,24,0.95)',
          border: '1px solid #e6c87b',
          borderRadius: '8px',
          padding: '10px',
          color: '#e6c87b',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}
      >
        <Menu size={18} />
      </button>

      {/* Sidebar - Small Right Side Panel */}
      <div
        style={{
          position: 'fixed',
          top: '70px',
          right: isOpen ? '20px' : '-280px',
          width: '260px',
          maxHeight: 'calc(100vh - 100px)',
          background: 'linear-gradient(180deg, #181828 0%, #232340 100%)',
          border: '2px solid #e6c87b55',
          borderRadius: '12px',
          zIndex: 1000,
          transition: 'right 0.3s ease-in-out',
          overflowY: 'auto',
          fontFamily: 'Montserrat, sans-serif',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Sidebar Header */}
        <div style={{
          padding: '20px 15px',
          borderBottom: '1px solid #e6c87b55',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#e6c87b',
              fontFamily: 'Playfair Display, serif'
            }}>
              ROYOMBER
            </div>
            <div style={{
              fontSize: '0.8rem',
              color: '#fffbe6',
              opacity: 0.8
            }}>
              Luxury Umbrellas
            </div>
          </div>
          <button
            onClick={closeSidebar}
            style={{
              background: 'none',
              border: 'none',
              color: '#e6c87b',
              cursor: 'pointer',
              padding: '5px'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* User Info */}
        {session && (
          <div style={{
            padding: '15px',
            borderBottom: '1px solid #e6c87b55',
            background: 'rgba(38,34,24,0.3)'
          }}>
            <div style={{
              fontSize: '0.9rem',
              color: '#fffbe6',
              fontWeight: 'bold',
              marginBottom: '3px'
            }}>
              Welcome back!
            </div>
            <div style={{
              fontSize: '0.8rem',
              color: '#e6c87b',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {session.user.name || session.user.email}
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <div style={{ padding: '15px 0' }}>
          <div style={{
            fontSize: '0.7rem',
            color: '#e6c87b',
            fontWeight: 'bold',
            padding: '0 15px 10px 15px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Navigation
          </div>
          
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={index}
                href={item.url}
                onClick={closeSidebar}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 15px',
                  color: '#fffbe6',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  borderLeft: '3px solid transparent'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(230, 200, 123, 0.1)';
                  e.currentTarget.style.borderLeftColor = '#e6c87b';
                  e.currentTarget.style.color = '#e6c87b';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderLeftColor = 'transparent';
                  e.currentTarget.style.color = '#fffbe6';
                }}
              >
                <IconComponent size={16} style={{ marginRight: '12px' }} />
                <span style={{ fontSize: '0.9rem' }}>{item.title}</span>
              </Link>
            );
          })}
        </div>

        {/* Authentication Section */}
        <div style={{
          padding: '15px',
          borderTop: '1px solid #e6c87b55',
          marginTop: 'auto'
        }}>
          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              style={{
                width: '100%',
                background: 'rgba(220, 53, 69, 0.8)',
                border: '1px solid #dc3545',
                color: '#fff',
                padding: '10px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#dc3545';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(220, 53, 69, 0.8)';
              }}
            >
              Sign Out
            </button>
          ) : (
            <div style={{ display: 'grid', gap: '8px' }}>
              <Link
                href="/auth/signin"
                onClick={closeSidebar}
                style={{
                  display: 'block',
                  background: 'linear-gradient(90deg,#e6c87b 70%,#bfa045 100%)',
                  color: '#181828',
                  padding: '10px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                onClick={closeSidebar}
                style={{
                  display: 'block',
                  background: 'transparent',
                  border: '1px solid #e6c87b',
                  color: '#e6c87b',
                  padding: '10px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(230, 200, 123, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
