import { useState } from 'react'
import { useAcademic } from './AcademicContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Users, BookOpen, Presentation } from 'lucide-react'

export function TabSalas() {
  const { state, updateClassroom } = useAcademic()
  const [selectedClassId, setSelectedClassId] = useState('')

  const classroom = state.classrooms.find((c: any) => c.classId === selectedClassId) || {
    id: '',
    classId: selectedClassId,
    subjects: [],
    students: [],
  }

  const [subjectName, setSubjectName] = useState('')
  const [teacherName, setTeacherName] = useState('')
  const [studentId, setStudentId] = useState('')

  const handleAddSubject = () => {
    if (!subjectName || !teacherName) {
      toast.error('Preencha a disciplina e o professor.')
      return
    }
    const updated = {
      ...classroom,
      id: classroom.id || Date.now().toString(),
      subjects: [
        ...classroom.subjects,
        { id: Date.now().toString(), name: subjectName, teacher: teacherName },
      ],
    }
    updateClassroom(updated)
    setSubjectName('')
    setTeacherName('')
    toast.success('Disciplina adicionada à sala.')
  }

  const handleAddStudent = () => {
    if (!studentId || classroom.students.includes(studentId)) return
    const updated = {
      ...classroom,
      id: classroom.id || Date.now().toString(),
      students: [...classroom.students, studentId],
    }
    updateClassroom(updated)
    setStudentId('')
    toast.success('Aluno matriculado na sala.')
  }

  return (
    <Card className="shadow-sm border-t-4 border-t-blue-950 animate-fade-in">
      <CardHeader>
        <div className="flex items-center gap-2 text-blue-950 mb-1">
          <Presentation className="h-5 w-5" />
          <CardTitle>Construtor de Salas (Classroom Builder)</CardTitle>
        </div>
        <CardDescription>
          Configure as disciplinas, vincule professores e matricule alunos em uma turma específica.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="max-w-md bg-slate-50 p-4 rounded-xl border">
          <label className="text-sm font-semibold text-blue-950 mb-2 block">
            Selecione a Turma Base
          </label>
          <Select value={selectedClassId} onValueChange={setSelectedClassId}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Nenhuma turma selecionada..." />
            </SelectTrigger>
            <SelectContent>
              {state.classes.map((c: any) => (
                <SelectItem key={c.id} value={c.id}>
                  Turma: {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedClassId && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {/* Subjects Builder */}
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
              <h4 className="font-semibold text-sm flex items-center gap-2 mb-4 text-blue-950">
                <BookOpen className="w-4 h-4 text-amber-500" /> Disciplinas & Professores
              </h4>
              <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto pr-2">
                {classroom.subjects.map((sub: any) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between bg-white p-3 border border-slate-200 rounded-lg text-sm shadow-sm"
                  >
                    <div>
                      <div className="font-semibold text-slate-800">{sub.name}</div>
                      <div className="text-muted-foreground text-xs">Prof. {sub.teacher}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        updateClassroom({
                          ...classroom,
                          subjects: classroom.subjects.filter((s: any) => s.id !== sub.id),
                        })
                      }
                      className="text-red-500 hover:bg-red-50 hover:text-red-600 h-8 px-2"
                    >
                      Remover
                    </Button>
                  </div>
                ))}
                {classroom.subjects.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhuma disciplina cadastrada nesta sala.
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 border-t pt-4">
                <Input
                  placeholder="Nome da Disciplina (ex: Matemática)"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="bg-white"
                />
                <Input
                  placeholder="Nome do Professor (ex: Carlos Silva)"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="bg-white"
                />
                <Button className="bg-blue-950 hover:bg-blue-900" onClick={handleAddSubject}>
                  Adicionar Disciplina
                </Button>
              </div>
            </div>

            {/* Students Enrollment */}
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
              <h4 className="font-semibold text-sm flex items-center gap-2 mb-4 text-blue-950">
                <Users className="w-4 h-4 text-amber-500" /> Alunos Matriculados
              </h4>
              <div className="space-y-2 mb-4 max-h-[300px] overflow-y-auto pr-2">
                {classroom.students.map((sid: string) => {
                  const student = state.students.find((s: any) => s.id === sid)
                  return (
                    <div
                      key={sid}
                      className="flex items-center justify-between bg-white p-2 border border-slate-200 rounded-lg text-sm shadow-sm"
                    >
                      <span className="font-medium text-slate-700">{student?.name || sid}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          updateClassroom({
                            ...classroom,
                            students: classroom.students.filter((s: string) => s !== sid),
                          })
                        }
                        className="text-red-500 hover:bg-red-50 hover:text-red-600 h-8 px-2"
                      >
                        Remover
                      </Button>
                    </div>
                  )
                })}
                {classroom.students.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhum aluno alocado nesta sala.
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 border-t pt-4">
                <Select value={studentId} onValueChange={setStudentId}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecione um aluno..." />
                  </SelectTrigger>
                  <SelectContent>
                    {state.students
                      .filter((s: any) => !classroom.students.includes(s.id))
                      .map((s: any) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button className="bg-blue-950 hover:bg-blue-900" onClick={handleAddStudent}>
                  Adicionar Aluno
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
