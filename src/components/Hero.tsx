
import React from 'react';
import EmailSubscription from './EmailSubscription';
import CountdownTimer from './CountdownTimer';

const Hero: React.FC = () => {
  // Set start and end dates for countdown timer
  const startDate = new Date('2025-05-08T00:00:00');
  const endDate = new Date('2025-05-22T10:00:00');

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center py-8 overflow-hidden">
      {/* Background Image with lighter blur */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url(/lovable-uploads/48805839-1a8c-4f20-aea5-2f7eb826a730.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)', // Reduced blur to make image more visible
          opacity: 0.6, // Increased opacity to see more of the background
        }}
      />
      
      {/* Decorative dots */}
      <div className="absolute top-40 left-32 w-2 h-2 bg-grou-cyan rounded-full" />
      <div className="absolute bottom-60 left-32 w-2 h-2 bg-grou-cyan rounded-full" />
      <div className="absolute top-40 right-32 w-2 h-2 bg-grou-cyan rounded-full" />
      <div className="absolute bottom-32 right-32 w-2 h-2 bg-grou-cyan rounded-full" />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-6">
        <div className="mb-16 mt-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Grou Academy está{' '}
            <span className="text-grou-cyan">quase no ar</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mt-6 mb-10">
            A mais nova plataforma de cursos sobre gestão de pessoas, RH e 
            liderança para acelerar futuros e carreiras.
          </p>

          {/* Countdown Timer */}
          <div className="my-8">
            <CountdownTimer startDate={startDate} endDate={endDate} />
          </div>
        </div>
        
        <EmailSubscription />
        
        <div className="mt-16">
          <div className="w-20 h-1 bg-white/20 rounded mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
