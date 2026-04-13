import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/stores/useAuthStore'
import { Badge } from '@/components/ui/badge'
import { ShieldAlert } from 'lucide-react'

const AUDIT_LOGS = [
  {
    id: 1,
    userId: 'master@yedon.edu.br',
    role: 'Master',
    action: 'DELETE',
    resource: 'User',
    description: 'Removeu o usuário juliana@yedon.edu.br',
    timestamp: '2026-04-04 10:23:45',
  },
  {
    id: 2,
    userId: 'diretor@yedon.edu.br',
    role: 'Diretor',
    action: 'UPDATE',
    resource: 'Grade',
    description: 'Alterou nota de Matemática para aluno 2026001',
    timestamp: '2026-04-03 16:45:12',
  },
  {
    id: 3,
    userId: 'master@yedon.edu.br',
    role: 'Master',
    action: 'CREATE',
    resource: 'Class',
    description: 'Criou nova turma: 1ª Série B - Noturno',
    timestamp: '2026-04-03 14:30:00',
  },
  {
    id: 4,
    userId: 'admin@yedon.edu.br',
    role: 'Admin',
    action: 'UPDATE',
    resource: 'CMS',
    description: 'Atualizou o banner da página inicial',
    timestamp: '2026-04-02 09:15:22',
  },
]

export default function TabAudit() {
  const user = useAuthStore((s) => s.user)

  const isMaster = user?.role === 'master' || user?.role === 'admin'

  if (!isMaster) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center border rounded-xl bg-slate-50 border-dashed animate-fade-in mt-4">
        <ShieldAlert className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-lg font-semibold text-blue-950">Acesso Restrito: Auditoria</h3>
        <p className="text-muted-foreground max-w-md mt-2 text-sm">
          Apenas usuários com nível <strong>Master</strong> têm permissão para visualizar os logs de
          auditoria e segurança do sistema.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in pt-4">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Logs de Auditoria do Sistema</CardTitle>
          <CardDescription>
            Registro imutável de todas as ações críticas e alterações realizadas no portal.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Data / Hora</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Recurso</TableHead>
                  <TableHead>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {AUDIT_LOGS.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-xs whitespace-nowrap text-muted-foreground">
                      {log.timestamp}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-sm text-slate-800">{log.userId}</div>
                      <div className="text-xs text-muted-foreground">{log.role}</div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          log.action === 'DELETE'
                            ? 'destructive'
                            : log.action === 'CREATE'
                              ? 'default'
                              : 'secondary'
                        }
                      >
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-medium">{log.resource}</TableCell>
                    <TableCell className="text-sm text-slate-600">{log.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
