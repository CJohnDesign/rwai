import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BlogCard from '../../components/ui/BlogCard';
import { blogPosts } from '../../data/blog-posts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | RWAi',
  description: 'Explore the latest insights, innovations, and impact in the world of AI infrastructure and tokenization.',
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-xl md:text-2xl font-bold mb-3 text-primary">Blog</h3>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Exploring the frontiers of artificial Intelligence
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Insights, innovations, and impact in the world of AI infrastructure and tokenization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post, index) => (
              <BlogCard key={index} post={post} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 