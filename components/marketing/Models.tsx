"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { getAppUrl, isVercel } from '../../lib/url-utils';

// Define model type
interface ModelType {
  name: string;
  description: string;
  image: string;
  path: string; // Path relative to the app subdomain
  category: 'model' | 'gpu';
}

// Model data
const models: ModelType[] = [
  { 
    name: 'DeepSeek LLM', 
    description: 'Decentralize AI compute ownership.',
    image: '/images/logo_deepseek.png',
    path: '/models',
    category: 'model'
  },
  { 
    name: 'Llama LLM', 
    description: 'Decentralize AI compute ownership.',
    image: '/images/logo-llama_2.png',
    path: '/models',
    category: 'model'
  },
  { 
    name: 'Black Forest', 
    description: 'Decentralize AI compute ownership.',
    image: '/images/logo_black-forest.png',
    path: '/models',
    category: 'model'
  },
  { 
    name: 'Mistral', 
    description: 'Decentralize AI compute ownership.',
    image: '/images/logo_mistral.png',
    path: '/models',
    category: 'model'
  },
  { 
    name: 'GPU Rental', 
    description: 'Decentralize AI compute ownership.',
    image: '/images/logo-rent-server.png',
    path: '/gpus',
    category: 'gpu'
  }
];

// Card component for model items
const ModelCard = ({ model, priority = false, className = "" }: { model: ModelType; priority?: boolean; className?: string }) => {
  // Construct the full URL to the app subdomain
  const href = getAppUrl(model.path);
  
  return (
    <a 
      href={href}
      className={`group block relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${className}`}
      onClick={(e) => {
        // Log click for debugging
        console.log('Link clicked for', model.name, {
          href,
          targetUrl: e.currentTarget.href,
          currentLocation: window.location.href
        });
      }}
    >
      <div className="absolute inset-0 w-full h-full bg-gray-900">
        <Image
          src={model.image}
          alt={model.name}
          width={800}
          height={600}
          className="w-full h-full object-cover"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-center">
        <h3 className="text-xl md:text-2xl font-bold text-white">{model.name}</h3>
        <div className="bg-gray-800/60 dark:bg-gray-900/60 rounded-full p-2 backdrop-blur-sm group-hover:bg-primary/80 transition-colors duration-300">
          <ChevronRight className="h-5 w-5 text-white" />
        </div>
      </div>
    </a>
  );
};

const Models = () => {
  return (
    <section id="models" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl mb-6 md:mb-0">
            <span className="text-gray-900 dark:text-white">Access Open Source models that</span>
            <br />
            <span className="text-gray-900 dark:text-white">Power the </span>
            <span className="text-primary">AI Revolution</span>
          </h2>
          
          <Button asChild variant="outline" className="self-start md:self-auto border-gray-300 dark:border-gray-700 rounded-full px-6">
            <a href={getAppUrl('models')} className="flex items-center gap-2">
              View Models
              <ChevronRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
        
        {/* Desktop layout */}
        <div className="hidden lg:grid grid-cols-12 gap-5 auto-rows-[270px]">
          {/* Top row */}
          <div className="col-span-4">
            <ModelCard model={models[0]} priority className="h-full aspect-auto" />
          </div>
          <div className="col-span-4">
            <ModelCard model={models[1]} priority className="h-full aspect-auto" />
          </div>
          <div className="col-span-4 row-span-2">
            <ModelCard model={models[4]} priority className="h-full aspect-auto" />
          </div>
          
          {/* Bottom row */}
          <div className="col-span-4">
            <ModelCard model={models[2]} className="h-full aspect-auto" />
          </div>
          <div className="col-span-4">
            <ModelCard model={models[3]} className="h-full aspect-auto" />
          </div>
        </div>
        
        {/* Tablet layout */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-5">
          <div className="aspect-[4/5]">
            <ModelCard model={models[0]} priority className="h-full" />
          </div>
          <div className="aspect-[4/5]">
            <ModelCard model={models[1]} priority className="h-full" />
          </div>
          <div className="aspect-[4/5]">
            <ModelCard model={models[2]} className="h-full" />
          </div>
          <div className="aspect-[4/5]">
            <ModelCard model={models[3]} className="h-full" />
          </div>
          <div className="aspect-[16/9] col-span-2">
            <ModelCard model={models[4]} className="h-full" />
          </div>
        </div>
        
        {/* Mobile layout */}
        <div className="grid md:hidden grid-cols-1 gap-5">
          {models.map((model, index) => (
            <div key={model.name} className="aspect-[4/6]">
              <ModelCard model={model} priority={index < 1} className="h-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Models;