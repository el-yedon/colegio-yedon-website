import { CheckCircle2 } from 'lucide-react'
import { useContentStore } from '@/stores/useContentStore'

export default function Ciclos() {
  const { cycles } = useContentStore()

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary text-center mb-16">
          Trilha de Ensino Yedon
        </h1>

        <div className="space-y-24">
          {cycles.map((cycle, idx) => {
            const isReversed = idx % 2 !== 0
            return (
              <div
                key={cycle.id}
                className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <img
                    src={cycle.image}
                    alt={cycle.name}
                    className="rounded-2xl shadow-lg object-cover w-full aspect-[3/2]"
                  />
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                  <div
                    className={`inline-block px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${cycle.bg} ${cycle.color}`}
                  >
                    {cycle.subtitle}
                  </div>
                  <h2 className="text-3xl font-display font-bold text-slate-900">{cycle.name}</h2>
                  <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">
                    {cycle.longDesc}
                  </p>
                  <ul className="space-y-3">
                    {cycle.features.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                        <CheckCircle2 className={`${cycle.color} h-5 w-5 shrink-0`} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
