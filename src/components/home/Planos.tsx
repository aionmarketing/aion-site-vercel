'use client';

import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const offers = [
  {
    name: 'Essencial',
    price: 'R$1.497',
    desc: 'Para sair do improviso com uma página forte, clara e pronta para gerar contato.',
    features: ['One-page completa', 'Copy base por nicho', 'WhatsApp integrado', 'Responsivo no celular', 'Publicação orientada'],
    href: '/pedir?plano=essencial',
    highlight: false,
  },
  {
    name: 'Profissional',
    price: 'R$2.497',
    desc: 'Para empresas que precisam explicar melhor serviços, diferenciais e caminho de compra.',
    features: ['Até 5 páginas', 'Estrutura comercial completa', 'SEO local básico', 'Formulário + WhatsApp', '2 rodadas de ajuste'],
    href: '/pedir?plano=profissional',
    highlight: true,
  },
  {
    name: 'Sob medida',
    price: 'A consultar',
    desc: 'Para quem precisa de projeto mais estratégico, visual exclusivo, e-commerce ou sistema.',
    features: ['Escopo personalizado', 'Direção visual exclusiva', 'Copywriting avançado', 'Integrações e automações', 'Planejamento por etapa'],
    href: '/pedir?plano=sob-medida',
    highlight: false,
  },
];

export default function Planos() {
  return (
    <section className="border-b border-white/10 bg-[#080808] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#00ff88]">Investimento</p>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
            Escolha o ponto de partida. A estratégia vem antes do preço final.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-400">
            Os valores abaixo servem para orientar. No diagnóstico, a AION indica o escopo certo para não pagar por excesso nem economizar onde trava conversão.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {offers.map(offer => (
            <div key={offer.name} className={`relative rounded-3xl border p-6 ${offer.highlight ? 'border-[#00ff88]/45 bg-[#00ff88]/[0.07] shadow-2xl shadow-[#00ff88]/10' : 'border-white/10 bg-white/[0.035]'}`}>
              {offer.highlight && (
                <div className="absolute -top-3 left-6 rounded-full bg-[#00ff88] px-3 py-1 text-xs font-black uppercase tracking-wider text-[#07110b]">
                  mais indicado
                </div>
              )}
              <h3 className="text-2xl font-black text-white">{offer.name}</h3>
              <p className="mt-3 min-h-[72px] text-sm leading-relaxed text-gray-400">{offer.desc}</p>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-black text-white">{offer.price}</span>
                {offer.price.startsWith('R$') && <span className="pb-1 text-sm text-gray-500">à vista</span>}
              </div>
              <div className="mt-6 grid gap-3">
                {offer.features.map(feature => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="h-4 w-4 shrink-0 text-[#00ff88]" />
                    {feature}
                  </div>
                ))}
              </div>
              <Link href={offer.href} className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-black transition ${offer.highlight ? 'bg-[#00ff88] text-[#07110b] hover:brightness-110' : 'border border-white/15 text-white hover:border-white/30 hover:bg-white/[0.04]'}`}>
                Ver se faz sentido
                <ArrowRight size={17} />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h3 className="text-xl font-black text-white">Ainda não sabe qual plano escolher?</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              Normal. O melhor site depende do seu segmento, oferta, urgência e tipo de cliente. Comece pelo diagnóstico.
            </p>
          </div>
          <Link href="/pedir" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-black text-[#080808] transition hover:bg-[#00ff88]">
            <MessageCircle size={17} />
            Falar com a AION
          </Link>
        </div>
      </div>
    </section>
  );
}
