'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import BookingkitWidget from '@/components/features/BookingkitWidget';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const adventures = [
  { id: 1, name: 'SUP Einsteigerkurs', experienceId: 'f701a2f3aec2462ead853b82b2df1c25', category: 'SUP', price: '45€', description: 'Perfekt für den entspannten Start auf dem Wasser.', image: 'https://images.unsplash.com/photo-1596522512683-11a3d9021669?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'SUP Aufsteigerkurs', experienceId: '617b80a881f87a174a0e0f190327cffd', category: 'SUP', price: '65€', description: 'Verfeinere deine Technik und lerne Profi-Tricks.', image: 'https://images.unsplash.com/photo-1517176118179-65244903d13c?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'SUP Kids & Eltern', experienceId: 'a1b85009f53c5f3b70763cc52ef39a88', category: 'Kids', price: '55€', description: 'Familienspaß für Groß und Klein.', image: 'https://images.unsplash.com/photo-1520626337972-ebf863448db6?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: 'Kindergeburtstag SUP', experienceId: '44ac637731403852b7fb4e8d97bc5640', category: 'Kids', price: 'ab 150€', description: 'Die coolste Party auf dem Kemnader See.', image: 'https://images.unsplash.com/photo-1531058240690-006c446962d8?q=80&w=800&auto=format&fit=crop' },
  { id: 5, name: 'Windsurfkurs Einsteiger', experienceId: '40939dc555a2a3238f185253008c2896', category: 'Windsurfen', price: '195€', description: 'Lerne Windsurfen in nur 2 Tagen (12h).', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop' },
  { id: 6, name: 'Windsurfkurs Aufsteiger', experienceId: 'fa9f9946825e505dd7bdd805e63a5e0a', category: 'Windsurfen', price: '85€', description: 'Gleiten, Trapezfahren und erste Manöver.', image: 'https://images.unsplash.com/photo-15443905be-96799015be81?q=80&w=800&auto=format&fit=crop' },
  { id: 7, name: 'Privatstunde Windsurfen', experienceId: 'af507d04fb697acc5826b866b9cad54b', category: 'Windsurfen', price: '100€', description: 'Individuelles Coaching für maximalen Erfolg.', image: 'https://images.unsplash.com/photo-1523450000305-64d88e404b90?q=80&w=800&auto=format&fit=crop' },
  { id: 8, name: 'Windsurf Camp (10-13J)', experienceId: '47d8ef535ebda3e8fb9e934059830f1e', category: 'Kids', price: '195€', description: 'Ferienspaß und Sport für Kids.', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop' },
  { id: 9, name: 'Windsurf Camp (14-18J)', experienceId: 'e8a8aa3861d9daafa3e89ff0639cb9b3', category: 'Kids', price: '175€', description: 'Actionreiche Ferien für Teenager.', image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=800&auto=format&fit=crop' },
  { id: 10, name: 'SUP Feriencamp', experienceId: 'dd4ba11425581dc238a7b7a4d25faf22', category: 'Kids', price: '145€', description: 'Eine Woche Natur und Action auf dem Wasser.', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop' },
  { id: 11, name: 'SUP-Board Verleih', experienceId: '0bda36d235ea7605ef21732fb67e989c', category: 'Verleih', price: '15€', description: 'Miete hochwertiges Material stundenweise.', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop' },
  { id: 12, name: 'Windsurf Verleih (Beginner)', experienceId: '77cd97615ae174a9badbd00511698362', category: 'Verleih', price: '15€', description: 'Einfaches Handling für entspanntes Cruisen.', image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=800&auto=format&fit=crop' },
  { id: 13, name: 'Windsurf Verleih (Pro)', experienceId: 'b2a4eee77f47f151bdd1628506dbf449', category: 'Verleih', price: '20€', description: 'Premium Equipment für Starkwind-Tage.', image: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=800&auto=format&fit=crop' },
  { id: 14, name: 'Longboard Verleih', experienceId: 'c0f63e246e711ab75024f57d65acd5ca', category: 'Verleih', price: '8€', description: 'Cruisen am Uferweg des Kemnader Sees.', image: 'https://images.unsplash.com/photo-1536796038751-bb018f95ca01?q=80&w=800&auto=format&fit=crop' },
  { id: 15, name: 'Longboard Einsteigerkurs', experienceId: 'c0f63e246e711ab75024f57d65acd5ca', category: 'Longboard', price: '35€', description: 'Lerne sicher stehen, pushen und bremsen.', image: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=800&auto=format&fit=crop' },
  { id: 16, name: 'Windsurf Schnupperkurs', experienceId: 'b1584aa583f2564898fcb946a894c88a', category: 'Windsurfen', price: '80€', description: 'Erste Versuche auf dem Board. Ideal zum Reinschnuppern.', image: 'https://images.unsplash.com/photo-1599405758676-66412adbe26e?q=80&w=800&auto=format&fit=crop' },
  { id: 17, name: 'Privatstunde SUP', experienceId: 'f2debead3b93e1b709b2d13e9e676697', category: 'SUP', price: '75€', description: 'Individuelle Betreuung für schnelle Fortschritte.', image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=800&auto=format&fit=crop' },
  { id: 18, name: 'Kindergeburtstag Longboard', experienceId: '9855d3a004044499a36b021d09e07241', category: 'Kids', price: 'ab 120€', description: 'Rollender Geburtstag am Uferweg.', image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=800&auto=format&fit=crop' },
  { id: 19, name: 'Schulangebot: SUP', experienceId: '19a2cc65a3797e4198c70832af22c516', category: 'Gruppen', price: 'Anfrage', description: 'Klassenausflug mit Sport und Teamgeist.', image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=800&auto=format&fit=crop' },
  { id: 20, name: 'Schulangebot: SUP Tour', experienceId: 'eaf48e96c2d51849da55c67615767655', category: 'Gruppen', price: 'Anfrage', description: 'Entdeckungstour über den Kemnader See.', image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=800&auto=format&fit=crop' },
  { id: 21, name: 'Schulangebot: Longboard', experienceId: 'e9d7203c030f34ad7f654b5f36aa512f', category: 'Gruppen', price: 'Anfrage', description: 'Sicher skaten lernen in der Gruppe.', image: 'https://images.unsplash.com/photo-1520116468816-95b69f847357?q=80&w=800&auto=format&fit=crop' },
  { id: 22, name: 'Team: SUP Einführung', experienceId: 'a7df3f5c7611502924a5383f5ccf8bdc', category: 'Gruppen', price: 'Anfrage', description: 'Das perfekte Event für Firmen und Vereine.', image: 'https://images.unsplash.com/photo-1536859355448-76f92eb7a3de?q=80&w=800&auto=format&fit=crop' },
  { id: 23, name: 'Team: SUP Polo', experienceId: 'a0762f01276af6278e17a35f13ede63f', category: 'Gruppen', price: 'Anfrage', description: 'Actionreiches Wasser-Polo auf SUP Boards.', image: 'https://images.unsplash.com/photo-1414442323120-144be03dca6a?q=80&w=800&auto=format&fit=crop' },
  { id: 24, name: 'Teambuilding Event', experienceId: '64c8b962e82cbe85515231f9174abef3', category: 'Gruppen', price: 'Anfrage', description: 'Stärke dein Team mit gemeinsamen Wasser-Challenges.', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop' },
  { id: 25, name: 'Family SUP Tour', experienceId: '043388f328335706cbe50eb567b42775', category: 'SUP', price: '25€', description: 'Entspannte Tour über den See für alle Level.', image: 'https://images.unsplash.com/photo-1510332859919-05653b647688?q=80&w=800&auto=format&fit=crop' }
];

export function AdventureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAdventure, setSelectedAdventure] = useState<typeof adventures[0] | null>(null);
  
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % adventures.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + adventures.length) % adventures.length);
  }, []);

  useEffect(() => {
    if (selectedAdventure) return;
    const timer = setInterval(handleNext, 8000);
    return () => clearInterval(timer);
  }, [selectedAdventure, handleNext]);

  // Infinite display logic: we map the array to show surrounding items
  const getVisibleAdventures = () => {
    const items = [];
    for (let i = -1; i <= 3; i++) {
       const idx = (currentIndex + i + adventures.length) % adventures.length;
       items.push({ ...adventures[idx], position: i });
    }
    return items;
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Wähle dein Abenteuer
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Von 25 individuellen Erlebnissen ist garantiert auch das Richtige für dich dabei.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Main Viewport */}
          <div className="relative h-[550px] flex items-center justify-center overflow-visible">
            <AnimatePresence initial={false} mode="popLayout">
              {getVisibleAdventures().map((item, i) => {
                const isCenter = item.position === 1;
                const isSide = item.position === 0 || item.position === 2;
                
                if (!isCenter && !isSide) return null; // Only render 3

                return (
                  <motion.div
                    key={`${item.experienceId}-${item.id}`}
                    initial={{ opacity: 0, x: item.position > 1 ? 100 : -100, scale: 0.8 }}
                    animate={{ 
                        opacity: isCenter ? 1 : 0.4, 
                        x: (item.position - 1) * 400, // Move based on position
                        scale: isCenter ? 1 : 0.85,
                        zIndex: isCenter ? 20 : 10,
                        filter: isCenter ? 'blur(0px)' : 'blur(2px)'
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="absolute w-[350px] shrink-0"
                  >
                    <div className={cn(
                      "relative h-[480px] rounded-[3rem] overflow-hidden shadow-2xl bg-slate-900 border-4 transition-all duration-700",
                      isCenter ? "border-cyan-500" : "border-transparent"
                    )}>
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover opacity-60" 
                        priority={isCenter}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-2 block">
                          {item.category}
                        </span>
                        <h3 className="text-2xl font-bold mb-2 leading-tight">{item.name}</h3>
                        <p className="text-sm text-slate-300 mb-6 line-clamp-2">{item.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-xl">
                            <span className="text-slate-400 text-sm font-medium mr-1">ab</span>
                            {item.price}
                          </div>
                          {isCenter && (
                            <button 
                              onClick={() => setSelectedAdventure(item)}
                              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 rounded-full font-bold text-sm transition-all active:scale-95 shadow-lg shadow-cyan-500/20"
                            >
                              Jetzt Buchen
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 z-40">
            <button onClick={handlePrev} className="p-4 rounded-full bg-white dark:bg-slate-800 shadow-2xl text-slate-900 dark:text-white hover:scale-110 transition-transform active:scale-95 border border-slate-100 dark:border-slate-800">
              <ChevronLeft size={28} />
            </button>
          </div>
          <div className="absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2 z-40">
            <button onClick={handleNext} className="p-4 rounded-full bg-white dark:bg-slate-800 shadow-2xl text-slate-900 dark:text-white hover:scale-110 transition-transform active:scale-95 border border-slate-100 dark:border-slate-800">
              <ChevronRight size={28} />
            </button>
          </div>
        </div>

        {/* Dynamic Indicators */}
        <div className="flex justify-center gap-1.5 mt-12 overflow-x-auto max-w-full px-4 no-scrollbar">
          {adventures.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500 shrink-0",
                currentIndex === i ? "bg-cyan-500 w-8" : "bg-slate-200 dark:bg-slate-800 w-1.5"
              )}
            />
          ))}
        </div>
      </div>

      {/* MODAL OVERLAY */}
      <AnimatePresence>
        {selectedAdventure && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-slate-950/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 w-full max-w-5xl max-h-full rounded-[3rem] overflow-hidden relative shadow-2xl flex flex-col"
            >
              <button 
                onClick={() => setSelectedAdventure(null)}
                className="absolute top-6 right-6 z-[110] p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:rotate-90 transition-all duration-300"
              >
                <X size={24} />
              </button>

              <div className="flex-1 overflow-y-auto p-6 md:p-12">
                <div className="mb-8">
                   <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">{selectedAdventure.name}</h2>
                   <p className="text-slate-500">{selectedAdventure.description}</p>
                </div>
                <BookingkitWidget 
                  configId="51bdc608442c342ef82a1ac41cf65754" 
                  experienceId={selectedAdventure.experienceId} 
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
