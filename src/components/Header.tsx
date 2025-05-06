
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-center py-6">
      <div>
        <img 
          src="/images/grou-logo.svg" 
          alt="Grou Academy Logo" 
          className="h-10"
        />
      </div>
    </header>
  );
};

export default Header;
