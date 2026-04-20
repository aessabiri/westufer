'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import Link from 'next/link';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[200]"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-[2rem] p-6 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-2xl shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">Cookie-Hinweis</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Wir nutzen Cookies, um unsere Website für Sie optimal zu gestalten. Durch die weitere Nutzung der Webseite stimmen Sie der Verwendung von Cookies zu.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={acceptCookies}
                className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
              >
                Akzeptieren
              </button>
              <Link 
                href="/datenschutz" 
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                onClick={() => setShowBanner(false)}
              >
                Mehr Infos
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
