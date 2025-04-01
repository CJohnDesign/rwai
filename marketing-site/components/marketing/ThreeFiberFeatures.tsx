'use client';

import React from 'react';
import { Card, CardContent } from '../ui/card';

const features = [
  {
    title: 'Declarative 3D Rendering',
    description: 'Build complex 3D scenes using React components and hooks, making Three.js development feel native to React.'
  },
  {
    title: 'React State Integration',
    description: 'Seamlessly integrate your 3D visualizations with React state management and the React component lifecycle.'
  },
  {
    title: 'Suspense & Concurrent Mode',
    description: 'Take advantage of React 18 features like Suspense and Concurrent Mode for smooth loading states and transitions.'
  },
  {
    title: 'React Ecosystem Compatibility',
    description: 'Leverage the entire React ecosystem including hooks, context, and state management libraries in your 3D applications.'
  }
];

export function ThreeFiberFeatures() {
  return (
    <section id="features" className="relative w-full min-h-screen flex items-center justify-center py-24">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl mb-6">
            Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6600ff] to-[#ff33cc]">
              React-Powered
            </span> Infrastructure Management
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our platform leverages React Three Fiber to bring the power of React's component model to 3D visualization.
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