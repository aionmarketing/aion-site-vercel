'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, Clock } from 'lucide-react';

const items = [
  { num: '01', icon: Zap, title: '24 horas. Sem enrolação.', desc: 'Você aprova o design e em até 24 horas seu site tá no ar. Ninguém nesse mercado faz tão rápido. Enquanto o outro cota, a gente já entregou.' },
  { num: '02', icon: Shield, title: 'Design que converte visitante em cliente', desc: 'Não é só bonito — é estratégico. Cada seção pensada pra seu cliente tomar ação: ligar, mandar WhatsApp, agendar. Site bonito que não vende é cartão de visitas caro.' },
  { num: '03', icon: Clock, title: 'Você foca no seu negócio. A gente faz o resto.', desc: 'Escolha o template, mande suas informações pelo WhatsApp e pronto. Sem reunião semâria, sem briefings de 10 páginas, sem dor de cabeça. Entrega rápida e garantida.' },
];

export default function Diferenciais() {
  return (
    <section className="py-20 sm:py-28 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="divide-y divide-white/10">
          {items.map((item, i) => (
            <motion.div key={item.num} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-6 sm:gap-10 py-10 first:pt-0 last:pb-0">
              <div className="text-4xl sm:text-5xl font-bold text-white/10 tabular-nums shrink-0">{item.num}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3"><item.icon size={20} className="text-[#00ff88]" /><h3 className="text-xl sm:text-2xl font-bold text-white">{item.title}</h3></div>
                <p className="text-base text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
