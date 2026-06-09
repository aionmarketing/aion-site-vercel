export interface Template {
  slug: string;
  name: string;
  nicho: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  companyName: string;
  tags: string[];
}

export const templates: Template[] = [
  { slug: "saude-clean", name: "Odonto Vita", nicho: "Saúde", description: "Clínica odontológica que transmite confiança. Copy focada em quem tem medo de dentista e quer resultado real.", primaryColor: "#4A90D9", secondaryColor: "#FFFFFF", companyName: "Clínica Odonto Vita", tags: ["odontologia", "clínica", "saúde"] },
  { slug: "saude-premium", name: "Bem Viver", nicho: "Saúde", description: "Psicologia com copy que fala direto com quem sofre de ansiedade. Nada de linguagem clínica — é humano.", primaryColor: "#5B8DB8", secondaryColor: "#F0F4F8", companyName: "Instituto Bem Viver", tags: ["psicologia", "saúde mental", "bem-estar"] },
  { slug: "beleza-moderno", name: "Studio Noir", nicho: "Beleza", description: "Salão unissex com visual editorial. Preto e dourado. Copy ousada que atrai quem leva estilo a sério.", primaryColor: "#1A1A1A", secondaryColor: "#D4AF37", companyName: "Studio Noir", tags: ["salão", "cabelo", "beleza"] },
  { slug: "beleza-feminino", name: "Rosa & Cia", nicho: "Beleza", description: "Estética feminina com resultados naturais. Tons rosé. Copy que empodera sem ser clichê.", primaryColor: "#C4727F", secondaryColor: "#F5E6CC", companyName: "Rosa & Cia", tags: ["estética", "skincare", "beleza"] },
  { slug: "auto-bold", name: "Garage 55", nicho: "Auto", description: "Oficina mecânica com copy que respira honestidade. Laranja e preto. Pra quem cansou de levar susto.", primaryColor: "#FF6B00", secondaryColor: "#1A1A1A", companyName: "Garage 55", tags: ["mecânica", "oficina", "auto"] },
  { slug: "auto-tecnico", name: "TechAuto", nicho: "Auto", description: "Som e acessórios automotivos. Visual técnico e copy que fala com quem quer instalação que funciona.", primaryColor: "#3B82F6", secondaryColor: "#374151", companyName: "TechAuto", tags: ["som automotivo", "acessórios", "tecnologia"] },
  { slug: "juridico-sobrio", name: "Melo Advogados", nicho: "Jurídico", description: "Advocacia com autoridade. Navy e dourado. Copy que mostra competência sem juridiquês.", primaryColor: "#1B2A4A", secondaryColor: "#C9A84C", companyName: "Advogados Associados Melo", tags: ["advocacia", "jurídico", "direito"] },
  { slug: "juridico-moderno", name: "Contábil Nexus", nicho: "Jurídico", description: "Contabilidade clara que empreendedor entende. Verde e branco. Sem número incompreensível.", primaryColor: "#2D5016", secondaryColor: "#F8FAF5", companyName: "Contábil Nexus", tags: ["contabilidade", "finanças", "escritório"] },
  { slug: "restaurante-quente", name: "Brasa Viva", nicho: "Restaurante", description: "Churrascaria com copy que dá fome. Vermelho e preto. Pra quem vende carne de verdade.", primaryColor: "#DC2626", secondaryColor: "#1A1A1A", companyName: "Brasa Viva", tags: ["churrascaria", "carne", "brasa"] },
  { slug: "restaurante-minimalista", name: "Mirin", nicho: "Restaurante", description: "Japonês refinado. Bege e marrom. Copy que valoriza o ingrediente e o chef. Minimalismo com alma.", primaryColor: "#8B7355", secondaryColor: "#F5F0EB", companyName: "Mirin", tags: ["japonês", "sushi", "culinária"] },
  { slug: "pet-lovers", name: "Pet Lovers", nicho: "Pet Shop", description: "Pet shop que trata pet como filho. Coral e creme. Copy emocionante que dono de pet ama.", primaryColor: "#E8735A", secondaryColor: "#FFF5F0", companyName: "Pet Lovers", tags: ["pet shop", "animais", "cachorro"] },
  { slug: "pet-vet", name: "Vet Center", nicho: "Pet Shop", description: "Veterinária que inspira confiança. Verde e claro. Copy séria sem ser fria. Emergência 24h em destaque.", primaryColor: "#2D7D46", secondaryColor: "#F0F8F0", companyName: "Vet Center", tags: ["veterinária", "pet", "saúde animal"] },
  { slug: "imob-housi", name: "Housi", nicho: "Imobiliária", description: "Imobiliária premium com urgência. Navy e vermelho. Copy que mostra que imóvel bom some rápido.", primaryColor: "#1A1A2E", secondaryColor: "#E94560", companyName: "Housi", tags: ["imobiliária", "imóveis", "apartamento"] },
  { slug: "imob-lar", name: "Lar Doce Lar", nicho: "Imobiliária", description: "Imobiliária humana e honesta. Dourado e creme. Pra quem quer lar, não só imóvel.", primaryColor: "#8B6914", secondaryColor: "#FFFBEB", companyName: "Lar Doce Lar", tags: ["imobiliária", "casa", "lar"] },
  { slug: "fitness-iron", name: "Iron Fit", nicho: "Fitness", description: "Academia agressiva e motivadora. Vermelho sobre preto. Copy que chama sem desculpa.", primaryColor: "#FF2E2E", secondaryColor: "#1A1A1A", companyName: "Iron Fit", tags: ["academia", "musculação", "fitness"] },
  { slug: "fitness-zen", name: "Zen Studio", nicho: "Fitness", description: "Yoga e pilates com paz de verdade. Verde sálvia. Copy que acalma e convida a respirar.", primaryColor: "#5B7C6F", secondaryColor: "#F0F5F2", companyName: "Zen Studio", tags: ["yoga", "pilates", "meditação"] },
];

export const nichoOptions = ["Todos", "Saúde", "Beleza", "Auto", "Jurídico", "Restaurante", "Pet Shop", "Imobiliária", "Fitness"];

export function getTemplateBySlug(slug: string) {
  return templates.find((t) => t.slug === slug);
}
export function getTemplatesByNicho(nicho: string) {
  if (nicho === "Todos") return templates;
  return templates.filter((t) => t.nicho === nicho);
}
