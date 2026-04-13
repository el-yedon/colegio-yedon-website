import { useState } from 'react'
import { useAcademic } from './AcademicContext'
import { GenericCrud } from './GenericCrud'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function TabSeries() {
  const { state, addEntity, deleteEntity } = useAcademic()
  const [name, setName] = useState('')
  const [courseId, setCourseId] = useState('')
  const [sectorId, setSectorId] = useState('')

  return (
    <GenericCrud
      title="Séries"
      description="Cadastre as séries vinculando a um curso e a um setor pedagógico."
      items={state.grades}
      columns={[
        { key: 'name', label: 'Série' },
        {
          key: 'course',
          label: 'Curso',
          render: (item) => state.courses.find((c: any) => c.id === item.courseId)?.name || '-',
        },
        {
          key: 'sector',
          label: 'Setor',
          render: (item) => state.sectors.find((s: any) => s.id === item.sectorId)?.name || '-',
        },
      ]}
      onDelete={(id) => deleteEntity('grades', id)}
      form={
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            className="flex-1 bg-white"
            placeholder="Nome (ex: 1ª Série)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Select value={courseId} onValueChange={setCourseId}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white">
              <SelectValue placeholder="Curso" />
            </SelectTrigger>
            <SelectContent>
              {state.courses.map((c: any) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sectorId} onValueChange={setSectorId}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white">
              <SelectValue placeholder="Setor" />
            </SelectTrigger>
            <SelectContent>
              {state.sectors.map((s: any) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="bg-blue-950 hover:bg-blue-900 text-white shrink-0"
            onClick={() => {
              if (name && courseId && sectorId) {
                addEntity('grades', { id: Date.now().toString(), name, courseId, sectorId })
                setName('')
              }
            }}
          >
            Adicionar Série
          </Button>
        </div>
      }
    />
  )
}

export function TabTurmas() {
  const { state, addEntity, deleteEntity } = useAcademic()
  const [name, setName] = useState('')
  const [gradeId, setGradeId] = useState('')
  const [shiftId, setShiftId] = useState('')

  return (
    <GenericCrud
      title="Turmas"
      description="Cadastre as turmas vinculando a uma série e a um turno específico."
      items={state.classes}
      columns={[
        { key: 'name', label: 'Turma' },
        {
          key: 'grade',
          label: 'Série',
          render: (item) => state.grades.find((g: any) => g.id === item.gradeId)?.name || '-',
        },
        {
          key: 'shift',
          label: 'Turno',
          render: (item) => state.shifts.find((s: any) => s.id === item.shiftId)?.name || '-',
        },
      ]}
      onDelete={(id) => deleteEntity('classes', id)}
      form={
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            className="flex-1 bg-white"
            placeholder="Nome (ex: 101-A)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Select value={gradeId} onValueChange={setGradeId}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white">
              <SelectValue placeholder="Série" />
            </SelectTrigger>
            <SelectContent>
              {state.grades.map((g: any) => (
                <SelectItem key={g.id} value={g.id}>
                  {g.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={shiftId} onValueChange={setShiftId}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white">
              <SelectValue placeholder="Turno" />
            </SelectTrigger>
            <SelectContent>
              {state.shifts.map((s: any) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="bg-blue-950 hover:bg-blue-900 text-white shrink-0"
            onClick={() => {
              if (name && gradeId && shiftId) {
                addEntity('classes', { id: Date.now().toString(), name, gradeId, shiftId })
                setName('')
              }
            }}
          >
            Adicionar Turma
          </Button>
        </div>
      }
    />
  )
}
