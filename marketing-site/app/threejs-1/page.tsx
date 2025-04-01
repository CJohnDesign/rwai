"use client";

import { ThreeHero } from '@/components/marketing/ThreeHero';
import { ThreeFeatures } from '@/components/marketing/ThreeFeatures';
import { ThreeDeckBuilder } from '@/components/marketing/ThreeDeckBuilder';
import { ThreeJSHeroBackground } from '@/components/three/sections/ThreeJSHeroBackground';
import { ThreeJSFeaturesBackground } from '@/components/three/sections/ThreeJSFeaturesBackground';
import { ThreeJSDeckBuilderBackground } from '@/components/three/sections/ThreeJSDeckBuilderBackground';

export default function ThreeJSPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#000414] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen">
        <ThreeJSHeroBackground />
        <div className="absolute inset-0 bg-[#000414]/60" />
        <div className="relative z-10">
          <ThreeHero />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative w-full min-h-screen">
        <ThreeJSFeaturesBackground />
        <div className="absolute inset-0 bg-[#000414]/60" />
        <div className="relative z-10">
          <ThreeFeatures />
        </div>
      </section>

      {/* Deck Builder Section */}
      <section className="relative w-full min-h-screen">
        <ThreeJSDeckBuilderBackground />
        <div className="absolute inset-0 bg-[#000414]/60" />
        <div className="relative z-10">
          <ThreeDeckBuilder />
        </div>
      </section>
    </main>
  );
} 