import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div><Link href="/" className="text-xl font-bold text-white">AION<span className="text-[#00ff88]">.</span></Link><p className="text-sm text-gray-500 mt-1">Sites profissionais em até 24 horas</p></div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/templates" className="hover:text-white transition-colors">Templates</Link>
            <Link href="/como-funciona" className="hover:text-white transition-colors">Como Funciona</Link>
            <Link href="/pedir" className="hover:text-white transition-colors">Pedir Site</Link>
          </div>
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} AION. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
