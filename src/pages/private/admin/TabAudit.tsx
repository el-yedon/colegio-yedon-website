import { useState, useEffect } from 'react'
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
import { supabase } from '@/lib/supabase/client'

export default function TabAudit() {
  const user = useAuthStore((s) => s.user)
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    const fetchLogs = async () => {
      const { data } = await supabase
        .from('logs_auditoria')
        .select(`*, perfis(email, papel)`)
        .order('criado_em', { ascending: false })
        .limit(100)
      if (data) setLogs(data)
    }
    fetchLogs()
  }, [])

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
                {logs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Nenhum registro de auditoria encontrado.
                    </TableCell>
                  </TableRow>
                )}
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-xs whitespace-nowrap text-muted-foreground">
                      {new Date(log.criado_em).toLocaleString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-sm text-slate-800">
                        {log.perfis?.email || 'Sistema'}
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {log.perfis?.papel || ''}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          log.acao === 'DELETE'
                            ? 'destructive'
                            : log.acao === 'CREATE'
                              ? 'default'
                              : 'secondary'
                        }
                      >
                        {log.acao}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-medium">{log.recurso}</TableCell>
                    <TableCell className="text-sm text-slate-600">{log.detalhes}</TableCell>
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
