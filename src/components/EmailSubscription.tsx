
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const EmailSubscription: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the email submission
    console.log('Email submitted:', email);
    // Reset form
    setEmail('');
  };

  return (
    <div className="flex flex-col items-center gap-3 max-w-lg mx-auto">
      <p className="text-lg md:text-xl text-white/90 text-center">
        Entre para a lista de espera para ganhar acesso antecipado a 3 cursos gratuitos e bônus exclusivos
      </p>
      
      <form onSubmit={handleSubmit} className="flex w-full max-w-md mt-2">
        <div className="relative flex w-full">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grou-cyan">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </div>
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex h-11 w-full rounded-l-md bg-[#1A0942] pl-10 pr-3 text-sm text-white placeholder:text-white/70 focus:outline-none"
          />
          <Button
            type="submit"
            className="h-11 rounded-l-none rounded-r-md bg-grou-cyan hover:bg-grou-cyan/90 text-grou-dark font-medium"
          >
            Entrar na lista de espera
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmailSubscription;
