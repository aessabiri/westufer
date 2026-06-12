'use client';

import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, Wind, CloudLightning } from 'lucide-react';

interface WeatherIconProps {
  code: number;
  className?: string;
}

export function AnimatedWeatherIcon({ code, className }: WeatherIconProps) {
  // WMO Weather Codes mapping
  const isSunny = code === 0 || code === 1;
  const isCloudy = code === 2 || code === 3;
  const isRainy = [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code);
  const isStormy = [95, 96, 99].includes(code);

  if (isSunny) {
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className={className}
      >
        <Sun className="w-full h-full text-yellow-400" />
      </motion.div>
    );
  }

  if (isRainy) {
    return (
      <div className={className}>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative"
        >
          <CloudRain className="w-full h-full text-blue-400" />
          <motion.div 
            className="absolute top-1/2 left-1/4 w-0.5 h-2 bg-blue-400 rounded-full"
            animate={{ y: [0, 10], opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.1 }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 w-0.5 h-2 bg-blue-400 rounded-full"
            animate={{ y: [0, 10], opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
          />
        </motion.div>
      </div>
    );
  }

  if (isCloudy) {
    return (
      <motion.div
        animate={{ x: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className={className}
      >
        <Cloud className="w-full h-full text-slate-300" />
      </motion.div>
    );
  }

  if (isStormy) {
    return (
      <div className={className}>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <CloudLightning className="w-full h-full text-purple-400" />
        </motion.div>
      </div>
    );
  }

  // Default / Windy
  return (
    <motion.div
      animate={{ x: [-2, 2, -2], skewX: [-5, 5, -5] }}
      transition={{ duration: 2, repeat: Infinity }}
      className={className}
    >
      <Wind className="w-full h-full text-cyan-400" />
    </motion.div>
  );
}
