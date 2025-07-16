'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useSession, signOut } from 'next-auth/react'
import { User, LogOut, Settings, Package } from 'lucide-react'

export function Navbar() {
  const { data: session, status } = useSession()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      borderBottom: '2px solid #e6c87b',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 20px rgba(230, 200, 123, 0.1)'
    }}>
      {/* Left side - Logo and Sidebar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <SidebarTrigger style={{
          color: '#e6c87b',
          background: 'rgba(230, 200, 123, 0.1)',
          border: '1px solid #e6c87b',
          borderRadius: '8px',
          padding: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }} />
        
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image
            src="/logo.jpg"
            alt="ROYOMBER Logo"
            width={45}
            height={45}
            style={{
              borderRadius: '50%',
              border: '2px solid #e6c87b',
              marginRight: '12px'
            }}
          />
          <span style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #e6c87b, #f4d03f)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '2px'
          }}>
            ROYOMBER
          </span>
        </Link>
      </div>

      {/* Right side - User Authentication */}
      <div style={{ position: 'relative' }}>
        {status === 'loading' ? (
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(230, 200, 123, 0.2)',
            border: '2px solid #e6c87b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px solid #e6c87b',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          </div>
        ) : session ? (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(230, 200, 123, 0.1)',
                border: '1px solid #e6c87b',
                borderRadius: '25px',
                padding: '8px 16px',
                color: '#e6c87b',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.9rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(230, 200, 123, 0.2)'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(230, 200, 123, 0.1)'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              <User size={18} />
              <span>{session.user?.name || session.user?.email}</span>
            </button>

            {showProfileMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                background: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)',
                border: '1px solid #e6c87b',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                minWidth: '200px',
                zIndex: 1001
              }}>
                <Link
                  href="/profile"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    color: '#e6c87b',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(230, 200, 123, 0.2)',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(230, 200, 123, 0.1)'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  <Settings size={16} />
                  <span>Profile Settings</span>
                </Link>
                
                <Link
                  href="/orders"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    color: '#e6c87b',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(230, 200, 123, 0.2)',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(230, 200, 123, 0.1)'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  <Package size={16} />
                  <span>My Orders</span>
                </Link>

                <button
                  onClick={handleSignOut}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    color: '#e6c87b',
                    cursor: 'pointer',
                    borderRadius: '0 0 12px 12px',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(230, 200, 123, 0.1)'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link
              href="/auth/signin"
              style={{
                padding: '10px 20px',
                background: 'transparent',
                border: '1px solid #e6c87b',
                borderRadius: '25px',
                color: '#e6c87b',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '0.9rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(230, 200, 123, 0.1)'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(45deg, #e6c87b, #f4d03f)',
                border: 'none',
                borderRadius: '25px',
                color: '#1a1a1a',
                textDecoration: 'none',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                fontSize: '0.9rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 6px 20px rgba(230, 200, 123, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </nav>
  )
}
