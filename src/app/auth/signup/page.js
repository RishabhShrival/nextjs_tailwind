'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    try {
      // Create user in Google Sheets database
      const response = await fetch('/api/test-sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create_user',
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone
          }
        })
      })

      const result = await response.json()

      if (result.success) {
        setSuccess('Account created successfully! You can now sign in.')
        
        // Auto sign in after 2 seconds
        setTimeout(async () => {
          await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false,
          })
          router.push('/')
        }, 2000)
      } else {
        setError(result.message || 'Failed to create account')
      }
    } catch (error) {
      console.error('Signup error:', error)
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
        maxWidth: '600px',
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
            Join the Elite
          </p>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <label style={{
                display: 'block',
                color: '#e6c87b',
                marginBottom: '0.5rem',
                fontWeight: 'bold'
              }}>
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
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
                placeholder="John"
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                color: '#e6c87b',
                marginBottom: '0.5rem',
                fontWeight: 'bold'
              }}>
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
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
                placeholder="Doe"
              />
            </div>
          </div>

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
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              placeholder="john@example.com"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: '#e6c87b',
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div>
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
                name="password"
                value={formData.password}
                onChange={handleChange}
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
                placeholder="Min. 6 characters"
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                color: '#e6c87b',
                marginBottom: '0.5rem',
                fontWeight: 'bold'
              }}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
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
                placeholder="Repeat password"
              />
            </div>
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

          {success && (
            <div style={{
              background: 'rgba(0, 255, 0, 0.1)',
              border: '1px solid rgba(0, 255, 0, 0.3)',
              borderRadius: '10px',
              padding: '1rem',
              marginBottom: '1.5rem',
              color: '#4caf50',
              textAlign: 'center'
            }}>
              {success}
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
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Sign In Link */}
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
            Already have an account?
          </p>
          <Link
            href="/auth/signin"
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
            Sign In
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
