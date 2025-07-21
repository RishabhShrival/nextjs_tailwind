'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageTestPage() {
  const [testUrl, setTestUrl] = useState('');
  const [convertedUrl, setConvertedUrl] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Function to convert Google Drive links (same as in sheets-db.js)
  const convertDriveLink = (url) => {
    if (!url) return url;
    
    const driveMatch = url.match(/(?:https?:\/\/)?(?:www\.)?drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    
    if (driveMatch) {
      const fileId = driveMatch[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    
    return url;
  };

  const handleTest = () => {
    if (!testUrl) return;
    
    const converted = convertDriveLink(testUrl);
    setConvertedUrl(converted);
    setImageLoaded(false);
    setImageError(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <div style={{
      background: '#181828',
      color: '#e6c87b',
      minHeight: '100vh',
      fontFamily: 'Montserrat, sans-serif',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #e6c87b, #d4af37)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          🖼️ Image URL Tester
        </h1>

        <div style={{
          background: '#232340',
          borderRadius: '15px',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#e6c87b' }}>Test Your Image URLs</h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cccccc' }}>
              Enter Image URL (Google Drive link or any image URL):
            </label>
            <input
              type="text"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              placeholder="https://drive.google.com/file/d/1ABC123xyz/view?usp=sharing"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid #e6c87b',
                background: '#181828',
                color: '#e6c87b',
                fontSize: '1rem'
              }}
            />
          </div>

          <button
            onClick={handleTest}
            disabled={!testUrl}
            style={{
              background: testUrl ? 'linear-gradient(135deg, #e6c87b, #d4af37)' : '#666',
              color: '#181828',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: testUrl ? 'pointer' : 'not-allowed',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            Test Image URL
          </button>
        </div>

        {convertedUrl && (
          <div style={{
            background: '#232340',
            borderRadius: '15px',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#e6c87b' }}>Results</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong>Original URL:</strong>
              <div style={{
                background: '#181828',
                padding: '10px',
                borderRadius: '5px',
                marginTop: '5px',
                wordBreak: 'break-all',
                fontSize: '0.9rem',
                color: '#cccccc'
              }}>
                {testUrl}
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <strong>Converted URL:</strong>
              <div style={{
                background: '#181828',
                padding: '10px',
                borderRadius: '5px',
                marginTop: '5px',
                wordBreak: 'break-all',
                fontSize: '0.9rem',
                color: '#cccccc'
              }}>
                {convertedUrl}
              </div>
              {convertedUrl !== testUrl && (
                <div style={{ 
                  color: '#4ade80', 
                  fontSize: '0.9rem', 
                  marginTop: '5px' 
                }}>
                  ✅ Drive link converted successfully!
                </div>
              )}
            </div>

            <div style={{
              border: '2px dashed #e6c87b',
              borderRadius: '10px',
              padding: '2rem',
              textAlign: 'center',
              minHeight: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}>
              {!imageLoaded && !imageError && (
                <div>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                  <p>Loading image...</p>
                </div>
              )}

              {imageError && (
                <div>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>❌</div>
                  <p style={{ color: '#ef4444' }}>Failed to load image</p>
                  <p style={{ fontSize: '0.9rem', color: '#cccccc', marginTop: '1rem' }}>
                    This URL might not work for web display. Try the solutions below.
                  </p>
                </div>
              )}

              {imageLoaded && (
                <div>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✅</div>
                  <p style={{ color: '#4ade80', marginBottom: '1rem' }}>Image loaded successfully!</p>
                </div>
              )}

              <img
                src={convertedUrl}
                alt="Test Image"
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  display: imageLoaded ? 'block' : 'none'
                }}
              />
            </div>
          </div>
        )}

        {/* Instructions */}
        <div style={{
          background: '#232340',
          borderRadius: '15px',
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#e6c87b' }}>📚 Image URL Guidelines</h3>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#e6c87b', marginBottom: '0.5rem' }}>✅ What Works:</h4>
            <ul style={{ color: '#cccccc', lineHeight: '1.6' }}>
              <li><strong>Direct image URLs:</strong> https://example.com/image.jpg</li>
              <li><strong>GitHub raw URLs:</strong> https://raw.githubusercontent.com/user/repo/main/image.jpg</li>
              <li><strong>Imgur links:</strong> https://i.imgur.com/abc123.jpg</li>
              <li><strong>Our converted Drive links:</strong> https://drive.google.com/uc?export=view&id=FILE_ID</li>
            </ul>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>⚠️ Drive Link Requirements:</h4>
            <ul style={{ color: '#cccccc', lineHeight: '1.6' }}>
              <li>File must be <strong>publicly viewable</strong> (Anyone with the link can view)</li>
              <li>File must be an image format (JPG, PNG, GIF, WebP)</li>
              <li>Our system auto-converts Drive sharing links to direct URLs</li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>❌ What Doesn't Work:</h4>
            <ul style={{ color: '#cccccc', lineHeight: '1.6' }}>
              <li>Private Google Drive files</li>
              <li>Files requiring authentication</li>
              <li>Non-image file types</li>
              <li>Blocked or restricted URLs</li>
            </ul>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          padding: '1rem',
          background: 'rgba(230, 200, 123, 0.1)',
          borderRadius: '10px'
        }}>
          <p style={{ color: '#e6c87b', fontWeight: 'bold' }}>
            💡 Pro Tip: Use this tester before adding image URLs to your Products sheet!
          </p>
        </div>
      </div>
    </div>
  );
}
