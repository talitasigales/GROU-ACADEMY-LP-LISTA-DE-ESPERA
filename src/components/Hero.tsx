
import React from 'react';
import EmailSubscription from './EmailSubscription';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center py-8 overflow-hidden">
      {/* Background Image (blurred people image) */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url(/lovable-uploads/522ef0d6-1605-4dfd-9330-67ff90873e72.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(4px)',
          opacity: 0.4,
        }}
      />
      
      {/* Decorative dots */}
      <div className="absolute top-40 left-32 w-2 h-2 bg-grou-cyan rounded-full" />
      <div className="absolute bottom-60 left-32 w-2 h-2 bg-grou-cyan rounded-full" />
      <div className="absolute top-40 right-32 w-2 h-2 bg-grou-cyan rounded-full" />
      <div className="absolute bottom-32 right-32 w-2 h-2 bg-grou-cyan rounded-full" />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-12">
        <div className="mb-24 mt-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Grou Academy está{' '}
            <span className="text-grou-cyan">quase no ar</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mt-6 mb-10">
            A mais nova plataforma de cursos sobre gestão de pessoas, RH e 
            liderança para acelerar futuros e carreiras.
          </p>
        </div>
        
        <EmailSubscription />
        
        <div className="mt-24">
          <div className="w-20 h-1 bg-white/20 rounded mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
