import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { logAudit } from '@/lib/audit'
import { Shield, Plus, Edit2, Trash2 } from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'

type Role = {
  id: string
  nome: string
  slug: string
  criado_em: string
  escola_id: string | null
}

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [nome, setNome] = useState('')
  const { toast } = useToast()
  const authUser = useAuthStore((s) => s.user)
  const tenantId = authUser?.tenantId || (authUser as any)?.escola_id || null

  useEffect(() => {
    fetchRoles()
  }, [authUser])

  const fetchRoles = async () => {
    try {
      setLoading(true)
      let query = supabase.from('papeis_acesso').select('*').order('criado_em', { ascending: true })

      if (authUser?.role !== 'master' && tenantId) {
        query = query.or(`escola_id.eq.${tenantId},escola_id.is.null`)
      }

      const { data, error } = await query
      if (error) throw error
      setRoles(data || [])
    } catch (error: any) {
      toast({
        title: 'Erro ao buscar níveis de acesso',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const slug = nome
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')

      if (editingRole) {
        const { error } = await supabase
          .from('papeis_acesso')
          .update({ nome, slug })
          .eq('id', editingRole.id)

        if (error) throw error
        await logAudit('update', 'papeis_acesso', `Atualizou nível de acesso: ${nome}`)
        toast({ title: 'Nível de acesso atualizado!' })
      } else {
        const { error } = await supabase
          .from('papeis_acesso')
          .insert({ nome, slug, escola_id: tenantId })

        if (error) throw error
        await logAudit('insert', 'papeis_acesso', `Criou nível de acesso: ${nome}`)
        toast({ title: 'Nível de acesso criado!' })
      }

      setIsDialogOpen(false)
      fetchRoles()
    } catch (error: any) {
      toast({ title: 'Erro ao salvar', description: error.message, variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string, roleName: string) => {
    if (!confirm(`Deseja realmente excluir o nível de acesso "${roleName}"?`)) return
    try {
      const { error } = await supabase.from('papeis_acesso').delete().eq('id', id)
      if (error) throw error

      await logAudit('delete', 'papeis_acesso', `Excluiu nível de acesso: ${roleName}`)
      toast({ title: 'Nível de acesso excluído!' })
      fetchRoles()
    } catch (error: any) {
      toast({ title: 'Erro ao excluir', description: error.message, variant: 'destructive' })
    }
  }

  const openDialog = (role?: Role) => {
    if (role) {
      setEditingRole(role)
      setNome(role.nome)
    } else {
      setEditingRole(null)
      setNome('')
    }
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Níveis de Acesso</h2>
          <p className="text-muted-foreground">
            Gerencie os perfis de acesso e suas nomenclaturas no sistema.
          </p>
        </div>
        <Button onClick={() => openDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Nível
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-3">Nome</th>
                <th className="px-6 py-3">Slug / Identificador</th>
                <th className="px-6 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-slate-500">
                    Carregando...
                  </td>
                </tr>
              ) : roles.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-slate-500">
                    Nenhum nível de acesso encontrado.
                  </td>
                </tr>
              ) : (
                roles.map((role) => (
                  <tr key={role.id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-500" />
                      {role.nome}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{role.slug}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDialog(role)}
                          disabled={!role.escola_id && authUser?.role !== 'master'}
                          title={
                            !role.escola_id && authUser?.role !== 'master'
                              ? 'Apenas leitura (Global)'
                              : 'Editar'
                          }
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(role.id, role.nome)}
                          disabled={!role.escola_id && authUser?.role !== 'master'}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          title={
                            !role.escola_id && authUser?.role !== 'master'
                              ? 'Apenas leitura (Global)'
                              : 'Excluir'
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingRole ? 'Editar Nível de Acesso' : 'Novo Nível de Acesso'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Nível</Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Coordenador"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                O identificador do sistema será:{' '}
                <strong className="font-mono">
                  {nome
                    ? nome
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '')
                    : '...'}
                </strong>
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">{editingRole ? 'Salvar Alterações' : 'Criar Nível'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
