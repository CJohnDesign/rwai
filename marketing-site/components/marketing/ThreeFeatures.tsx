'use client';

import React from 'react';
import { Card, CardContent } from '../ui/card';

const features = [
  {
    title: 'Fractional Ownership',
    description: 'Own a share of premium AI infrastructure through our tokenized platform. Start with any investment level and grow your portfolio.'
  },
  {
    title: 'Passive Income Generation',
    description: 'Earn steady returns through our professional management of your AI compute resources. We handle operations while you collect rewards.'
  },
  {
    title: 'Enterprise-Grade Hardware',
    description: 'Access top-tier hardware like the Dell XE9680 with 8 NVIDIA H100 GPUs, professionally maintained in secure data centers.'
  },
  {
    title: 'Decentralized Future',
    description: 'Be part of the solution to the global AI compute shortage while benefiting from the growing demand for AI infrastructure.'
  }
];

export function ThreeFeatures() {
  return (
    <section id="features" className="relative w-full min-h-screen flex items-center justify-center py-24">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl mb-6">
            Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6600ff] to-[#ff33cc]">
              Next-Generation
            </span> AI Infrastructure
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join the future of AI infrastructure ownership through our innovative tokenization platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="border-none bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 ease-in-out animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <h3 className="text-xl mb-4 text-[#9933ff]">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 