import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { BookOpen, Map, Users, Layers } from 'lucide-react'

export default function TabAcademic() {
  const [sector1, setSector1] = useState('')
  const [shift1, setShift1] = useState('')
  const [sector2, setSector2] = useState('')
  const [shift2, setShift2] = useState('')

  const handleEnroll = () => {
    if (!sector1 || !shift1) {
      toast.error('Preencha o primeiro setor e turno.')
      return
    }
    if (sector2) {
      if (!shift2) {
        toast.error('Preencha o turno do segundo setor.')
        return
      }
      if (shift1 === shift2) {
        toast.error(
          'Regra violada: O aluno não pode estar matriculado em dois setores no mesmo turno.',
        )
        return
      }
    }
    toast.success('Matrícula acadêmica validada e salva com sucesso!')
  }

  return (
    <div className="space-y-6 animate-fade-in pt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Cursos & Setores', icon: Map, value: '4 Setores' },
          { title: 'Séries & Turmas', icon: Users, value: '42 Turmas' },
          { title: 'Disciplinas & Frentes', icon: BookOpen, value: '18 Disciplinas' },
        ].map((item, i) => (
          <Card key={i} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <Button variant="link" className="px-0 h-auto text-xs text-primary">
                Gerenciar Estrutura
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-t-4 border-t-primary shadow-sm">
        <CardHeader>
          <CardTitle>Lógica de Matrícula e Associação</CardTitle>
          <CardDescription>
            Matricule um aluno em trilhas acadêmicas. O sistema permite vínculo a dois setores
            pedagógicos distintos apenas se os turnos (Shifts) forem diferentes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2 max-w-md">
            <Label>Selecione o Aluno</Label>
            <Select defaultValue="lucas">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lucas">Lucas Costa (Matrícula: 2026001)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 border rounded-xl bg-slate-50">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm flex items-center gap-2 text-slate-800">
                <Layers className="w-4 h-4 text-primary" /> Setor Pedagógico Principal
              </h4>
              <div className="space-y-2">
                <Label>Setor / Curso</Label>
                <Select value={sector1} onValueChange={setSector1}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Ensino Médio Regular</SelectItem>
                    <SelectItem value="bilingue">Programa Bilíngue</SelectItem>
                    <SelectItem value="tecnico">Ensino Técnico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Turno (Shift)</Label>
                <Select value={shift1} onValueChange={setShift1}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matutino">Matutino</SelectItem>
                    <SelectItem value="vespertino">Vespertino</SelectItem>
                    <SelectItem value="noturno">Noturno</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm flex items-center gap-2 text-slate-800">
                <Layers className="w-4 h-4 text-primary" /> Setor Pedagógico Secundário (Opcional)
              </h4>
              <div className="space-y-2">
                <Label>Setor / Curso</Label>
                <Select value={sector2} onValueChange={setSector2}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Nenhum (Opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Ensino Médio Regular</SelectItem>
                    <SelectItem value="bilingue">Programa Bilíngue</SelectItem>
                    <SelectItem value="tecnico">Ensino Técnico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Turno (Shift)</Label>
                <Select value={shift2} onValueChange={setShift2}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matutino">Matutino</SelectItem>
                    <SelectItem value="vespertino">Vespertino</SelectItem>
                    <SelectItem value="noturno">Noturno</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button onClick={handleEnroll} className="w-full md:w-auto">
            Validar e Salvar Matrícula
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
