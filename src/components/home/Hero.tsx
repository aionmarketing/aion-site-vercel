'use client';

import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-28 sm:pt-28 sm:pb-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-medium tracking-[0.25em] uppercase text-[#00ff88] mb-6">Seu concorrente já tem site. E você?</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="heading-huge text-white mb-6">
              Sem site,<br /><span className="text-[#00ff88]">sem cliente.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg sm:text-xl text-gray-400 max-w-lg mb-10 leading-relaxed">
              72% das pessoas pesquisam no Google antes de contratar qualquer serviço. Se você não aparece, você não existe. Site profissional a partir de R$1.497, entregue em até 24 horas.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4">
              <a href="/pedir" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00ff88] text-[#0c0c0c] font-bold text-lg hover:brightness-110 transition-all">
                Quero Meu Site <ArrowRight size={20} />
              </a>
              <a href="/templates" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-medium text-lg hover:border-white/40 transition-colors">
                Ver Modelos
              </a>
            </motion.div>
          </div>
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="relative">
              <div className="text-[12rem] sm:text-[16rem] font-black leading-none text-white/[0.03] select-none">24</div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-xs tracking-[0.3em] uppercase text-[#00ff88] mb-1">em até</div>
                <div className="text-4xl font-bold text-white">24h</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
