import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Blog Post Not Found</h2>
            <p className="text-lg text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/blog" 
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium"
              >
                Browse All Blog Posts
              </Link>
              <Link 
                href="/" 
                className="border border-border hover:bg-muted px-6 py-3 rounded-lg font-medium"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 