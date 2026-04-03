import { CheckCircle2 } from 'lucide-react'

export default function Ciclos() {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary text-center mb-16">
          Trilha de Ensino Yedon
        </h1>

        <div className="space-y-24">
          {/* Roots */}
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <img
                src="https://img.usecurling.com/p/600/400?q=children%20playing%20learning"
                alt="Yedon Roots"
                className="rounded-2xl shadow-lg object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-block px-4 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold uppercase tracking-wider">
                Fundamental I
              </div>
              <h2 className="text-3xl font-display font-bold text-slate-900">Yedon Roots</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                A fase das descobertas. Construímos uma base sólida de conhecimento, focando na
                alfabetização, raciocínio lógico e habilidades sociais através de projetos lúdicos.
              </p>
              <ul className="space-y-3">
                {[
                  'Alfabetização e Letramento',
                  'Inglês Diário (Edify)',
                  'Inteligência Socioemocional',
                  'Laboratório Maker',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="text-emerald-500 h-5 w-5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Path */}
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="w-full md:w-1/2">
              <img
                src="https://img.usecurling.com/p/600/400?q=teenagers%20studying%20classroom"
                alt="Yedon Path"
                className="rounded-2xl shadow-lg object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold uppercase tracking-wider">
                Fundamental II
              </div>
              <h2 className="text-3xl font-display font-bold text-slate-900">Yedon Path</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                O caminho da autonomia. Os alunos aprofundam conhecimentos científicos e
                humanísticos, desenvolvendo senso crítico e responsabilidade para os desafios
                futuros.
              </p>
              <ul className="space-y-3">
                {[
                  'Metodologia Ativa de Ensino',
                  'Educação Financeira',
                  'Projetos Interdisciplinares',
                  'Preparação para Olimpíadas Científicas',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="text-blue-500 h-5 w-5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Horizon */}
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <img
                src="https://img.usecurling.com/p/600/400?q=high%20school%20exam%20preparation"
                alt="Yedon Horizon"
                className="rounded-2xl shadow-lg object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-block px-4 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-bold uppercase tracking-wider">
                Ensino Médio
              </div>
              <h2 className="text-3xl font-display font-bold text-slate-900">Yedon Horizon</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Foco no horizonte e na excelência. Preparação intensiva para o ENEM e os principais
                vestibulares do país, aliados ao projeto de vida e escolha profissional.
              </p>
              <ul className="space-y-3">
                {[
                  'Material Didático Objetivo',
                  'Simulados Periódicos',
                  'Orientação Profissional e Vocacional',
                  'Aprofundamentos por Área de Conhecimento',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="text-purple-500 h-5 w-5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
