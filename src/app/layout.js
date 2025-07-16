import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { CustomSidebar } from "@/components/custom-sidebar";
import { SessionWrapper } from "@/components/session-wrapper";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "ROYOMBER - Luxury Umbrellas",
  description: "Premium handcrafted umbrellas for the distinguished gentleman",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --gold: #d4af7f;
            --dark-blue: #181828;
            --darker-blue: #0d0d1a;
            --light-gold: #e6c87b;
            --white-text: #fffbe6;
            --grey-text: #cccccc;
          }
        `}} />
      </head>
      <body
        className={`${playfairDisplay.variable} ${montserrat.variable} antialiased`}
        style={{
          background: '#181828',
          minHeight: '100vh',
          color: '#e6c87b',
          fontFamily: 'var(--font-montserrat), sans-serif'
        }}
      >
        <SessionWrapper>
          <CustomSidebar />
          <main style={{ position: 'relative', zIndex: 1 }}>
            {children}
          </main>
        </SessionWrapper>
      </body>
    </html>
  );
}
