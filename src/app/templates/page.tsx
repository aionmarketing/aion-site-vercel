'use client';

import { useState } from 'react';
import { demosData } from '@/lib/demos';
import { templates, nichoOptions } from '@/lib/templates';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';

export default function TemplatesPage() {
  const [activeNicho, setActiveNicho] = useState('Todos');
  const filtered = activeNicho === 'Todos' ? templates : templates.filter(t => t.nicho === activeNicho);

  return (
    <main className="min-h-screen bg-[#0c0c0c]">
      <Navbar />
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-[#00ff88] mb-3">Templates</p>
            <h1 className="heading-section text-white">16 modelos. Todos profissionais.</h1>
            <p className="text-gray-500 mt-4 max-w-lg mx-auto">Cada template é 100% personalizável e vem com copy que converte. Clique e veja como ficaria seu site.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {nichoOptions.map(n => (
              <button key={n} onClick={() => setActiveNicho(n)} className={`px-4 py-2 text-sm rounded-full border transition-colors cursor-pointer ${activeNicho === n ? 'border-[#00ff88]/40 text-[#00ff88] bg-[#00ff88]/[0.05]' : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white'}`}>{n}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(t => {
              const demo = demosData[t.slug];
              return (
                <Link key={t.slug} href={`/demo/${t.slug}`} className="group block p-5 border border-white/5 rounded-lg hover:border-white/15 transition-colors">
                  <div className="relative aspect-[4/3] rounded-md overflow-hidden mb-4" style={{backgroundColor:t.primaryColor}}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white/20">{t.name.charAt(0)}</span>
                    </div>
                    {demo && (
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                        <p className="text-xs text-white/80 line-clamp-2">&ldquo;{demo.heroTitle}&rdquo;</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2"><span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full" style={{backgroundColor:`${t.primaryColor}20`,color:t.primaryColor}}>{t.nicho}</span></div>
                  <h3 className="font-bold text-white mb-1 group-hover:text-[#00ff88] transition-colors">{t.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{t.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
