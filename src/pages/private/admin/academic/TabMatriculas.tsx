import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Layers } from 'lucide-react'
import { useAcademic } from './AcademicContext'

export function TabMatriculas() {
  const { state } = useAcademic()
  const [studentId, setStudentId] = useState('')

  const [sector1, setSector1] = useState('')
  const [shift1, setShift1] = useState('')
  const [sector2, setSector2] = useState('')
  const [shift2, setShift2] = useState('')

  const handleEnroll = () => {
    if (!studentId) {
      toast.error('Selecione um aluno para simular a matrícula.')
      return
    }
    if (!sector1 || !shift1) {
      toast.error('Preencha o primeiro setor e o turno.')
      return
    }
    if (sector2) {
      if (!shift2) {
        toast.error('Preencha o turno do segundo setor.')
        return
      }
      // Rule Engine Logic: Enrolling in two sectors requires different shifts.
      if (shift1 === shift2) {
        toast.error(
          'Regra violada: O aluno não pode estar matriculado em dois setores no mesmo turno.',
        )
        return
      }
    }
    toast.success('Matrícula acadêmica validada com sucesso pelas regras do sistema!')
  }

  return (
    <Card className="shadow-sm border-t-4 border-t-amber-500 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-blue-950">Validação de Matrícula (Rules Engine)</CardTitle>
        <CardDescription>
          Motor de regras. O sistema permite vínculo a dois setores pedagógicos distintos apenas se
          os turnos (Shifts) forem diferentes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2 max-w-md">
          <Label className="text-blue-950 font-semibold">Selecione o Aluno</Label>
          <Select value={studentId} onValueChange={setStudentId}>
            <SelectTrigger className="border-slate-300">
              <SelectValue placeholder="Selecione o aluno para testar..." />
            </SelectTrigger>
            <SelectContent>
              {state.students.map((s: any) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border border-slate-200 rounded-xl bg-slate-50/80 shadow-inner">
          <div className="space-y-4">
            <h4 className="font-semibold text-sm flex items-center gap-2 text-blue-950 bg-white p-2 rounded-md border shadow-sm">
              <Layers className="w-4 h-4 text-amber-500" /> Setor Pedagógico Principal
            </h4>
            <div className="space-y-2">
              <Label>Setor</Label>
              <Select value={sector1} onValueChange={setSector1}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {state.sectors.map((s: any) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
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
                  {state.shifts.map((s: any) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm flex items-center gap-2 text-blue-950 bg-white p-2 rounded-md border shadow-sm">
              <Layers className="w-4 h-4 text-amber-500" /> Setor Secundário (Opcional)
            </h4>
            <div className="space-y-2">
              <Label>Setor</Label>
              <Select value={sector2} onValueChange={setSector2}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Nenhum (Opcional)" />
                </SelectTrigger>
                <SelectContent>
                  {state.sectors.map((s: any) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
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
                  {state.shifts.map((s: any) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button
          onClick={handleEnroll}
          className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-blue-950 font-bold shadow-md"
        >
          Validar Configuração de Matrícula
        </Button>
      </CardContent>
    </Card>
  )
}
