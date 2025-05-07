
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 md:py-6 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center gap-3">
          <div className="text-white/60 text-sm text-center">
            © Grou Academy {currentYear}. Todos os direitos reservados.
          </div>
          <div className="text-white/60 text-xs">
            <a 
              href="https://nmgzwxqrfawknamqtxfn.supabase.co/functions/v1/sync-subscribers-to-hubspot/zapier" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-white/80"
            >
              API Endpoint
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
