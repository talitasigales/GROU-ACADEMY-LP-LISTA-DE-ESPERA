
import React from 'react';
import EmailSubscription from './EmailSubscription';
import CountdownTimer from './CountdownTimer';

const Hero: React.FC = () => {
  // Set start and end dates for countdown timer
  const startDate = new Date('2025-05-08T00:00:00');
  const endDate = new Date('2025-05-22T10:00:00');

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center py-8 px-4 overflow-hidden">
      {/* Background Image with increased blur */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url(/lovable-uploads/9273bdbd-e245-4825-be2f-0bea0384c2ac.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)',
          opacity: 0.5
        }}
      />
      
      {/* Decorative dots - hidden on small screens */}
      <div className="absolute top-40 left-32 w-2 h-2 bg-grou-cyan rounded-full hidden md:block" />
      <div className="absolute bottom-60 left-32 w-2 h-2 bg-grou-cyan rounded-full hidden md:block" />
      <div className="absolute top-40 right-32 w-2 h-2 bg-grou-cyan rounded-full hidden md:block" />
      <div className="absolute bottom-32 right-32 w-2 h-2 bg-grou-cyan rounded-full hidden md:block" />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-6">
        <div className="mb-10 md:mb-16 mt-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            O Grou Academy está
            <br />
            <span className="text-grou-cyan">quase no ar!</span>
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-white/80 max-w-3xl mx-auto mt-4 md:mt-6 mb-6 md:mb-10 font-normal">
            A mais nova plataforma de cursos sobre gestão de pessoas, RH e inovação
            que acelera futuros e desenvolve carreiras
          </p>

          {/* Countdown Timer */}
          <div className="my-6 md:my-8">
            <CountdownTimer startDate={startDate} endDate={endDate} />
          </div>
        </div>
        
        <EmailSubscription />
        
        <div className="mt-12 md:mt-16">
          <div className="w-20 h-1 bg-white/20 rounded mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
