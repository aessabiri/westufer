'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
          Häufig gestellte Fragen
        </h2>
        <div className="space-y-4">
          {items.map((item, index) => (
            <FAQItem key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-bold text-lg text-slate-900 dark:text-white pr-8">
          {item.question}
        </span>
        <ChevronDown 
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
