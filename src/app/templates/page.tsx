'use client';

import { useState } from 'react';
import { demosData } from '@/lib/demos';
import { templates, nichoOptions } from '@/lib/templates';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { ArrowRight, Check, Eye, MessageCircle, Search, Sparkles, Zap } from 'lucide-react';

const nichePitch: Record<string, string> = {
  Saúde: 'agenda cheia, confiança e autoridade local',
  Beleza: 'desejo visual, prova de resultado e reserva rápida',
  Auto: 'confiança, orçamento claro e WhatsApp direto',
  Jurídico: 'autoridade, seriedade e captação qualificada',
  Restaurante: 'fome, reserva e experiência irresistível',
  'Pet Shop': 'cuidado, carinho e urgência para agendar',
  Imobiliária: 'imóveis valorizados e lead pronto para visitar',
  Fitness: 'energia, transformação e matrícula sem enrolação',
};

const proofPoints = [
  'Visual adaptado ao segmento',
  'Texto pensado para WhatsApp',
  'SEO local e carregamento rápido',
  'Estrutura pronta para Vercel',
];

const processSteps = [
  {
    title: 'Escolha uma direção',
    text: 'Você aponta o estilo que combina com sua empresa. A gente ajusta marca, fotos, serviços e tom de voz.',
  },
  {
    title: 'AION refina tudo',
    text: 'Nada de copiar e colar. Reescrevemos a copy, organizamos a oferta e deixamos o site com cara de negócio sério.',
  },
  {
    title: 'Seu cliente chama no WhatsApp',
    text: 'O site termina em ação: orçamento, agendamento, reserva, avaliação ou contato qualificado.',
  },
];

function imageFor(slug: string) {
  return `/images/demos/${slug}-hero.png`;
}

export default function TemplatesPage() {
  const [activeNicho, setActiveNicho] = useState('Todos');
  const filtered = activeNicho === 'Todos' ? templates : templates.filter(t => t.nicho === activeNicho);

  return (
    <main className="min-h-screen bg-[#070707]">
      <Navbar />
      <section className="relative overflow-hidden border-b border-white/10 py-14 sm:py-20">
        <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-[#00ff88]/10 blur-3xl" />
        <div className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 rounded-full bg-white/[0.03] blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00ff88]/20 bg-[#00ff88]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#00ff88]">
                <Sparkles size={14} />
                Sites profissionais por nicho
              </p>
              <h1 className="max-w-4xl text-4xl font-black leading-[0.94] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Sua empresa precisa parecer confiável antes do cliente chamar.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
                A AION cria sites rápidos, bonitos e diretos para empresas locais que dependem de orçamento, agenda, reserva ou atendimento pelo WhatsApp.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/pedir" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00ff88] px-6 py-3 text-sm font-black text-[#07110b] transition hover:brightness-110">
                  <MessageCircle size={18} />
                  Quero um site para minha empresa
                </Link>
                <a href="#modelos" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-bold text-white transition hover:border-white/30 hover:bg-white/[0.04]">
                  Ver exemplos por nicho
                  <ArrowRight size={18} />
                </a>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {proofPoints.map(point => (
                  <div key={point} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00ff88]/15 text-[#00ff88]">
                      <Check size={13} />
                    </span>
                    {point}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-4 shadow-2xl shadow-black/40">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/70 to-transparent" />
              <div className="grid gap-3">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                  <img src="/images/demos/auto-bold-hero.png" alt="Exemplo de site automotivo criado pela AION" className="h-56 w-full object-cover opacity-90 sm:h-72" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {['restaurante-quente', 'beleza-moderno', 'saude-clean'].map(slug => (
                    <img key={slug} src={imageFor(slug)} alt="" className="h-24 rounded-xl border border-white/10 object-cover opacity-85" />
                  ))}
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  ['16', 'bases por nicho'],
                  ['7 dias', 'prazo típico'],
                  ['WhatsApp', 'integrado'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-black/30 p-3">
                    <div className="text-xl font-black text-[#00ff88]">{value}</div>
                    <div className="mt-1 text-[11px] text-gray-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-8 flex flex-wrap gap-2" id="modelos">
            {nichoOptions.map(n => (
              <button key={n} onClick={() => setActiveNicho(n)} className={`px-4 py-2 text-sm rounded-full border transition-colors cursor-pointer ${activeNicho === n ? 'border-[#00ff88]/40 text-[#00ff88] bg-[#00ff88]/[0.08]' : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white'}`}>{n}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map(t => {
              const demo = demosData[t.slug];
              const pitch = nichePitch[t.nicho] || 'presença profissional e conversão';
              return (
                <Link key={t.slug} href={`/demo/${t.slug}`} className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img src={imageFor(t.slug)} alt={`Preview ${t.companyName}`} className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur">{t.nicho}</span>
                      <span className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black" style={{ backgroundColor: t.primaryColor }}>
                        exemplo real
                      </span>
                    </div>
                    {demo && (
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{t.companyName}</p>
                        <p className="mt-2 max-w-md text-2xl font-black leading-none text-white">{demo.heroTitle}</p>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="text-xl font-black text-white transition-colors group-hover:text-[#00ff88]">{t.name}</h3>
                      <Eye className="h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-[#00ff88]" />
                    </div>
                    <p className="text-sm leading-relaxed text-gray-400">{t.description}</p>
                    <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-4">
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00ff88]">
                        <Zap size={14} />
                        Pensado para gerar
                      </div>
                      <p className="text-sm text-gray-300">{pitch}</p>
                    </div>
                    <div className="mt-5 flex items-center justify-between text-sm font-bold text-white">
                      <span>Ver site exemplo</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full text-black transition-transform group-hover:translate-x-1" style={{ backgroundColor: t.primaryColor }}>
                        <ArrowRight size={18} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="border-b border-white/10 bg-[#0b0b0b] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#00ff88]">Como funciona</p>
              <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
                Não é modelo genérico. É uma direção para vender melhor.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {processSteps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#00ff88] text-sm font-black text-[#07110b]">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-black text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-4 rounded-3xl border border-[#00ff88]/20 bg-[#00ff88]/[0.06] p-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-[#00ff88]">
                <Search size={16} />
                Diagnóstico antes de construir
              </div>
              <p className="max-w-3xl text-sm leading-relaxed text-gray-300">
                Antes de fechar visual, a AION olha seu nicho, seus concorrentes, sua oferta e o tipo de contato que você quer receber. O site precisa ser bonito, mas também precisa fazer o cliente entender por que escolher você.
              </p>
            </div>
            <Link href="/pedir" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00ff88] px-6 py-3 text-sm font-black text-[#07110b] transition hover:brightness-110">
              Pedir diagnóstico
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
