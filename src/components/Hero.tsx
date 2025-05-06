
import React from 'react';
import { Button } from '@/components/ui/button';
import CountdownTimer from './CountdownTimer';

const Hero: React.FC = () => {
  // Defining the dates for the countdown timer (May 8, 2025 00:00 to May 22, 2025 10:00)
  const startDate = new Date('2025-05-08T00:00:00');
  const endDate = new Date('2025-05-22T10:00:00');

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center pt-4 pb-16 overflow-hidden">
      {/* Background Image with reduced blur */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(4px)', // Reduced blur as requested
          opacity: 0.15,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-6xl mx-auto mt-8 md:mt-0"> {/* Reduced top spacing as requested */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-grou-primary leading-tight mb-4">
          Transforme sua carreira em marketing digital
        </h1>
        <p className="text-lg md:text-xl text-grou-secondary max-w-3xl mb-10">
          O Launchpad da Grou Academy é um programa intensivo que vai te dar as habilidades e conexões necessárias para se destacar no mercado.
        </p>
        
        <CountdownTimer startDate={startDate} endDate={endDate} />
        
        <div className="mt-10 flex flex-col md:flex-row gap-4 w-full max-w-md">
          <Button className="bg-grou-accent hover:bg-grou-accent/90 text-white py-6 text-lg w-full">
            Quero participar
          </Button>
        </div>
        
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          <img src="/images/partner-logo-1.svg" alt="Partner" className="h-8 md:h-10 opacity-70" />
          <img src="/images/partner-logo-2.svg" alt="Partner" className="h-8 md:h-10 opacity-70" />
          <img src="/images/partner-logo-3.svg" alt="Partner" className="h-8 md:h-10 opacity-70" />
          <img src="/images/partner-logo-4.svg" alt="Partner" className="h-8 md:h-10 opacity-70" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
