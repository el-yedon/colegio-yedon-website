import { createContext, useContext, useState, ReactNode } from 'react'

const MOCK_DATA = {
  courses: [
    { id: 'c1', name: 'Ensino Regular', description: 'Currículo base nacional alinhado à BNCC' },
    { id: 'c2', name: 'Programa Bilíngue', description: 'Imersão em língua inglesa' },
  ],
  sectors: [
    { id: 's1', name: 'Ensino Médio' },
    { id: 's2', name: 'Ensino Fundamental II' },
  ],
  shifts: [
    { id: 'sh1', name: 'Matutino' },
    { id: 'sh2', name: 'Vespertino' },
  ],
  grades: [
    { id: 'g1', name: '1ª Série', courseId: 'c1', sectorId: 's1' },
    { id: 'g2', name: '9º Ano', courseId: 'c1', sectorId: 's2' },
  ],
  classes: [
    { id: 'cl1', name: '101-A', gradeId: 'g1', shiftId: 'sh1' },
    { id: 'cl2', name: '901-B', gradeId: 'g2', shiftId: 'sh2' },
  ],
  classrooms: [] as any[],
  students: [
    { id: 'st1', name: 'Lucas Costa (Matrícula: 2026001)' },
    { id: 'st2', name: 'Mariana Silva (Matrícula: 2026002)' },
    { id: 'st3', name: 'João Pedro (Matrícula: 2026003)' },
    { id: 'st4', name: 'Ana Beatriz (Matrícula: 2026004)' },
  ],
  auditLogs: [
    {
      action: 'Sistema inicializado com dados base de demonstração.',
      date: new Date().toISOString(),
    },
  ],
}

export const AcademicContext = createContext<any>(null)

export function AcademicProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(MOCK_DATA)

  const addEntity = (entity: keyof typeof MOCK_DATA, item: any) => {
    setState((prev) => {
      const newLogs = [
        {
          action: `Admin registrou novo item em ${entity}: ${item.name || item.id}`,
          date: new Date().toISOString(),
        },
        ...prev.auditLogs,
      ]
      return { ...prev, [entity]: [...(prev[entity] as any[]), item], auditLogs: newLogs }
    })
  }

  const deleteEntity = (entity: keyof typeof MOCK_DATA, id: string) => {
    setState((prev) => {
      const item = (prev[entity] as any[]).find((i) => i.id === id)
      const newLogs = [
        {
          action: `Admin removeu registro de ${entity}: ${item?.name || id}`,
          date: new Date().toISOString(),
        },
        ...prev.auditLogs,
      ]
      return {
        ...prev,
        [entity]: (prev[entity] as any[]).filter((i) => i.id !== id),
        auditLogs: newLogs,
      }
    })
  }

  const updateClassroom = (classroom: any) => {
    setState((prev) => {
      const exists = prev.classrooms.find((c: any) => c.classId === classroom.classId)
      const list = exists
        ? prev.classrooms.map((c: any) => (c.classId === classroom.classId ? classroom : c))
        : [...prev.classrooms, classroom]

      const newLogs = [
        {
          action: `Admin atualizou estrutura da Sala para a turma ID ${classroom.classId}`,
          date: new Date().toISOString(),
        },
        ...prev.auditLogs,
      ]
      return { ...prev, classrooms: list, auditLogs: newLogs }
    })
  }

  return (
    <AcademicContext.Provider value={{ state, addEntity, deleteEntity, updateClassroom }}>
      {children}
    </AcademicContext.Provider>
  )
}

export const useAcademic = () => useContext(AcademicContext)
