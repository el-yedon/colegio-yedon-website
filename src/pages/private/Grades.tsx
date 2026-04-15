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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { Trash2, PenTool, CheckCircle, FileSpreadsheet } from 'lucide-react'

const MOCK_GRADES = [
  {
    id: 1,
    subject: 'Matemática',
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
    b1: 6.5,
    b2: 7.5,
    b3: '-',
    b4: '-',
    average: 7.0,
    status: 'Atenção',
  },
]

const MOCK_CORRECTIONS = [
  {
    id: 1,
    student: 'Lucas Costa',
    task: 'Lista 03 - Genética',
    submittedAt: 'Ontem, 14:30',
    status: 'pending',
  },
  {
    id: 2,
    student: 'Marina Silva',
    task: 'Lista 03 - Genética',
    submittedAt: 'Hoje, 09:15',
    status: 'pending',
  },
  {
    id: 3,
    student: 'Pedro Santos',
    task: 'Lista 03 - Genética',
    submittedAt: 'Há 2 dias',
    status: 'graded',
    grade: 8.5,
  },
]

export default function Grades() {
  const user = useAuthStore((state) => state.user)
  const isTeacher = user?.role === 'teacher' || user?.role === 'admin'
  const isStudentOrParent = user?.role === 'student' || user?.role === 'parent'
  const [activeTab, setActiveTab] = useState(isTeacher ? 'correction' : 'bulletin')

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

  const StudentBulletin = () => (
    <Card className="shadow-sm overflow-hidden border-t-4 border-t-primary mt-4">
      <CardHeader className="bg-slate-50/50">
        <CardTitle className="text-lg">Boletim Escolar - Ano Letivo 2026</CardTitle>
        <CardDescription>
          Dados privados. Exibindo resultados exclusivos de:{' '}
          {user?.role === 'parent' ? 'Lucas Costa (Filho)' : user?.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-100/50">
              <TableHead className="font-semibold text-slate-900">Disciplina</TableHead>
              <TableHead className="text-center">1º Bim</TableHead>
              <TableHead className="text-center">2º Bim</TableHead>
              <TableHead className="text-center text-slate-400">3º Bim</TableHead>
              <TableHead className="text-center font-bold">Média Parcial</TableHead>
              <TableHead className="text-right">Situação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_GRADES.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.subject}</TableCell>
                <TableCell className="text-center">{item.b1}</TableCell>
                <TableCell className="text-center">{item.b2}</TableCell>
                <TableCell className="text-center text-slate-400">{item.b3}</TableCell>
                <TableCell className="text-center font-bold text-primary">{item.average}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary" className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )

  const TeacherWorkspace = () => (
    <div className="space-y-6 mt-4">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-purple-500 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <PenTool className="w-5 h-5 text-purple-600" /> Correção de Atividades
            </CardTitle>
            <CardDescription>
              Trabalhos submetidos via plataforma EAD aguardando avaliação.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y border-t">
              {MOCK_CORRECTIONS.map((c) => (
                <div key={c.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                  <div>
                    <p className="font-semibold text-sm text-slate-900">{c.student}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.task} • Enviado: {c.submittedAt}
                    </p>
                  </div>
                  <div>
                    {c.status === 'pending' ? (
                      <Button
                        size="sm"
                        onClick={() =>
                          toast.success(`Interface de correção aberta para ${c.student}`)
                        }
                      >
                        Corrigir
                      </Button>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" /> Nota: {c.grade}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-blue-600" /> Lançamento na Planilha Base
            </CardTitle>
            <CardDescription>Fechamento de médias bimestrais para a Secretaria.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Turma e Disciplina</Label>
                <Select defaultValue="9a">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9a">9º Ano A - Biologia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Bimestre</Label>
                <Select defaultValue="2">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2º Bimestre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Abrir Planilha de Notas (Grade Sheet)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Avaliação & Desempenho</h2>
        <p className="text-muted-foreground">
          {isTeacher
            ? 'Motor de avaliação: corrija tarefas e consolide as médias bimestrais.'
            : 'Portal de performance: acompanhe suas notas e feedback dos professores.'}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          {isTeacher && <TabsTrigger value="correction">Workspace do Professor</TabsTrigger>}
          {(isStudentOrParent || isTeacher) && (
            <TabsTrigger value="bulletin">Boletins (Consulta)</TabsTrigger>
          )}
        </TabsList>

        {isTeacher && (
          <TabsContent value="correction">
            <TeacherWorkspace />
          </TabsContent>
        )}

        <TabsContent value="bulletin">
          {isTeacher && (
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border mt-4">
              <Label className="whitespace-nowrap font-semibold">Consultar boletim de:</Label>
              <Input placeholder="Matrícula ou Nome do Aluno..." className="max-w-xs" />
              <Button variant="secondary">Buscar</Button>
            </div>
          )}
          <StudentBulletin />
        </TabsContent>
      </Tabs>
    </div>
  )
}
