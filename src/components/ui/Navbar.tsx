import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/5 bg-[#0c0c0c]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">AION<span className="text-[#00ff88]">.</span></Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link>
          <Link href="/templates" className="text-sm text-gray-400 hover:text-white transition-colors">Templates</Link>
          <Link href="/como-funciona" className="text-sm text-gray-400 hover:text-white transition-colors">Como Funciona</Link>
          <Link href="/pedir" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00ff88] text-[#0c0c0c] text-sm font-bold rounded-lg hover:brightness-110 transition-all"><MessageCircle size={16} />Pedir Site</Link>
        </div>
      </div>
    </nav>
  );
}
