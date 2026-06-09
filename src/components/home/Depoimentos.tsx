'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const niches = [
  {
    name: 'Oficinas e serviços técnicos',
    goal: 'orçamento claro + confiança',
    image: '/images/demos/auto-bold-hero.png',
    href: '/demo/auto-bold',
  },
  {
    name: 'Restaurantes e alimentação',
    goal: 'desejo + reserva ou pedido',
    image: '/images/demos/restaurante-quente-hero.png',
    href: '/demo/restaurante-quente',
  },
  {
    name: 'Clínicas, saúde e estética',
    goal: 'autoridade + agendamento',
    image: '/images/demos/saude-clean-hero.png',
    href: '/demo/saude-clean',
  },
];

export default function Depoimentos() {
  return (
    <section className="bg-[#0b0b0b] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#00ff88]">Aplicação por nicho</p>
            <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
              O mesmo site não vende para todo tipo de cliente.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-gray-400 lg:ml-auto">
            A home, as seções, as imagens e os botões mudam conforme o que o cliente precisa sentir antes de chamar: segurança, desejo, autoridade, urgência ou clareza.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {niches.map(niche => (
            <Link key={niche.name} href={niche.href} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] transition hover:-translate-y-1 hover:border-white/25">
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img src={niche.image} alt="" className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>
              <div className="p-5">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#00ff88]">{niche.goal}</p>
                <h3 className="text-xl font-black text-white">{niche.name}</h3>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-white">
                  Ver exemplo
                  <ArrowRight className="h-4 w-4 text-[#00ff88] transition group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/templates" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-black text-white transition hover:border-white/30 hover:bg-white/[0.04]">
            Ver todos os exemplos
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
