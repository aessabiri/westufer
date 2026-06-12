'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wind, Waves, Thermometer, MapPin, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';

export function WeatherLocation() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const lat = 51.424;
        const lon = 7.265;
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code`);
        const data = await res.json();
        setWeather(data.current);
      } catch (err) {
        console.error("Failed to fetch weather", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  const getWindDescription = (speed: number) => {
    if (speed < 5) return "Flaute (Perfekt für SUP)";
    if (speed < 12) return "Leichte Brise (Einsteiger-Wind)";
    if (speed < 20) return "Guter Surfwind (Fortgeschritten)";
    if (speed < 30) return "Starker Wind (Pro-Level)";
    return "Sturmwarnung (Keine Schulung)";
  };

  return (
    <section className="relative py-24 bg-white dark:bg-slate-950 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-900/20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Location Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                Besuche uns am <br />
                <span className="text-cyan-500">Kemnader See</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                Du findest uns direkt an den Bootshallen Gibraltar. Perfekter Einstieg ins Wasser, 
                flacher Uferbereich und jede Menge Platz für deine ersten Versuche auf dem Board.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 flex items-start gap-4 transition-transform hover:scale-[1.02]">
                <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Adresse</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Oveneystraße 71<br/>44797 Bochum</p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 flex items-start gap-4 transition-transform hover:scale-[1.02]">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center shrink-0">
                  <Navigation size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Anfahrt</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Parkplatz P3 Oveney<br/>5 Min. Fußweg</p>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Widget Card */}
          <div className="relative">
            {/* Glossy Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl opacity-50 rounded-[4rem]" />
            
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl">
              {/* Widget Header */}
              <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Live Wetter-Station</span>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-widest">Aktiv</span>
                </div>
              </div>

              <div className="p-8 md:p-12">
                {loading ? (
                  <div className="h-48 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-10">
                    {/* Main Wind Hero */}
                    <div className="flex items-center justify-between gap-8">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Wind size={20} className="text-cyan-500" />
                          <span className="text-xs font-bold uppercase tracking-widest">Windgeschwindigkeit</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
                            {Math.round(weather?.wind_speed_10m || 0)}
                          </span>
                          <span className="text-2xl font-bold text-slate-400">km/h</span>
                        </div>
                        <p className="text-sm font-bold text-cyan-500 mt-2">
                          {getWindDescription(weather?.wind_speed_10m || 0)}
                        </p>
                      </div>
                      
                      {/* Temperature Circle */}
                      <div className="w-32 h-32 rounded-full border-4 border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/30">
                        <Thermometer size={24} className="text-orange-500 mb-1" />
                        <span className="text-3xl font-black text-slate-900 dark:text-white">
                          {Math.round(weather?.temperature_2m || 0)}°
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Luft</span>
                      </div>
                    </div>

                    {/* Secondary Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-10 border-t border-slate-100 dark:border-slate-800">
                      <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                        <div className="flex items-center gap-2 text-slate-400 mb-2">
                          <Waves size={16} className="text-blue-500" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Wasser</span>
                        </div>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">~ 18.5°C</p>
                        <p className="text-[10px] text-slate-400">Saisonaler Durchschnitt</p>
                      </div>
                      
                      <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                        <div className="flex items-center gap-2 text-slate-400 mb-2">
                          <Navigation size={16} className="text-cyan-500" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Richtung</span>
                        </div>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">SW (225°)</p>
                        <p className="text-[10px] text-slate-400">Optimal für Westufer</p>
                      </div>
                    </div>

                    <a 
                      href="https://www.windguru.cz/48491" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
                    >
                      Detaillierter Forecast auf Windguru
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
