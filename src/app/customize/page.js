'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CustomizePage() {
  const router = useRouter();
  const [customization, setCustomization] = useState({
    handle: 'italian-leather',
    frame: 'carbon-fiber',
    fabric: 'waterproof-polyester',
    color: 'classic-black',
    monogram: '',
    packaging: 'premium-box'
  });

  const [estimatedPrice, setEstimatedPrice] = useState(15500);

  const handleOptions = {
    'italian-leather': { name: 'Italian Leather Handle', price: 0, description: 'Premium hand-stitched Italian leather grip' },
    'oak-wood': { name: 'Oak Wood Handle', price: 1500, description: 'Classic handcrafted oak wood with brass accents' },
    'bamboo-eco': { name: 'Bamboo Eco Handle', price: 800, description: 'Sustainable bamboo with natural finish' },
    'carbon-grip': { name: 'Carbon Fiber Grip', price: 2200, description: 'Lightweight carbon fiber with ergonomic design' }
  };

  const frameOptions = {
    'carbon-fiber': { name: 'Carbon Fiber Frame', price: 0, description: 'Ultra-lightweight aerospace-grade carbon fiber' },
    'titanium': { name: 'Titanium Frame', price: 3500, description: 'Premium titanium alloy - strongest and lightest' },
    'aluminum': { name: 'Aluminum Frame', price: -800, description: 'Durable aluminum construction' },
    'steel-ribs': { name: 'Steel Ribs Frame', price: -1200, description: 'Traditional steel ribs for maximum durability' }
  };

  const fabricOptions = {
    'waterproof-polyester': { name: 'Waterproof Polyester', price: 0, description: 'Premium waterproof fabric with UV protection' },
    'silk-blend': { name: 'Silk Blend Canopy', price: 2800, description: 'Luxury silk blend with water-resistant coating' },
    'canvas-heritage': { name: 'Heritage Canvas', price: 1500, description: 'Traditional British-style canvas material' },
    'nylon-tech': { name: 'Tech Nylon', price: 900, description: 'High-tech nylon with wind resistance' }
  };

  const colorOptions = {
    'classic-black': { name: 'Classic Black', price: 0 },
    'navy-blue': { name: 'Navy Blue', price: 0 },
    'burgundy': { name: 'Burgundy', price: 500 },
    'forest-green': { name: 'Forest Green', price: 500 },
    'charcoal-grey': { name: 'Charcoal Grey', price: 0 },
    'royal-purple': { name: 'Royal Purple', price: 800 }
  };

  const packagingOptions = {
    'premium-box': { name: 'Premium Gift Box', price: 0, description: 'Luxury wooden box with velvet interior' },
    'leather-case': { name: 'Leather Travel Case', price: 1200, description: 'Handcrafted leather travel case' },
    'eco-packaging': { name: 'Eco-Friendly Box', price: -200, description: 'Sustainable packaging materials' }
  };

  const handleCustomizationChange = (category, value) => {
    setCustomization(prev => ({
      ...prev,
      [category]: value
    }));
    calculatePrice(category, value);
  };

  const calculatePrice = (category, value) => {
    const basePrice = 15500;
    let totalPrice = basePrice;
    
    const options = {
      handle: handleOptions,
      frame: frameOptions,
      fabric: fabricOptions,
      color: colorOptions,
      packaging: packagingOptions
    };

    Object.keys(customization).forEach(key => {
      if (key === 'monogram') return;
      const selectedValue = key === category ? value : customization[key];
      if (options[key] && options[key][selectedValue]) {
        totalPrice += options[key][selectedValue].price;
      }
    });

    // Monogram surcharge
    if (customization.monogram.length > 0) {
      totalPrice += 800;
    }

    setEstimatedPrice(totalPrice);
  };

  const proceedToPayment = () => {
    const customProductName = `Custom ROYOMBER Umbrella - ${handleOptions[customization.handle].name}, ${frameOptions[customization.frame].name}`;
    router.push(`/payment?name=${encodeURIComponent(customProductName)}&price=${estimatedPrice}&custom=true`);
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
        maxWidth: '600px',
        margin: '0 auto',
        padding: '30px 15px 40px 15px'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <Image
            src="/logo.png"
            alt="ROYOMBER Logo"
            width={80}
            height={80}
            style={{
              marginBottom: '15px'
            }}
          />
          <div style={{
            fontSize: '2.2rem',
            fontWeight: 700,
            color: '#e6c87b',
            fontFamily: 'Playfair Display, serif',
            marginBottom: '10px'
          }}>
            CUSTOMIZE YOUR ROYOMBER
          </div>
          <div style={{
            fontSize: '1rem',
            color: '#fffbe6',
            marginBottom: '20px'
          }}>
            Create your perfect luxury umbrella
          </div>
        </div>

        {/* Price Display */}
        <div style={{
          background: 'rgba(38,34,24,0.22)',
          border: '1.5px solid #e6c87b55',
          borderRadius: '15px',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '25px',
          boxShadow: '0 2px 24px #e6c87b15'
        }}>
          <div style={{
            fontSize: '1.1rem',
            color: '#fffbe6',
            marginBottom: '8px'
          }}>
            Estimated Price
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#e6c87b'
          }}>
            ₹{estimatedPrice.toLocaleString()}
          </div>
        </div>

        {/* Handle Customization */}
        <div style={{
          background: 'rgba(38,34,24,0.22)',
          border: '1.5px solid #e6c87b55',
          borderRadius: '15px',
          padding: '25px 20px',
          marginBottom: '20px',
          boxShadow: '0 2px 24px #e6c87b15'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            color: '#e6c87b',
            marginBottom: '20px',
            fontFamily: 'Playfair Display, serif'
          }}>
            Handle Material
          </h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {Object.entries(handleOptions).map(([key, option]) => (
              <div
                key={key}
                onClick={() => handleCustomizationChange('handle', key)}
                style={{
                  padding: '15px',
                  background: customization.handle === key ? '#232340' : '#1a1a2e',
                  border: customization.handle === key ? '2px solid #e6c87b' : '1px solid #444',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '5px'
                }}>
                  <span style={{ color: '#fffbe6', fontWeight: 'bold' }}>{option.name}</span>
                  <span style={{ color: '#e6c87b' }}>
                    {option.price === 0 ? 'Included' : `+₹${option.price}`}
                  </span>
                </div>
                <p style={{ color: '#cccccc', fontSize: '0.9rem', margin: 0 }}>
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Frame Customization */}
        <div style={{
          background: 'rgba(38,34,24,0.22)',
          border: '1.5px solid #e6c87b55',
          borderRadius: '15px',
          padding: '25px 20px',
          marginBottom: '20px',
          boxShadow: '0 2px 24px #e6c87b15'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            color: '#e6c87b',
            marginBottom: '20px',
            fontFamily: 'Playfair Display, serif'
          }}>
            Frame Material
          </h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {Object.entries(frameOptions).map(([key, option]) => (
              <div
                key={key}
                onClick={() => handleCustomizationChange('frame', key)}
                style={{
                  padding: '15px',
                  background: customization.frame === key ? '#232340' : '#1a1a2e',
                  border: customization.frame === key ? '2px solid #e6c87b' : '1px solid #444',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '5px'
                }}>
                  <span style={{ color: '#fffbe6', fontWeight: 'bold' }}>{option.name}</span>
                  <span style={{ color: '#e6c87b' }}>
                    {option.price === 0 ? 'Included' : option.price > 0 ? `+₹${option.price}` : `₹${option.price}`}
                  </span>
                </div>
                <p style={{ color: '#cccccc', fontSize: '0.9rem', margin: 0 }}>
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Fabric Customization */}
        <div style={{
          background: 'rgba(38,34,24,0.22)',
          border: '1.5px solid #e6c87b55',
          borderRadius: '15px',
          padding: '25px 20px',
          marginBottom: '20px',
          boxShadow: '0 2px 24px #e6c87b15'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            color: '#e6c87b',
            marginBottom: '20px',
            fontFamily: 'Playfair Display, serif'
          }}>
            Fabric Material
          </h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {Object.entries(fabricOptions).map(([key, option]) => (
              <div
                key={key}
                onClick={() => handleCustomizationChange('fabric', key)}
                style={{
                  padding: '15px',
                  background: customization.fabric === key ? '#232340' : '#1a1a2e',
                  border: customization.fabric === key ? '2px solid #e6c87b' : '1px solid #444',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '5px'
                }}>
                  <span style={{ color: '#fffbe6', fontWeight: 'bold' }}>{option.name}</span>
                  <span style={{ color: '#e6c87b' }}>
                    {option.price === 0 ? 'Included' : `+₹${option.price}`}
                  </span>
                </div>
                <p style={{ color: '#cccccc', fontSize: '0.9rem', margin: 0 }}>
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div style={{
          background: 'rgba(38,34,24,0.22)',
          border: '1.5px solid #e6c87b55',
          borderRadius: '15px',
          padding: '25px 20px',
          marginBottom: '20px',
          boxShadow: '0 2px 24px #e6c87b15'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            color: '#e6c87b',
            marginBottom: '20px',
            fontFamily: 'Playfair Display, serif'
          }}>
            Color Selection
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
            {Object.entries(colorOptions).map(([key, option]) => (
              <div
                key={key}
                onClick={() => handleCustomizationChange('color', key)}
                style={{
                  padding: '12px',
                  background: customization.color === key ? '#232340' : '#1a1a2e',
                  border: customization.color === key ? '2px solid #e6c87b' : '1px solid #444',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ color: '#fffbe6', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  {option.name}
                </div>
                {option.price > 0 && (
                  <div style={{ color: '#e6c87b', fontSize: '0.8rem' }}>
                    +₹{option.price}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Monogram */}
        <div style={{
          background: 'rgba(38,34,24,0.22)',
          border: '1.5px solid #e6c87b55',
          borderRadius: '15px',
          padding: '25px 20px',
          marginBottom: '20px',
          boxShadow: '0 2px 24px #e6c87b15'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            color: '#e6c87b',
            marginBottom: '15px',
            fontFamily: 'Playfair Display, serif'
          }}>
            Personal Monogram
          </h3>
          <p style={{ color: '#cccccc', fontSize: '0.9rem', marginBottom: '15px' }}>
            Add your initials (up to 3 characters) - ₹800 surcharge
          </p>
          <input
            type="text"
            value={customization.monogram}
            onChange={(e) => {
              const value = e.target.value.toUpperCase().slice(0, 3);
              setCustomization(prev => ({ ...prev, monogram: value }));
              calculatePrice('monogram', value);
            }}
            placeholder="Your initials (e.g., JDC)"
            style={{
              width: '100%',
              padding: '12px',
              background: '#232340',
              border: '1px solid #e6c87b55',
              borderRadius: '8px',
              color: '#fffbe6',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Packaging */}
        <div style={{
          background: 'rgba(38,34,24,0.22)',
          border: '1.5px solid #e6c87b55',
          borderRadius: '15px',
          padding: '25px 20px',
          marginBottom: '30px',
          boxShadow: '0 2px 24px #e6c87b15'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            color: '#e6c87b',
            marginBottom: '20px',
            fontFamily: 'Playfair Display, serif'
          }}>
            Packaging Option
          </h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {Object.entries(packagingOptions).map(([key, option]) => (
              <div
                key={key}
                onClick={() => handleCustomizationChange('packaging', key)}
                style={{
                  padding: '15px',
                  background: customization.packaging === key ? '#232340' : '#1a1a2e',
                  border: customization.packaging === key ? '2px solid #e6c87b' : '1px solid #444',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '5px'
                }}>
                  <span style={{ color: '#fffbe6', fontWeight: 'bold' }}>{option.name}</span>
                  <span style={{ color: '#e6c87b' }}>
                    {option.price === 0 ? 'Included' : option.price > 0 ? `+₹${option.price}` : `₹${option.price}`}
                  </span>
                </div>
                <p style={{ color: '#cccccc', fontSize: '0.9rem', margin: 0 }}>
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gap: '15px' }}>
          <button
            onClick={proceedToPayment}
            style={{
              background: 'linear-gradient(90deg,#e6c87b 70%,#bfa045 100%)',
              color: '#181828',
              border: 'none',
              padding: '16px',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'box-shadow 0.3s, transform 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.boxShadow = '0 0 18px 4px #e6c87b77';
              e.target.style.transform = 'translateY(-2px) scale(1.02)';
            }}
            onMouseOut={(e) => {
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'none';
            }}
          >
            PROCEED TO PAYMENT - ₹{estimatedPrice.toLocaleString()}
          </button>

          <Link
            href="/products"
            style={{
              display: 'block',
              background: 'transparent',
              border: '1px solid #e6c87b',
              color: '#e6c87b',
              padding: '14px',
              borderRadius: '10px',
              fontSize: '1rem',
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
            BACK TO PRODUCTS
          </Link>
        </div>
      </div>
    </div>
  );
}
