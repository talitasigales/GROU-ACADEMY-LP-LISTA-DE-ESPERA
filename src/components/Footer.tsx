
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-8 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img src="/images/grou-logo.svg" alt="Grou Academy Logo" className="h-8" />
          </div>
          <div className="text-sm text-grou-secondary">
            © {new Date().getFullYear()} Grou Academy. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
