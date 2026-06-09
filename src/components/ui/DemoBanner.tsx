'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, ArrowLeft, MessageCircle } from 'lucide-react';

interface DemoBannerProps { slug: string; primaryColor?: string; }

export default function DemoBanner({ slug, primaryColor = '#00ff88' }: DemoBannerProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
      <div className="sticky top-0 z-50 flex items-center justify-between gap-3 px-4 py-2.5 shadow-lg shadow-black/20" style={{ backgroundColor: primaryColor }}>
        <Link href="/templates" className="flex items-center gap-1.5 text-xs font-semibold text-[#0c0c0c] hover:underline shrink-0">
          <ArrowLeft size={14} />
          Exemplos
        </Link>
        <p className="hidden truncate text-xs font-bold text-[#0c0c0c] sm:block">
          Este é um exemplo de site. A AION adapta visual, texto e chamada para WhatsApp para a sua empresa.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <Link href={`/pedir?template=${slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-[#0c0c0c] px-4 py-1.5 text-xs font-bold text-white transition hover:brightness-150">
            <MessageCircle size={13} />
            Pedir orçamento
          </Link>
          <button onClick={() => setVisible(false)} className="flex items-center justify-center rounded-full p-1 text-[#0c0c0c]/60 hover:text-[#0c0c0c]" aria-label="Fechar"><X className="h-3.5 w-3.5" /></button>
        </div>
      </div>
  );
}
