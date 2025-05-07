
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-center py-4 md:py-6 relative z-10 px-4">
      <div>
        <img 
          alt="Grou Academy Logo" 
          className="h-10 md:h-14" 
          src="/lovable-uploads/8aa79643-d38a-4134-bb4d-c1f6cbfec893.png" 
        />
      </div>
    </header>
  );
};

export default Header;
