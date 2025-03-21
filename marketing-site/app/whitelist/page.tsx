'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import Link from 'next/link';
import { Button } from '../../components/ui/button';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { getSupabaseClient, hasSupabaseCredentials } from '../../lib/supabase-client';
import { Turnstile } from '@marsidev/react-turnstile';

export default function WhitelistPage() {
  const [formData, setFormData] = useState({
    wallet_address: '',
    email: '',
    twitter_verified: false
  });

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, error: null });
  const [supabaseError, setSupabaseError] = useState(null);

  // Check for Supabase initialization errors
  useEffect(() => {
    if (!hasSupabaseCredentials()) {
      setSupabaseError(
        'Unable to connect to our database. Please try again later or contact support.'
      );
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, error: null });

    if (!turnstileToken) {
      setSubmitStatus({ success: false, error: "Please complete the Turnstile verification" });
      setIsSubmitting(false);
      return;
    }

    try {
      // First verify the turnstile token
      const verifyResponse = await fetch('/api/verify-turnstile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: turnstileToken }),
      });

      const verifyResult = await verifyResponse.json();
      
      if (!verifyResult.success) {
        throw new Error('Turnstile verification failed. Please try again.');
      }

      // Get Supabase client instance
      const supabase = getSupabaseClient();

      // Check if Supabase is properly initialized
      if (!supabase) {
        throw new Error('Database connection is not available. Please try again later.');
      }

      // Insert the data into your Supabase table
      const { data, error } = await supabase
        .from('whitelist_applications') // Replace with your actual table name
        .insert([
          {
            email: formData.email || null,
            wallet_address: formData.wallet_address,
            twitter_verified: formData.twitter_verified
            // created_at will be handled by Supabase automatically
          }
        ]);

      if (error) throw error;

      setSubmitStatus({ success: true, error: null });
      // Reset form after successful submission
      setFormData({
        wallet_address: '',
        email: '',
        twitter_verified: false
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ success: false, error: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                Join the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-700">
                  RWAi Whitelist
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 animate-slide-up animation-delay-200">
                Be among the first to access fractional ownership of high-performance AI rigs and earn passive income from AI compute services.
              </p>
            </div>
            <div className="max-w-2xl mx-auto bg-card rounded-xl p-8 border border-border shadow-lg animate-slide-up animation-delay-300">
              {supabaseError ? (
                <div className="text-center py-8">
                  <h3 className="text-2xl font-bold text-red-500 mb-4">Service Temporarily Unavailable</h3>
                  <p className="mb-6">{supabaseError}</p>
                  <p className="mb-6">Please check back later or contact support for assistance.</p>
                  <Link href="/">
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      Return to Home Page
                    </Button>
                  </Link>
                </div>
              ) : submitStatus.success ? (
                <div className="text-center py-8">
                  <h3 className="text-2xl font-bold text-green-500 mb-4">Application Submitted!</h3>
                  <p className="mb-6">Thank you for your interest in RWAi. We'll be in touch soon.</p>
                  <Button
                    onClick={() => setSubmitStatus({ success: false, error: null })}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Submit Another Application
                  </Button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="wallet_address" className="block text-sm font-medium">
                      Wallet Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="wallet_address"
                      value={formData.wallet_address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Enter your crypto wallet address"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="twitter_verified"
                        checked={formData.twitter_verified}
                        onChange={(e) => setFormData({ ...formData, twitter_verified: e.target.checked })}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                        required
                      />
                      <span className="text-sm font-medium">
                        I have followed <a href="https://x.com/RWAi_xyz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@RWAi_xyz</a> on X <span className="text-red-500">*</span>
                      </span>
                    </label>
                  </div>

                  {submitStatus.error && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-lg">
                      Error: {submitStatus.error}
                    </div>
                  )}
                  
                  <div className="flex justify-center my-4">
                    <Turnstile
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                      onSuccess={(token) => setTurnstileToken(token)}
                      onError={() => {
                        setTurnstileToken(null);
                        setSubmitStatus({ success: false, error: "Turnstile verification failed" });
                      }}
                      onExpire={() => setTurnstileToken(null)}
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white py-3 animate-bounce-subtle"
                      disabled={isSubmitting || !turnstileToken}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground text-center pt-4">
                    By submitting this form, you agree to our <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
