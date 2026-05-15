import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { logAudit } from '@/lib/audit'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Building2, Edit2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'

type Tenant = {
  id: string
  nome: string
  criado_em: string
}

export default function TabTenants() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [search, setSearch] = useState('')
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null)
  const [nome, setNome] = useState('')

  useEffect(() => {
    fetchTenants()
  }, [])

  const fetchTenants = async () => {
    const { data } = await supabase.from('escolas').select('*').order('nome')
    if (data) setTenants(data)
  }

  const handleSave = async () => {
    if (!nome) {
      toast.error('O nome da organização é obrigatório.')
      return
    }

    if (editingTenant) {
      const { error } = await supabase.from('escolas').update({ nome }).eq('id', editingTenant.id)
      if (error) {
        toast.error('Erro ao atualizar organização.')
        return
      }
      toast.success('Organização atualizada!')
      await logAudit('UPDATE', 'Organizações', `Organização ${nome} atualizada.`)
    } else {
      const { error } = await supabase.from('escolas').insert({ nome })
      if (error) {
        toast.error('Erro ao criar organização.')
        return
      }
      toast.success('Organização criada com sucesso!')
      await logAudit('CREATE', 'Organizações', `Organização ${nome} criada.`)
    }

    setIsSheetOpen(false)
    fetchTenants()
  }

  const openNew = () => {
    setEditingTenant(null)
    setNome('')
    setIsSheetOpen(true)
  }

  const openEdit = (tenant: Tenant) => {
    setEditingTenant(tenant)
    setNome(tenant.nome)
    setIsSheetOpen(true)
  }

  const filtered = tenants.filter((t) => t.nome.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6 animate-fade-in pt-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar organização..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button className="bg-blue-950 text-yellow-500 hover:bg-blue-900" onClick={openNew}>
          <Plus className="w-4 h-4 mr-2" /> Nova Organização
        </Button>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Organização (Tenant)</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Data de Criação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  Nenhuma organização encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-950" />
                    {t.nome}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground font-mono">{t.id}</TableCell>
                  <TableCell className="text-sm">
                    {new Date(t.criado_em).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(t)}>
                      <Edit2 className="w-4 h-4 mr-2" /> Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{editingTenant ? 'Editar Organização' : 'Nova Organização'}</SheetTitle>
            <SheetDescription>
              {editingTenant
                ? 'Altere os dados do tenant.'
                : 'Crie um novo tenant no sistema SaaS.'}
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label>Nome da Organização</Label>
              <Input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Colégio Yedon"
              />
            </div>
            <Button
              className="w-full bg-blue-950 text-yellow-500 hover:bg-blue-900 mt-4"
              onClick={handleSave}
            >
              Salvar
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
