
import React from 'react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-between py-4 px-4 lg:px-8">
      <div className="flex items-center">
        <img 
          src="/images/grou-logo.svg" 
          alt="Grou Academy Logo" 
          className="h-8 md:h-10"
        />
      </div>
      <div className="flex gap-2 md:gap-4">
        <Button variant="outline" className="hidden md:flex text-grou-secondary bg-white border-gray-200 hover:bg-gray-50">
          Entrar
        </Button>
        <Button className="bg-grou-accent hover:bg-grou-accent/90 text-white">
          Inscreva-se
        </Button>
      </div>
    </header>
  );
};

export default Header;
