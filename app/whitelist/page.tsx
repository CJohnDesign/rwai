'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { getSupabaseClient, hasSupabaseCredentials } from '../../lib/supabase-client';
import { ErrorEasterEgg } from '../../components/ui/error-easter-egg';

// Debounce utility
const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export default function WhitelistPage() {
  const [formData, setFormData] = useState({
    wallet_address: '',
    email: '',
    x_followed: false,
    x_retweeted: false,
    x_handle: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, error: null });
  const [supabaseError, setSupabaseError] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [formStartEventSent, setFormStartEventSent] = useState(false);

  const initRef = useRef(false);
  const unloadingRef = useRef(false);

  // Check for Supabase initialization errors
  useEffect(() => {
    if (initRef.current) return; // Prevent double initialization
    initRef.current = true;

    if (!hasSupabaseCredentials()) {
      setSupabaseError(
        'Unable to connect to our database. Please try again later or contact support.'
      );
    }
  }, []);

  // Push event to dataLayer with ref check
  const pushToDataLayer = useCallback((eventData: any) => {
    if (typeof window === 'undefined') return;
    
    const w = window as any;
    if (w.dataLayer) {
      // Add a unique timestamp to prevent duplicate events
      w.dataLayer.push({
        ...eventData,
        timestamp: new Date().toISOString(),
        event_id: Math.random().toString(36).substring(2, 15)
      });
    } else {
      console.warn('DataLayer not found');
    }
  }, []);

  // Track form abandonment with ref
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasInteracted && !submitStatus.success && !unloadingRef.current) {
        unloadingRef.current = true;
        pushToDataLayer({
          'event': 'whitelist_form_abandon',
          'event_category': 'Whitelist',
          'event_action': 'abandon',
          'form_id': 'whitelist-application',
          'form_type': 'whitelist',
          'has_partial_data': !!(formData.wallet_address || formData.email || formData.x_handle)
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasInteracted, submitStatus.success, formData, pushToDataLayer]);

  // Debounced form start event with ref check
  const formStartRef = useRef(false);
  const sendFormStartEvent = useCallback(
    debounce(() => {
      if (!formStartEventSent && !formStartRef.current) {
        formStartRef.current = true;
        setFormStartEventSent(true);
        pushToDataLayer({
          'event': 'whitelist_form_start',
          'event_category': 'Whitelist',
          'event_action': 'start',
          'form_id': 'whitelist-application',
          'form_type': 'whitelist'
        });
      }
    }, 500),
    [formStartEventSent, pushToDataLayer]
  );

  // Consolidated change handler for all form inputs
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    
    if (!hasInteracted) {
      setHasInteracted(true);
      sendFormStartEvent();
    }

    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  }, [hasInteracted, sendFormStartEvent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitStatus({ success: false, error: null });

    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        throw new Error('Database connection is not available. Please try again later.');
      }

      const { data, error } = await supabase
        .from('whitelist_applications')
        .insert([{
          email: formData.email || null,
          wallet_address: formData.wallet_address,
          twitter_verified: formData.x_followed,
          ...(formData.x_handle ? { notes: `X Handle: ${formData.x_handle}, Retweeted: ${formData.x_retweeted}` } : {})
        }]);

      if (error) throw error;

      pushToDataLayer({
        'event': 'whitelist_submission',
        'event_category': 'Whitelist',
        'event_action': 'submit',
        'event_label': 'success',
        'form_id': 'whitelist-application',
        'form_type': 'whitelist',
        'has_email': !!formData.email,
        'has_x_followed': formData.x_followed,
        'has_x_retweeted': formData.x_retweeted,
        'timestamp': new Date().toISOString()
      });

      setSubmitStatus({ success: true, error: null });
      setFormData({
        wallet_address: '',
        email: '',
        x_followed: false,
        x_retweeted: false,
        x_handle: ''
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
              <h1 className="tracking-tight animate-slide-up font-normal">
                <span className="md:text-5xl font-bold mb-6 animate-fade-in text-gray-100 leading-tight">
                  Join the&nbsp;
                </span>
                <span className="md:text-5xl font-bold mb-6 animate-fade-in text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500 leading-tight">
                   RWAi Whitelist
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 animate-slide-up animation-delay-200">
                Be among the first to access fractional ownership of high-performance AI rigs and earn passive income from AI compute services.
              </p>
            </div>
            <div className="max-w-2xl mx-auto bg-card rounded-xl p-8 border border-border shadow-lg animate-slide-up animation-delay-300">
              {submitStatus.success ? (
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
                  {supabaseError && (
                    <div className="text-sm text-amber-500 mb-4">
                      Note: {supabaseError} Form submission will be simulated in development.
                    </div>
                  )}
                  <div className="space-y-2">
                    <label htmlFor="wallet_address" className="block text-sm font-medium">
                      ETH Wallet Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="wallet_address"
                      value={formData.wallet_address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Enter your ETH wallet address"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email Address (for launch updates)
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
                    <label htmlFor="x_handle" className="block text-sm font-medium">
                      X Handle
                    </label>
                    <input
                      type="text"
                      id="x_handle"
                      value={formData.x_handle}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="e.g. @RWAi_xyz"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="x_followed"
                        checked={formData.x_followed}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                        required
                      />
                      <span className="text-sm font-medium">
                        I have followed <a href="https://x.com/RWAi_xyz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@RWAi_xyz</a> on X <span className="text-red-500">*</span>
                      </span>
                    </label>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="x_retweeted"
                        checked={formData.x_retweeted}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                        required
                      />
                      <span className="text-sm font-medium">
                        I have retweeted the <a href="https://x.com/RWAi_xyz/status/1912947165971837418" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">pinned post</a> <span className="text-red-500">*</span>
                        <span className="ml-1 text-xs italic text-muted-foreground">(yes, we actually check 👀)</span>
                      </span>
                    </label>
                  </div>

                  {submitStatus.error && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-lg">
                      Error: {submitStatus.error}
                    </div>
                  )}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white py-3 animate-bounce-subtle"
                      disabled={isSubmitting}
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
