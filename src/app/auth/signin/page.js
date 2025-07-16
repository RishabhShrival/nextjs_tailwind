'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'rgba(230, 200, 123, 0.05)',
        border: '1px solid rgba(230, 200, 123, 0.2)',
        borderRadius: '20px',
        padding: '3rem',
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <Image
            src="/logo.jpg"
            alt="ROYOMBER Logo"
            width={80}
            height={80}
            style={{
              borderRadius: '50%',
              border: '3px solid #e6c87b',
              marginBottom: '1rem'
            }}
          />
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #e6c87b, #f4d03f)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '2px',
            marginBottom: '0.5rem'
          }}>
            ROYOMBER
          </h1>
          <p style={{
            color: '#cccccc',
            fontSize: '1.1rem'
          }}>
            Welcome Back
          </p>
        </div>

        {/* Demo Credentials */}
        <div style={{
          background: 'rgba(230, 200, 123, 0.1)',
          border: '1px solid rgba(230, 200, 123, 0.3)',
          borderRadius: '10px',
          padding: '1rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#e6c87b',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            Demo Login Credentials:
          </p>
          <p style={{
            color: '#cccccc',
            fontSize: '0.85rem',
            margin: '0.25rem 0'
          }}>
            Email: demo@royomber.com
          </p>
          <p style={{
            color: '#cccccc',
            fontSize: '0.85rem',
            margin: '0.25rem 0'
          }}>
            Password: demo123
          </p>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: '#e6c87b',
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(230, 200, 123, 0.1)',
                border: '1px solid rgba(230, 200, 123, 0.3)',
                borderRadius: '10px',
                color: '#e6c87b',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#e6c87b'
                e.target.style.boxShadow = '0 0 0 2px rgba(230, 200, 123, 0.2)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(230, 200, 123, 0.3)'
                e.target.style.boxShadow = 'none'
              }}
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              color: '#e6c87b',
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(230, 200, 123, 0.1)',
                border: '1px solid rgba(230, 200, 123, 0.3)',
                borderRadius: '10px',
                color: '#e6c87b',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#e6c87b'
                e.target.style.boxShadow = '0 0 0 2px rgba(230, 200, 123, 0.2)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(230, 200, 123, 0.3)'
                e.target.style.boxShadow = 'none'
              }}
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(255, 0, 0, 0.1)',
              border: '1px solid rgba(255, 0, 0, 0.3)',
              borderRadius: '10px',
              padding: '1rem',
              marginBottom: '1.5rem',
              color: '#ff6b6b',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              background: loading ? 'rgba(230, 200, 123, 0.5)' : 'linear-gradient(45deg, #e6c87b, #f4d03f)',
              color: '#1a1a1a',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 8px 25px rgba(230, 200, 123, 0.3)'
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Sign Up Link */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          padding: '1rem 0',
          borderTop: '1px solid rgba(230, 200, 123, 0.2)'
        }}>
          <p style={{
            color: '#cccccc',
            marginBottom: '1rem'
          }}>
            Don&apos;t have an account?
          </p>
          <Link
            href="/auth/signup"
            style={{
              color: '#e6c87b',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#f4d03f'}
            onMouseLeave={(e) => e.target.style.color = '#e6c87b'}
          >
            Create Account
          </Link>
        </div>

        {/* Back to Home */}
        <div style={{
          textAlign: 'center',
          marginTop: '1rem'
        }}>
          <Link
            href="/"
            style={{
              color: '#999',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#e6c87b'}
            onMouseLeave={(e) => e.target.style.color = '#999'}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
