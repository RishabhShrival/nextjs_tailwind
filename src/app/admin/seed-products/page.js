'use client';

import { useState } from 'react';

export default function SeedProducts() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [products, setProducts] = useState([]);

  const seedProducts = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'seed_products' })
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message: 'Error seeding products',
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products);
        setResult({
          success: true,
          message: `Found ${data.count} products in Google Sheets`
        });
      } else {
        setResult(data);
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Error fetching products',
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      padding: '2rem',
      color: '#e6c87b'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'rgba(230, 200, 123, 0.05)',
        border: '1px solid rgba(230, 200, 123, 0.2)',
        borderRadius: '12px',
        padding: '2rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          ROYOMBER Product Migration
        </h1>

        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          justifyContent: 'center'
        }}>
          <button
            onClick={seedProducts}
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #e6c87b 0%, #d4af37 100%)',
              color: '#1a1a1a',
              padding: '12px 24px',
              borderRadius: '6px',
              border: 'none',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Processing...' : 'Seed Products to Google Sheets'}
          </button>

          <button
            onClick={fetchProducts}
            disabled={loading}
            style={{
              background: 'transparent',
              color: '#e6c87b',
              padding: '12px 24px',
              borderRadius: '6px',
              border: '1px solid #e6c87b',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Loading...' : 'Fetch Products from Sheets'}
          </button>
        </div>

        {result && (
          <div style={{
            padding: '1rem',
            marginBottom: '2rem',
            borderRadius: '6px',
            background: result.success 
              ? 'rgba(34, 197, 94, 0.1)' 
              : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${result.success ? '#22c55e' : '#ef4444'}`,
            color: result.success ? '#22c55e' : '#ef4444'
          }}>
            <h3 style={{ marginBottom: '0.5rem', fontWeight: '600' }}>
              {result.success ? 'Success!' : 'Error'}
            </h3>
            <p>{result.message}</p>
            {result.results && (
              <div style={{ marginTop: '1rem' }}>
                <h4>Results:</h4>
                <ul>
                  {result.results.map((item, index) => (
                    <li key={index} style={{
                      color: item.success ? '#22c55e' : '#ef4444'
                    }}>
                      {item.name} ({item.id}) - {item.success ? 'Success' : 'Failed'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.error && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                Error details: {result.error}
              </p>
            )}
          </div>
        )}

        {products.length > 0 && (
          <div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              Products in Google Sheets ({products.length})
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1rem'
            }}>
              {products.map((product) => (
                <div key={product.id} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(230, 200, 123, 0.2)',
                  borderRadius: '8px',
                  padding: '1rem'
                }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem'
                  }}>
                    {product.name}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#d4af37',
                    marginBottom: '0.5rem'
                  }}>
                    {product.id} - {product.category}
                  </p>
                  <p style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#e6c87b'
                  }}>
                    ₹{product.basePrice?.toLocaleString()}
                  </p>
                  <p style={{
                    fontSize: '0.875rem',
                    marginTop: '0.5rem',
                    color: product.isActive ? '#22c55e' : '#ef4444'
                  }}>
                    {product.isActive ? 'Active' : 'Inactive'} - Stock: {product.stockQuantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid #3b82f6',
          borderRadius: '6px',
          color: '#3b82f6'
        }}>
          <h3 style={{ marginBottom: '0.5rem', fontWeight: '600' }}>Instructions:</h3>
          <ol style={{ paddingLeft: '1rem' }}>
            <li>First, create a "Products" sheet in your Google Sheets with these column headers:</li>
            <ul style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>
              <li><code>id | name | description | base_price | category | image_url | features | stock_quantity | is_active | weight | dimensions | warranty_period | materials | created_at | updated_at</code></li>
            </ul>
            <li style={{ marginTop: '0.5rem' }}>Click "Seed Products to Google Sheets" to migrate your existing products</li>
            <li style={{ marginTop: '0.5rem' }}>Click "Fetch Products from Sheets" to verify the data was saved correctly</li>
            <li style={{ marginTop: '0.5rem' }}>Once verified, your app will automatically use Google Sheets data instead of static data</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
