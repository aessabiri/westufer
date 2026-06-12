'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Waves, Wind, Thermometer } from 'lucide-react';
import Image from 'next/image';
import { AnimatedWeatherIcon } from '@/components/ui/AnimatedWeatherIcon';

export function Hero() {
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const lat = 51.424;
        const lon = 7.265;
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=Europe%2FBerlin&forecast_days=2`);
        const data = await res.json();
        setForecast(data.daily);
      } catch (err) {
        console.error("Hero weather fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1648666237476-af1142fd68da?q=80&w=2000&auto=format&fit=crop"
          alt="Kemnader See von oben"
          fill
          priority
          className="object-cover scale-105"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-900/80" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Text Content (Left) */}
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="flex justify-start mb-6">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="px-4 py-1.5 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2 text-cyan-300"
                >
                  <Waves size={14} />
                  Surfschule & Verleih
                </motion.div>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 text-white drop-shadow-2xl leading-[0.85]">
                Urlaub <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-400">Direkt am See</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-xl font-medium leading-relaxed drop-shadow-md">
                Windsurfen, Stand Up Paddling & Longboarden. <br/>
                Dein Wassersport-Zentrum mitten im Ruhrgebiet.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
                <a 
                  href="/kurse"
                  className="group bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-10 py-5 rounded-full font-black text-lg transition-all shadow-2xl shadow-cyan-500/40 hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  Kurse entdecken
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="/verleih"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-full font-bold text-lg transition-all hover:-translate-y-1 w-full sm:w-auto justify-center text-center"
                >
                  Equipment leihen
                </a>
              </div>
            </motion.div>
          </div>

          {/* Weather Widgets (Right) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="grid gap-6"
            >
              {loading ? (
                <div className="h-64 flex items-center justify-center bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10">
                   <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <>
                  {/* Today Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 flex items-center justify-between overflow-hidden">
                      <div className="relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-2 block">Heute am See</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-6xl font-black text-white">{Math.round(forecast.temperature_2m_max[0])}°</span>
                          <span className="text-slate-400 font-bold">Max</span>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                           <div className="flex items-center gap-1.5 text-slate-300">
                              <Wind size={16} className="text-cyan-400" />
                              <span className="text-sm font-bold">{Math.round(forecast.wind_speed_10m_max[0])} km/h</span>
                           </div>
                           <div className="flex items-center gap-1.5 text-slate-300">
                              <Thermometer size={16} className="text-orange-400" />
                              <span className="text-sm font-bold">{Math.round(forecast.temperature_2m_min[0])}° Min</span>
                           </div>
                        </div>
                      </div>
                      <AnimatedWeatherIcon code={forecast.weather_code[0]} className="w-32 h-32 opacity-80" />
                    </div>
                  </div>

                  {/* Tomorrow Card */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 flex items-center justify-between group hover:bg-white/10 transition-colors">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-2 block">Morgen</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-white">{Math.round(forecast.temperature_2m_max[1])}°</span>
                        <span className="text-slate-500 font-bold">Max</span>
                      </div>
                      <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">
                        Wind: {Math.round(forecast.wind_speed_10m_max[1])} km/h
                      </p>
                    </div>
                    <AnimatedWeatherIcon code={forecast.weather_code[1]} className="w-20 h-20 opacity-60" />
                  </div>
                </>
              )}
            </motion.div>
          </div>

        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent opacity-50" />
      </motion.div>
    </section>
  );
}
