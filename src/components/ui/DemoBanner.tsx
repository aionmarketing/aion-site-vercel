'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoBannerProps { slug: string; primaryColor?: string; }

export default function DemoBanner({ slug, primaryColor = '#00ff88' }: DemoBannerProps) {
  const [visible, setVisible] = useState(true);
  return (
    <AnimatePresence>{visible && (
      <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }} transition={{ duration: 0.2 }} className="sticky top-0 z-50 flex items-center justify-between gap-4 px-4 py-2.5" style={{ backgroundColor: primaryColor }}>
        <Link href="/templates" className="flex items-center gap-1.5 text-xs font-semibold text-[#0c0c0c] hover:underline shrink-0">
          <ArrowLeft size={14} />
          Templates
        </Link>
        <p className="text-xs font-medium text-[#0c0c0c] truncate hidden sm:block">Este é um modelo de demonstração</p>
        <div className="flex items-center gap-2 shrink-0">
          <Link href={`/pedir?template=${slug}`} className="rounded-full bg-[#0c0c0c] px-4 py-1.5 text-xs font-semibold text-white hover:brightness-150 transition-filter">Quero esse site →</Link>
          <button onClick={() => setVisible(false)} className="flex items-center justify-center rounded-full p-1 text-[#0c0c0c]/60 hover:text-[#0c0c0c]" aria-label="Fechar"><X className="h-3.5 w-3.5" /></button>
        </div>
      </motion.div>
    )}</AnimatePresence>
  );
}
