'use client';

import { ArrowRight, LayoutTemplate, MessageSquareText, SearchCheck } from 'lucide-react';
import Link from 'next/link';

const items = [
  {
    icon: SearchCheck,
    title: 'Antes do layout, entendemos o que precisa vender.',
    desc: 'Serviço, cidade, objeções do cliente, tipo de contato desejado e concorrentes. O site nasce com função comercial, não só estética.',
  },
  {
    icon: LayoutTemplate,
    title: 'Cada nicho recebe uma direção visual diferente.',
    desc: 'Oficina precisa transmitir confiança. Restaurante precisa abrir apetite. Clínica precisa passar cuidado. O visual muda porque a venda muda.',
  },
  {
    icon: MessageSquareText,
    title: 'A página leva para conversa, não para confusão.',
    desc: 'Estrutura enxuta, CTAs claros, WhatsApp bem posicionado e texto escrito para o cliente entender rápido por que escolher sua empresa.',
  },
];

export default function Diferenciais() {
  return (
    <section className="border-b border-white/10 bg-[#0b0b0b] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#00ff88]">Como a AION constrói</p>
            <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
              O site precisa vender a confiança antes de vender o serviço.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-gray-400 lg:ml-auto">
            A maioria dos sites pequenos parece igual porque começa pelo template. A AION começa pela decisão que o cliente precisa tomar: chamar, agendar, reservar ou pedir orçamento.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {items.map((item, index) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#00ff88] text-[#07110b]">
                <item.icon size={22} />
              </div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-gray-500">0{index + 1}</p>
              <h3 className="text-xl font-black leading-tight text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-[#00ff88]/20 bg-[#00ff88]/[0.055] p-6 sm:p-7">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="text-2xl font-black text-white">Quer saber qual direção combina com sua empresa?</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-300">
                Mande o segmento e o objetivo. A AION te responde com uma recomendação objetiva antes de você fechar qualquer projeto.
              </p>
            </div>
            <Link href="/pedir" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00ff88] px-6 py-3.5 text-sm font-black text-[#07110b] transition hover:brightness-110">
              Pedir diagnóstico
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
