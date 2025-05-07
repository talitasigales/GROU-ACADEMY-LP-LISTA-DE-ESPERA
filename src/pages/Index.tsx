
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-grou-dark">
      <Header />
      <main className="flex-grow">
        <Hero />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
