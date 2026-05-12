import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { logAudit } from '@/lib/audit'

export const AcademicContext = createContext<any>(null)

export function AcademicProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({
    courses: [],
    sectors: [],
    shifts: [],
    grades: [],
    classes: [],
    classrooms: [],
    students: [],
    auditLogs: [],
  })

  const loadData = async () => {
    const [
      { data: courses },
      { data: sectors },
      { data: shifts },
      { data: grades },
      { data: classes },
      { data: students },
      { data: matriculas },
    ] = await Promise.all([
      supabase.from('cursos').select('*'),
      supabase.from('setores').select('*'),
      supabase.from('turnos').select('*'),
      supabase.from('anos_escolares').select('*'),
      supabase.from('turmas').select('*'),
      supabase.from('perfis').select('*').in('papel', ['student', 'Aluno']),
      supabase.from('matriculas').select('*'),
    ])

    const builtClassrooms = (classes || []).map((t) => {
      const classMatriculas = (matriculas || []).filter((m) => m.turma_id === t.id)
      return {
        id: t.id,
        classId: t.id,
        subjects: (t as any).metadados?.subjects || [],
        students: classMatriculas.map((m) => m.aluno_id),
      }
    })

    setState({
      courses: (courses || []).map((c) => ({ id: c.id, name: c.nome, description: c.descricao })),
      sectors: (sectors || []).map((s) => ({ id: s.id, name: s.nome })),
      shifts: (shifts || []).map((s) => ({ id: s.id, name: s.nome })),
      grades: (grades || []).map((g) => ({
        id: g.id,
        name: g.nome,
        courseId: g.curso_id,
        sectorId: g.setor_id,
      })),
      classes: (classes || []).map((c) => ({
        id: c.id,
        name: c.nome,
        gradeId: c.ano_escolar_id,
        shiftId: c.turno_id,
      })),
      classrooms: builtClassrooms,
      students: (students || []).map((s) => ({ id: s.id, name: s.nome })),
      auditLogs: [],
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  const addEntity = async (entity: string, item: any) => {
    let table = ''
    let payload: any = {}

    if (entity === 'courses') {
      table = 'cursos'
      payload = { nome: item.name, descricao: item.description, tipo_curso: 'regular' }
    } else if (entity === 'sectors') {
      table = 'setores'
      payload = { nome: item.name }
    } else if (entity === 'shifts') {
      table = 'turnos'
      payload = { nome: item.name }
    } else if (entity === 'grades') {
      table = 'anos_escolares'
      payload = { nome: item.name, curso_id: item.courseId, setor_id: item.sectorId }
    } else if (entity === 'classes') {
      table = 'turmas'
      payload = {
        nome: item.name,
        ano_escolar_id: item.gradeId,
        turno_id: item.shiftId,
        ano_letivo: new Date().getFullYear(),
      }
    }

    const { data, error } = await supabase
      .from(table as any)
      .insert(payload)
      .select()
      .single()
    if (data) {
      await logAudit('CREATE', table, `Novo registro adicionado: ${data.nome}`)
      loadData()
    } else {
      console.error('Insert error:', error)
    }
  }

  const deleteEntity = async (entity: string, id: string) => {
    let table = ''
    if (entity === 'courses') table = 'cursos'
    else if (entity === 'sectors') table = 'setores'
    else if (entity === 'shifts') table = 'turnos'
    else if (entity === 'grades') table = 'anos_escolares'
    else if (entity === 'classes') table = 'turmas'

    const { error } = await supabase
      .from(table as any)
      .delete()
      .eq('id', id)
    if (!error) {
      await logAudit('DELETE', table, `Registro ${id} removido.`)
      loadData()
    } else {
      console.error('Delete error:', error)
    }
  }

  const updateClassroom = async (classroom: any) => {
    await supabase
      .from('turmas')
      .update({
        metadados: { subjects: classroom.subjects },
      } as any)
      .eq('id', classroom.classId)

    const { data: existing } = await supabase
      .from('matriculas')
      .select('aluno_id')
      .eq('turma_id', classroom.classId)
    const existingIds = existing?.map((e) => e.aluno_id) || []

    const toAdd = classroom.students.filter((id: string) => !existingIds.includes(id))
    const toRemove = existingIds.filter((id: string) => !classroom.students.includes(id))

    if (toAdd.length > 0) {
      await supabase.from('matriculas').insert(
        toAdd.map((id: string) => ({
          aluno_id: id,
          turma_id: classroom.classId,
          status: 'active',
        })),
      )
    }
    if (toRemove.length > 0) {
      await supabase
        .from('matriculas')
        .delete()
        .eq('turma_id', classroom.classId)
        .in('aluno_id', toRemove)
    }

    await logAudit(
      'UPDATE',
      'Salas/Turmas',
      `Turma ${classroom.classId} atualizada (Disciplinas e Alunos).`,
    )
    loadData()
  }

  return (
    <AcademicContext.Provider value={{ state, addEntity, deleteEntity, updateClassroom }}>
      {children}
    </AcademicContext.Provider>
  )
}

export const useAcademic = () => useContext(AcademicContext)
