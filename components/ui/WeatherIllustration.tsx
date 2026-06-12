'use client';

import { motion } from 'framer-motion';
import { Wind, Sun, Waves } from 'lucide-react';

interface Props {
  code: number;
}

export function WeatherIllustration({ code }: Props) {
  const isWindy = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].some(s => s === code) || true; // Mocking true for now to see animation
  const isSunny = code === 0 || code === 1;

  return (
    <div className="relative w-full h-32 mt-4 overflow-hidden rounded-2xl bg-white/5 border border-white/5">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-500/10" />
      
      {/* Waves Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-8">
        <motion.div
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex gap-4 opacity-30"
        >
          {[...Array(10)].map((_, i) => (
            <Waves key={i} className="text-cyan-400 shrink-0" size={32} />
          ))}
        </motion.div>
      </div>

      {/* Hero Animation: Windsurfer */}
      <motion.div
        animate={{ 
          x: [-100, 400],
          y: [0, -5, 0, 5, 0]
        }}
        transition={{ 
          x: { duration: 15, repeat: Infinity, ease: "linear" },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-6 left-0 text-white"
      >
        <div className="relative">
          {/* Board */}
          <div className="w-16 h-2 bg-white/80 rounded-full" />
          {/* Sail */}
          <motion.div 
            animate={{ skewX: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-2 left-6 w-10 h-16 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-tr-[100%] rounded-tl-sm border-l-2 border-white/50" 
          />
          {/* Person */}
          <div className="absolute bottom-2 left-4 w-2 h-8 bg-slate-200 rounded-full origin-bottom rotate-[15deg]" />
        </div>
      </motion.div>

      {/* Decorative Sun if sunny */}
      {isSunny && (
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-4 right-8 w-12 h-12 bg-yellow-400/20 rounded-full blur-xl"
        />
      )}

      {/* Wind lines */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 500, opacity: [0, 1, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.5,
              ease: "linear"
            }}
            className="absolute h-px bg-white/20"
            style={{ top: `${20 + i * 15}%`, width: '40px' }}
          />
        ))}
      </div>

      <div className="absolute bottom-2 right-4 text-[10px] font-bold uppercase tracking-widest text-white/30">
        Surf Status: Optimal
      </div>
    </div>
  );
}
