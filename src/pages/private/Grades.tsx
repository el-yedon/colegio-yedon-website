import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/stores/useAuthStore'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Trash2 } from 'lucide-react'

const MOCK_GRADES = [
  {
    id: 1,
    subject: 'Matemática',
    student: 'Lucas Costa',
    b1: 8.5,
    b2: 7.0,
    b3: '-',
    b4: '-',
    average: 7.7,
    status: 'Na média',
  },
  {
    id: 2,
    subject: 'Língua Portuguesa',
    student: 'Lucas Costa',
    b1: 9.0,
    b2: 8.5,
    b3: '-',
    b4: '-',
    average: 8.7,
    status: 'Excelente',
  },
  {
    id: 3,
    subject: 'História',
    student: 'Lucas Costa',
    b1: 6.5,
    b2: 7.5,
    b3: '-',
    b4: '-',
    average: 7.0,
    status: 'Atenção',
  },
  {
    id: 4,
    subject: 'Geografia',
    student: 'Lucas Costa',
    b1: 8.0,
    b2: 8.0,
    b3: '-',
    b4: '-',
    average: 8.0,
    status: 'Bom',
  },
  {
    id: 5,
    subject: 'Ciências / Biologia',
    student: 'Lucas Costa',
    b1: 9.5,
    b2: 9.0,
    b3: '-',
    b4: '-',
    average: 9.2,
    status: 'Excelente',
  },
  {
    id: 6,
    subject: 'Inglês',
    student: 'Lucas Costa',
    b1: 10.0,
    b2: 9.5,
    b3: '-',
    b4: '-',
    average: 9.7,
    status: 'Excelente',
  },
]

const TEACHER_STUDENTS = [
  { id: '1', name: 'Lucas Costa', grade: '9º Ano A' },
  { id: '2', name: 'Marina Silva', grade: '9º Ano A' },
  { id: '3', name: 'Pedro Santos', grade: '9º Ano A' },
]

export default function Grades() {
  const user = useAuthStore((state) => state.user)
  const isManagement = ['master', 'director', 'coordinator', 'admin'].includes(user?.role || '')
  const isTeacher = user?.role === 'teacher' || isManagement
  const isParent = user?.role === 'parent'

  const [deletePassword, setDeletePassword] = useState('')
  const [grades, setGrades] = useState(MOCK_GRADES)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excelente':
        return 'bg-emerald-100 text-emerald-800'
      case 'Bom':
        return 'bg-blue-100 text-blue-800'
      case 'Na média':
        return 'bg-yellow-100 text-yellow-800'
      case 'Atenção':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const handleDeleteGrade = (id: number) => {
    if (deletePassword !== 'yedon123') {
      toast.error('Senha de autorização incorreta!')
      return
    }
    setGrades(grades.filter((g) => g.id !== id))
    toast.success('Nota excluída com sucesso.')
    setDeletePassword('')
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {isTeacher ? 'Lançamento de Notas' : 'Boletim Escolar'}
        </h2>
        <p className="text-muted-foreground">
          {isTeacher
            ? 'Gerencie as notas das suas turmas (Ano Letivo 2026).'
            : 'Acompanhe o desempenho acadêmico (Ano Letivo 2026).'}
        </p>
      </div>

      {isParent && (
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border max-w-md">
          <Label className="whitespace-nowrap font-semibold text-slate-700">
            Visualizar boletim de:
          </Label>
          <Select defaultValue="lucas">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lucas">Lucas Costa (9º Ano A)</SelectItem>
              <SelectItem value="marina">Marina Costa (6º Ano B)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {isTeacher && (
        <Card className="mb-6 border-l-4 border-l-purple-500 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Turma: 9º Ano A - Matemática</CardTitle>
            <CardDescription>
              {isManagement
                ? 'Visão gerencial: todas as turmas disponíveis.'
                : 'Suas turmas atribuídas.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-end gap-4 max-w-3xl">
              <div className="flex-1 min-w-[200px] space-y-2">
                <Label>Aluno</Label>
                <Select defaultValue="1">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TEACHER_STUDENTS.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-24 space-y-2">
                <Label>Bimestre</Label>
                <Select defaultValue="1">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1º Bim</SelectItem>
                    <SelectItem value="2">2º Bim</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-24 space-y-2">
                <Label>Nota</Label>
                <Input type="number" step="0.1" min="0" max="10" placeholder="0.0" />
              </div>
              <Button onClick={() => toast.success('Nota lançada com sucesso!')}>Lançar</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-sm overflow-hidden border-t-4 border-t-primary">
        <CardHeader className="bg-slate-50/50">
          <CardTitle className="text-lg">Notas por Disciplina</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100/50">
                <TableHead className="font-semibold text-slate-900">Disciplina</TableHead>
                {isTeacher && <TableHead>Aluno</TableHead>}
                <TableHead className="text-center">1º Bim</TableHead>
                <TableHead className="text-center">2º Bim</TableHead>
                <TableHead className="text-center text-slate-400">3º Bim</TableHead>
                <TableHead className="text-center text-slate-400">4º Bim</TableHead>
                <TableHead className="text-center font-bold">Média Parcial</TableHead>
                <TableHead className="text-right">Status</TableHead>
                {isTeacher && <TableHead className="text-right">Ações</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.subject}</TableCell>
                  {isTeacher && <TableCell className="text-slate-600">{item.student}</TableCell>}
                  <TableCell className="text-center">{item.b1}</TableCell>
                  <TableCell className="text-center">{item.b2}</TableCell>
                  <TableCell className="text-center text-slate-400">{item.b3}</TableCell>
                  <TableCell className="text-center text-slate-400">{item.b4}</TableCell>
                  <TableCell className="text-center font-bold text-primary">
                    {item.average}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary" className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  {isTeacher && (
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir Nota?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação requer autorização especial. Insira a senha administrativa
                              para confirmar a exclusão da nota.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="py-4">
                            <Input
                              type="password"
                              placeholder="Senha de autorização (dica: yedon123)"
                              value={deletePassword}
                              onChange={(e) => setDeletePassword(e.target.value)}
                            />
                          </div>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteGrade(item.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Confirmar Exclusão
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
