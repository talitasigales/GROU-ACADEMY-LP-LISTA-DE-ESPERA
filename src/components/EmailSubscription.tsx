
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Gift } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const EmailSubscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error message
    setErrorMessage('');
    
    // Basic email validation
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErrorMessage('Por favor, insira um e-mail válido.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert email into Supabase
      const { error } = await supabase
        .from('waitlist_subscribers')
        .insert([
          { email: email, source: 'landing_page' }
        ]);
      
      if (error) {
        console.error('Error saving email:', error);
        
        // Handle duplicate email error
        if (error.code === '23505') {
          setErrorMessage('Este e-mail já está na lista de espera.');
          toast({
            title: "E-mail já cadastrado",
            description: "Este e-mail já está na nossa lista de espera.",
            variant: "destructive",
          });
        } else {
          setErrorMessage('Ocorreu um erro. Por favor, tente novamente.');
          toast({
            title: "Erro",
            description: "Não foi possível processar sua inscrição. Por favor, tente novamente.",
            variant: "destructive",
          });
        }
        setIsSubmitting(false);
        return;
      }
      
      // Show success dialog and toast
      setShowDialog(true);
      toast({
        title: "Inscrição realizada!",
        description: "Você entrou na lista de espera com sucesso.",
      });
      
      // Clear form
      setEmail('');
      
    } catch (err) {
      console.error('Unexpected error:', err);
      setErrorMessage('Ocorreu um erro inesperado. Por favor, tente novamente.');
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-3 max-w-lg mx-auto px-4">
        <p className="text-lg text-white/90 text-center md:text-xl">
          Entre para a lista de espera para ganhar acesso antecipado a 3 cursos gratuitos + bônus exclusivos!
        </p>
        
        <form onSubmit={handleSubmit} className="flex w-full max-w-md mt-2 flex-col sm:flex-row gap-2 sm:gap-0">
          <div className="relative flex w-full">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grou-cyan">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <input 
              type="email" 
              placeholder="Seu e-mail" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              className={`flex h-11 w-full rounded-md sm:rounded-l-md sm:rounded-r-none bg-[#1A0942] pl-10 pr-3 text-sm text-white placeholder:text-white/70 focus:outline-none ${errorMessage ? 'border border-red-500' : ''}`} 
              disabled={isSubmitting}
            />
          </div>
          <Button 
            type="submit" 
            className="h-11 rounded-md sm:rounded-l-none sm:rounded-r-md bg-grou-cyan hover:bg-grou-cyan/90 text-grou-dark font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Entrar na lista'}
          </Button>
        </form>
        
        {errorMessage && (
          <p className="text-sm text-red-400 mt-1">{errorMessage}</p>
        )}
      </div>

      {/* Success Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-grou-dark border-grou-cyan text-white max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-grou-cyan flex items-center gap-2 justify-center">
              <Gift className="h-6 w-6 text-grou-cyan" />
              Parabéns!
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-6 text-center">
            <DialogDescription className="text-white/90 text-lg">
              No dia <span className="text-grou-cyan font-bold">22 de maio</span>, você receberá seu acesso exclusivo e gratuito ao Grou Academy + a liberação dos 3 cursos na plataforma.
            </DialogDescription>
            
            <div className="mt-8 mb-2">
              <Button 
                onClick={() => setShowDialog(false)}
                className="bg-grou-cyan hover:bg-grou-cyan/90 text-grou-dark font-medium"
              >
                Entendi
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmailSubscription;
