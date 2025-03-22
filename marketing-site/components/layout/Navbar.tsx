"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ThemeToggle } from '../ui/theme-toggle';
import { SocialIcon } from 'react-social-icons';
import { Moon, Sun, X, Menu, Twitter } from 'lucide-react';
import { getAppUrl } from '../../lib/url-utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 py-4 px-6 md:px-12 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="w-full flex items-center justify-between">
          {/* Left section - Hamburger and Logo */}
          <div className="flex items-center gap-4">
            {/* Hamburger menu button - always visible */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 dark:text-gray-300 p-0.5"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/RWAi_logo-xs.png" 
                alt="RWAi Logo" 
                width={120} 
                height={40} 
                style={{ width: 'auto', height: 'auto', maxHeight: '32px' }}
                priority
                className="dark:invert w-[90px] md:w-[110px] h-auto object-contain"
              />
            </Link>
          </div>
          
          {/* Right section - X icon and Launch App button */}
          <div className="flex items-center gap-4">
            <SocialIcon 
              url="https://x.com/rwai_xyz" 
              network="x"
              target="_blank"
              rel="noopener noreferrer"
              style={{ height: 32, width: 32 }}
              bgColor="transparent"
              fgColor="currentColor"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            />
            <Button asChild className="bg-primary hover:bg-primary/90 text-white">
              <a href={getAppUrl('models')}>
                <span className="hidden md:inline -mr-[3px]">Launch</span>App
              </a>
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Drawer - Slides in from left */}
      <div className={`fixed inset-0 z-50 ${isMenuOpen ? 'block' : 'hidden'}`}>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50" 
          onClick={toggleMenu}
          aria-hidden="true"
        />
        
        {/* Drawer panel */}
        <div className="fixed inset-y-0 left-0 w-80 bg-white dark:bg-gray-900 shadow-xl transform transition duration-300 ease-in-out">
          {/* Header with logo and close button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center">
              <Image 
                src="/images/RWAi_logo-xs.png" 
                alt="RWAi Logo" 
                width={100} 
                height={32} 
                style={{ width: 'auto', height: 'auto', maxHeight: '28px' }}
                className="dark:invert w-[80px] h-auto object-contain"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
          
          {/* Navigation links */}
          <div className="px-6 py-8">
            <div className="flex flex-col space-y-6">
              <Link 
                href="/" 
                className="group flex items-center py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 mr-4 group-hover:bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                Home
              </Link>
              
              <Link 
                href="/whitelist" 
                className="group flex items-center py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 mr-4 group-hover:bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                Whitelist
              </Link>
              
              <Link 
                href="/blog" 
                className="group flex items-center py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 mr-4 group-hover:bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                    <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                  </svg>
                </div>
                Blog
              </Link>
              
              <div className="group flex items-center py-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 mr-4 group-hover:bg-primary/10">
                  <span className="text-gray-600 dark:text-gray-400">
                    <SocialIcon 
                      url="https://x.com/rwai_xyz" 
                      network="x"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ height: 24, width: 24 }}
                      bgColor="transparent"
                      fgColor="currentColor"
                      className="text-gray-600 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary transition-colors"
                    />
                  </span>
                </div>
                <a 
                  href="https://x.com/rwai_xyz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Follow us on X
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom actions section */}
          <div className="absolute bottom-0 left-0 right-0">
            {/* Theme toggle section */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-800">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Display Theme</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Toggle between light and dark mode</p>
                  </div>
                  <ThemeToggle variant="icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar; 