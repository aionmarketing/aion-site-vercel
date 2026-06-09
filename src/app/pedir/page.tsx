'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Check, Clock, MessageCircle, MousePointerClick, Sparkles, Target } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { templates } from '@/lib/templates';

const objectives = [
  'Gerar mais chamadas no WhatsApp',
  'Passar mais confiança',
  'Renovar um site antigo',
  'Criar meu primeiro site',
];

function getTemplateFromSlug(slug: string | null) {
  if (!slug) return null;
  return templates.find(t => t.slug === slug || t.name.toLowerCase() === slug.toLowerCase()) ?? null;
}

function BriefingForm({ visualDirection }: { visualDirection: string }) {
  const [selectedObjective, setSelectedObjective] = useState(objectives[0]);

  return (
    <form action="/api/lead" method="get" className="rounded-[26px] border border-white/10 bg-[#111]/90 p-5 shadow-2xl shadow-black/40 sm:p-6">
      <input type="hidden" name="objective" value={selectedObjective} />
      <input type="hidden" name="visualDirection" value={visualDirection} />
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00ff88]">Briefing rápido</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-white">Receber recomendação</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          Preencha o essencial. A conversa abre direto no WhatsApp.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold text-gray-300">Seu nome</span>
          <input name="name" required placeholder="Marcelo" className="h-11 w-full rounded-xl border border-white/10 bg-black/45 px-3 text-sm outline-none placeholder:text-gray-600 focus:border-[#00ff88]/60" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold text-gray-300">WhatsApp</span>
          <input name="phone" required inputMode="tel" placeholder="(19) 99999-9999" className="h-11 w-full rounded-xl border border-white/10 bg-black/45 px-3 text-sm outline-none placeholder:text-gray-600 focus:border-[#00ff88]/60" />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold text-gray-300">Empresa ou segmento</span>
          <input name="business" required placeholder="Oficina, restaurante, clínica..." className="h-11 w-full rounded-xl border border-white/10 bg-black/45 px-3 text-sm outline-none placeholder:text-gray-600 focus:border-[#00ff88]/60" />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold text-gray-300">Cidade</span>
          <input name="city" placeholder="Piracicaba" className="h-11 w-full rounded-xl border border-white/10 bg-black/45 px-3 text-sm outline-none placeholder:text-gray-600 focus:border-[#00ff88]/60" />
        </label>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-bold text-gray-300">Objetivo principal</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {objectives.map(item => (
            <button
              key={item}
              type="button"
              onClick={() => setSelectedObjective(item)}
              className={`rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition sm:text-sm ${selectedObjective === item ? 'border-[#00ff88] bg-[#00ff88] text-[#07110b]' : 'border-white/10 bg-black/25 text-gray-300 hover:border-white/25'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">Direção visual</p>
        <p className="mt-1 text-sm font-black text-white">{visualDirection}</p>
      </div>

      <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00ff88] px-5 py-4 text-sm font-black text-[#07110b] transition hover:brightness-110">
        Chamar a AION no WhatsApp
        <ArrowRight size={18} />
      </button>
    </form>
  );
}

function PedirContent() {
  const searchParams = useSearchParams();
  const template = getTemplateFromSlug(searchParams.get('template'));
  const visualDirection = template ? `${template.name} (${template.nicho})` : 'Quero recomendação da AION';
  const preview = useMemo(() => ({
    name: template?.companyName || 'Sua empresa',
    color: template?.primaryColor || '#00ff88',
    image: template ? `/images/demos/${template.slug}-hero.png` : '/images/demos/auto-bold-hero.png',
    bullets: template ? template.tags.slice(0, 3) : ['WhatsApp', 'SEO local', 'copy estratégica'],
  }), [template]);

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <Navbar />
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(0,255,136,0.15),transparent_32%),linear-gradient(115deg,rgba(255,255,255,0.07),transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[0.95fr_0.8fr] lg:px-8 lg:py-14">
          <div className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#00ff88]/25 bg-[#00ff88]/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#00ff88]">
              <Sparkles size={14} />
              Diagnóstico visual gratuito
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-[0.96] tracking-tight sm:text-5xl lg:text-6xl">
              Receba uma direção clara para o site da sua empresa.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
              A AION analisa seu caso e te chama no WhatsApp com estrutura, visual e próximo passo. Sem orçamento no escuro.
            </p>

            <div className="mt-6 hidden gap-3 sm:grid sm:grid-cols-3">
              {[
                { icon: Target, title: 'Estratégia', text: 'Página pensada para o seu cliente.' },
                { icon: MousePointerClick, title: 'Conversão', text: 'WhatsApp e orçamento em destaque.' },
                { icon: Clock, title: 'Direto', text: 'Recomendação objetiva.' },
              ].map(item => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <item.icon className="mb-3 h-5 w-5 text-[#00ff88]" />
                  <h3 className="text-sm font-black text-white">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-gray-400">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 lg:block">
              <div className="flex items-center gap-4">
                <img src={preview.image} alt="" className="h-20 w-28 rounded-xl object-cover opacity-85" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: preview.color }}>Referência escolhida</p>
                  <h2 className="mt-1 text-xl font-black">{preview.name}</h2>
                  <p className="mt-1 text-sm text-gray-400">{visualDirection}</p>
                </div>
              </div>
            </div>
          </div>

          <BriefingForm visualDirection={visualDirection} />
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            ['1', 'Você manda o contexto', 'Segmento, cidade, objetivo e referência visual.'],
            ['2', 'AION define o caminho', 'Estrutura, tom da copy e tipo de página mais indicado.'],
            ['3', 'Você decide o próximo passo', 'Recebe uma estimativa e só avança se fizer sentido.'],
          ].map(([number, title, text]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#00ff88] text-sm font-black text-[#07110b]">{number}</div>
              <h3 className="text-lg font-black">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{text}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
          <Link href="/templates" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3.5 text-sm font-bold text-gray-200 transition hover:border-white/25">
            Ver outros exemplos
            <MessageCircle size={16} />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default function PedirPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#080808]" />}>
      <PedirContent />
    </Suspense>
  );
}
