'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Shield, Smile, Heart, User, Users, Clipboard, Scissors,
  Palette, Award, Zap, Eye, Wrench, Monitor, Droplet, Volume2,
  Lightbulb, Briefcase, Scale, Building, FileText, Calculator,
  TrendingUp, Flame, Utensils, PartyPopper, Wine, Fish, ChefHat,
  Phone, Mail, MapPin, Menu, X, Star, ChevronUp, MessageCircle,
  Clock, UsersRound, ChevronLeft, ChevronRight, ArrowRight, Check,
  Dog, ShoppingBag, Microscope, Home, Key, BarChart3, Landmark,
  Dumbbell, Activity, Flower2, Brain
} from 'lucide-react';
import type { DemoData } from '@/lib/demos';
import DemoBanner from '@/components/ui/DemoBanner';

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number; color?: string }>> = {
  Sparkles, Shield, Smile, Heart, User, Users, Clipboard, Scissors,
  Palette, Award, Zap, Eye, Wrench, Monitor, Droplet, Volume2,
  Lightbulb, Briefcase, Scale, Building, FileText, Calculator,
  TrendingUp, Flame, Utensils, PartyPopper, Wine, Fish, ChefHat,
  Dog, ShoppingBag, Microscope, Home, Key, BarChart3, Landmark,
  Dumbbell, Activity, Flower2, Brain,
};

const Icon = ({ name, size = 24, color }: { name: string; size?: number; color?: string }) => {
  const Comp = iconMap[name];
  if (!Comp) return <Sparkles size={size} color={color} />;
  return <Comp size={size} color={color} />;
};

const statLabels: Record<string, string> = { years: 'Anos de experiência', clients: 'Clientes satisfeitos', team: 'Profissionais', rating: 'Avaliação média' };

// ─── SHARED UI PIECES ──────────────────────────────────────

function SiteHeader({ demo, scrolled, isLight, mobileOpen, setMobileOpen }: {
  demo: DemoData; scrolled: boolean; isLight: boolean; mobileOpen: boolean; setMobileOpen: (v: boolean) => void;
}) {
  const bg = scrolled ? (isLight ? 'rgba(255,255,255,0.97)' : 'rgba(10,10,10,0.97)') : 'transparent';
  const textColor = isLight ? '#1a1a1a' : '#ffffff';
  const mutedColor = isLight ? '#666666' : '#999999';
  return (
    <header className="sticky top-0 z-40 transition-all duration-300" style={{ backgroundColor: bg, borderBottom: scrolled ? `1px solid ${isLight ? '#e5e5e5' : '#1a1a1a'}` : 'none', backdropFilter: 'blur(8px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="font-bold text-lg" style={{ color: textColor }}>{demo.companyName}</a>
        <nav className="hidden md:flex items-center gap-6">
          {demo.navLinks.map(l => <a key={l.label} href={l.href} className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: mutedColor }}>{l.label}</a>)}
        </nav>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2" aria-label="Menu">
          {mobileOpen ? <X size={24} color={textColor} /> : <Menu size={24} color={textColor} />}
        </button>
      </div>
      <AnimatePresence>{mobileOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden" style={{ backgroundColor: isLight ? '#fff' : '#111', borderTop: `1px solid ${isLight ? '#e5e5e5' : '#1a1a1a'}` }}>
          <div className="px-4 py-4 space-y-3">{demo.navLinks.map(l => <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="block text-sm font-medium py-2" style={{ color: textColor }}>{l.label}</a>)}</div>
        </motion.div>
      )}</AnimatePresence>
    </header>
  );
}

function SiteFooter({ demo, isLight }: { demo: DemoData; isLight: boolean }) {
  const textColor = isLight ? '#1a1a1a' : '#ffffff';
  const mutedColor = isLight ? '#666666' : '#999999';
  return (
    <footer className="py-12" style={{ backgroundColor: isLight ? '#f5f5f5' : '#080808' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div><h3 className="font-bold text-lg mb-4" style={{ color: textColor }}>{demo.companyName}</h3><p className="text-sm leading-relaxed" style={{ color: mutedColor }}>{demo.tagline}</p></div>
          <div><h4 className="font-semibold text-sm mb-4" style={{ color: textColor }}>Contato</h4><div className="space-y-2 text-sm" style={{ color: mutedColor }}><div className="flex items-center gap-2"><Phone size={14} />{demo.phone}</div><div className="flex items-center gap-2"><Mail size={14} />{demo.email}</div><div className="flex items-center gap-2"><MapPin size={14} />{demo.address}</div></div></div>
          <div><h4 className="font-semibold text-sm mb-4" style={{ color: textColor }}>Navegação</h4><div className="space-y-2">{demo.navLinks.map(l => <a key={l.label} href={l.href} className="block text-sm hover:opacity-70 transition-opacity" style={{ color: mutedColor }}>{l.label}</a>)}</div></div>
        </div>
        <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${isLight ? '#e5e5e5' : '#1a1a1a'}` }}><p className="text-center text-xs" style={{ color: mutedColor }}>&copy; {new Date().getFullYear()} {demo.companyName}. Todos os direitos reservados.</p></div>
      </div>
    </footer>
  );
}

function WhatsAppButton({ phone }: { phone: string }) {
  return <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110" style={{ backgroundColor: '#25D366', color: '#fff' }} aria-label="WhatsApp"><MessageCircle size={26} /></a>;
}

function BackToTop({ show }: { show: boolean }) {
  if (!show) return null;
  return <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 left-6 z-50 w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 bg-white/10 backdrop-blur" aria-label="Voltar ao topo"><ChevronUp size={20} color="#fff" /></button>;
}

// ─── NICHE-SPECIFIC TEMPLATES ──────────────────────────────
// Each one is a COMPLETELY different layout

// === 1. SAÚDE-CLEAN: Dental Clinic — Clean white/blue, appointment-focused ===
function TemplateSaudeClean({ demo }: { demo: DemoData }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  const stats = [
    { value: demo.stats.years, label: 'Anos de experiência' },
    { value: demo.stats.clients, label: 'Clientes satisfeitos' },
    { value: demo.stats.team, label: 'Profissionais' },
    { value: demo.stats.rating, label: 'Avaliação média' },
  ];
  const procedures = [
    { num: '01', title: 'Clareamento Dental', desc: 'Resultados visíveis na primeira sessão com técnicas modernas e seguras.', price: 'A partir de R$ 800' },
    { num: '02', title: 'Implantes Dentários', desc: 'Implantes de titânio com durabilidade e aparência natural garantidas.', price: 'A partir de R$ 3.500' },
    { num: '03', title: 'Ortodontia Invisível', desc: 'Alinhadores transparentes Invisalign para resultados discretos.', price: 'A partir de R$ 5.000' },
    { num: '04', title: 'Limpeza e Prevenção', desc: 'Profilaxia profissional com orientações personalizadas de higiene.', price: 'A partir de R$ 200' },
  ];
  return (
    <>
      {/* HERO - Blue gradient with dental image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${demo.primaryColor} 0%, ${demo.primaryColor}cc 60%, #ffffff 100%)` }} />
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full demo-blur-blob demo-pulse-glow" style={{ backgroundColor: demo.primaryColor }} />
        <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full demo-blur-blob" style={{ backgroundColor: '#ffffff', opacity: 0.08 }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' }}><Heart size={16} /><span className="text-sm font-medium">{demo.tagline}</span></div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-white">{demo.heroTitle}</h1>
              <p className="text-lg sm:text-xl mb-8 leading-relaxed text-white/85 max-w-lg">{demo.heroSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white font-bold text-lg rounded-full hover:scale-105 transition-transform" style={{ color: demo.primaryColor }}><MessageCircle size={20} />{demo.heroCta}</a>
                <a href={`tel:${demo.phone.replace(/\D/g, '')}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium rounded-full border-2 border-white/40 text-white hover:border-white/60 transition-colors"><Phone size={20} />{demo.phone}</a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img src="/images/demos/saude-clean-hero.png" alt="Clínica" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${demo.primaryColor}30 0%, transparent 60%)` }} />
              </div>
            </motion.div>
          </div>
          {/* Stats bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map(s => <div key={s.label} className="text-center"><div className="text-2xl sm:text-3xl font-bold text-white">{s.value}</div><div className="text-xs text-white/60 mt-1">{s.label}</div></div>)}
          </motion.div>
        </div>
      </section>

      {/* PROCEDURES - Numbered with prices */}
      <section id="servicos" className="py-20 sm:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: demo.primaryColor }}>Procedimentos</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Nossos Tratamentos</h2>
          </motion.div>
          <div className="space-y-0">
            {procedures.map((p, i) => (
              <motion.div key={p.num} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-6 py-8 border-b border-gray-100">
                <div className="text-3xl sm:text-4xl font-bold shrink-0 w-12 text-right" style={{ color: `${demo.primaryColor}30` }}>{p.num}</div>
                <div className="flex-1"><h3 className="text-lg font-bold mb-2 text-gray-900">{p.title}</h3><p className="text-sm leading-relaxed text-gray-500 mb-2">{p.desc}</p><span className="text-sm font-semibold" style={{ color: demo.primaryColor }}>{p.price}</span></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT - Image + text */}
      <section id="sobre" className="py-20 sm:py-28" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                <img src="/images/demos/saude-clean-about.png" alt="Sobre" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, transparent 50%, ${demo.primaryColor}20 100%)` }} />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: demo.primaryColor }}>Conheça nossa história</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight text-gray-900">{demo.aboutTitle}</h2>
              <p className="text-base sm:text-lg leading-relaxed mb-8 text-gray-600">{demo.aboutText}</p>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-lg text-white hover:brightness-110 transition-all" style={{ backgroundColor: demo.primaryColor }}><MessageCircle size={18} />Fale Conosco <ArrowRight size={16} /></a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="depoimentos" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: demo.primaryColor }}>Depoimentos</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">O Que Nossos Pacientes Dizem</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demo.testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-7 rounded-xl border border-gray-100 bg-white demo-card-shadow">
                <div className="flex gap-1 mb-4">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={16} fill={demo.primaryColor} style={{ color: demo.primaryColor }} />)}</div>
                <p className="text-sm leading-relaxed mb-6 text-gray-600 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3"><div className="w-10 h-10 flex items-center justify-center font-bold text-sm rounded-full" style={{ backgroundColor: `${demo.primaryColor}12`, color: demo.primaryColor }}>{t.name.charAt(0)}</div><div><div className="font-semibold text-sm text-gray-900">{t.name}</div><div className="text-xs text-gray-500">{t.role}</div></div></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: demo.primaryColor }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">Agende Sua Consulta Agora</h2>
          <p className="text-lg mb-10 text-white/85">Cuidamos do seu sorriso com tecnologia e carinho. Entre em contato!</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white font-bold text-lg rounded-full hover:scale-105 transition-transform" style={{ color: demo.primaryColor }}><MessageCircle size={20} />{demo.heroCta}</a>
            <a href={`tel:${demo.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium rounded-full border-2 border-white/40 text-white hover:border-white/60 transition-colors"><Phone size={20} />{demo.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}

// === 2. SAÚDE-PREMIUM: Psychology — Warm calming blue, centered, breathing space ===
function TemplateSaudePremium({ demo }: { demo: DemoData }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  const approaches = [
    { name: 'TCC', desc: 'Terapia Cognitivo-Comportamental para reestruturar padrões de pensamento negativos.' },
    { name: 'Psicanálise', desc: 'Exploração profunda do inconsciente para autoconhecimento e transformação.' },
    { name: 'Terapia Humanista', desc: 'Foco no potencial e na experiência subjetiva com empatia e aceitação.' },
    { name: 'Mindfulness', desc: 'Práticas de atenção plena para redução de estresse e ansiedade.' },
  ];
  return (
    <>
      {/* HERO - Soft blue centered */}
      <section className="relative overflow-hidden" style={{ backgroundColor: demo.secondaryColor }}>
        <div className="absolute inset-0 opacity-10"><img src="/images/demos/saude-premium-hero.png" alt="" className="w-full h-full object-cover" /></div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${demo.secondaryColor} 0%, ${demo.secondaryColor}ee 100%)` }} />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full demo-blur-blob demo-pulse-glow" style={{ backgroundColor: demo.primaryColor }} />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full demo-blur-blob" style={{ backgroundColor: demo.primaryColor, opacity: 0.08 }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-40 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-sm font-medium tracking-[0.2em] uppercase mb-8" style={{ color: demo.primaryColor }}>{demo.tagline}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.15] mb-8" style={{ color: '#2d3748', fontFamily: 'Georgia, serif' }}>{demo.heroTitle}</h1>
            <p className="text-lg sm:text-xl leading-relaxed mb-12 max-w-2xl mx-auto" style={{ color: '#718096' }}>{demo.heroSubtitle}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 font-medium text-white rounded-full hover:brightness-110 transition-all" style={{ backgroundColor: demo.primaryColor }}><MessageCircle size={18} />{demo.heroCta}</a>
              <a href={`tel:${demo.phone.replace(/\D/g, '')}`} className="text-sm font-medium" style={{ color: demo.primaryColor }}><Phone size={14} className="inline mr-1" />{demo.phone}</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT - Centered with image */}
      <section id="sobre" className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: demo.primaryColor }}>Conheça nosso espaço</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-5" style={{ color: '#2d3748', fontFamily: 'Georgia, serif' }}>{demo.aboutTitle}</h2>
            <div className="w-16 h-0.5 mx-auto mb-8" style={{ backgroundColor: demo.primaryColor }} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video mb-10">
              <img src="/images/demos/saude-premium-about.png" alt="Espaço" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${demo.primaryColor}15 0%, transparent 50%)` }} />
            </div>
            <p className="text-base sm:text-lg leading-relaxed mb-12" style={{ color: '#718096' }}>{demo.aboutText}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[{v:demo.stats.years,l:'Anos'},{v:demo.stats.clients,l:'Pacientes'},{v:demo.stats.team,l:'Terapeutas'},{v:demo.stats.rating,l:'Avaliação'}].map(s=><div key={s.l} className="p-5 rounded-xl" style={{backgroundColor:'#f0f4f8'}}><div className="text-2xl font-bold" style={{color:demo.primaryColor}}>{s.v}</div><div className="text-xs mt-1" style={{color:'#718096'}}>{s.l}</div></div>)}
          </motion.div>
        </div>
      </section>

      {/* APPROACHES - Cards with soft bg */}
      <section id="servicos" className="py-20 sm:py-28" style={{ backgroundColor: demo.secondaryColor }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: demo.primaryColor }}>Abordagens Terapêuticas</p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#2d3748', fontFamily: 'Georgia, serif' }}>Como Trabalhamos</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {approaches.map((a, i) => (
              <motion.div key={a.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-8 rounded-xl bg-white shadow-sm">
                <h3 className="text-lg font-bold mb-2" style={{ color: '#2d3748' }}>{a.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#718096' }}>{a.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {demo.services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-4 p-6 rounded-xl bg-white shadow-sm">
                <div className="w-10 h-10 flex items-center justify-center shrink-0 rounded-lg" style={{ backgroundColor: `${demo.primaryColor}12` }}><Icon name={s.icon} size={20} color={demo.primaryColor} /></div>
                <div><h3 className="font-bold text-sm mb-1" style={{ color: '#2d3748' }}>{s.title}</h3><p className="text-xs leading-relaxed" style={{ color: '#718096' }}>{s.description}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Carousel */}
      <TestimonialCarousel demo={demo} isLight={true} />

      {/* CTA */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: demo.primaryColor }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white" style={{ fontFamily: 'Georgia, serif' }}>Dê o Primeiro Passo</h2>
          <p className="text-lg mb-10 text-white/85">Cuidar da sua saúde mental é um ato de coragem. Estamos aqui para você.</p>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white font-bold text-lg rounded-full hover:scale-105 transition-transform" style={{ color: demo.primaryColor }}><MessageCircle size={20} />{demo.heroCta}</a>
        </div>
      </section>
    </>
  );
}

// === 3. BELEZA-MODERNO: Salon — DARK editorial lookbook, black/gold ===
function TemplateBelezaModerno({ demo }: { demo: DemoData }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  const galleryImages = [
    { src: '/images/demos/beleza-moderno-hero.png', alt: 'Look 1' },
    { src: '/images/demos/beleza-moderno-about.png', alt: 'Look 2' },
    { src: '/images/demos/beleza-moderno-hero.png', alt: 'Look 3' },
    { src: '/images/demos/beleza-moderno-about.png', alt: 'Look 4' },
  ];
  return (
    <>
      {/* HERO - Dark editorial */}
      <section className="relative overflow-hidden bg-[#0a0a0a]">
        <div className="absolute top-0 left-0 w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${demo.secondaryColor}, transparent)` }} />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full demo-blur-blob demo-pulse-glow" style={{ backgroundColor: demo.secondaryColor }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full demo-blur-blob" style={{ backgroundColor: demo.secondaryColor, opacity: 0.05 }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="text-xs sm:text-sm font-light tracking-[0.3em] uppercase mb-8" style={{ color: demo.secondaryColor }}>{demo.tagline}</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.05] mb-8 text-white" style={{ letterSpacing: '0.05em' }}>{demo.heroTitle}</h1>
              <div className="w-24 h-px mb-8" style={{ backgroundColor: demo.secondaryColor }} />
              <p className="text-base sm:text-lg mb-12 leading-relaxed max-w-lg" style={{ color: '#888' }}>{demo.heroSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-5">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-10 py-4 font-medium text-sm tracking-[0.15em] uppercase hover:scale-105 transition-transform" style={{ backgroundColor: demo.secondaryColor, color: '#0a0a0a' }}>{demo.heroCta}</a>
                <a href={`tel:${demo.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase" style={{ color: demo.secondaryColor }}><Phone size={14} />{demo.phone}</a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="hidden lg:block">
              <div className="relative aspect-[3/4] overflow-hidden"><img src="/images/demos/beleza-moderno-hero.png" alt="Studio" className="w-full h-full object-cover" /><div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.6) 100%)` }} /></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GALLERY - Lookbook grid */}
      <section className="py-20 sm:py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-xs font-light tracking-[0.3em] uppercase mb-4" style={{ color: demo.secondaryColor }}>Portfolio</p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-[0.1em] text-white">Nossos Trabalhos</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div key={img.alt} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative aspect-[3/4] overflow-hidden group">
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES - Lookbook style */}
      <section id="servicos" className="py-20 sm:py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <p className="text-xs font-light tracking-[0.3em] uppercase mb-4" style={{ color: demo.secondaryColor }}>Serviços</p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-[0.1em] text-white">O Que Oferecemos</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {demo.services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group relative overflow-hidden p-8 sm:p-10" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="absolute top-0 left-0 w-full h-px" style={{ background: `linear-gradient(90deg, ${demo.secondaryColor}40, transparent)` }} />
                <div className="flex items-start justify-between mb-6"><Icon name={s.icon} size={28} color={demo.secondaryColor} /><span className="text-xs tracking-[0.2em] uppercase font-light" style={{ color: `${demo.secondaryColor}60` }}>0{i + 1}</span></div>
                <h3 className="text-xl font-light tracking-wider mb-3 text-white" style={{ letterSpacing: '0.08em' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666' }}>{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="sobre" className="py-20 sm:py-28" style={{ backgroundColor: '#111' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-light tracking-[0.3em] uppercase mb-4" style={{ color: demo.secondaryColor }}>Sobre</p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-[0.1em] text-white mb-8">{demo.aboutTitle}</h2>
            <p className="text-base leading-loose max-w-2xl mx-auto mb-10" style={{ color: '#888' }}>{demo.aboutText}</p>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 font-medium text-sm tracking-[0.1em] uppercase text-white hover:opacity-80 transition-opacity" style={{ border: `1px solid ${demo.secondaryColor}40` }}><MessageCircle size={16} />Fale Conosco</a>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialCards demo={demo} isLight={false} accentColor={demo.secondaryColor} />

      {/* CTA */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: demo.secondaryColor }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#0a0a0a' }}>Pronto Para Transformar Seu Visual?</h2>
          <p className="text-lg mb-10" style={{ color: 'rgba(0,0,0,0.7)' }}>Agende agora e saia de lá outra pessoa.</p>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-10 py-4 bg-[#0a0a0a] font-bold text-lg hover:scale-105 transition-transform" style={{ color: demo.secondaryColor }}><MessageCircle size={20} />{demo.heroCta}</a>
        </div>
      </section>
    </>
  );
}

// === 4. BELEZA-FEMININO: Aesthetics — Rose, spa-like, gallery focused ===
function TemplateBelezaFeminino({ demo }: { demo: DemoData }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  const results = [
    { img: '/images/demos/beleza-feminino-hero.png', title: 'Peeling Diamante', desc: 'Renovação celular completa em 3 sessões' },
    { img: '/images/demos/beleza-feminino-about.png', title: 'Microagulhamento', desc: 'Estímulo de colágeno para pele firme e luminosa' },
    { img: '/images/demos/beleza-feminino-hero.png', title: 'Lifting Natural', desc: 'Rejuvenescimento sem cirurgia com resultados visíveis' },
  ];
  return (
    <>
      {/* HERO - Rose gradient with image */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${demo.primaryColor} 0%, ${demo.secondaryColor} 100%)` }}>
        <div className="absolute top-20 left-0 w-80 h-80 rounded-full demo-blur-blob" style={{ backgroundColor: '#ffffff' }} />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full demo-blur-blob demo-pulse-glow" style={{ backgroundColor: demo.primaryColor }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-sm font-medium tracking-[0.2em] uppercase mb-6 text-white/80">{demo.tagline}</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-white" style={{ fontFamily: 'Georgia, serif' }}>{demo.heroTitle}</h1>
              <p className="text-lg mb-8 leading-relaxed text-white/85 max-w-lg">{demo.heroSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white font-bold rounded-full hover:scale-105 transition-transform" style={{ color: demo.primaryColor }}><MessageCircle size={18} />{demo.heroCta}</a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]"><img src="/images/demos/beleza-feminino-about.png" alt="Beleza" className="w-full h-full object-cover" /><div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${demo.primaryColor}20 0%, transparent 60%)` }} /></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RESULTS GALLERY */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: demo.primaryColor }}>Resultados</p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#2d3748', fontFamily: 'Georgia, serif' }}>Veja a Transformação</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {results.map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/2] mb-4"><img src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${demo.primaryColor}30 0%, transparent 50%)` }} /></div>
                <h3 className="font-bold mb-1" style={{ color: '#2d3748' }}>{r.title}</h3>
                <p className="text-sm" style={{ color: '#718096' }}>{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES - Grid */}
      <SectionServicesGrid demo={demo} isLight={true} />

      {/* ABOUT */}
      <SectionAboutLeftRight demo={demo} isLight={true} imgSrc="/images/demos/beleza-feminino-about.png" />

      {/* TESTIMONIALS */}
      <TestimonialCards demo={demo} isLight={true} />

      {/* CTA */}
      <SectionCTA demo={demo} />
    </>
  );
}

// === 5. AUTO-BOLD: Mechanic — Orange on black, aggressive, diagnostic style ===
function TemplateAutoBold({ demo }: { demo: DemoData }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  const warranties = [
    { icon: 'Shield', title: 'Garantia 12 meses', desc: 'Em todos os serviços realizados' },
    { icon: 'Check', title: 'Orçamento transparente', desc: 'Sem surpresas, tudo detalhado' },
    { icon: 'Wrench', title: 'Peças originais', desc: 'Ou de marcas premium com procedência' },
  ];
  return (
    <>
      {/* HERO - Dark with orange accent bar */}
      <section className="relative overflow-hidden bg-[#0c0c0c]">
        <div className="h-2 w-full" style={{ backgroundColor: demo.primaryColor }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `repeating-linear-gradient(-45deg, transparent, transparent 20px, ${demo.primaryColor}06 20px, ${demo.primaryColor}06 21px)` }} />
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full demo-blur-blob demo-pulse-glow" style={{ backgroundColor: demo.primaryColor }} />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full demo-blur-blob" style={{ backgroundColor: demo.primaryColor, opacity: 0.06 }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-xs font-black tracking-[0.2em] uppercase mb-6" style={{ color: demo.primaryColor }}>{demo.tagline}</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-6 text-white uppercase">{demo.heroTitle}</h1>
              <p className="text-base sm:text-lg mb-10 max-w-xl leading-relaxed" style={{ color: '#888' }}>{demo.heroSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-10 py-5 font-black text-sm tracking-wider uppercase hover:scale-105 transition-transform" style={{ backgroundColor: demo.primaryColor, color: '#fff' }}><MessageCircle size={18} />{demo.heroCta}</a>
                <a href={`tel:${demo.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 px-8 py-5 font-bold text-sm uppercase border-2 hover:border-white/40 transition-colors" style={{ borderColor: `${demo.primaryColor}60`, color: '#fff' }}><Phone size={18} />{demo.phone}</a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="hidden lg:block">
              <div className="relative rounded overflow-hidden aspect-[4/3]"><img src="/images/demos/auto-bold-hero.png" alt="Oficina" className="w-full h-full object-cover" /><div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${demo.primaryColor}30 0%, transparent 50%)` }} /></div>
            </motion.div>
          </div>
          {/* Gauge stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[{v:demo.stats.years,l:'Anos'},{v:demo.stats.clients,l:'Clientes'},{v:demo.stats.team,l:'Mecânicos'},{v:demo.stats.rating,l:'Avaliação'}].map(s=><div key={s.l} className="border-l-2 pl-4" style={{borderColor:demo.primaryColor}}><div className="text-3xl sm:text-4xl font-black" style={{color:demo.primaryColor}}>{s.v}</div><div className="text-xs uppercase tracking-wider mt-1" style={{color:'#555'}}>{s.l}</div></div>)}
          </motion.div>
        </div>
      </section>

      {/* WARRANTIES */}
      <section className="py-16 sm:py-20" style={{backgroundColor:'#111'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {warranties.map((w, i) => (
              <motion.div key={w.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4 p-6" style={{borderLeft:`3px solid ${demo.primaryColor}`,backgroundColor:'rgba(255,255,255,0.02)'}}>
                <Icon name={w.icon} size={24} color={demo.primaryColor} />
                <div><h3 className="font-bold text-sm text-white mb-1">{w.title}</h3><p className="text-xs" style={{color:'#777'}}>{w.desc}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES - Spec sheets style */}
      <section id="servicos" className="py-20 sm:py-28 bg-[#0c0c0c]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <p className="text-xs font-black tracking-[0.2em] uppercase mb-4" style={{ color: demo.primaryColor }}>Especificações</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white">Serviços</h2>
          </motion.div>
          <div className="space-y-3">
            {demo.services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-6 p-6 border-l-4 hover:bg-white/[0.02] transition-colors" style={{ borderColor: demo.primaryColor, backgroundColor: 'rgba(255,255,255,0.01)' }}>
                <Icon name={s.icon} size={24} color={demo.primaryColor} />
                <div className="flex-1"><h3 className="text-base font-black uppercase tracking-wide text-white">{s.title}</h3><p className="text-sm mt-1" style={{color:'#666'}}>{s.description}</p></div>
                <ArrowRight size={16} color={demo.primaryColor} className="shrink-0 hidden sm:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="sobre" className="py-20 sm:py-28" style={{backgroundColor:'#111'}}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-black tracking-[0.2em] uppercase mb-4" style={{color:demo.primaryColor}}>Sobre</p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mb-8">{demo.aboutTitle}</h2>
            <p className="text-base leading-relaxed max-w-2xl mx-auto mb-8" style={{color:'#888'}}>{demo.aboutText}</p>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 font-black text-sm uppercase tracking-wider hover:scale-105 transition-transform" style={{backgroundColor:demo.primaryColor,color:'#fff'}}><MessageCircle size={18} />Fale Conosco</a>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialCards demo={demo} isLight={false} />

      {/* CTA */}
      <section className="py-20 sm:py-28" style={{backgroundColor:demo.primaryColor}}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mb-6">Precisa de Orçamento?</h2>
          <p className="text-lg mb-10 text-white/85">Sem surpresas, sem enrolação. Orçamento detalhado e honesto.</p>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-10 py-5 bg-white font-black text-lg uppercase hover:scale-105 transition-transform" style={{color:demo.primaryColor}}><MessageCircle size={20} />{demo.heroCta}</a>
        </div>
      </section>
    </>
  );
}

// === 6. AUTO-TECNICO: Car Tech — Blue tech/digital, dashboard feel ===
function TemplateAutoTecnico({ demo }: { demo: DemoData }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  return (
    <>
      {/* HERO - Tech dark with blue glow */}
      <section className="relative overflow-hidden bg-[#0c0c0c]">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${demo.primaryColor}15 0%, transparent 70%)` }} />
        <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full demo-blur-blob demo-pulse-glow" style={{ backgroundColor: demo.primaryColor }} />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full demo-blur-blob" style={{ backgroundColor: demo.primaryColor, opacity: 0.05 }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-xs font-mono tracking-[0.15em] uppercase mb-6" style={{ color: demo.primaryColor }}>{demo.tagline}</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6 text-white">{demo.heroTitle}</h1>
              <p className="text-base sm:text-lg mb-10 leading-relaxed max-w-lg" style={{ color: '#888' }}>{demo.heroSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 font-bold text-sm tracking-wider hover:brightness-110 transition-all" style={{ backgroundColor: demo.primaryColor, color: '#fff' }}><MessageCircle size={18} />{demo.heroCta}</a>
                <a href={`tel:${demo.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium border transition-colors" style={{ borderColor: `${demo.primaryColor}40`, color: '#fff' }}><Phone size={18} />{demo.phone}</a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="hidden lg:block">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]"><img src="/images/demos/auto-tecnico-hero.png" alt="Instalação" className="w-full h-full object-cover" /><div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${demo.primaryColor}25 0%, transparent 50%)` }} /></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="servicos" className="py-20 sm:py-28 bg-[#0c0c0c]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <p className="text-xs font-mono tracking-[0.15em] uppercase mb-4" style={{ color: demo.primaryColor }}>Features</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Serviços</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {demo.services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 relative overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px' }}>
                <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full" style={{ background: `radial-gradient(circle, ${demo.primaryColor}15 0%, transparent 70%)` }} />
                <Icon name={s.icon} size={24} color={demo.primaryColor} />
                <h3 className="text-base font-bold mt-4 mb-2 text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{color:'#777'}}>{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <SectionAboutDarkBand demo={demo} imgSrc="/images/demos/auto-tecnico-about.png" />

      {/* TESTIMONIALS */}
      <TestimonialCards demo={demo} isLight={false} />

      {/* CTA */}
      <SectionCTA demo={demo} />
    </>
  );
}

// === 7. JURIDICO-SOBRIO: Law firm — Navy/gold, SERIF, partner profiles ===
function TemplateJuridicoSobrio({ demo }: { demo: DemoData }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  const partners = [
    { name: 'Dr. Ricardo Melo', role: 'Direito Trabalhista', img: '/images/demos/juridico-sobrio-about.png' },
    { name: 'Dra. Beatriz Melo', role: 'Direito de Família', img: '/images/demos/juridico-sobrio-hero.png' },
    { name: 'Dr. André Costa', role: 'Direito Empresarial', img: '/images/demos/juridico-sobrio-about.png' },
  ];
  return (
    <>
      {/* HERO - Navy with gold accents */}
      <section className="relative overflow-hidden" style={{ backgroundColor: demo.primaryColor }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full demo-blur-blob demo-pulse-glow" style={{ backgroundColor: demo.secondaryColor }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full demo-blur-blob" style={{ backgroundColor: demo.secondaryColor, opacity: 0.05 }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-center gap-3 mb-8"><Scale size={20} color={demo.secondaryColor} /><p className="text-xs tracking-[0.3em] uppercase" style={{ color: demo.secondaryColor, fontFamily: 'Georgia, serif' }}>{demo.tagline}</p></div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.2] mb-8 text-white" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.02em' }}>{demo.heroTitle}</h1>
            <div className="w-24 h-px mx-auto mb-8" style={{ backgroundColor: demo.secondaryColor }} />
            <p className="text-lg leading-relaxed mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>{demo.heroSubtitle}</p>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 font-medium text-sm tracking-[0.1em] uppercase hover:brightness-110 transition-all" style={{ backgroundColor: demo.secondaryColor, color: demo.primaryColor }}><MessageCircle size={16} />{demo.heroCta}</a>
          </motion.div>
        </div>
      </section>

      {/* PARTNERS - Unique section for law firm */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: demo.secondaryColor, fontFamily: 'Georgia, serif' }}>Nosso Time</p>
            <h2 className="text-3xl sm:text-4xl font-normal" style={{ color: demo.primaryColor, fontFamily: 'Georgia, serif' }}>Advogados Parceiros</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {partners.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="relative w-40 h-50 mx-auto mb-6 rounded overflow-hidden"><img src={p.img} alt={p.name} className="w-full h-full object-cover" /><div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 60%, ${demo.primaryColor}40 100%)` }} /></div>
                <h3 className="text-lg font-normal mb-1" style={{ color: demo.primaryColor, fontFamily: 'Georgia, serif' }}>{p.name}</h3>
                <p className="text-sm" style={{ color: demo.secondaryColor }}>{p.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section id="servicos" className="py-20 sm:py-28" style={{backgroundColor:'#f8f9fa'}}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <div className="flex items-center gap-4 mb-4"><Scale size={20} color={demo.secondaryColor} /><p className="text-xs tracking-[0.2em] uppercase" style={{ color: demo.secondaryColor, fontFamily: 'Georgia, serif' }}>Áreas de Atuação</p></div>
            <h2 className="text-3xl sm:text-4xl font-normal" style={{ color: demo.primaryColor, fontFamily: 'Georgia, serif' }}>Nossas Áreas</h2>
            <div className="w-full h-px mt-6" style={{ backgroundColor: `${demo.primaryColor}20` }} />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {demo.services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border" style={{ borderColor: `${demo.primaryColor}15` }}>
                <div className="flex items-start gap-4 mb-4"><Icon name={s.icon} size={20} color={demo.secondaryColor} /><h3 className="text-lg font-normal" style={{ color: '#2d3748', fontFamily: 'Georgia, serif' }}>{s.title}</h3></div>
                <p className="text-sm leading-relaxed pl-9" style={{ color: '#718096' }}>{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <SectionAboutLeftRight demo={demo} isLight={true} imgSrc="/images/demos/juridico-sobrio-about.png" accentColor={demo.secondaryColor} />

      {/* TESTIMONIALS */}
      <TestimonialCards demo={demo} isLight={true} accentColor={demo.secondaryColor} />

      {/* CTA */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: demo.primaryColor }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-normal mb-6 text-white" style={{ fontFamily: 'Georgia, serif' }}>Fale com um Advogado</h2>
          <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}>Atendimento sigiloso e profissional. Sua primeira consulta é essencial.</p>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 font-medium text-sm tracking-[0.1em] uppercase hover:brightness-110 transition-all" style={{ backgroundColor: demo.secondaryColor, color: demo.primaryColor }}><MessageCircle size={16} />{demo.heroCta}</a>
        </div>
      </section>
    </>
  );
}

// === 8. JURIDICO-MODERNO: Accounting — Clean green/white, process timeline ===
function TemplateJuridicoModerno({ demo }: { demo: DemoData }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  const process = [
    { step: '01', title: 'Consulta Inicial', desc: 'Análise da sua situação e definição do melhor caminho.' },
    { step: '02', title: 'Planejamento', desc: 'Estratégia personalizada para seu negócio ou caso.' },
    { step: '03', title: 'Execução', desc: 'Implementação com acompanhamento e relatórios mensais.' },
    { step: '04', title: 'Resultados', desc: 'Economia, conformidade e tranquilidade para você.' },
  ];
  return (
    <>
      {/* HERO - Clean green on white */}
      <section className="relative overflow-hidden" style={{ backgroundColor: demo.secondaryColor }}>
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full demo-blur-blob demo-pulse-glow" style={{ backgroundColor: demo.primaryColor }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full demo-blur-blob" style={{ backgroundColor: demo.primaryColor, opacity: 0.06 }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: demo.primaryColor }}>{demo.tagline}</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6" style={{ color: '#1a1a1a' }}>{demo.heroTitle}</h1>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: '#555' }}>{demo.heroSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 font-bold text-white rounded-lg hover:brightness-110 transition-all" style={{ backgroundColor: demo.primaryColor }}><MessageCircle size={18} />{demo.heroCta}</a>
                <a href={`tel:${demo.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 px-8 py-4 font-medium rounded-lg border" style={{ borderColor: demo.primaryColor, color: demo.primaryColor }}><Phone size={18} />{demo.phone}</a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="hidden lg:block">
              <div className="relative rounded-xl overflow-hidden shadow-xl aspect-[4/3]"><img src="/images/demos/juridico-moderno-hero.png" alt="Escritório" className="w-full h-full object-cover" /></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE - Unique for accounting */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: demo.primaryColor }}>Como Funciona</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: '#1a1a1a' }}>Nosso Processo</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px" style={{ backgroundColor: `${demo.primaryColor}20` }} />
            <div className="space-y-10">
              {process.map((p, i) => (
                <motion.div key={p.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative flex items-start gap-6 pl-4">
                  <div className="w-9 h-9 flex items-center justify-center text-sm font-bold shrink-0 z-10 rounded-full text-white" style={{ backgroundColor: demo.primaryColor }}>{p.step}</div>
                  <div className="pt-1"><h3 className="text-lg font-bold mb-2" style={{color:'#1a1a1a'}}>{p.title}</h3><p className="text-sm leading-relaxed" style={{color:'#666'}}>{p.desc}</p></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <SectionServicesList demo={demo} isLight={true} />

      {/* ABOUT */}
      <SectionAboutLeftRight demo={demo} isLight={true} imgSrc="/images/demos/juridico-moderno-about.png" />

      {/* TESTIMONIALS */}
      <TestimonialCards demo={demo} isLight={true} />

      {/* CTA */}
      <SectionCTA demo={demo} />
    </>
  );
}

// === 9. RESTAURANTE-QUENTE: Steakhouse — Red/black, menu with prices ===
function TemplateRestauranteQuente({ demo }: { demo: DemoData }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  const menuItems = [
    { name: 'Picanha na Brasa', desc: 'Corte premium com guarnição', price: 'R$ 89,90' },
    { name: 'Costela Inteira', desc: 'Para 2 pessoas com acompanhamentos', price: 'R$ 149,90' },
    { name: 'Maminha ao Alho', desc: 'Fatias finas com alho caramelizado', price: 'R$ 79,90' },
    { name: 'Rodízio Completo', desc: '12 cortes + buffet livre', price: 'R$ 119,90' },
    { name: 'Buffet de Acompanhamentos', desc: 'Saladas, farofa, vinagrete e mais', price: 'R$ 39,90' },
    { name: 'Sobremesa Artesanal', desc: 'Petit gâteau, pudim ou brownie', price: 'R$ 29,90' },
  ];
  return (
    <>
      {/* HERO - Dark with red fire, food image */}
      <section className="relative overflow-hidden bg-[#0c0c0c]">
        <div className="absolute inset-0"><img src="/images/demos/restaurante-quente-hero.png" alt="" className="w-full h-full object-cover" /><div className="absolute inset-0" style={{ background: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, ${demo.primaryColor}40 100%)` }} /></div>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full demo-blur-blob demo-pulse-glow" style={{ backgroundColor: demo.primaryColor }} />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full demo-blur-blob" style={{ backgroundColor: demo.primaryColor, opacity: 0.06 }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-40 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-6" style={{ color: demo.primaryColor }}>{demo.tagline}</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-8 text-white">{demo.heroTitle}</h1>
            <p className="text-lg mb-12 max-w-2xl mx-auto" style={{color:'#ccc'}}>{demo.heroSubtitle}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-10 py-4 font-bold text-lg hover:scale-105 transition-transform" style={{backgroundColor:demo.primaryColor,color:'#fff'}}><MessageCircle size={20} />{demo.heroCta}</a>
              <a href={`tel:${demo.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 text-sm font-medium" style={{color:demo.primaryColor}}><Phone size={14} />{demo.phone}</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MENU with PRICES - Unique for restaurant */}
      <section id="servicos" className="py-20 sm:py-28 bg-[#0c0c0c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{color:demo.primaryColor}}>Cardápio</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Nossos Destaques</h2>
          </motion.div>
          <div className="space-y-0">
            {menuItems.map((item, i) => (
              <motion.div key={item.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="py-5 border-b flex items-start justify-between gap-4" style={{borderColor:'rgba(255,255,255,0.08)'}}>
                <div><h3 className="text-base font-bold text-white">{item.name}</h3><p className="text-sm mt-1" style={{color:'#777'}}>{item.desc}</p></div>
                <span className="text-base font-bold shrink-0" style={{color:demo.primaryColor}}>{item.price}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="sobre" className="py-20 sm:py-28" style={{backgroundColor:'#111'}}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{color:demo.primaryColor}}>Sobre</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">{demo.aboutTitle}</h2>
            <p className="text-base leading-relaxed max-w-2xl mx-auto mb-8" style={{color:'#888'}}>{demo.aboutText}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
              {[{v:demo.stats.years,l:'Anos'},{v:demo.stats.clients,l:'Clientes'},{v:demo.stats.team,l:'Equipe'},{v:demo.stats.rating,l:'Avaliação'}].map(s=><div key={s.l}><div className="text-2xl font-bold" style={{color:demo.primaryColor}}>{s.v}</div><div className="text-xs mt-1" style={{color:'#555'}}>{s.l}</div></div>)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialCards demo={demo} isLight={false} />

      {/* CTA */}
      <section className="py-20 sm:py-28" style={{backgroundColor:demo.primaryColor}}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Reserve Sua Mesa</h2>
          <p className="text-lg mb-10 text-white/85">Venha viver a experiência do autêntico churrasco brasileiro.</p>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-10 py-4 bg-white font-bold text-lg hover:scale-105 transition-transform" style={{color:demo.primaryColor}}><MessageCircle size={20} />{demo.heroCta}</a>
        </div>
      </section>
    </>
  );
}

// === 10. RESTAURANTE-MINIMALISTA: Japanese — Minimal zen, tasting menu ===
function TemplateRestauranteMinimalista({ demo }: { demo: DemoData }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  const tastingMenu = [
    { course: 'Entrada', name: 'Sashimi de Atum Bluefin', desc: 'Peça nobre com wasabi fresco e gari artesanal' },
    { course: 'Intermediário', name: 'Niguiri Salmão Selado', desc: 'Maçarico de precisão, toque de molho ponzu' },
    { course: 'Principal', name: 'Ramen Tonkotsu 12h', desc: 'Caldo cozido por 12 horas, chashu e ovo marinado' },
    { course: 'Sobremesa', name: 'Mochi de Chá Verde', desc: 'Tradicional doce japonês com chá matcha premium' },
  ];
  return (
    <>
      {/* HERO - Light minimal with zen line */}
      <section className="relative overflow-hidden" style={{backgroundColor:demo.secondaryColor}}>
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full demo-blur-blob demo-pulse-glow" style={{ backgroundColor: demo.primaryColor, opacity: 0.08 }} />
        <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full demo-blur-blob" style={{ backgroundColor: demo.primaryColor, opacity: 0.05 }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-40">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="w-12 h-px mb-8" style={{backgroundColor:demo.primaryColor}} />
            <p className="text-xs font-light tracking-[0.25em] uppercase mb-6" style={{color:demo.primaryColor}}>{demo.tagline}</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.3] mb-6" style={{color:'#2d3748',letterSpacing:'0.05em'}}>{demo.heroTitle}</h1>
            <p className="text-base leading-loose mb-12 max-w-lg" style={{color:'#718096'}}>{demo.heroSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 font-light text-sm tracking-wider hover:opacity-80 transition-opacity rounded-sm" style={{backgroundColor:demo.primaryColor,color:'#fff'}}>{demo.heroCta}</a>
              <a href={`tel:${demo.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 text-sm font-light" style={{color:'#718096'}}><Phone size={14} />{demo.phone}</a>
            </div>
          </motion.div>
        </div>
        <div className="max-w-5xl mx-auto px-4"><div className="max-w-24 mx-auto h-px" style={{backgroundColor:`${demo.primaryColor}40`}} /></div>
      </section>

      {/* IMAGE BANNER */}
      <section className="py-16" style={{backgroundColor:demo.secondaryColor}}>
        <div className="max-w-6xl mx-auto px-4"><div className="relative rounded-2xl overflow-hidden aspect-[21/9]"><img src="/images/demos/restaurante-minimalista-hero.png" alt="Culinária" className="w-full h-full object-cover" /></div></div>
      </section>

      {/* TASTING MENU - Unique for Japanese restaurant */}
      <section id="servicos" className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <p className="text-xs font-light tracking-[0.3em] uppercase mb-4" style={{color:demo.primaryColor}}>Menu</p>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.1em]" style={{color:'#2d3748'}}>Menu Degustação</h2>
          </motion.div>
          <div className="space-y-12">
            {tastingMenu.map((item, i) => (
              <motion.div key={item.course} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center">
                <div className="text-xs font-light tracking-[0.2em] uppercase mb-3" style={{color:`${demo.primaryColor}80`}}>{item.course}</div>
                <h3 className="text-lg font-light tracking-[0.05em] mb-3" style={{color:'#2d3748'}}>{item.name}</h3>
                <div className="w-8 h-px mx-auto mb-4" style={{backgroundColor:demo.primaryColor}} />
                <p className="text-sm leading-loose max-w-md mx-auto" style={{color:'#718096'}}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <SectionAboutCentered demo={demo} isLight={true} />

      {/* TESTIMONIALS */}
      <TestimonialCarousel demo={demo} isLight={true} />

      {/* CTA */}
      <section className="py-20 sm:py-28" style={{backgroundColor:demo.primaryColor}}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-light mb-6 text-white" style={{letterSpacing:'0.05em'}}>Reserve Sua Experiência</h2>
          <p className="text-lg mb-10 text-white/85">Uma jornada gastronômica pelos sabores do Japão.</p>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white font-medium text-sm tracking-[0.1em] uppercase hover:scale-105 transition-transform" style={{color:demo.primaryColor}}><MessageCircle size={16} />{demo.heroCta}</a>
        </div>
      </section>
    </>
  );
}

// === 11-16: Remaining templates use shared components with different compositions ===

function TemplatePetLovers({ demo }: { demo: DemoData }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  const petPhotos = ['/images/demos/pet-lovers-hero.png','/images/demos/pet-lovers-about.png','/images/demos/pet-lovers-hero.png','/images/demos/pet-lovers-about.png'];
  return (
    <>
      <section className="relative overflow-hidden" style={{background:`linear-gradient(135deg, ${demo.primaryColor} 0%, ${demo.primaryColor}cc 60%, ${demo.secondaryColor} 100%)`}}>
        <div className="absolute top-10 right-0 w-96 h-96 rounded-full demo-blur-blob demo-pulse-glow" style={{ backgroundColor: '#ffffff' }} />
        <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full demo-blur-blob" style={{ backgroundColor: demo.primaryColor, opacity: 0.1 }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-sm font-medium tracking-widest uppercase mb-4 text-white/80">{demo.tagline}</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-white">{demo.heroTitle}</h1>
              <p className="text-lg mb-8 leading-relaxed text-white/85">{demo.heroSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white font-bold rounded-full hover:scale-105 transition-transform" style={{color:demo.primaryColor}}><MessageCircle size={18} />{demo.heroCta}</a>
                <a href={`tel:${demo.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 px-8 py-4 font-medium rounded-full border-2 border-white/40 text-white">{demo.phone}</a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square"><img src="/images/demos/pet-lovers-hero.png" alt="Pet" className="w-full h-full object-cover" /><div className="absolute inset-0" style={{background:`linear-gradient(135deg, ${demo.primaryColor}20 0%, transparent 50%)`}} /></div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* PET GALLERY */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{color:demo.primaryColor}}>Galeria</p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{color:'#2d3748'}}>Nossos Amiguinhos</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {petPhotos.map((src,i) => (
              <motion.div key={src} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative aspect-square overflow-hidden rounded-3xl">
                <img src={src} alt={`Pet ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <SectionServicesGrid demo={demo} isLight={true} rounded="24px" />
      <SectionAboutLeftRight demo={demo} isLight={true} imgSrc="/images/demos/pet-lovers-about.png" />
      <TestimonialCards demo={demo} isLight={true} />
      <SectionCTA demo={demo} />
    </>
  );
}

function TemplatePetVet({ demo }: { demo: DemoData }) {
  return (
    <>
      <HeroCenteredWithImage demo={demo} imgSrc="/images/demos/pet-vet-hero.png" />
      <section id="servicos" className="py-20 sm:py-28" style={{backgroundColor:demo.secondaryColor}}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <div className="flex items-center gap-3 mb-4"><Microscope size={18} color={demo.primaryColor} /><p className="text-sm font-semibold tracking-widest uppercase" style={{color:demo.primaryColor}}>Check-up de Serviços</p></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{color:'#2d3748'}}>Nossos Serviços</h2>
          </motion.div>
          <div className="space-y-3">
            {demo.services.map((s,i) => (
              <motion.div key={s.title} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-5 p-5 border-l-4 rounded-r-lg bg-white" style={{borderColor:demo.primaryColor}}>
                <div className="w-10 h-10 flex items-center justify-center shrink-0 rounded-lg" style={{backgroundColor:`${demo.primaryColor}10`}}><Icon name={s.icon} size={20} color={demo.primaryColor} /></div>
                <div className="min-w-0 flex-1"><h3 className="text-base font-bold mb-0.5" style={{color:'#2d3748'}}>{s.title}</h3><p className="text-sm" style={{color:'#718096'}}>{s.description}</p></div>
                <Check size={18} color={demo.primaryColor} className="shrink-0 hidden sm:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <SectionAboutCentered demo={demo} isLight={true} />
      <TestimonialCards demo={demo} isLight={true} />
      <SectionCTA demo={demo} />
    </>
  );
}

function TemplateImobHousi({ demo }: { demo: DemoData }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  const properties = [
    { img: '/images/demos/imob-housi-hero.png', title: 'Apt. Vila Nova Conceição', area: '120m²', rooms: '3 quartos', price: 'R$ 1.200.000' },
    { img: '/images/demos/imob-housi-about.png', title: 'Studio Itaim Bibi', area: '45m²', rooms: '1 quarto', price: 'R$ 450.000' },
    { img: '/images/demos/imob-housi-hero.png', title: 'Cobertura Moema', area: '200m²', rooms: '4 suítes', price: 'R$ 2.800.000' },
  ];
  return (
    <>
      <section className="relative overflow-hidden bg-[#0a0a0a]">
        <div className="h-1.5 w-full" style={{backgroundColor:demo.secondaryColor}} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full demo-blur-blob demo-pulse-glow" style={{ backgroundColor: demo.secondaryColor }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full demo-blur-blob" style={{ backgroundColor: demo.secondaryColor, opacity: 0.05 }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-xs font-black tracking-[0.2em] uppercase mb-6" style={{color:demo.secondaryColor}}>{demo.tagline}</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] mb-6 text-white">{demo.heroTitle}</h1>
              <p className="text-base sm:text-lg mb-10 leading-relaxed" style={{color:'#888'}}>{demo.heroSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 font-bold text-sm tracking-wider hover:scale-105 transition-transform" style={{backgroundColor:demo.secondaryColor,color:'#fff'}}><MessageCircle size={18} />{demo.heroCta}</a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="hidden lg:block">
              <div className="relative rounded overflow-hidden aspect-[4/3]"><img src="/images/demos/imob-housi-hero.png" alt="Imóveis" className="w-full h-full object-cover" /></div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* PROPERTY LISTINGS */}
      <section id="servicos" className="py-20 sm:py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <p className="text-xs font-black tracking-[0.2em] uppercase mb-4" style={{color:demo.secondaryColor}}>Destaques</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white">Imóveis</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {properties.map((p,i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="overflow-hidden" style={{backgroundColor:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                <div className="relative aspect-[3/2] overflow-hidden"><img src={p.img} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
                <div className="p-5">
                  <h3 className="text-base font-bold mb-2 text-white">{p.title}</h3>
                  <div className="flex gap-3 text-xs mb-3" style={{color:'#888'}}><span>{p.area}</span><span>{p.rooms}</span></div>
                  <div className="font-bold" style={{color:demo.secondaryColor}}>{p.price}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <SectionAboutDarkBand demo={demo} imgSrc="/images/demos/imob-housi-about.png" />
      <TestimonialCards demo={demo} isLight={false} />
      <SectionCTA demo={demo} />
    </>
  );
}

function TemplateImobLar({ demo }: { demo: DemoData }) {
  return (
    <>
      <HeroCenteredWithImage demo={demo} imgSrc="/images/demos/imob-lar-hero.png" />
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{color:demo.primaryColor}}>Por Que Nos Escolher</p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{color:'#2d3748',fontFamily:'Georgia, serif'}}>Diferenciais</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {demo.services.map((s,i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center shrink-0 rounded-xl" style={{backgroundColor:`${demo.primaryColor}12`}}><Home size={18} color={demo.primaryColor} /></div>
                <div><h3 className="text-base font-semibold mb-1" style={{color:'#2d3748'}}>{s.title}</h3><p className="text-sm leading-relaxed" style={{color:'#718096'}}>{s.description}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <SectionAboutLeftRight demo={demo} isLight={true} imgSrc="/images/demos/imob-lar-about.png" />
      <TestimonialCards demo={demo} isLight={true} />
      <SectionCTA demo={demo} />
    </>
  );
}

function TemplateFitnessIron({ demo }: { demo: DemoData }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  const programs = [
    { title: 'Iniciante', desc: 'Programa de adaptação para quem está começando. 3x por semana.', level: 'Básico', price: 'R$ 89/mês' },
    { title: 'Intermediário', desc: 'Treino personalizado com acompanhamento mensal. 5x por semana.', level: 'Intermediário', price: 'R$ 149/mês' },
    { title: 'Avançado', desc: 'Personal exclusivo + nutricionista. Treino e dieta integrados.', level: 'Avançado', price: 'R$ 249/mês' },
    { title: 'Atleta', desc: 'Programa completo para competição. Acompanhamento diário.', level: 'Elite', price: 'R$ 399/mês' },
  ];
  return (
    <>
      <section className="relative overflow-hidden bg-[#0a0a0a]">
        <div className="h-1.5 w-full" style={{backgroundColor:demo.primaryColor}} />
        <div className="absolute inset-0 pointer-events-none" style={{background:`repeating-linear-gradient(-45deg, transparent, transparent 30px, ${demo.primaryColor}04 30px, ${demo.primaryColor}04 31px)`}} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full demo-blur-blob demo-pulse-glow" style={{ backgroundColor: demo.primaryColor }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full demo-blur-blob" style={{ backgroundColor: demo.primaryColor, opacity: 0.05 }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs font-black tracking-[0.3em] uppercase mb-6" style={{color:demo.primaryColor}}>{demo.tagline}</p>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.9] mb-8 uppercase text-white">{demo.heroTitle}</h1>
            <p className="text-base sm:text-lg mb-10 max-w-lg leading-relaxed" style={{color:'#888'}}>{demo.heroSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-10 py-5 font-black text-base tracking-wider uppercase hover:scale-105 transition-transform" style={{backgroundColor:demo.primaryColor,color:'#fff'}}><MessageCircle size={20} />{demo.heroCta}</a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[{v:demo.stats.years,l:'Anos'},{v:demo.stats.clients,l:'Alunos'},{v:demo.stats.team,l:'Professores'},{v:demo.stats.rating,l:'Avaliação'}].map(s=><div key={s.l}><div className="text-3xl sm:text-4xl font-black" style={{color:demo.primaryColor}}>{s.v}</div><div className="text-[10px] font-bold tracking-[0.2em] uppercase mt-1" style={{color:'#555'}}>{s.l}</div></div>)}
          </motion.div>
        </div>
      </section>
      {/* PROGRAMS with intensity badges */}
      <section id="servicos" className="py-20 sm:py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <p className="text-xs font-black tracking-[0.3em] uppercase mb-4" style={{color:demo.primaryColor}}>Programas</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white">Escolha Seu Nível</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {programs.map((p,i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 border-l-4" style={{borderColor:demo.primaryColor,backgroundColor:'rgba(255,255,255,0.02)'}}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-black uppercase tracking-wide text-white">{p.title}</h3>
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1" style={{backgroundColor:`${demo.primaryColor}20`,color:demo.primaryColor}}>{p.level}</span>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{color:'#777'}}>{p.desc}</p>
                <div className="font-black" style={{color:demo.primaryColor}}>{p.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* MOTIVATIONAL + ABOUT */}
      <section className="py-20 sm:py-28" style={{backgroundColor:'#111'}}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-black tracking-[0.3em] uppercase mb-4" style={{color:demo.primaryColor}}>Sobre</p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mb-8">{demo.aboutTitle}</h2>
            <p className="text-base leading-relaxed max-w-2xl mx-auto mb-8" style={{color:'#888'}}>{demo.aboutText}</p>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 font-black text-sm uppercase tracking-wider hover:scale-105 transition-transform" style={{backgroundColor:demo.primaryColor,color:'#fff'}}><MessageCircle size={18} />Começar Agora</a>
          </motion.div>
        </div>
      </section>
      <TestimonialCards demo={demo} isLight={false} />
      <section className="py-20 sm:py-28" style={{backgroundColor:demo.primaryColor}}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mb-6">Sem Desculpa. Só Resultado.</h2>
          <p className="text-lg mb-10 text-white/85">Comece sua transformação hoje. Primeira aula experimental grátis.</p>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-10 py-5 bg-white font-black text-lg uppercase hover:scale-105 transition-transform" style={{color:demo.primaryColor}}><MessageCircle size={20} />{demo.heroCta}</a>
        </div>
      </section>
    </>
  );
}

function TemplateFitnessZen({ demo }: { demo: DemoData }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  const schedule = [
    { time: '07:00', class: 'Yoga Vinyasa', level: 'Todos os níveis' },
    { time: '09:00', class: 'Pilates Clássico', level: 'Iniciante' },
    { time: '11:00', class: 'Meditação Guiada', level: 'Todos os níveis' },
    { time: '15:00', class: 'Yoga Restaurativo', level: 'Todos os níveis' },
    { time: '17:00', class: 'Pilates Intermediário', level: 'Intermediário' },
    { time: '19:00', class: 'Yoga Vinyasa Flow', level: 'Avançado' },
  ];
  return (
    <>
      <section className="relative overflow-hidden" style={{backgroundColor:demo.secondaryColor}}>
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full demo-blur-blob demo-pulse-glow" style={{ backgroundColor: demo.primaryColor, opacity: 0.1 }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full demo-blur-blob" style={{ backgroundColor: demo.primaryColor, opacity: 0.06 }} />
        <div className="absolute top-8 right-12 text-9xl font-extralight opacity-[0.04] select-none pointer-events-none" style={{writingMode:'vertical-rl',color:demo.primaryColor}}>{demo.companyName.charAt(0)}</div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-40">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="w-12 h-px mb-8" style={{backgroundColor:demo.primaryColor}} />
            <p className="text-xs font-light tracking-[0.25em] uppercase mb-6" style={{color:demo.primaryColor}}>{demo.tagline}</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.3] mb-6" style={{color:'#2d3748',letterSpacing:'0.05em'}}>{demo.heroTitle}</h1>
            <p className="text-base leading-loose mb-12 max-w-lg" style={{color:'#718096'}}>{demo.heroSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 font-light text-sm tracking-wider rounded-full hover:opacity-80 transition-opacity text-white" style={{backgroundColor:demo.primaryColor}}>{demo.heroCta}</a>
              <a href={`tel:${demo.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 text-sm font-light" style={{color:'#718096'}}><Phone size={14} />{demo.phone}</a>
            </div>
          </motion.div>
        </div>
      </section>
      {/* IMAGE */}
      <section className="py-12" style={{backgroundColor:demo.secondaryColor}}>
        <div className="max-w-6xl mx-auto px-4"><div className="relative rounded-2xl overflow-hidden aspect-[21/9]"><img src="/images/demos/fitness-zen-hero.png" alt="Yoga" className="w-full h-full object-cover" /></div></div>
      </section>
      {/* CLASS SCHEDULE - Unique for yoga */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-xs font-light tracking-[0.25em] uppercase mb-4" style={{color:demo.primaryColor}}>Horários</p>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.08em]" style={{color:'#2d3748'}}>Aulas de Hoje</h2>
          </motion.div>
          <div className="space-y-3">
            {schedule.map((s,i) => (
              <motion.div key={s.time+s.class} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="p-5 flex items-center gap-6 rounded-2xl bg-white shadow-sm border border-gray-50">
                <div className="text-lg font-light tabular-nums" style={{color:demo.primaryColor,minWidth:'60px'}}>{s.time}</div>
                <div className="flex-1"><div className="font-medium text-sm" style={{color:'#2d3748'}}>{s.class}</div><div className="text-xs" style={{color:'#718096'}}>{s.level}</div></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <SectionServicesList demo={demo} isLight={true} />
      <SectionAboutCentered demo={demo} isLight={true} />
      <TestimonialCarousel demo={demo} isLight={true} />
      <section className="py-20 sm:py-28" style={{backgroundColor:demo.primaryColor}}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-light mb-6 text-white" style={{letterSpacing:'0.05em'}}>Encontre Seu Equilíbrio</h2>
          <p className="text-lg mb-10 text-white/85">Agende uma aula experimental gratuita.</p>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white font-medium text-sm tracking-[0.1em] uppercase rounded-full hover:scale-105 transition-transform" style={{color:demo.primaryColor}}><MessageCircle size={16} />{demo.heroCta}</a>
        </div>
      </section>
    </>
  );
}

// ─── SHARED SECTION COMPONENTS ─────────────────────────────

function SectionServicesGrid({ demo, isLight, rounded = '12px' }: { demo: DemoData; isLight: boolean; rounded?: string }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  return (
    <section id="servicos" className="py-20 sm:py-28" style={{backgroundColor:isLight?'#fff':'#0c0c0c'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{color:demo.primaryColor}}>O que oferecemos</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{color:isLight?'#2d3748':'#fff'}}>Nossos Serviços</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {demo.services.map((s,i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-7" style={{backgroundColor:isLight?'#f8fafc':'#141414',borderRadius:rounded,border:`1px solid ${isLight?'#e5e5e5':'#1a1a1a'}`}}>
              <div className="w-12 h-12 flex items-center justify-center mb-5" style={{borderRadius:rounded,backgroundColor:`${demo.primaryColor}12`}}><Icon name={s.icon} size={24} color={demo.primaryColor} /></div>
              <h3 className="text-lg font-bold mb-2" style={{color:isLight?'#2d3748':'#fff'}}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{color:isLight?'#718096':'#999'}}>{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionServicesList({ demo, isLight }: { demo: DemoData; isLight: boolean }) {
  return (
    <section id="servicos" className="py-20 sm:py-28" style={{backgroundColor:isLight?'#f8fafc':'#0c0c0c'}}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{color:demo.primaryColor}}>O que oferecemos</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{color:isLight?'#2d3748':'#fff'}}>Nossos Serviços</h2>
        </motion.div>
        <div className="space-y-4">
          {demo.services.map((s,i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-5 p-6" style={{backgroundColor:isLight?'#fff':'#141414',borderRadius:'12px',border:`1px solid ${isLight?'#e5e5e5':'#1a1a1a'}`}}>
              <div className="w-12 h-12 flex items-center justify-center shrink-0 rounded-lg" style={{backgroundColor:`${demo.primaryColor}12`}}><Icon name={s.icon} size={24} color={demo.primaryColor} /></div>
              <div className="min-w-0"><h3 className="text-lg font-bold mb-1.5" style={{color:isLight?'#2d3748':'#fff'}}>{s.title}</h3><p className="text-sm leading-relaxed" style={{color:isLight?'#718096':'#999'}}>{s.description}</p></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionAboutLeftRight({ demo, isLight, imgSrc, accentColor }: { demo: DemoData; isLight: boolean; imgSrc: string; accentColor?: string }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  const accent = accentColor || demo.primaryColor;
  return (
    <section id="sobre" className="py-20 sm:py-28" style={{backgroundColor:isLight?'#f8fafc':'#111'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{color:accent}}>Conheça nossa história</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{color:isLight?'#2d3748':'#fff'}}>{demo.aboutTitle}</h2>
            <div className="w-16 h-0.5 mb-8" style={{backgroundColor:accent}} />
            <p className="text-base sm:text-lg leading-relaxed mb-8" style={{color:isLight?'#718096':'#999'}}>{demo.aboutText}</p>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold hover:brightness-110 transition-all text-white rounded-lg" style={{backgroundColor:accent}}><MessageCircle size={18} />Fale Conosco <ArrowRight size={16} /></a>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]"><img src={imgSrc} alt="Sobre" className="w-full h-full object-cover" /><div className="absolute inset-0" style={{background:`linear-gradient(135deg, transparent 50%, ${accent}15 100%)`}} /></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SectionAboutCentered({ demo, isLight }: { demo: DemoData; isLight: boolean }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  return (
    <section id="sobre" className="py-20 sm:py-28" style={{backgroundColor:isLight?'#f8fafc':'#111'}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{color:demo.primaryColor}}>Conheça nossa história</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight" style={{color:isLight?'#2d3748':'#fff'}}>{demo.aboutTitle}</h2>
          <div className="w-16 h-0.5 mx-auto mb-8" style={{backgroundColor:demo.primaryColor}} />
          <p className="text-base sm:text-lg leading-relaxed mb-12" style={{color:isLight?'#718096':'#999'}}>{demo.aboutText}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
            {[{v:demo.stats.years,l:'Anos'},{v:demo.stats.clients,l:'Clientes'},{v:demo.stats.team,l:'Profissionais'},{v:demo.stats.rating,l:'Avaliação'}].map(s=><div key={s.l} className="p-5 text-center" style={{backgroundColor:isLight?'#fff':'#141414',borderRadius:'12px',border:`1px solid ${isLight?'#e5e5e5':'#1a1a1a'}`}}><div className="text-2xl font-bold mb-1" style={{color:demo.primaryColor}}>{s.v}</div><div className="text-xs" style={{color:isLight?'#718096':'#999'}}>{s.l}</div></div>)}
          </div>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-white rounded-lg hover:brightness-110 transition-all" style={{backgroundColor:demo.primaryColor}}><MessageCircle size={18} />Fale Conosco</a>
        </motion.div>
      </div>
    </section>
  );
}

function SectionAboutDarkBand({ demo, imgSrc }: { demo: DemoData; imgSrc: string }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  return (
    <section id="sobre" className="py-20 sm:py-28 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{color:demo.primaryColor}}>Conheça nossa história</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">{demo.aboutTitle}</h2>
            <div className="w-16 h-0.5 mb-8" style={{backgroundColor:demo.primaryColor}} />
            <p className="text-base sm:text-lg leading-relaxed mb-8" style={{color:'#999'}}>{demo.aboutText}</p>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-white rounded-lg hover:brightness-110 transition-all" style={{backgroundColor:demo.primaryColor}}><MessageCircle size={18} />Fale Conosco</a>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="relative rounded-xl overflow-hidden aspect-[4/3]"><img src={imgSrc} alt="Sobre" className="w-full h-full object-cover" /><div className="absolute inset-0" style={{background:`linear-gradient(135deg, transparent 50%, ${demo.primaryColor}15 100%)`}} /></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCards({ demo, isLight, accentColor }: { demo: DemoData; isLight: boolean; accentColor?: string }) {
  const accent = accentColor || demo.primaryColor;
  return (
    <section id="depoimentos" className="py-20 sm:py-28" style={{backgroundColor:isLight?'#fff':'#0a0a0a'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{color:accent}}>Depoimentos</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{color:isLight?'#2d3748':'#fff'}}>O Que Nossos Clientes Dizem</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demo.testimonials.map((t,i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-7 demo-card-shadow" style={{backgroundColor:isLight?'#f8fafc':'rgba(255,255,255,0.03)',borderRadius:'16px',border:`1px solid ${isLight?'#e5e5e5':'rgba(255,255,255,0.06)'}`}}>
              <div className="flex gap-1 mb-4">{Array.from({length:t.rating}).map((_,j)=><Star key={j} size={16} fill={accent} style={{color:accent}} />)}</div>
              <p className="text-sm leading-relaxed mb-6 italic" style={{color:isLight?'#718096':'#ccc'}}>&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3"><div className="w-10 h-10 flex items-center justify-center font-bold text-sm rounded-full" style={{backgroundColor:`${accent}12`,color:accent}}>{t.name.charAt(0)}</div><div><div className="font-semibold text-sm" style={{color:isLight?'#2d3748':'#fff'}}>{t.name}</div><div className="text-xs" style={{color:isLight?'#718096':'#777'}}>{t.role}</div></div></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCarousel({ demo, isLight }: { demo: DemoData; isLight: boolean }) {
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent(p => (p + 1) % demo.testimonials.length), [demo.testimonials.length]);
  const prev = useCallback(() => setCurrent(p => (p - 1 + demo.testimonials.length) % demo.testimonials.length), [demo.testimonials.length]);
  useEffect(() => { const t = setInterval(next, 5000); return () => clearInterval(t); }, [next]);
  const t = demo.testimonials[current];
  return (
    <section id="depoimentos" className="py-20 sm:py-28" style={{backgroundColor:isLight?'#fff':'#0a0a0a'}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{color:demo.primaryColor}}>Depoimentos</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{color:isLight?'#2d3748':'#fff'}}>O Que Nossos Clientes Dizem</h2>
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="p-8 sm:p-12 text-center" style={{backgroundColor:isLight?'#f8fafc':'rgba(255,255,255,0.03)',borderRadius:'16px',border:`1px solid ${isLight?'#e5e5e5':'rgba(255,255,255,0.06)'}`}}>
            <div className="flex justify-center gap-1 mb-6">{Array.from({length:t.rating}).map((_,j)=><Star key={j} size={18} fill={demo.primaryColor} style={{color:demo.primaryColor}} />)}</div>
            <p className="text-lg sm:text-xl leading-relaxed mb-8 italic max-w-2xl mx-auto" style={{color:isLight?'#2d3748':'#fff'}}>&ldquo;{t.text}&rdquo;</p>
            <div className="flex items-center justify-center gap-3"><div className="w-11 h-11 flex items-center justify-center font-bold text-sm rounded-full" style={{backgroundColor:`${demo.primaryColor}12`,color:demo.primaryColor}}>{t.name.charAt(0)}</div><div className="text-left"><div className="font-semibold text-sm" style={{color:isLight?'#2d3748':'#fff'}}>{t.name}</div><div className="text-xs" style={{color:isLight?'#718096':'#777'}}>{t.role}</div></div></div>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prev} className="w-10 h-10 flex items-center justify-center rounded-full transition-colors" style={{backgroundColor:`${demo.primaryColor}12`,color:demo.primaryColor}} aria-label="Anterior"><ChevronLeft size={20} /></button>
          <div className="flex gap-2">{demo.testimonials.map((_,i)=><button key={i} onClick={()=>setCurrent(i)} className="w-2 h-2 rounded-full transition-all" style={{backgroundColor:i===current?demo.primaryColor:`${demo.primaryColor}30`}} aria-label={`Depoimento ${i+1}`} />)}</div>
          <button onClick={next} className="w-10 h-10 flex items-center justify-center rounded-full transition-colors" style={{backgroundColor:`${demo.primaryColor}12`,color:demo.primaryColor}} aria-label="Próximo"><ChevronRight size={20} /></button>
        </div>
      </div>
    </section>
  );
}

function HeroCenteredWithImage({ demo, imgSrc }: { demo: DemoData; imgSrc: string }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  const isLight = !['#1A1A1A','#374151','#1A1A2E','#0c0c0c'].includes(demo.secondaryColor);
  return (
    <section className="relative overflow-hidden" style={{backgroundColor:isLight?demo.secondaryColor:'#0c0c0c'}}>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full demo-blur-blob demo-pulse-glow" style={{ backgroundColor: demo.primaryColor }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full demo-blur-blob" style={{ backgroundColor: demo.primaryColor, opacity: 0.06 }} />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{color:demo.primaryColor}}>{demo.tagline}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6" style={{color:isLight?'#2d3748':'#fff'}}>{demo.heroTitle}</h1>
          <p className="text-lg sm:text-xl mb-10 leading-relaxed max-w-2xl mx-auto" style={{color:isLight?'#718096':'#999'}}>{demo.heroSubtitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 font-bold text-white rounded-lg hover:brightness-110 transition-all" style={{backgroundColor:demo.primaryColor}}><MessageCircle size={20} />{demo.heroCta}</a>
            <a href={`tel:${demo.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 px-8 py-4 font-medium rounded-lg border" style={{borderColor:`${demo.primaryColor}40`,color:isLight?'#2d3748':'#fff'}}><Phone size={20} />{demo.phone}</a>
          </div>
        </motion.div>
      </div>
      <div className="max-w-6xl mx-auto px-4 pb-16"><div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video"><img src={imgSrc} alt={demo.companyName} className="w-full h-full object-cover" /><div className="absolute inset-0" style={{background:`linear-gradient(135deg, ${demo.primaryColor}15 0%, transparent 50%)`}} /></div></div>
    </section>
  );
}

function SectionCTA({ demo }: { demo: DemoData }) {
  const wa = `https://wa.me/${demo.whatsapp}`;
  return (
    <section className="py-20 sm:py-28" style={{backgroundColor:demo.primaryColor}}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">Pronto Para Começar?</h2>
        <p className="text-lg mb-10 text-white/85">Entre em contato agora. Estamos prontos para ajudar você!</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white font-bold text-lg rounded-lg hover:scale-105 transition-transform" style={{color:demo.primaryColor}}><MessageCircle size={20} />{demo.heroCta}</a>
          <a href={`tel:${demo.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium rounded-lg border-2 border-white/40 text-white"><Phone size={20} />{demo.phone}</a>
        </div>
      </div>
    </section>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────

export default function DemoPageClient({ demo }: { demo: DemoData }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 50); setShowBackToTop(window.scrollY > 500); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lightBgs = ['#FFFFFF','#F0F4F8','#F5F0EB','#F5E6CC','#F8FAF5','#FFF5F0','#F0F8F0','#FFFBEB','#F0F5F2'];
  const isLight = lightBgs.includes(demo.secondaryColor);

  const templateMap: Record<string, React.ComponentType<{ demo: DemoData }>> = {
    'saude-clean': TemplateSaudeClean,
    'saude-premium': TemplateSaudePremium,
    'beleza-moderno': TemplateBelezaModerno,
    'beleza-feminino': TemplateBelezaFeminino,
    'auto-bold': TemplateAutoBold,
    'auto-tecnico': TemplateAutoTecnico,
    'juridico-sobrio': TemplateJuridicoSobrio,
    'juridico-moderno': TemplateJuridicoModerno,
    'restaurante-quente': TemplateRestauranteQuente,
    'restaurante-minimalista': TemplateRestauranteMinimalista,
    'pet-lovers': TemplatePetLovers,
    'pet-vet': TemplatePetVet,
    'imob-housi': TemplateImobHousi,
    'imob-lar': TemplateImobLar,
    'fitness-iron': TemplateFitnessIron,
    'fitness-zen': TemplateFitnessZen,
  };

  const TemplateComponent = templateMap[demo.slug] || TemplateSaudeClean;

  return (
    <div style={{ backgroundColor: isLight ? '#ffffff' : '#0c0c0c', color: isLight ? '#1a1a1a' : '#ffffff' }} className="min-h-screen">
      <DemoBanner slug={demo.slug} primaryColor={demo.primaryColor} />
      <SiteHeader demo={demo} scrolled={scrolled} isLight={isLight} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main><TemplateComponent demo={demo} /></main>
      <SiteFooter demo={demo} isLight={isLight} />
      <WhatsAppButton phone={demo.whatsapp} />
      <BackToTop show={showBackToTop} />
    </div>
  );
}
