import React from 'react';
import Link from 'next/link';
import BlogCard from '../ui/BlogCard';
import { blogPosts } from '../../data/blog-posts';
import { Button } from '../ui/button';

const Blog = () => {
  // Only show the first 3 blog posts on the homepage
  const featuredPosts = blogPosts.slice(0, 3);
  
  return (
    <section id="blog" className="py-24 bg-gradient-to-b bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-xl md:text-2xl mb-3 text-primary">Blog</h3>
          <h2 className="text-3xl md:text-5xl mb-6">
            Exploring the frontiers of artificial Intelligence
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Insights, innovations, and impact in the world of AI infrastructure and tokenization.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
            <Link href="/blog">
              View All Articles
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog; 