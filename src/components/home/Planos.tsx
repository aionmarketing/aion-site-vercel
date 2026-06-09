'use client';

import { motion } from 'framer-motion';
import { Check, MessageCircle } from 'lucide-react';

const plans = [
  { name: 'Essencial', price: 'R$1.497', desc: 'Site one-page que já resolve', features: ['1 página completa', 'Design responsivo (celular e PC)', 'Botão de WhatsApp integrado', 'Entrega em até 24 horas', '1 revisão inclusa'], popular: false },
  { name: 'Profissional', price: 'R$2.497', desc: 'O mais vendido — site completo', features: ['Até 5 páginas', 'Design responsivo premium', 'WhatsApp + formulário de contato', 'SEO básico (aparecer no Google)', 'Entrega em até 24 horas', '2 revisões inclusas'], popular: true },
  { name: '100% Personalizado', price: 'R$4.497', desc: 'Do zero, exclusivo pra você', features: ['Páginas ilimitadas', 'Design exclusivo feito pra você', 'WhatsApp + formulários avançados', 'SEO completo', 'Entrega em até 72 horas', 'Revisões ilimitadas'], popular: false },
];

const bumps = [
  { name: 'Logo Profissional', price: '+R$497' },
  { name: 'Identidade Visual Completa', price: '+R$797' },
  { name: 'Copywriting Profissional', price: '+R$497' },
  { name: 'SEO Avançado', price: '+R$397' },
  { name: 'Google Meu Negócio', price: '+R$297' },
];

export default function Planos() {
  return (
    <section className="py-20 sm:py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-[#00ff88] mb-3">Investimento</p>
          <h2 className="heading-section text-white">Quanto custa ter cliente?</h2>
          <p className="text-gray-500 mt-4">12x no cartão. Sem surpresa. Sem mensalidade oculta.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`relative p-8 rounded-lg border ${plan.popular ? 'border-[#00ff88]/30 bg-[#00ff88]/[0.03]' : 'border-white/5'}`}>
              {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#00ff88] text-[#0c0c0c] text-xs font-bold rounded-full">Mais vendido</div>}
              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>
              <div className="text-3xl font-bold text-white mb-6">{plan.price}</div>
              <ul className="space-y-3 mb-8">
                {plan.features.map(f => <li key={f} className="flex items-center gap-2 text-sm text-gray-300"><Check size={16} className="text-[#00ff88] shrink-0" />{f}</li>)}
              </ul>
              <a href={`/pedir?plano=${plan.name.toLowerCase()}`} className="block text-center py-3 font-bold rounded-lg transition-all hover:brightness-110" style={{backgroundColor: plan.popular ? '#00ff88' : 'transparent', color: plan.popular ? '#0c0c0c' : '#fff', border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.2)'}}>Quero o {plan.name}</a>
            </motion.div>
          ))}
        </div>
        {/* Order Bumps */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-center text-xs font-medium tracking-[0.2em] uppercase text-gray-500 mb-6">Adicionais</p>
          <div className="flex flex-wrap justify-center gap-3">
            {bumps.map(b => (
              <div key={b.name} className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-sm">
                <span className="text-gray-300">{b.name}</span>
                <span className="text-[#00ff88] font-bold">{b.price}</span>
              </div>
            ))}
          </div>
        </motion.div>
        {/* Ecommerce + Custom systems */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 px-5 py-3 border border-[#00ff88]/20 rounded-lg text-sm bg-[#00ff88]/[0.02]">
              <span className="text-white font-medium">E-commerce</span>
              <span className="text-[#00ff88] font-bold">Preço a consultar</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-3 border border-[#00ff88]/20 rounded-lg text-sm bg-[#00ff88]/[0.02]">
              <span className="text-white font-medium">Sistemas sob medida</span>
              <span className="text-[#00ff88] font-bold">Preço a consultar</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
