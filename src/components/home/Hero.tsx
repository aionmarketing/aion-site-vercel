'use client';

import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const previewImages = [
  { src: '/images/demos/auto-bold-hero.png', label: 'Oficina' },
  { src: '/images/demos/restaurante-quente-hero.png', label: 'Restaurante' },
  { src: '/images/demos/beleza-moderno-hero.png', label: 'Beleza' },
  { src: '/images/demos/saude-clean-hero.png', label: 'Saúde' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#080808]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(0,255,136,0.16),transparent_34%),linear-gradient(120deg,rgba(255,255,255,0.07),transparent_38%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-14">
        <div className="flex flex-col justify-center">
          <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#00ff88]/25 bg-[#00ff88]/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#00ff88]">
            Sites para empresas locais venderem melhor
          </p>
          <h1 className="max-w-3xl text-5xl font-black leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-6xl xl:text-7xl">
            Um site bonito não basta. Ele precisa fazer o cliente chamar.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
            A AION cria sites profissionais com visual por nicho, copy direta e caminhos claros para WhatsApp, orçamento, reserva ou agendamento.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/pedir" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00ff88] px-6 py-4 text-base font-black text-[#07110b] transition hover:brightness-110">
              <MessageCircle size={19} />
              Quero uma recomendação
            </Link>
            <Link href="/templates" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-4 text-base font-bold text-white transition hover:border-white/30 hover:bg-white/[0.04]">
              Ver exemplos por nicho
              <ArrowRight size={19} />
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {['Visual com cara de empresa séria', 'Texto pensado para conversão', 'WhatsApp no caminho certo'].map(item => (
              <div key={item} className="flex items-center gap-2 text-sm font-bold text-gray-300">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00ff88]/15 text-[#00ff88]">
                  <Check size={13} />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/40">
            <div className="grid grid-cols-2 gap-3">
              {previewImages.map((image, index) => (
                <Link
                  key={image.src}
                  href={index === 0 ? '/demo/auto-bold' : index === 1 ? '/demo/restaurante-quente' : index === 2 ? '/demo/beleza-moderno' : '/demo/saude-clean'}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-black ${index === 0 ? 'col-span-2 aspect-[16/7]' : 'aspect-[10/7]'}`}
                >
                  <img src={image.src} alt="" className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-black/55 px-3 py-1 text-xs font-black text-white backdrop-blur">{image.label}</span>
                    <ArrowRight className="h-4 w-4 text-[#00ff88] opacity-0 transition group-hover:opacity-100" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                ['16', 'direções'],
                ['8', 'nichos'],
                ['1', 'objetivo: contato'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-black/30 p-3 text-center">
                  <div className="text-2xl font-black text-[#00ff88]">{value}</div>
                  <div className="mt-1 text-[11px] text-gray-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
