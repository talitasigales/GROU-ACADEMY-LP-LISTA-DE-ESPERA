
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Calendar } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  startDate: Date;
  endDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ startDate, endDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetDate = now >= startDate && now <= endDate ? endDate : startDate;
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        // If we've passed the end date
        if (now > endDate) {
          return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          };
        }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [startDate, endDate]);

  const formatTime = (value: number): string => {
    return value.toString().padStart(2, '0');
  };

  const now = new Date();
  const isActive = now >= startDate && now <= endDate;
  const isPast = now > endDate;
  const isFuture = now < startDate;

  const getStatusText = () => {
    if (isPast) return "Evento encerrado";
    if (isActive) return "Em andamento - encerra em:";
    return "Inicia em:";
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 text-grou-secondary">
        <Calendar size={18} />
        <span className="text-sm">
          {startDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} • {startDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} até {endDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} • {endDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <p className="text-grou-secondary text-sm font-medium">{getStatusText()}</p>
        
        <div className="flex gap-3 text-center">
          <Card className="w-16 sm:w-20 p-2 bg-white border border-gray-100 shadow-sm">
            <p className="text-grou-primary text-2xl font-bold">{formatTime(timeLeft.days)}</p>
            <p className="text-xs text-grou-secondary">Dias</p>
          </Card>
          <Card className="w-16 sm:w-20 p-2 bg-white border border-gray-100 shadow-sm">
            <p className="text-grou-primary text-2xl font-bold">{formatTime(timeLeft.hours)}</p>
            <p className="text-xs text-grou-secondary">Horas</p>
          </Card>
          <Card className="w-16 sm:w-20 p-2 bg-white border border-gray-100 shadow-sm">
            <p className="text-grou-primary text-2xl font-bold">{formatTime(timeLeft.minutes)}</p>
            <p className="text-xs text-grou-secondary">Minutos</p>
          </Card>
          <Card className="w-16 sm:w-20 p-2 bg-white border border-gray-100 shadow-sm">
            <p className="text-grou-primary text-2xl font-bold">{formatTime(timeLeft.seconds)}</p>
            <p className="text-xs text-grou-secondary">Segundos</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
