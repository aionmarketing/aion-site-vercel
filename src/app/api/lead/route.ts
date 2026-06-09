import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const value = (key: string, fallback: string) => params.get(key)?.trim() || fallback;

  const message = [
    'Olá, AION. Quero uma recomendação de site para minha empresa.',
    '',
    `Nome: ${value('name', 'não informado')}`,
    `Empresa/segmento: ${value('business', 'não informado')}`,
    `WhatsApp: ${value('phone', 'não informado')}`,
    `Cidade: ${value('city', 'não informada')}`,
    '',
    `Objetivo: ${value('objective', 'Gerar mais chamadas no WhatsApp')}`,
    `Direção visual que gostei: ${value('visualDirection', 'Quero recomendação da AION')}`,
    '',
    'Pode me chamar com uma recomendação objetiva e uma estimativa?'
  ].join('\n');

  const url = new URL('https://wa.me/5511910376040');
  url.searchParams.set('text', message);

  return NextResponse.redirect(url);
}
