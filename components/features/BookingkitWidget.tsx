'use client';

import { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface BookingkitWidgetProps {
  configId: string;
  experienceId?: string; // New: Optional ID for specific items
}

export default function BookingkitWidget({ configId, experienceId }: BookingkitWidgetProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [height, setHeight] = useState(800);
  const { resolvedTheme } = useTheme();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data === 'number' && event.data > 0) {
        setHeight(event.data + 50);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  // Construct the script URL with experienceId if present
  const scriptUrl = `https://848330c015276c47b62dc51d28dbae1e.widget.bookingkit.net/bkscript/${configId}/${experienceId ? `?e=${experienceId}` : ''}`;

  const isolatedHtml = `
    <!DOCTYPE html>
    <html lang="de">
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            margin: 0; 
            padding: 0; 
            background: ${isDark ? '#020617' : 'transparent'}; 
            overflow: hidden; 
          }
          #bookingKitContainer { 
            width: 100%; 
            ${isDark ? 'filter: invert(0.9) hue-rotate(180deg) brightness(1.1);' : ''}
          }
          ${isDark ? `
            img, [style*="background-image"], .bk-experience-image, .bk-map-container, .bk-button-primary, .bk-date-picker-cell-active { 
              filter: invert(1) hue-rotate(180deg) brightness(0.9) !important; 
            }
          ` : ''}
        </style>
      </head>
      <body>
        <div id="bookingKitContainer" data-cw="${configId}" ${experienceId ? `data-e="${experienceId}"` : ''}></div>
        <script src="${scriptUrl}" async></script>
        <script>
          function reportHeight() {
            const newHeight = document.body.scrollHeight;
            if (newHeight > 0) { window.parent.postMessage(newHeight, '*'); }
          }
          setInterval(reportHeight, 500);
          window.onload = reportHeight;
        </script>
      </body>
    </html>
  `;

  return (
    <div ref={wrapperRef} className="w-full relative min-h-[400px]">
      {(!isVisible || isLoading) && (
        <div className={cn(
          "absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm z-20 rounded-3xl transition-opacity duration-500",
          isDark ? "bg-slate-950/50" : "bg-white/50"
        )}>
          <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" />
          <p className={cn("font-medium", isDark ? "text-slate-400" : "text-slate-500")}>
            {isVisible ? "Buchungskalender wird geladen..." : "Bereit zum Laden..."}
          </p>
        </div>
      )}
      
      <div 
        className="w-full"
        style={{ 
          backgroundColor: isDark ? '#020617' : '#ffffff',
          borderRadius: '1.5rem',
          overflow: 'hidden'
        }}
      >
        {isVisible && (
          <iframe
            key={`${configId}-${experienceId}-${isDark}`}
            srcDoc={isolatedHtml}
            style={{ height: `${height}px`, width: '100%', border: 'none', overflow: 'hidden' }}
            onLoad={() => {
              setTimeout(() => setIsLoading(false), 1200);
            }}
            title={`booking-widget-${configId}`}
            scrolling="no"
          />
        )}
      </div>
    </div>
  );
}
