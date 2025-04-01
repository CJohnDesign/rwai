import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/marketing/Hero';
import Partners from '../components/marketing/Partners';
import Models from '../components/marketing/Models';
import Whitelist from '../components/marketing/Whitelist';
import Features from '../components/marketing/Features';
import FAQ from '../components/marketing/FAQ';
import Blog from '../components/marketing/Blog';
import Footer from '../components/layout/Footer';
import { HeroBackground } from '@/components/three/sections/HeroBackground';
import { FeaturesBackground } from '@/components/three/sections/FeaturesBackground';
import { CTABackground } from '@/components/three/sections/CTABackground';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative">
          <HeroBackground />
          <Hero />
        </section>
        
        <section className="relative">
          <FeaturesBackground />
          <Models />
          <Partners />
          <Whitelist />
          <Features />
        </section>
        
        <section className="relative">
          <CTABackground />
          <FAQ />
          <Blog />
        </section>
      </main>
      <Footer />
    </>
  );
}
