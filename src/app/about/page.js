'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{
      background: '#23252a',
      color: '#e5d9b6',
      fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif',
      margin: 0,
      padding: 0,
      letterSpacing: '0.01em',
      lineHeight: 1.7,
      minHeight: '100vh'
    }}>
      {/* Logo and Brand Name */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '2.5rem',
        marginBottom: '1.2rem'
      }}>
        <svg
          style={{
            width: '130px',
            height: '150px',
            display: 'block',
            marginBottom: '0.7rem'
          }}
          viewBox="0 0 300 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M150 20
            Q270 50 270 100
            L270 170
            Q270 260 150 320
            Q30 260 30 170
            L30 100
            Q30 50 150 20
            Z"
            stroke="#c3a46b" strokeWidth="8" fill="none"/>
          <path d="M100 85 Q150 55 200 85" stroke="#c3a46b" strokeWidth="5" fill="none"/>
          <rect x="147" y="43" width="6" height="22" rx="2.5" fill="#c3a46b"/>
          <rect x="105" y="70" width="6" height="18" rx="2.5" transform="rotate(-25 105 70)" fill="#c3a46b"/>
          <rect x="189" y="70" width="6" height="18" rx="2.5" transform="rotate(25 189 70)" fill="#c3a46b"/>
          <text x="70" y="190" fontFamily="Times New Roman, Times, serif" fontSize="105" fontWeight="bold" fill="#c3a46b" letterSpacing="10">R</text>
          <text x="150" y="220" fontFamily="Times New Roman, Times, serif" fontSize="105" fontWeight="bold" fill="#c3a46b" letterSpacing="10">Y</text>
        </svg>
        <div style={{
          fontSize: '2.5rem',
          fontFamily: 'Times New Roman, Times, serif',
          fontWeight: 700,
          color: '#c3a46b',
          letterSpacing: '0.18em',
          textShadow: '0 1px 6px rgba(0,0,0,0.08)',
          marginBottom: '0.7rem',
          marginTop: '-0.7rem',
          background: 'linear-gradient(90deg, #e5c37a 0%, #c3a46b 50%, #bba15f 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          ROYOMBRE
        </div>
      </div>

      <header style={{
        background: 'linear-gradient(rgba(35,37,42,0.92), rgba(35,37,42,0.92)), url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80") center/cover no-repeat',
        minHeight: '350px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        animation: 'fadeIn 1.7s',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: '0 1.5rem'
        }}>
          <div style={{
            fontSize: '2.2rem',
            fontWeight: 600,
            color: '#c3a46b',
            letterSpacing: '0.03em',
            marginTop: '2.5rem'
          }}>
            Beyond Shade. A Legacy in Craft.
          </div>
          <div style={{
            fontSize: '1.15rem',
            marginTop: '1rem',
            color: '#e5d9b6',
            fontWeight: 400,
            fontStyle: 'italic',
            marginBottom: '2.2rem'
          }}>
            Luxury isn&apos;t loud. It&apos;s deeply personal — just like ROYOMBER.
          </div>
          <div style={{
            color: '#b3a58e',
            fontSize: '1rem',
            marginBottom: '2.5rem',
            letterSpacing: '0.08em',
            opacity: 0.85,
            animation: 'bounce 1.5s infinite alternate'
          }}>
            ▼ Scroll to Discover
          </div>
        </div>
      </header>

      <main style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        {/* Section 2: The Origin Story */}
        <section style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
          <div style={{
            fontSize: '1.3rem',
            fontWeight: 600,
            color: '#c3a46b',
            marginBottom: '1.2rem',
            letterSpacing: '0.03em'
          }}>
            Where It All Began
          </div>
          <div style={{
            fontSize: '1.06rem',
            color: '#e5d9b6',
            marginBottom: '0.7rem'
          }}>
            ROYOMBER was born from the eyes of <strong style={{ color: '#c3a46b' }}>Aayush Manik</strong>, who believed that even the simplest product — like an umbrella — could be transformed into a timeless luxury statement.<br /><br />
            He saw what others ignored: details, craftsmanship, and the quiet confidence of elegance.<br />
            In a world of mass production, he chose to build something rare.<br />
            Something meaningful.<br />
            Something personal.
          </div>
        </section>

        {/* Section 3: Our Philosophy */}
        <section style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
          <div style={{
            fontSize: '1.3rem',
            fontWeight: 600,
            color: '#c3a46b',
            marginBottom: '1.2rem',
            letterSpacing: '0.03em'
          }}>
            Balanced Luxury
          </div>
          <div style={{
            fontSize: '1.06rem',
            color: '#e5d9b6',
            marginBottom: '0.7rem'
          }}>
            We don&apos;t believe in shouting luxury.<br />
            We believe in <strong style={{ color: '#c3a46b' }}>Balanced Luxury</strong> — a space between rarity and experience.<br /><br />
            ROYOMBER is not made for everyone. It is created for those who value silence, precision, and soul.<br />
            That&apos;s why we release limited pieces.<br />
            That&apos;s why we focus more on feel than fame.
          </div>
        </section>

        {/* Section 4: Craftsmanship */}
        <section style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
          <div style={{
            fontSize: '1.3rem',
            fontWeight: 600,
            color: '#c3a46b',
            marginBottom: '1.2rem',
            letterSpacing: '0.03em'
          }}>
            Crafted, Not Manufactured
          </div>
          <div style={{
            fontSize: '1.06rem',
            color: '#e5d9b6',
            marginBottom: '0.7rem'
          }}>
            Every ROYOMBER umbrella is hand-crafted using the world&apos;s finest materials:
            <ul style={{ margin: '1.2rem 0 0 1.2rem', color: '#e5d9b6', fontSize: '1.01rem' }}>
              <li>Carbon fiber rods for ultra-light strength</li>
              <li>Solid brass fittings for timeless elegance</li>
              <li>UV-protected canopies that blend science with style</li>
              <li>Wood or leather handles, shaped and polished by artisans</li>
            </ul>
            <br />
            More than <strong style={{ color: '#c3a46b' }}>40+ steps</strong>. Zero shortcuts.
          </div>
        </section>

        {/* Section 5: Icons Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1.8rem',
          margin: '2.2rem 0 1.5rem 0'
        }}>
          {[
            { icon: 'M16 3l11 5v7c0 7.732-5.373 14.174-11 16-5.627-1.826-11-8.268-11-16V8l11-5zm0 2.18L6 8.7v6.3c0 6.41 4.46 12.22 10 13.96 5.54-1.74 10-7.55 10-13.96V8.7l-10-3.52z', label: 'Protection' },
            { icon: 'M16 4c2.21 0 4 1.79 4 4v5h2V8c0-3.31-2.69-6-6-6S10 4.69 10 8v5h2V8c0-2.21 1.79-4 4-4zm-7 12v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4V16h-2v10c0 1.1-.9 2-2 2h-6c-1.1 0-2-.9-2-2V16h-2z', label: 'Craftsmanship' },
            { icon: 'M9 16c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6zm6-4a4 4 0 100 8 4 4 0 000-8z', label: 'Legacy' }
          ].map((item, index) => (
            <div key={index} style={{ flex: 1, textAlign: 'center' }}>
              <svg style={{ width: '38px', height: '38px', marginBottom: '0.5rem', fill: '#c3a46b', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} viewBox="0 0 32 32">
                <path d={item.icon} />
              </svg>
              <div style={{
                fontSize: '1.04rem',
                color: '#b3a58e',
                fontWeight: 500,
                marginTop: '0.1rem',
                letterSpacing: '0.02em'
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Section 6: Founder's Note */}
        <section style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
          <div style={{
            fontSize: '1.3rem',
            fontWeight: 600,
            color: '#c3a46b',
            marginBottom: '1.2rem',
            letterSpacing: '0.03em'
          }}>
            Founder&apos;s Note
          </div>
          <div style={{
            borderLeft: '3px solid #c3a46b',
            paddingLeft: '1.2rem',
            fontStyle: 'italic',
            marginBottom: '1.2rem',
            color: '#b3a58e'
          }}>
            &quot;For me, ROYOMBER is not a business. It is a mindset — of grace, of depth, of design.<br /><br />
            I created this brand for those who still notice the little things.<br />
            For those who don&apos;t just carry a product — they carry pride.&quot;
            <div style={{
              marginTop: '0.5rem',
              fontWeight: 600,
              color: '#c3a46b',
              fontSize: '1.05rem',
              letterSpacing: '0.03em'
            }}>
              — Aayush Manik, Founder
            </div>
          </div>
        </section>

        {/* Section 7: What Makes ROYOMBER Different */}
        <section style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
          <div style={{
            fontSize: '1.3rem',
            fontWeight: 600,
            color: '#c3a46b',
            marginBottom: '1.2rem',
            letterSpacing: '0.03em'
          }}>
            What Makes ROYOMBER Different
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.2rem 2.2rem',
            marginTop: '2rem',
            marginBottom: '2.2rem'
          }}>
            {[
              'Limited production, not mass-made',
              'Customization options (monogram, handle, color)',
              'Lifetime luxury membership experience',
              'Crafted in India, admired internationally',
              'Personal service, not automated support'
            ].map((feature, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.7rem',
                fontSize: '1.01rem',
                color: '#e5d9b6'
              }}>
                <svg style={{ width: '20px', height: '20px', fill: '#c3a46b', flexShrink: 0, marginTop: '2px' }} viewBox="0 0 20 20">
                  <path d="M7.629 15.314l-5.657-5.657 1.414-1.414 4.243 4.243 8.485-8.485 1.414 1.414z" />
                </svg>
                {feature}
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Closing Line + CTA */}
        <section style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
          <div style={{
            fontSize: '1.18rem',
            color: '#c3a46b',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            ROYOMBER is not for everyone. And that&apos;s the point.<br />
            If you understand it — welcome to our world.
          </div>
          <div style={{
            display: 'flex',
            gap: '1.2rem',
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            <Link href="/products" style={{
              background: '#c3a46b',
              color: '#23252a',
              padding: '0.95rem 2.2rem',
              borderRadius: '30px',
              fontWeight: 600,
              fontSize: '1.09rem',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              transition: 'background 0.2s, color 0.2s',
              boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
              marginBottom: '0.7rem',
              textDecoration: 'none',
              display: 'inline-block'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#e5d9b6';
              e.target.style.color = '#23252a';
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#c3a46b';
              e.target.style.color = '#23252a';
            }}
            >
              Explore Our Collection
            </Link>
            <Link href="/membership" style={{
              background: '#c3a46b',
              color: '#23252a',
              padding: '0.95rem 2.2rem',
              borderRadius: '30px',
              fontWeight: 600,
              fontSize: '1.09rem',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              transition: 'background 0.2s, color 0.2s',
              boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
              marginBottom: '0.7rem',
              textDecoration: 'none',
              display: 'inline-block'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#e5d9b6';
              e.target.style.color = '#23252a';
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#c3a46b';
              e.target.style.color = '#23252a';
            }}
            >
              Join the Membership
            </Link>
          </div>
        </section>

        <div style={{ height: '3rem' }}></div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounce {
          to { transform: translateY(8px); }
        }
        @media (max-width: 700px) {
          main {
            max-width: 99vw;
          }
          .features-grid {
            grid-template-columns: 1fr;
          }
          .icons-row {
            flex-direction: column;
            gap: 1.5rem;
          }
          .logo-svg {
            width: 80px;
            height: 90px;
          }
          .brand-name {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
