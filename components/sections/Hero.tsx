'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Waves, Wind, Thermometer } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedWeatherIcon } from '@/components/ui/AnimatedWeatherIcon';
import { WeatherIllustration } from '@/components/ui/WeatherIllustration';

const popularCourses = [
  {
    name: "Windsurf Einsteiger",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=400&auto=format&fit=crop",
    href: "/kurse/windsurf",
    price: "195€"
  },
  {
    name: "SUP Einsteiger",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=400&auto=format&fit=crop",
    href: "/kurse/sup",
    price: "45€"
  }
];

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
    <section className="relative min-h-screen w-full flex items-center overflow-hidden pt-20 bg-slate-950">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1648666237476-af1142fd68da?q=80&w=2000&auto=format&fit=crop"
          alt="Kemnader See von oben"
          fill
          priority
          className="object-cover scale-105 opacity-60"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/40 to-slate-950" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-white">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Main Text Content (Left) */}
          <div className="lg:col-span-6 text-left">
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
                  className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-2 text-cyan-400"
                >
                  <Waves size={12} />
                  Surfschule & Verleih
                </motion.div>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 text-white leading-[0.85]">
                Urlaub <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-400 text-shadow-glow">Direkt am See</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-xl font-medium leading-relaxed">
                Windsurfen, Stand Up Paddling & Longboarden. <br/>
                Dein Wassersport-Zentrum mitten im Ruhrgebiet.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
                <a 
                  href="/kurse"
                  className="group bg-white text-slate-950 px-10 py-5 rounded-full font-black text-lg transition-all shadow-2xl shadow-white/10 hover:scale-105 active:scale-95 flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  Kurse entdecken
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Weather & Popular Courses */}
          <div className="lg:col-span-6">
            <div className="grid sm:grid-cols-2 gap-8 items-start">
              
              {/* Weather Widget Area */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="space-y-6"
              >
                {loading ? (
                  <div className="h-48 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[2.5rem] blur opacity-10" />
                    <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 overflow-hidden">
                       <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Live Daten</span>
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                       </div>
                       
                       <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-5xl font-black text-white">{Math.round(forecast.temperature_2m_max[0])}°</span>
                          <AnimatedWeatherIcon code={forecast.weather_code[0]} className="w-8 h-8 inline-block text-cyan-400" />
                       </div>
                       
                       <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
                          <div className="flex items-center gap-1">
                            <Wind size={14} className="text-cyan-500" />
                            {Math.round(forecast.wind_speed_10m_max[0])} km/h
                          </div>
                          <span>Morgen: {Math.round(forecast.temperature_2m_max[1])}°</span>
                       </div>

                       {/* Samsung Style Animation */}
                       <WeatherIllustration code={forecast.weather_code[0]} />
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Popular Courses Area */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="space-y-6 pt-4 sm:pt-0"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 block mb-2 px-2">Meistgebuche Kurse</span>
                
                <div className="space-y-8">
                  {popularCourses.map((course) => (
                    <Link 
                      key={course.name} 
                      href={course.href}
                      className="group block relative"
                    >
                      <div className="flex items-center gap-6">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                          <Image 
                            src={course.image} 
                            alt={course.name} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-500" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/40 to-transparent" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight mb-1">
                            {course.name}
                          </h4>
                          <div className="flex items-center gap-3">
                             <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{course.price}</span>
                             <span className="w-1 h-1 rounded-full bg-slate-800" />
                             <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                               Details <ArrowRight size={10} />
                             </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="pt-6">
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-medium text-slate-500 leading-relaxed italic">
                     &quot;Beste Bedingungen für Einsteiger durch flachen Uferbereich und konstante Winde.&quot;
                   </div>
                </div>
              </motion.div>

            </div>
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
