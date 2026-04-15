import { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  PlayCircle,
  Download,
  FileText,
  CheckCircle2,
  Video,
  Clock,
  PlusCircle,
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/stores/useAuthStore'
import { toast } from 'sonner'

export default function EAD() {
  const user = useAuthStore((state) => state.user)
  const isTeacher = user?.role === 'teacher'
  const [activeTab, setActiveTab] = useState(isTeacher ? 'manage' : 'async')

  const handlePostLesson = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Aula publicada com sucesso na sala virtual!')
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Virtual Classroom (LMS)</h2>
          <p className="text-muted-foreground">
            {isTeacher
              ? 'Gerencie o conteúdo EAD e planeje suas aulas.'
              : 'Acesse aulas síncronas, assíncronas e materiais das suas turmas.'}
          </p>
        </div>
        {!isTeacher && (
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg border shadow-sm">
            <span className="text-sm font-medium text-slate-600">Progresso (Biologia):</span>
            <div className="w-32">
              <Progress value={65} className="h-2" />
            </div>
            <span className="text-sm font-bold text-primary">65%</span>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          {isTeacher && <TabsTrigger value="manage">Gerenciar / Postar</TabsTrigger>}
          <TabsTrigger value="async">Aulas Gravadas</TabsTrigger>
          <TabsTrigger value="sync">Ao Vivo (Síncronas)</TabsTrigger>
          <TabsTrigger value="assignments">Tarefas</TabsTrigger>
        </TabsList>

        {isTeacher && (
          <TabsContent value="manage" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-t-4 border-t-purple-500 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PlusCircle className="w-5 h-5 text-purple-600" /> Nova Aula ou Material
                  </CardTitle>
                  <CardDescription>
                    Publique conteúdo apenas para alunos matriculados na turma selecionada.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePostLesson} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Turma Destino</Label>
                      <Select defaultValue="9a">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a turma..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9a">9º Ano A - Fundamental II</SelectItem>
                          <SelectItem value="1m">1ª Série - Ensino Médio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Título da Aula</Label>
                      <Input placeholder="Ex: Aula 12 - Genética..." required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tipo</Label>
                        <Select defaultValue="async">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="async">Vídeo Gravado</SelectItem>
                            <SelectItem value="sync">Link Ao Vivo (Meet/Zoom)</SelectItem>
                            <SelectItem value="doc">Apenas Material</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>URL (Vídeo/Reunião)</Label>
                        <Input placeholder="https://..." />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Descrição / Instruções</Label>
                      <Textarea placeholder="Instruções para os alunos..." rows={3} />
                    </div>
                    <Button type="submit" className="w-full">
                      Publicar Conteúdo
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Plano de Curso & Carga Horária</CardTitle>
                  <CardDescription>Resumo do seu planejamento letivo (Simulação).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-slate-50 border rounded-md">
                    <p className="text-sm font-semibold">9º Ano A - Biologia</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Carga Horária Cumprida: 45h / 80h
                    </p>
                    <Progress value={56} className="h-1.5 mt-2" />
                  </div>
                  <div className="p-3 bg-slate-50 border rounded-md">
                    <p className="text-sm font-semibold">1ª Série - Biologia</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Carga Horária Cumprida: 40h / 80h
                    </p>
                    <Progress value={50} className="h-1.5 mt-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        <TabsContent value="async" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card className="overflow-hidden border-0 shadow-md">
                <div className="aspect-video bg-slate-900 relative flex items-center justify-center group cursor-pointer">
                  <img
                    src="https://img.usecurling.com/p/800/450?q=biology%20cell"
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
                      Biologia (9ºA)
                    </Badge>
                    <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">14:20</span>
                  </div>
                </div>
                <CardContent className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Aula 12: Genética e Hereditariedade
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Revisão dos conceitos de Mendel e exercícios práticos.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-blue-600 border-blue-200 bg-blue-50"
                    >
                      <Download className="mr-2 h-4 w-4" /> Material (PDF)
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
                      {
                        title: 'Aula 10: Introdução à Genética',
                        status: 'completed',
                        time: '18:00',
                      },
                      { title: 'Aula 11: Leis de Mendel', status: 'completed', time: '22:30' },
                      {
                        title: 'Aula 12: Genética e Hereditariedade',
                        status: 'current',
                        time: '14:20',
                      },
                      { title: 'Aula 13: Mutações', status: 'locked', time: '20:00' },
                    ].map((aula, i) => (
                      <div
                        key={i}
                        className={`p-4 flex gap-3 items-start transition-colors ${aula.status === 'current' ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-slate-50'}`}
                      >
                        <div className="mt-0.5">
                          {aula.status === 'completed' && (
                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                          )}
                          {aula.status === 'current' && (
                            <PlayCircle className="h-5 w-5 text-primary" />
                          )}
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
        </TabsContent>

        <TabsContent value="sync">
          <Card className="shadow-sm max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5 text-red-500" /> Salas de Aula Virtuais
              </CardTitle>
              <CardDescription>
                Links para aulas síncronas programadas para a sua turma.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border border-red-200 bg-red-50 rounded-lg flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div>
                  <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200 mb-2">
                    AO VIVO AGORA
                  </Badge>
                  <h4 className="font-bold text-slate-900">Plantão de Dúvidas: Matemática</h4>
                  <p className="text-sm text-slate-600 mt-1">Prof. Leandro • Turma 9º Ano A</p>
                </div>
                <Button className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
                  Acessar Sala
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments">
          <Card className="shadow-sm max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" /> Tarefas e Exercícios
              </CardTitle>
              <CardDescription>
                Atividades avaliativas publicadas pelos professores.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-900">Lista 03 - Equações 2º Grau</h4>
                  <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                    Pendente
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  <Clock className="inline w-3 h-3 mr-1" /> Entrega até: 25/11 às 23:59
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Visualizar e Enviar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
