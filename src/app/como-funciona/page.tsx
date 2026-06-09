import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export const metadata = { title: 'Como Funciona — AION SITE BUILDER' };

const steps = [
  { num: '01', title: 'Escolha o template que combina com seu negócio', desc: 'São 16 modelos profissionais prontos. Cada um pensado pra um nicho: saúde, beleza, auto, restaurante, pet e mais. Escolha o que mais combina com sua marca.' },
  { num: '02', title: 'Selecione o plano ideal pra você', desc: 'Essencial (R$1.497), Profissional (R$2.497) ou 100% Personalizado (R$4.497). Todos com entrega rápida, design responsivo e WhatsApp integrado.' },
  { num: '03', title: 'Mande suas informações pelo WhatsApp', desc: 'Nome, endereço, telefone, serviços, fotos — tudo pelo WhatsApp. Sem formulário complicado, sem reunião chata. Responda no seu tempo.' },
  { num: '04', title: 'Receba seu site pronto em até 24 horas', desc: 'A gente monta, personaliza e publica. Você aprova e seu site já tá no ar convertendo visitantes em clientes. Sim, é assim de simples.' },
];

export default function ComoFuncionaPage() {
  return (
    <main className="min-h-screen bg-[#0c0c0c]">
      <Navbar />
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-[#00ff88] mb-3">Como Funciona</p>
            <h1 className="heading-section text-white">4 passos.<br />24 horas.<br />Seu site no ar.</h1>
          </div>
          <div className="space-y-0">
            {steps.map((s, i) => (
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
