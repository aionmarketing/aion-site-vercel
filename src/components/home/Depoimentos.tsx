'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Marcos O.', role: 'Garage 55 — Oficina Mecânica', text: 'Antes do site, meus clientes me achavam só por indicação. Agora, 40% dos novos vêm pelo Google. Paguei 1.497 e já retornei 10x. Melhor investimento que fiz na oficina.' },
  { name: 'Ana C.', role: 'Rosa & Cia — Clínica de Estética', text: 'Eu não tinha site e perdia cliente pra clínica que tinha. Em 24h depois de aprovar o design, já tava no ar. Os agendamentos pelo WhatsApp triplicaram. Sem brincadeira.' },
  { name: 'Ricardo L.', role: 'Iron Fit — Academia', text: 'Precisava de um site que batesse com a vibe da academia. Ficou perfeito. O preço é justo demais pro resultado que entrega. Alunos novos chegam pelo site toda semana.' },
];

export default function Depoimentos() {
  return (
    <section className="py-20 sm:py-28 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-[#00ff88] mb-3">Depoimentos</p>
          <h2 className="heading-section text-white">Quem contratou,<br />já lucrou.</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 border border-white/5 rounded-lg">
              <div className="flex gap-0.5 mb-4">{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} fill="#00ff88" style={{ color: '#00ff88' }} />)}</div>
              <p className="text-sm text-gray-300 leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
              <div><div className="font-semibold text-sm text-white">{t.name}</div><div className="text-xs text-gray-500">{t.role}</div></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
