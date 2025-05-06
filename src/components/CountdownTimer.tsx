
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

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

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-4 text-center">
        <Card className="w-16 sm:w-20 p-2 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
          <p className="text-grou-cyan text-2xl font-bold">{formatTime(timeLeft.days)}</p>
          <p className="text-xs text-white/70">Dias</p>
        </Card>
        <Card className="w-16 sm:w-20 p-2 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
          <p className="text-grou-cyan text-2xl font-bold">{formatTime(timeLeft.hours)}</p>
          <p className="text-xs text-white/70">Horas</p>
        </Card>
        <Card className="w-16 sm:w-20 p-2 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
          <p className="text-grou-cyan text-2xl font-bold">{formatTime(timeLeft.minutes)}</p>
          <p className="text-xs text-white/70">Minutos</p>
        </Card>
        <Card className="w-16 sm:w-20 p-2 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
          <p className="text-grou-cyan text-2xl font-bold">{formatTime(timeLeft.seconds)}</p>
          <p className="text-xs text-white/70">Segundos</p>
        </Card>
      </div>
    </div>
  );
};

export default CountdownTimer;
