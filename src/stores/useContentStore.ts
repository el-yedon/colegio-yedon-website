import { create } from 'zustand'

export interface HeroSlide {
  title: string
  subtitle: string
  desc: string
  img: string
  color: string
}

export interface Cycle {
  id: string
  name: string
  subtitle: string
  shortDesc: string
  longDesc: string
  icon: string
  color: string
  bg: string
  border: string
  image: string
  features: string[]
}

export interface Partner {
  id: string
  name: string
  logo: string
}

export interface Mission {
  title: string
  subtitle: string
  desc: string
  features: { title: string; desc: string }[]
}

interface ContentState {
  heroSlides: HeroSlide[]
  mission: Mission
  cycles: Cycle[]
  partners: Partner[]
  updateHeroSlide: (index: number, slide: Partial<HeroSlide>) => void
  updateMission: (mission: Partial<Mission>) => void
  updateCycle: (id: string, cycle: Partial<Cycle>) => void
  addPartner: (partner: Partner) => void
  removePartner: (id: string) => void
  updatePartner: (id: string, partner: Partial<Partner>) => void
}

export const useContentStore = create<ContentState>((set) => ({
  heroSlides: [
    {
      title: 'Yedon Roots',
      subtitle: 'Fundamental I',
      desc: 'Descobrindo o mundo com alegria e curiosidade. O início de uma jornada brilhante.',
      img: 'https://img.usecurling.com/p/1600/600?q=happy%20children%20school%20learning',
      color: 'bg-emerald-500/20',
    },
    {
      title: 'Yedon Path',
      subtitle: 'Fundamental II',
      desc: 'Construindo caminhos, colaboração e pensamento crítico para os desafios do amanhã.',
      img: 'https://img.usecurling.com/p/1600/600?q=teenagers%20studying%20together%20classroom',
      color: 'bg-blue-500/20',
    },
    {
      title: 'Yedon Horizon',
      subtitle: 'Ensino Médio',
      desc: 'Olhando para o futuro com excelência acadêmica e preparação para a vida.',
      img: 'https://img.usecurling.com/p/1600/600?q=high%20school%20students%20technology%20lab',
      color: 'bg-purple-500/20',
    },
  ],
  mission: {
    subtitle: 'Nossa Essência',
    title: 'Formação Integral para um Mundo em Evolução',
    desc: 'No Colégio Yedon, acreditamos que a educação vai muito além da sala de aula. Preparamos nossos alunos para serem cidadãos globais, críticos, criativos e empáticos, com princípios inegociáveis.',
    features: [
      {
        title: 'Excelência Acadêmica',
        desc: 'Metodologia comprovada em parceria com o Sistema Objetivo.',
      },
      {
        title: 'Inteligência Socioemocional',
        desc: 'Desenvolvimento de habilidades para a vida, empatia e resiliência.',
      },
      {
        title: 'Inovação Tecnológica',
        desc: 'Ambientes digitais e EAD integrados ao aprendizado diário.',
      },
    ],
  },
  cycles: [
    {
      id: 'roots',
      name: 'Yedon Roots',
      subtitle: 'Fundamental I',
      shortDesc: 'Fundamental I (1º ao 5º ano)',
      longDesc:
        'A fase das descobertas. Construímos uma base sólida de conhecimento, focando na alfabetização, raciocínio lógico e habilidades sociais através de projetos lúdicos.',
      icon: 'BookOpen',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      image: 'https://img.usecurling.com/p/600/400?q=children%20playing%20learning',
      features: [
        'Alfabetização e Letramento',
        'Inglês Diário (Edify)',
        'Inteligência Socioemocional',
        'Laboratório Maker',
      ],
    },
    {
      id: 'path',
      name: 'Yedon Path',
      subtitle: 'Fundamental II',
      shortDesc: 'Fundamental II (6º ao 9º ano)',
      longDesc:
        'O caminho da autonomia. Os alunos aprofundam conhecimentos científicos e humanísticos, desenvolvendo senso crítico e responsabilidade para os desafios futuros.',
      icon: 'Compass',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      image: 'https://img.usecurling.com/p/600/400?q=teenagers%20studying%20classroom',
      features: [
        'Metodologia Ativa de Ensino',
        'Educação Financeira',
        'Projetos Interdisciplinares',
        'Preparação para Olimpíadas Científicas',
      ],
    },
    {
      id: 'horizon',
      name: 'Yedon Horizon',
      subtitle: 'Ensino Médio',
      shortDesc: 'Ensino Médio (1ª a 3ª série)',
      longDesc:
        'Foco no horizonte e na excelência. Preparação intensiva para o ENEM e os principais vestibulares do país, aliados ao projeto de vida e escolha profissional.',
      icon: 'Rocket',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      image: 'https://img.usecurling.com/p/600/400?q=high%20school%20exam%20preparation',
      features: [
        'Material Didático Objetivo',
        'Simulados Periódicos',
        'Orientação Profissional e Vocacional',
        'Aprofundamentos por Área de Conhecimento',
      ],
    },
  ],
  partners: [
    {
      id: '1',
      name: 'Objetivo',
      logo: 'https://img.usecurling.com/i?q=school%20logo&color=solid-black',
    },
    {
      id: '2',
      name: 'Gênio das Finanças',
      logo: 'https://img.usecurling.com/i?q=finance%20education&color=solid-black',
    },
    {
      id: '3',
      name: 'Edify',
      logo: 'https://img.usecurling.com/i?q=english%20book&color=solid-black',
    },
    {
      id: '4',
      name: 'Escola da Inteligência',
      logo: 'https://img.usecurling.com/i?q=brain%20intelligence&color=solid-black',
    },
  ],
  updateHeroSlide: (index, slide) =>
    set((state) => {
      const newSlides = [...state.heroSlides]
      newSlides[index] = { ...newSlides[index], ...slide }
      return { heroSlides: newSlides }
    }),
  updateMission: (mission) => set((state) => ({ mission: { ...state.mission, ...mission } })),
  updateCycle: (id, cycle) =>
    set((state) => ({
      cycles: state.cycles.map((c) => (c.id === id ? { ...c, ...cycle } : c)),
    })),
  addPartner: (partner) => set((state) => ({ partners: [...state.partners, partner] })),
  removePartner: (id) => set((state) => ({ partners: state.partners.filter((p) => p.id !== id) })),
  updatePartner: (id, partner) =>
    set((state) => ({
      partners: state.partners.map((p) => (p.id === id ? { ...p, ...partner } : p)),
    })),
}))
