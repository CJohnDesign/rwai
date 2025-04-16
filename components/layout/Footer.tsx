import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SocialIcon } from 'react-social-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/images/RWAi_logo-xs.png" 
                alt="RWAi Logo" 
                width={100} 
                height={40}
                className="w-auto h-8 dark:invert"
              />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              RWAi is the first platform where anyone can access, own, and earn passive income from state-of-the-art AI Rigs that run top open-source models.
            </p>
          </div>
          
          <div className="flex flex-col">
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/whitelist" className="text-muted-foreground hover:text-primary transition-colors">
                    Whitelist
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col">
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} RWAi. All rights reserved.
          </div>
          <div className="flex gap-4 items-center">
            <SocialIcon 
              url="https://x.com/RWAi_xyz" 
              network="x"
              target="_blank"
              rel="noopener noreferrer"
              style={{ height: 30, width: 30 }}
              bgColor="transparent"
              fgColor="currentColor"
              className="text-muted-foreground hover:text-primary transition-colors"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 