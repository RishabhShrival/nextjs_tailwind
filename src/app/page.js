"use client";
import { ProductCard } from "@/components/card";
import Image from "next/image";
import { use, useEffect } from "react";

export default function Home() {

  useEffect(() => {
    // Add JavaScript to handle parallax effect on scroll
    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      parallaxElements.forEach((element) => {
        const scrollPosition = window.pageYOffset;
        const viewportHeight = window.innerHeight;

        // Get element's position relative to viewport
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollPosition;

        // Calculate translateY with scroll
        let translateY = scrollPosition * 0.3;

        // Get responsive limits from CSS custom properties or calculate defaults
        const computedStyle = getComputedStyle(element);
        const maxUpwardVh = parseFloat(computedStyle.getPropertyValue('--max-up-vh')) || 10;
        const maxDownwardVh = parseFloat(computedStyle.getPropertyValue('--max-down-vh')) || 10;

        // Convert vh to pixels
        const maxUpwardTranslate = -(viewportHeight + 550) * maxUpwardVh / 100;
        const maxDownwardTranslate = (viewportHeight + 550) * maxDownwardVh / 100;

        // Ensure element doesn't go above the viewport top
        const minTranslateToStayVisible = Math.max(maxUpwardTranslate, -elementTop);

        // Check if translateY exceeds limits and fix position
        if (translateY <= maxUpwardTranslate) {
          // Fix at upper limit with position fixed
          element.style.position = 'fixed';
          element.style.top = '0';
        } else if (translateY >= maxDownwardTranslate) {
          element.style.position = 'fixed';
          element.style.top = '0';
        } else {
          // Normal parallax movement within limits - reset to relative positioning
          element.style.position = 'relative';
          element.style.transform = `translateY(${translateY}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen my-2 sm:mx-25 font-[family-name:var(--font-geist-sans)] bg-indigo-950">
      <section id="home" className="bg-[url('/hero.jpg')] bg-cover bg-center h-screen flex flex-col items-center justify-center text-center">
        <div className="parallax-bg text-5xl font-bold text-white" style={{ "--max-up-vh": "15", "--max-down-vh": "8" }}>
          <div className="flex flex-row place-items-baseline">
          <img src="/logo.jpg" alt="Logo" className="w-9.5 h-auto" />
          <h1>
            ROYOMBER
          </h1>
          </div>
        </div>
      </section>

      <section id="product" className="h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <ProductCard id={1} image="/products/product1.jpg" title="Luxury Watch" description="A premium watch crafted with precision and elegance." alt="Luxury Watch" className="mb-4" />
        <ProductCard id={2} image="/products/product2.jpeg" title="Designer Handbag" description="A stylish handbag made from the finest leather." alt="Designer Handbag" className="mb-4" />
        <ProductCard id={3} image="/products/product3.jpeg" title="Elegant Shoes" description="Handcrafted shoes that combine comfort and style." alt="Elegant Shoes" className="mb-4" />
        </div>
      </section>

      <section id="ads" className="h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Ads
        </h2>
        <p className="text-lg text-white">
          This template is designed to help you get started quickly with Next.js and Tailwind CSS.
          It includes a responsive layout, a simple navigation structure, and a clean design.
        </p>
      </section>

      <section id="about" className="h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">
          About
        </h2>
        <p className="text-lg text-white">
          Royomber is a luxury brand that specializes in high-end fashion and accessories.
          Our products are crafted with the finest materials and attention to detail, ensuring that each piece is truly unique.
        </p>
      </section>


      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
