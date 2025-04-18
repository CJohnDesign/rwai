import React from 'react';
import { Card, CardContent } from '../ui/card';

const features = [
  {
    title: 'Cutting-Edge Hardware',
    description: 'RWAi RIGS are built using only the latest and most powerful components, ensuring peak performance for demanding AI workloads.'
  },
  {
    title: 'Optimized Configuration',
    description: 'Each rig is meticulously configured for optimal AI compute performance, maximizing throughput and minimizing latency.'
  },
  {
    title: 'Enterprise-Grade Reliability',
    description: 'RWAi sources components from trusted vendors and employs rigorous testing to guarantee stability and uptime.'
  },
  {
    title: 'Real Yield from AI',
    description: 'Generate real yield by meeting the growing AI compute demand with server boxes designed for seamless scalability.'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 lg:px-48 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl mb-6">
            {/* Access <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-700"> */}
              Fully managed AI infrastructure
            {/* </span>  */}
            converted to RWA opportunity
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl animate-slide-up animation-delay-400"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <h3 className="text-xl mb-4 text-primary">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 