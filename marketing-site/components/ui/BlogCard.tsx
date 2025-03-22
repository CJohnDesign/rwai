import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '../../data/blog-posts';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

const BlogCard = ({ post, className = '' }: BlogCardProps) => {
  return (
    <div className={`bg-card rounded-xl overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out dark:bg-gray-800/80 ${className}`}>
      <div className="relative h-48">
        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={400}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      
      <div className="p-6">
        <div className="text-sm text-muted-foreground mb-2">{post.date}</div>
        <h3 className="text-xl font-bold mb-3">{post.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
        
        <Link href={post.url} className="text-primary font-medium hover:underline">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard; 