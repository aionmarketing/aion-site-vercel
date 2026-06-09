import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Hero from '@/components/home/Hero';
import Diferenciais from '@/components/home/Diferenciais';
import Depoimentos from '@/components/home/Depoimentos';
import Planos from '@/components/home/Planos';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0c0c0c]">
      <Navbar />
      <Hero />
      <Diferenciais />
      <Planos />
      <Depoimentos />
      <Footer />
    </main>
  );
}
