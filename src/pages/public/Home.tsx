import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ChevronRight, BookOpen, Compass, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

export default function Home() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Slider */}
      <section className="w-full bg-slate-950 text-white relative">
        <Carousel plugins={[plugin.current]} className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {[
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
            ].map((slide, idx) => (
              <CarouselItem key={idx} className="relative h-[600px] w-full">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent`}
                />
                <div className="container relative h-full flex flex-col justify-center px-4 md:px-8">
                  <div className="max-w-2xl animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-secondary text-secondary-foreground text-sm font-bold mb-4 uppercase tracking-wider">
                      {slide.subtitle}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-white leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
                      {slide.desc}
                    </p>
                    <div className="flex gap-4">
                      <Button
                        size="lg"
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 px-8 text-base"
                      >
                        Conheça o Ciclo
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-white border-white/30 hover:bg-white/10 h-12 px-8 text-base"
                      >
                        Agendar Visita
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-8 right-8 flex gap-2">
            <CarouselPrevious className="relative inset-0 translate-y-0 h-12 w-12 bg-white/10 border-none text-white hover:bg-white/20" />
            <CarouselNext className="relative inset-0 translate-y-0 h-12 w-12 bg-white/10 border-none text-white hover:bg-white/20" />
          </div>
        </Carousel>
      </section>

      {/* Sticky CTA Banner */}
      <div className="sticky top-20 z-40 bg-secondary border-b-4 border-yellow-500 shadow-md">
        <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="font-display font-bold text-primary text-lg md:text-xl uppercase tracking-wide">
              Matrículas Abertas 2027
            </span>
            <span className="hidden md:inline text-primary/80 font-medium">
              | Condições Especiais
            </span>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 shadow-lg hover:scale-105 transition-transform">
            Agende uma visita
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="container px-4 text-center max-w-4xl mx-auto">
          <h2 className="text-primary font-bold tracking-wide uppercase mb-3">Nossa Essência</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold mb-8 text-slate-900">
            Formação Integral para um Mundo em Evolução
          </h3>
          <p className="text-lg text-slate-600 mb-12 leading-relaxed">
            No Colégio Yedon, acreditamos que a educação vai muito além da sala de aula. Preparamos
            nossos alunos para serem cidadãos globais, críticos, criativos e empáticos, com
            princípios inegociáveis.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
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
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <CheckCircle2 className="h-8 w-8 text-secondary mb-4" />
                <h4 className="font-bold text-lg mb-2 text-primary">{item.title}</h4>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cycles Section */}
      <section className="py-24 bg-slate-50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Conheça Nossos Ciclos
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Uma trilha de aprendizado contínua, projetada para respeitar e potencializar cada fase
              do desenvolvimento do aluno.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Yedon Roots',
                icon: BookOpen,
                desc: 'Fundamental I (1º ao 5º ano)',
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
                border: 'border-emerald-200',
              },
              {
                name: 'Yedon Path',
                icon: Compass,
                desc: 'Fundamental II (6º ao 9º ano)',
                color: 'text-blue-600',
                bg: 'bg-blue-50',
                border: 'border-blue-200',
              },
              {
                name: 'Yedon Horizon',
                icon: Rocket,
                desc: 'Ensino Médio (1ª a 3ª série)',
                color: 'text-purple-600',
                bg: 'bg-purple-50',
                border: 'border-purple-200',
              },
            ].map((cycle, i) => (
              <Card
                key={i}
                className={`overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 ${cycle.border} hover:-translate-y-2`}
              >
                <div className={`p-8 ${cycle.bg} h-full flex flex-col`}>
                  <cycle.icon
                    className={`h-12 w-12 ${cycle.color} mb-6 group-hover:scale-110 transition-transform`}
                  />
                  <h3 className="text-2xl font-display font-bold mb-2 text-slate-900">
                    {cycle.name}
                  </h3>
                  <p className="text-slate-600 font-medium mb-6">{cycle.desc}</p>
                  <div className="mt-auto pt-6 flex items-center text-primary font-semibold group-hover:text-secondary-foreground transition-colors cursor-pointer">
                    Saiba mais <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Showcase */}
      <section className="py-16 bg-white overflow-hidden border-t border-slate-100">
        <div className="container px-4 mb-8 text-center">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Instituições que caminham conosco
          </h3>
        </div>
        <div className="flex w-full whitespace-nowrap">
          <div className="animate-marquee flex gap-16 items-center px-8">
            {/* Duplicated for seamless scrolling */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center">
                <img
                  src="https://img.usecurling.com/i?q=school%20logo&color=solid-black"
                  alt="Objetivo"
                  className="h-12 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
                <img
                  src="https://img.usecurling.com/i?q=finance%20education&color=solid-black"
                  alt="Gênio das Finanças"
                  className="h-10 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
                <img
                  src="https://img.usecurling.com/i?q=english%20book&color=solid-black"
                  alt="Edify"
                  className="h-10 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
                <img
                  src="https://img.usecurling.com/i?q=brain%20intelligence&color=solid-black"
                  alt="Escola da Inteligência"
                  className="h-12 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
