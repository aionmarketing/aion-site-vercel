import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AION — Sites profissionais para empresas locais",
  description:
    "Sites profissionais para empresas locais que precisam gerar contatos pelo WhatsApp, transmitir confiança e aparecer melhor no Google.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} grain bg-[#0c0c0c] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
