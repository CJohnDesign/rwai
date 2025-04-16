"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import Image from "next/image";

interface ModelCardProps {
  id: string;
  name: string;
  description: string;
  tags: string[];
  parameters: number[];
  image: string;
}

export function ModelCard({ id, name, description, tags, parameters, image }: ModelCardProps) {
  const [imgError, setImgError] = useState(false);
  
  const renderImage = () => {
    if (imgError) {
      return (
        <div className="h-24 w-24 rounded-full bg-gray-800 flex items-center justify-center">
          <span className="text-3xl font-bold text-white">{name.charAt(0)}</span>
        </div>
      );
    }
    
    return (
      <Image 
        src={image} 
        alt={`${name} logo`} 
        width={96}
        height={96}
        className="object-contain"
        onError={() => setImgError(true)}
      />
    );
  };
  
  return (
    <div className="bg-[#1E2231] border border-gray-700 rounded-xl overflow-hidden hover:border-gray-500 transition-colors">
      <div className="h-40 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        {renderImage()}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{name}</h3>
        <div className="flex gap-1 mt-2 mb-3 flex-wrap">
          {tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-gray-700 text-gray-300">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-400 line-clamp-3 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            {Math.max(...parameters)}B parameters
          </div>
          <Link 
            href={`/models/${id}`}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            Use Model →
          </Link>
        </div>
      </div>
    </div>
  );
} 