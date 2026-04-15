import { useAuthStore } from '@/stores/useAuthStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, CreditCard, Receipt } from 'lucide-react'

const MOCK_FINANCIAL_DATA = [
  {
    id: 1,
    item: 'Mensalidade - Janeiro/2026',
    dueDate: '2026-01-10',
    amount: 1250.0,
    status: 'paid',
  },
  {
    id: 2,
    item: 'Mensalidade - Fevereiro/2026',
    dueDate: '2026-02-10',
    amount: 1250.0,
    status: 'paid',
  },
  {
    id: 3,
    item: 'Mensalidade - Março/2026',
    dueDate: '2026-03-10',
    amount: 1250.0,
    status: 'paid',
  },
  {
    id: 4,
    item: 'Mensalidade - Abril/2026',
    dueDate: '2026-04-10',
    amount: 1250.0,
    status: 'pending',
  },
  {
    id: 5,
    item: 'Material Didático - 1º Semestre',
    dueDate: '2026-01-15',
    amount: 850.0,
    status: 'paid',
  },
  {
    id: 6,
    item: 'Excursão Museu de Ciências',
    dueDate: '2026-04-20',
    amount: 120.0,
    status: 'pending',
  },
]

export default function Financial() {
  const user = useAuthStore((state) => state.user)
  const isStudentOrParent = user?.role === 'student' || user?.role === 'parent'
  const isManagement = ['master', 'director', 'admin'].includes(user?.role || '')

  if (!isStudentOrParent && !isManagement) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Acesso restrito. Módulo financeiro disponível apenas para responsáveis, alunos ou diretoria.
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200">
            Pago
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">
            Pendente
          </Badge>
        )
      case 'late':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">
            Atrasado
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(dateString))
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Painel Financeiro</h2>
          <p className="text-muted-foreground">
            Acompanhe histórico de pagamentos, mensalidades e taxas extras.
          </p>
        </div>
        {isStudentOrParent && (
          <Button className="bg-primary text-primary-foreground">
            <Receipt className="mr-2 h-4 w-4" />
            Declaração de Quitação
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pago (2026)</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{formatCurrency(4600)}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo Vencimento</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{formatCurrency(1250)}</div>
            <p className="text-xs text-muted-foreground">Vence em 10/04/2026</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Extrato Financeiro</CardTitle>
          <CardDescription>
            {isManagement
              ? 'Visão gerencial geral.'
              : `Mostrando dados financeiros vinculados a: ${user?.name}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Descrição do Item</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_FINANCIAL_DATA.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.item}</TableCell>
                  <TableCell>{formatDate(item.dueDate)}</TableCell>
                  <TableCell>{formatCurrency(item.amount)}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    {item.status === 'pending' ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        <CreditCard className="mr-2 h-4 w-4" /> Pagar
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-slate-600 hover:text-slate-900"
                      >
                        <Download className="mr-2 h-4 w-4" /> Recibo
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
