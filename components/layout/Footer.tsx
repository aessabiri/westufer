import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-20 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Footer Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative w-14 h-14 transition-transform duration-500 group-hover:scale-110">
                <Image 
                  src="/logo/westuferlogo.png" 
                  alt="Westufer Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-3xl font-black tracking-tighter text-white">
                WESTUFER
              </span>
            </Link>
            <p className="text-slate-400 max-w-sm leading-relaxed font-medium">
              Deine Surfschule am Kemnader See. Wir bringen dich aufs Wasser – mit Spaß, Sicherheit und professionellem Equipment.
            </p>
            <div className="flex gap-4">
               <a href="https://www.facebook.com/westuferkemnade" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-300">
                <Facebook size={20} />
              </a>
               <a href="https://www.instagram.com/westuferkemnade" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-pink-500 hover:border-pink-500 transition-all duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs text-white mb-8">Angebot</h4>
            <ul className="space-y-4 text-slate-400 font-bold text-sm">
              <li><Link href="/kurse" className="hover:text-cyan-400 transition-colors">Kurse & Workshops</Link></li>
              <li><Link href="/verleih" className="hover:text-cyan-400 transition-colors">Material-Verleih</Link></li>
              <li><Link href="/gruppen/anfrage" className="hover:text-cyan-400 transition-colors">Gruppen & Events</Link></li>
              <li><Link href="/gutscheine" className="hover:text-cyan-400 transition-colors">Gutscheine</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs text-white mb-8">Rechtliches</h4>
            <ul className="space-y-4 text-slate-400 font-bold text-sm">
              <li><Link href="/impressum" className="hover:text-cyan-400 transition-colors">Impressum</Link></li>
              <li><Link href="/datenschutz" className="hover:text-cyan-400 transition-colors">Datenschutz</Link></li>
              <li><Link href="/agb" className="hover:text-cyan-400 transition-colors">AGB</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
            © {new Date().getFullYear()} Westufer Kemnade. Created with ❤️ by the Lake.
          </p>
          <div className="mt-4 md:mt-0 text-slate-600 text-[10px] font-bold">
             Lizenziert durch den VDWS
          </div>
        </div>
      </div>
    </footer>
  );
}