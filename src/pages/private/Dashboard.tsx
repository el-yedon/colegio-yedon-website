import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Calendar as CalendarIcon,
  Bell,
  FileText,
  CheckCircle2,
  TrendingUp,
  Clock,
  Users,
  Building,
} from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'

export default function Dashboard() {
  const user = useAuthStore((state) => state.user)

  const isManagement = ['master', 'director', 'coordinator', 'admin'].includes(user?.role || '')
  const isTeacher = user?.role === 'teacher'
  const isStudentOrParent = user?.role === 'student' || user?.role === 'parent'

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Painel de Controle</h2>
        <p className="text-muted-foreground">Visão geral das suas atividades no Colégio Yedon.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isStudentOrParent && (
          <>
            <Card className="border-l-4 border-l-blue-500 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Frequência Atual</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">94.5%</div>
                <p className="text-xs text-muted-foreground">+2% em relação ao mês anterior</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-emerald-500 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">8.2</div>
                <p className="text-xs text-muted-foreground">Acima da média da turma (7.5)</p>
              </CardContent>
            </Card>
          </>
        )}

        {isTeacher && (
          <>
            <Card className="border-l-4 border-l-purple-500 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aulas Hoje</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">4 turmas</div>
                <p className="text-xs text-muted-foreground">Próxima aula: 10:20 (9º Ano A)</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-orange-500 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Trabalhos p/ Corrigir</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">28</div>
                <p className="text-xs text-muted-foreground">Prazo encerra em 2 dias</p>
              </CardContent>
            </Card>
          </>
        )}

        {isManagement && (
          <>
            <Card className="border-l-4 border-l-indigo-500 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Turmas Ativas</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">
                  {user?.role === 'coordinator' ? '12' : '42'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {user?.role === 'coordinator' ? 'Na sua coordenação' : 'Em toda a instituição'}
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-rose-500 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Setores Pedagógicos</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">4</div>
                <p className="text-xs text-muted-foreground">
                  Regular, Bilíngue, Técnico, Integral
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Próximas Atividades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: '15/11', title: 'Feriado: Proclamação da República', type: 'Evento' },
                { date: '20/11', title: 'Reunião de Pais e Mestres', type: 'Institucional' },
                { date: '25/11', title: 'Conselho de Classe', type: 'Acadêmico' },
              ].map((item, i) => (
                <div key={i} className="flex items-center p-3 rounded-lg border bg-slate-50/50">
                  <div className="bg-primary/10 text-primary px-3 py-2 rounded-md font-bold text-sm text-center min-w-[70px]">
                    {item.date}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-900">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-secondary" />
              Últimos Avisos
            </CardTitle>
            <CardDescription>Comunicações da coordenação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: 'Rematrícula 2027',
                  desc: 'O período de rematrículas com desconto especial vai até 30/11.',
                  time: 'Há 2 horas',
                },
                {
                  title: 'Feira de Ciências',
                  desc: 'A feira de ciências deste ano será aberta aos pais no dia 05/12.',
                  time: 'Ontem',
                },
              ].map((aviso, i) => (
                <div key={i} className="pb-4 last:pb-0 last:border-0 border-b border-border">
                  <p className="text-sm font-semibold text-slate-800">{aviso.title}</p>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{aviso.desc}</p>
                  <p className="text-xs text-muted-foreground mt-2">{aviso.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
