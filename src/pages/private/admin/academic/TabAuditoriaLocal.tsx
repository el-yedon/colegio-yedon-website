import { useAcademic } from './AcademicContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ShieldCheck } from 'lucide-react'

export function TabAuditoriaLocal() {
  const { state } = useAcademic()

  return (
    <Card className="shadow-sm border-t-4 border-t-blue-950 animate-fade-in">
      <CardHeader>
        <div className="flex items-center gap-2 text-blue-950 mb-1">
          <ShieldCheck className="h-5 w-5 text-amber-500" />
          <CardTitle>Relatório de Alterações (Audit Log)</CardTitle>
        </div>
        <CardDescription>
          Histórico de ações de criação, atualização e exclusão realizadas na estrutura acadêmica.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border border-slate-200 rounded-md overflow-hidden bg-white">
          <Table>
            <TableHeader className="bg-slate-50 border-b">
              <TableRow>
                <TableHead className="w-[200px] text-blue-950 font-semibold">Data e Hora</TableHead>
                <TableHead className="text-blue-950 font-semibold">Ação Realizada</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.auditLogs.map((log: any, i: number) => (
                <TableRow key={i}>
                  <TableCell className="text-xs text-slate-500 font-mono">
                    {new Date(log.date).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-slate-700">{log.action}</TableCell>
                </TableRow>
              ))}
              {state.auditLogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
                    Nenhum registro de auditoria encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
