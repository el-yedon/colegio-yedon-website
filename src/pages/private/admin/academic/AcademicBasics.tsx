import { useState } from 'react'
import { useAcademic } from './AcademicContext'
import { GenericCrud } from './GenericCrud'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function TabCursos() {
  const { state, addEntity, deleteEntity } = useAcademic()
  const [name, setName] = useState('')
  const [description, setDesc] = useState('')

  return (
    <GenericCrud
      title="Cursos"
      description="Gerencie os cursos oferecidos (ex: Ensino Básico, Extensão)."
      items={state.courses}
      columns={[
        { key: 'name', label: 'Nome' },
        { key: 'description', label: 'Descrição' },
      ]}
      onDelete={(id) => deleteEntity('courses', id)}
      form={
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Nome do Curso"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white"
          />
          <Input
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
            className="bg-white"
          />
          <Button
            className="bg-blue-950 hover:bg-blue-900 text-white shrink-0"
            onClick={() => {
              if (name) {
                addEntity('courses', { id: Date.now().toString(), name, description })
                setName('')
                setDesc('')
              }
            }}
          >
            Adicionar Curso
          </Button>
        </div>
      }
    />
  )
}

export function TabSetores() {
  const { state, addEntity, deleteEntity } = useAcademic()
  const [name, setName] = useState('')

  return (
    <GenericCrud
      title="Setores Pedagógicos"
      description="Divisões pedagógicas para organizar o currículo (ex: Ensino Médio, Fundamental)."
      items={state.sectors}
      columns={[{ key: 'name', label: 'Nome do Setor' }]}
      onDelete={(id) => deleteEntity('sectors', id)}
      form={
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Nome do Setor"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white"
          />
          <Button
            className="bg-blue-950 hover:bg-blue-900 text-white shrink-0"
            onClick={() => {
              if (name) {
                addEntity('sectors', { id: Date.now().toString(), name })
                setName('')
              }
            }}
          >
            Adicionar Setor
          </Button>
        </div>
      }
    />
  )
}

export function TabTurnos() {
  const { state, addEntity, deleteEntity } = useAcademic()
  const [name, setName] = useState('')

  return (
    <GenericCrud
      title="Turnos"
      description="Períodos de aula para as turmas (ex: Matutino, Vespertino, Noturno)."
      items={state.shifts}
      columns={[{ key: 'name', label: 'Nome do Turno' }]}
      onDelete={(id) => deleteEntity('shifts', id)}
      form={
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Nome do Turno"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white"
          />
          <Button
            className="bg-blue-950 hover:bg-blue-900 text-white shrink-0"
            onClick={() => {
              if (name) {
                addEntity('shifts', { id: Date.now().toString(), name })
                setName('')
              }
            }}
          >
            Adicionar Turno
          </Button>
        </div>
      }
    />
  )
}
