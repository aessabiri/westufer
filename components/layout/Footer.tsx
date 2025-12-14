import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter mb-4 block">
              WESTUFER
            </Link>
            <p className="text-slate-400 max-w-sm">
              Deine Surfschule am Kemnader See. Wir bringen dich aufs Wasser – mit Spaß, Sicherheit und professionellem Equipment.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Angebot</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/#kurse" className="hover:text-cyan-400 transition-colors">Kurse</Link></li>
              <li><Link href="/verleih" className="hover:text-cyan-400 transition-colors">Verleih</Link></li>
              <li><Link href="/#gruppen" className="hover:text-cyan-400 transition-colors">Gruppen & Events</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/impressum" className="hover:text-cyan-400 transition-colors">Impressum</Link></li>
              <li><Link href="/datenschutz" className="hover:text-cyan-400 transition-colors">Datenschutz</Link></li>
              <li><Link href="/agb" className="hover:text-cyan-400 transition-colors">AGB</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Westufer Kemnade. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}