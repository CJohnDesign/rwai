import React from 'react';
import { NotFoundEasterEgg } from '../components/ui/not-found-easter-egg';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section>
          <div className="container mx-auto px-4">
            <NotFoundEasterEgg />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 