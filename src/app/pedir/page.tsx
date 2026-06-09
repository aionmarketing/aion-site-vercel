'use client';

import { useState } from 'react';
import { MessageCircle, ArrowRight, Check } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

const planOptions = [
  { id: 'essencial', name: 'Essencial', price: 'R$1.497', desc: 'Site one-page que ja resolve. Entrega em 24h.' },
  { id: 'profissional', name: 'Profissional', price: 'R$2.497', desc: 'O mais vendido. Ate 5 paginas, SEO e formulario.' },
  { id: 'personalizado', name: '100% Personalizado', price: 'R$4.497', desc: 'Design exclusivo do zero. Paginas ilimitadas.' },
];

const templateOptions = [
  'Odonto Vita', 'Bem Viver', 'Studio Noir', 'Rosa & Cia',
  'Garage 55', 'TechAuto', 'Melo Advogados', 'Contabil Nexus',
  'Brasa Viva', 'Mirin', 'Pet Lovers', 'Vet Center',
  'Housi', 'Lar Doce Lar', 'Iron Fit', 'Zen Studio',
];

const addonOptions = [
  { name: 'Logo Profissional', price: '+R$497' },
  { name: 'Identidade Visual Completa', price: '+R$797' },
  { name: 'Copywriting Profissional', price: '+R$497' },
  { name: 'SEO Avancado', price: '+R$397' },
  { name: 'Google Meu Negocio', price: '+R$297' },
];

export default function PedirPage() {
  const [step, setStep] = useState(0);
  const [plano, setPlano] = useState('');
  const [template, setTemplate] = useState('');
  const [addons, setAddons] = useState<string[]>([]);

  const toggleAddon = (name: string) => {
    setAddons(prev => prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]);
  };

  const buildWhatsAppUrl = () => {
    const selectedPlan = planOptions.find(p => p.id === plano);
    const msg = 'Ola! Quero meu site profissional!\n\nPlano: ' + (selectedPlan?.name || '-') + '\nTemplate: ' + (template || '-') + '\nAdicionais: ' + (addons.length > 0 ? addons.join(', ') : 'Nenhum') + '\n\nPode me passar mais detalhes?';
    return 'https://wa.me/5511910376040?text=' + encodeURIComponent(msg);
  };

  const canProceed = () => {
    if (step === 0) return !!plano;
    if (step === 1) return !!template;
    return true;
  };

  const stepLabels = ['Plano', 'Template', 'Adicionais'];

  return (
    <main className="min-h-screen bg-[#0c0c0c]">
      <Navbar />
      <section className="py-20 sm:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-[#00ff88] mb-3">Pedir Meu Site</p>
            <h1 className="heading-section text-white">Monte seu site em 3 passos</h1>
            <p className="text-gray-500 mt-4">Escolha, personalize e receba em ate 24 horas.</p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-12">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={'w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold transition-colors ' + (i <= step ? 'bg-[#00ff88] text-[#0c0c0c]' : 'bg-white/5 text-gray-500')}>{i + 1}</div>
                <span className={'text-xs font-medium ' + (i <= step ? 'text-white' : 'text-gray-500') + ' hidden sm:block'}>{label}</span>
                {i < 2 && <div className={'w-8 h-px transition-colors ' + (i < step ? 'bg-[#00ff88]' : 'bg-white/10')} />}
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="space-y-4">
              {planOptions.map(p => (
                <button key={p.id} onClick={() => setPlano(p.id)} className={'w-full text-left p-6 rounded-lg border transition-all ' + (plano === p.id ? 'border-[#00ff88]/40 bg-[#00ff88]/[0.03]' : 'border-white/5 hover:border-white/10')}>
                  <div className="flex items-center justify-between">
                    <div><h3 className="font-bold text-white">{p.name}</h3><p className="text-sm text-gray-500 mt-1">{p.desc}</p></div>
                    <div className="text-right"><span className="text-lg font-bold text-white">{p.price}</span>{plano === p.id && <Check size={18} className="text-[#00ff88] mt-1 ml-auto" />}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-2 gap-3">
              {templateOptions.map(t => (
                <button key={t} onClick={() => setTemplate(t)} className={'text-left p-4 rounded-lg border transition-all ' + (template === t ? 'border-[#00ff88]/40 bg-[#00ff88]/[0.03]' : 'border-white/5 hover:border-white/10')}>
                  <span className="text-sm font-medium text-white">{t}</span>
                  {template === t && <Check size={14} className="text-[#00ff88] mt-1" />}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <p className="text-sm text-gray-400 mb-2">Opcionais - escolha os que fazem sentido pro seu negocio:</p>
              {addonOptions.map(a => (
                <button key={a.name} onClick={() => toggleAddon(a.name)} className={'w-full text-left p-5 rounded-lg border transition-all ' + (addons.includes(a.name) ? 'border-[#00ff88]/40 bg-[#00ff88]/[0.03]' : 'border-white/5 hover:border-white/10')}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={'w-5 h-5 rounded border-2 flex items-center justify-center ' + (addons.includes(a.name) ? 'border-[#00ff88] bg-[#00ff88]' : 'border-white/20')}>
                        {addons.includes(a.name) && <Check size={12} className="text-[#0c0c0c]" />}
                      </div>
                      <span className="text-sm font-medium text-white">{a.name}</span>
                    </div>
                    <span className="text-sm font-bold text-[#00ff88]">{a.price}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-10">
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)} className="text-sm text-gray-400 hover:text-white transition-colors">Voltar</button>
            ) : (
              <div />
            )}
            {step < 2 ? (
              <button onClick={() => canProceed() && setStep(step + 1)} disabled={!canProceed()} className={'inline-flex items-center gap-2 px-6 py-3 font-bold rounded-lg transition-all ' + (canProceed() ? 'bg-[#00ff88] text-[#0c0c0c] hover:brightness-110' : 'bg-white/5 text-gray-500 cursor-not-allowed')}>Proximo <ArrowRight size={16} /></button>
            ) : (
              <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#00ff88] text-[#0c0c0c] font-bold rounded-lg hover:brightness-110 transition-all"><MessageCircle size={18} />Enviar pelo WhatsApp</a>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
