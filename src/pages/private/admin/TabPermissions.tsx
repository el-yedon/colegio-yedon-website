import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'
import { useAuthStore } from '@/stores/useAuthStore'
import { toast } from 'sonner'
import { logAudit } from '@/lib/audit'
import { ShieldAlert, Save } from 'lucide-react'

const MODULES = [
  { id: 'usuarios', name: 'Usuários' },
  { id: 'academico', name: 'Acadêmico' },
  { id: 'financeiro', name: 'Financeiro' },
  { id: 'ead', name: 'EAD' },
  { id: 'conteudo', name: 'Gestão de Conteúdo (CMS)' },
  { id: 'configuracoes', name: 'Configurações' },
]

const ROLES = [
  { id: 'admin', name: 'Administrador' },
  { id: 'director', name: 'Diretor' },
  { id: 'coordinator', name: 'Coordenador' },
  { id: 'teacher', name: 'Professor' },
  { id: 'parent', name: 'Responsável' },
  { id: 'student', name: 'Aluno' },
]

export default function TabPermissions() {
  const user = useAuthStore((s) => s.user)
  const isMasterOrAdmin = user?.role === 'master' || user?.role === 'admin'
  const [selectedRole, setSelectedRole] = useState<string>('teacher')
  const [permissions, setPermissions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedRole && isMasterOrAdmin) {
      loadPermissions()
    }
  }, [selectedRole, isMasterOrAdmin])

  const loadPermissions = async () => {
    setLoading(true)
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData.user?.id
    if (!userId) return

    const { data: profile } = await supabase
      .from('perfis')
      .select('escola_id')
      .eq('id', userId)
      .single()
    const escolaId = profile?.escola_id

    const query = supabase.from('permissoes_grupo').select('*').eq('papel', selectedRole)

    if (escolaId) {
      query.eq('escola_id', escolaId)
    } else {
      query.is('escola_id', null)
    }

    const { data } = await query

    const loadedPerms = MODULES.map((mod) => {
      const existing = data?.find((p) => p.modulo === mod.id)
      return {
        modulo: mod.id,
        ler: existing?.ler || false,
        inserir: existing?.inserir || false,
        editar: existing?.editar || false,
        excluir: existing?.excluir || false,
        id: existing?.id || null,
      }
    })
    setPermissions(loadedPerms)
    setLoading(false)
  }

  const handleToggle = (
    moduloId: string,
    field: 'ler' | 'inserir' | 'editar' | 'excluir',
    checked: boolean,
  ) => {
    setPermissions((prev) =>
      prev.map((p) => (p.modulo === moduloId ? { ...p, [field]: checked } : p)),
    )
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const { data: userData } = await supabase.auth.getUser()
      const userId = userData.user?.id
      if (!userId) throw new Error('Não autenticado')

      const { data: profile } = await supabase
        .from('perfis')
        .select('escola_id')
        .eq('id', userId)
        .single()
      const escolaId = profile?.escola_id

      for (const p of permissions) {
        const payload = {
          escola_id: escolaId,
          papel: selectedRole,
          modulo: p.modulo,
          ler: p.ler,
          inserir: p.inserir,
          editar: p.editar,
          excluir: p.excluir,
        }

        if (p.id) {
          const { error } = await supabase.from('permissoes_grupo').update(payload).eq('id', p.id)
          if (error) throw error
          await logAudit(
            'UPDATE',
            'permissoes_grupo',
            `Atualizou permissões do papel ${selectedRole} no módulo ${p.modulo}`,
          )
        } else {
          const { error } = await supabase.from('permissoes_grupo').insert(payload)
          if (error) throw error
          await logAudit(
            'CREATE',
            'permissoes_grupo',
            `Criou permissões do papel ${selectedRole} no módulo ${p.modulo}`,
          )
        }
      }
      toast.success('Permissões salvas com sucesso!')
      await loadPermissions()
    } catch (error: any) {
      toast.error('Erro ao salvar permissões: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isMasterOrAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center border rounded-xl bg-slate-50 border-dashed animate-fade-in mt-4">
        <ShieldAlert className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-lg font-semibold text-blue-950">Acesso Restrito: Permissões</h3>
        <p className="text-muted-foreground max-w-md mt-2 text-sm">
          Apenas usuários com nível <strong>Admin ou Master</strong> têm permissão para gerenciar as
          permissões do sistema.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in pt-4">
      <Card className="shadow-sm border-t-4 border-t-blue-950">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-blue-950">Matriz de Permissões (RBAC)</CardTitle>
            <CardDescription>
              Defina o nível de acesso para cada grupo de usuários em diferentes módulos do sistema.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o papel" />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-blue-950 hover:bg-blue-900"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          <div className="border rounded-md overflow-hidden bg-white">
            <Table>
              <TableHeader className="bg-slate-50 border-b">
                <TableRow>
                  <TableHead>Módulo</TableHead>
                  <TableHead className="text-center w-[100px]">Ler</TableHead>
                  <TableHead className="text-center w-[100px]">Inserir</TableHead>
                  <TableHead className="text-center w-[100px]">Editar</TableHead>
                  <TableHead className="text-center w-[100px]">Excluir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.map((p) => {
                  const moduleName = MODULES.find((m) => m.id === p.modulo)?.name
                  return (
                    <TableRow key={p.modulo}>
                      <TableCell className="font-medium text-slate-800">{moduleName}</TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={p.ler}
                          onCheckedChange={(c) => handleToggle(p.modulo, 'ler', c === true)}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={p.inserir}
                          onCheckedChange={(c) => handleToggle(p.modulo, 'inserir', c === true)}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={p.editar}
                          onCheckedChange={(c) => handleToggle(p.modulo, 'editar', c === true)}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={p.excluir}
                          onCheckedChange={(c) => handleToggle(p.modulo, 'excluir', c === true)}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
