import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogContents } from '../../../data/blog-content';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import { Metadata, ResolvingMetadata } from 'next';
import ReactMarkdown from 'react-markdown';

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const post = blogContents.find(post => post.slug === slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }
  
  return {
    title: `${post.title} | RWAi Blog`,
    description: post.content.substring(0, 160) + '...',
    openGraph: {
      images: [post.image],
    },
  };
}

export async function generateStaticParams() {
  return blogContents.map(post => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: Props) {
  const { slug } = params;
  const post = blogContents.find(post => post.slug === slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link href="/blog" className="text-primary hover:underline mb-4 inline-block">
                ← Back to Blog
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
            </div>
            
            <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
            
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown>
                {post.content}
              </ReactMarkdown>
            </article>
            
            <div className="mt-16 pt-8 border-t border-border">
              <Link href="/blog" className="text-primary hover:underline">
                ← Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 