import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AION SITE BUILDER — Sites Profissionais em até 24 Horas",
  description:
    "Sites profissionais para pequenas empresas. Entrega em até 24 horas. A partir de R$1.497. WhatsApp: +5511910376040",
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
