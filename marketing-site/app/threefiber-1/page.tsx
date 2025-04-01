"use client";

import { ThreeFiberHero } from '@/components/marketing/ThreeFiberHero';
import { ThreeFiberFeatures } from '@/components/marketing/ThreeFiberFeatures';
import { ThreeFiberCTA } from '@/components/marketing/ThreeFiberCTA';
import { HeroBackground } from '@/components/three/sections/HeroBackground';
import { FeaturesBackground } from '@/components/three/sections/FeaturesBackground';
import { CTABackground } from '@/components/three/sections/CTABackground';

export default function ThreeFiberPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#000414] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen">
        <div className="absolute inset-0 bg-[#000414]/95" />
        <HeroBackground />
        <ThreeFiberHero />
      </section>

      {/* Features Section */}
      <section className="relative w-full min-h-screen">
        <div className="absolute inset-0 bg-[#000414]/95" />
        <FeaturesBackground />
        <ThreeFiberFeatures />
      </section>

      {/* CTA Section */}
      <section className="relative w-full min-h-screen">
        <div className="absolute inset-0 bg-[#000414]/95" />
        <CTABackground />
        <ThreeFiberCTA />
      </section>
    </main>
  );
} 