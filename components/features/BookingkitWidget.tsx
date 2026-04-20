'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface BookingkitWidgetProps {
  configId: string;
}

export default function BookingkitWidget({ configId }: BookingkitWidgetProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [height, setHeight] = useState(800); // Default starting height

  useEffect(() => {
    // Listener to receive height updates from the iframe
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data === 'number' && event.data > 0) {
        setHeight(event.data + 50); // Add a little padding
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const isolatedHtml = `
    <!DOCTYPE html>
    <html lang="de">
      <head>
        <meta charset="utf-8">
        <style>
          body { margin: 0; padding: 0; background: transparent; overflow: hidden; }
          #bookingKitContainer { width: 100%; }
        </style>
      </head>
      <body>
        <div id="bookingKitContainer" data-cw="${configId}"></div>
        <script 
          src="https://848330c015276c47b62dc51d28dbae1e.widget.bookingkit.net/bkscript/${configId}/" 
          async
        ></script>
        <script>
          // Periodically check the height and tell the parent website
          function reportHeight() {
            const newHeight = document.body.scrollHeight;
            if (newHeight > 0) {
              window.parent.postMessage(newHeight, '*');
            }
          }
          // Report height frequently as Bookingkit content loads dynamically
          setInterval(reportHeight, 500);
          window.onload = reportHeight;
        </script>
      </body>
    </html>
  `;

  return (
    <div className="w-full relative transition-all duration-500 ease-in-out">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm z-20 h-[600px]">
          <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Buchungskalender wird geladen...</p>
        </div>
      )}
      
      <iframe
        key={configId}
        srcDoc={isolatedHtml}
        style={{ height: `${height}px`, width: '100%', border: 'none', overflow: 'hidden' }}
        onLoad={() => {
          setTimeout(() => setIsLoading(false), 1500);
        }}
        title={`booking-widget-${configId}`}
        scrolling="no"
      />
    </div>
  );
}
