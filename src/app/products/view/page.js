'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import Image from 'next/image';

function ProductViewPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = parseInt(searchParams?.get('id')) || 0;
  
  // Products data (complete data for all products)
  const products = [
    {
      id: 0,
      name: "Heritage V1",
      serial: "HV-001",
      price: "₹13,500",
      fabric: "Premium Waterproof Polyester",
      leather: "Italian Dreamtarian Leather",
      material: "Carbon Fiber Frame, Brass Hardware",
      mechanism: "Manual Open, Steel Ribs",
      description: "Handcrafted with precision using carbon fiber shaft, Italian leather grip and full UV protection. Built for timeless elegance.",
      images: [
        "/products/product1.jpg",
        "/products/product2.jpeg",
        "/products/product3.jpeg",
        "/products/product1.jpg"
      ]
    },
    {
      id: 1,
      name: "R-cres Series",
      serial: "RC-101",
      price: "₹16,300",
      fabric: "Windproof High-Density Nylon",
      leather: "Premium Vegan Leather",
      material: "Aluminum Alloy Frame, Brass Accents",
      mechanism: "Auto Open/Close",
      description: "R-cres Series umbrellas feature advanced wind resistance, premium materials, and personalized monogram options. For those who desire innovation with luxury.",
      images: [
        "/products/product2.jpeg",
        "/products/product1.jpg",
        "/products/product3.jpeg",
        "/products/product2.jpeg"
      ]
    },
    {
      id: 2,
      name: "Elite Pro",
      serial: "EP-202",
      price: "₹18,500",
      fabric: "Ultra-lightweight Carbon Weave",
      leather: "Hand-stitched Genuine Leather",
      material: "Titanium Frame, Gold Accents",
      mechanism: "Smart Auto Open/Close",
      description: "The pinnacle of umbrella engineering. Elite Pro combines cutting-edge materials with traditional craftsmanship for the ultimate luxury experience.",
      images: [
        "/products/product3.jpeg",
        "/products/product1.jpg",
        "/products/product2.jpeg",
        "/products/product3.jpeg"
      ]
    },
    {
      id: 3,
      name: "Royal Classic",
      serial: "RC-303",
      price: "₹16,300",
      fabric: "British Waterproof Canvas",
      leather: "Classic Oak Handle",
      material: "Steel Frame, Silver Details",
      mechanism: "Traditional Manual",
      description: "Timeless design meets modern functionality. The Royal Classic embodies traditional British umbrella craftsmanship with contemporary materials.",
      images: [
        "/products/product1.jpg",
        "/products/product3.jpeg",
        "/products/product2.jpeg",
        "/products/product1.jpg"
      ]
    }
  ];
  
  // Find the product by id
  const product = products.find(p => p.id === productId) || products[0];
  
  const [zoomModalOpen, setZoomModalOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState('');

  const openZoomModal = (imageSrc) => {
    setZoomedImage(imageSrc);
    setZoomModalOpen(true);
  };

  const closeZoomModal = () => {
    setZoomModalOpen(false);
  };

  const goToPayment = () => {
    const price = product.price.replace('₹', '').replace(',', '');
    router.push(`/payment?name=${encodeURIComponent(product.name)}&price=${price}`);
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
        <div style={{
          background: 'rgba(38,34,24,0.22)',
          border: '1.5px solid #e6c87b55',
          borderRadius: '18px',
          marginTop: '26px',
          boxShadow: '0 2px 24px #e6c87b15',
          padding: '34px 18px 32px 18px',
          textAlign: 'center'
        }}>
          {/* Image Gallery with Side Scroll */}
          <div style={{
            width: '100%',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            marginBottom: '22px',
            scrollbarWidth: 'thin',
            scrollbarColor: '#e6c87b55 #232340'
          }}>
            <div style={{
              display: 'inline-flex',
              gap: '12px',
              padding: '5px 0'
            }}>
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  style={{
                    width: '300px',
                    height: '300px',
                    background: '#232340',
                    borderRadius: '18px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    boxShadow: '0 2px 16px #0006',
                    cursor: 'pointer'
                  }}
                  onClick={() => openZoomModal(image)}
                >
                  <Image 
                    src={image}
                    alt={product.name}
                    width={150}
                    height={150}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '14px',
            color: '#e6c87b'
          }}>
            {product.name}
          </div>
          
          <div style={{
            fontSize: '1.06rem',
            color: '#fffbe6',
            marginBottom: '28px'
          }}>
            Serial No: {product.serial}
          </div>
          
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            margin: '0 auto 28px auto'
          }}>
            <tbody>
              <tr style={{ background: '#232340' }}>
                <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                  <b>Fabric</b>
                </td>
                <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                  {product.fabric}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                  <b>Leather</b>
                </td>
                <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                  {product.leather}
                </td>
              </tr>
              <tr style={{ background: '#232340' }}>
                <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                  <b>Material</b>
                </td>
                <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                  {product.material}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                  <b>Mechanism</b>
                </td>
                <td style={{ padding: '10px 14px', color: '#e6c87b', fontSize: '1.06rem' }}>
                  {product.mechanism}
                </td>
              </tr>
            </tbody>
          </table>
          
          <div style={{
            color: '#fffbe6',
            fontSize: '1.09rem',
            marginBottom: '30px',
            lineHeight: 1.7,
            padding: '0 10px'
          }}>
            {product.description}
          </div>
          
          <div style={{
            fontSize: '1.32rem',
            color: '#fffbe6',
            fontWeight: 'bold',
            marginBottom: '32px'
          }}>
            {product.price}
          </div>
          
          <button
            onClick={goToPayment}
            style={{
              background: 'linear-gradient(90deg,#e6c87b 70%,#bfa045 100%)',
              color: '#181828',
              border: 'none',
              padding: '16px 44px',
              borderRadius: '10px',
              fontSize: '1.13rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'block',
              margin: '0 auto',
              transition: 'box-shadow 0.3s, transform 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.boxShadow = '0 0 18px 4px #e6c87b77';
              e.target.style.transform = 'translateY(-2px) scale(1.04)';
            }}
            onMouseOut={(e) => {
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'none';
            }}
          >
            BUY NOW
          </button>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {zoomModalOpen && (
        <div style={{
          display: 'block',
          position: 'fixed',
          zIndex: 1000,
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.9)'
        }}>
          <span
            onClick={closeZoomModal}
            style={{
              position: 'absolute',
              top: '15px',
              right: '35px',
              color: '#f1f1f1',
              fontSize: '40px',
              fontWeight: 'bold',
              transition: '0.3s',
              cursor: 'pointer'
            }}
          >
            &times;
          </span>
          <Image
            src={zoomedImage}
            alt="Zoomed product"
            width={800}
            height={600}
            style={{
              margin: 'auto',
              display: 'block',
              maxWidth: '90%',
              maxHeight: '90%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
      )}

      <style jsx>{`
        @media (max-width: 700px) {
          .container { 
            padding: 15px 8px; 
          }
          .prod-title { 
            font-size: 1.2rem; 
          }
          .features-table td { 
            font-size: 0.97rem; 
          }
          .prod-desc { 
            font-size: 0.98rem; 
          }
          .prod-price { 
            font-size: 1.01rem; 
          }
          .buy-btn { 
            font-size: 1.01rem; 
            padding: 12px 18px;
          }
          .main-img-box { 
            width: 250px; 
            height: 250px; 
          }
        }
      `}</style>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div style={{
      background: '#181828',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#e6c87b'
    }}>
      <div>Loading product details...</div>
    </div>
  );
}

export default function ProductViewPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProductViewPageContent />
    </Suspense>
  );
}
