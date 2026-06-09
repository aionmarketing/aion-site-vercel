import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export const metadata = { title: 'Como Funciona — AION SITE BUILDER' };

const steps = [
  { num: '01', title: 'Escolha uma direção visual', desc: 'Você mostra o estilo que combina com sua empresa. AION usa isso como ponto de partida, não como limite.' },
  { num: '02', title: 'A gente entende sua oferta', desc: 'Serviços, diferenciais, público, região, objeções e tipo de contato que você quer receber pelo WhatsApp.' },
  { num: '03', title: 'Criamos a versão profissional', desc: 'Visual, copy, estrutura, CTA, SEO local e responsivo. Tudo com foco em transmitir confiança e gerar contato.' },
  { num: '04', title: 'Você aprova e o site vai ao ar', desc: 'Depois dos ajustes finais, publicamos e deixamos pronto para você divulgar no Instagram, Google, WhatsApp e cartão digital.' },
];

export default function ComoFuncionaPage() {
  return (
    <main className="min-h-screen bg-[#0c0c0c]">
      <Navbar />
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-[#00ff88] mb-3">Como Funciona</p>
            <h1 className="heading-section text-white">4 passos.<br />Sem enrolação.<br />Seu site no ar.</h1>
          </div>
          <div className="space-y-0">
            {steps.map((s) => (
              <div key={s.num} className="flex items-start gap-8 py-10 border-b border-white/5 first:pt-0 last:border-0">
                <div className="text-5xl sm:text-6xl font-bold text-white/10 tabular-nums shrink-0">{s.num}</div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-base text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
