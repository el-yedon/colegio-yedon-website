import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlayCircle, Download, FileText, CheckCircle2 } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

export default function EAD() {
  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Yedon EAD Hub</h2>
          <p className="text-muted-foreground">
            Plataforma de ensino a distância e materiais complementares.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg border shadow-sm">
          <span className="text-sm font-medium text-slate-600">Progresso Geral:</span>
          <div className="w-32">
            <Progress value={65} className="h-2" />
          </div>
          <span className="text-sm font-bold text-primary">65%</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Main Video Player Mock */}
          <Card className="overflow-hidden border-0 shadow-md">
            <div className="aspect-video bg-slate-900 relative flex items-center justify-center group cursor-pointer">
              <img
                src="https://img.usecurling.com/p/800/450?q=teacher%20online%20class"
                alt="Video cover"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <PlayCircle className="w-20 h-20 text-white/90 z-10 group-hover:scale-110 transition-transform" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <Badge
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground font-bold"
                >
                  Biologia
                </Badge>
                <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">14:20</span>
              </div>
            </div>
            <CardContent className="p-6 bg-white">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Aula 12: Genética e Hereditariedade
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Revisão dos conceitos de Mendel e exercícios práticos para a prova bimestral.
              </p>
              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100"
                >
                  <Download className="mr-2 h-4 w-4" /> Material (PDF)
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-purple-600 border-purple-200 bg-purple-50 hover:bg-purple-100"
                >
                  <FileText className="mr-2 h-4 w-4" /> Exercícios
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Módulo Atual</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {[
                  { title: 'Aula 10: Introdução à Genética', status: 'completed', time: '18:00' },
                  { title: 'Aula 11: Leis de Mendel', status: 'completed', time: '22:30' },
                  {
                    title: 'Aula 12: Genética e Hereditariedade',
                    status: 'current',
                    time: '14:20',
                  },
                  { title: 'Aula 13: Mutações', status: 'locked', time: '20:00' },
                  { title: 'Quiz Avaliativo', status: 'locked', time: '10 pts' },
                ].map((aula, i) => (
                  <div
                    key={i}
                    className={`p-4 flex gap-3 items-start transition-colors ${aula.status === 'current' ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-slate-50'}`}
                  >
                    <div className="mt-0.5">
                      {aula.status === 'completed' && (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      )}
                      {aula.status === 'current' && <PlayCircle className="h-5 w-5 text-primary" />}
                      {aula.status === 'locked' && (
                        <div className="h-5 w-5 rounded-full border-2 border-slate-200 bg-slate-100" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${aula.status === 'locked' ? 'text-slate-400' : 'text-slate-900'}`}
                      >
                        {aula.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{aula.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
