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
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
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
import { Search, Edit2, ShieldAlert, Lock, Image as ImageIcon, Plus } from 'lucide-react'
import { toast } from 'sonner'
import PhotoEditor from '@/components/PhotoEditor'
import { useAuthStore } from '@/stores/useAuthStore'

type User = {
  id: string
  name: string
  email: string
  phone: string
  document: string
  address: string
  role: string
  status: 'Ativo' | 'Inativo'
  photo: string
  escola_id?: string
}

const roleMapToDb: Record<string, string> = {
  Master: 'master',
  Administrador: 'admin',
  Diretor: 'director',
  Coordenador: 'coordinator',
  Professor: 'teacher',
  Aluno: 'student',
  Responsável: 'parent',
}

const roleMapFromDb: Record<string, string> = {
  master: 'Master',
  admin: 'Administrador',
  director: 'Diretor',
  coordinator: 'Coordenador',
  teacher: 'Professor',
  student: 'Aluno',
  parent: 'Responsável',
}

export default function TabUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('details')
  const [currentUserRole, setCurrentUserRole] = useState('Master')
  const [deletePassword, setDeletePassword] = useState('')
  const [escolas, setEscolas] = useState<{ id: string; nome: string }[]>([])

  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Aluno',
    phone: '',
    document: '',
    address: '',
    escola_id: '',
  })

  const authUser = useAuthStore((state) => state.user)
  const isActualMaster = authUser?.role === 'master'

  useEffect(() => {
    fetchUsers()
    if (isActualMaster) {
      fetchEscolas()
    }
  }, [isActualMaster])

  const fetchEscolas = async () => {
    const { data } = await supabase.from('escolas').select('id, nome').order('nome')
    if (data) setEscolas(data)
  }

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('perfis')
      .select('*')
      .order('criado_em', { ascending: false })
    if (data) {
      setUsers(
        data.map((p) => ({
          id: p.id,
          name: p.nome,
          email: p.email,
          phone: p.telefone || '',
          document: p.cpf || '',
          address: p.logradouro || '',
          role: roleMapFromDb[p.papel] || p.papel,
          status: (p as any).status || 'Ativo',
          photo: p.avatar || '',
          escola_id: p.escola_id || '',
        })),
      )
    }
  }

  const hasAccess = ['Master', 'Diretor', 'Coordenador', 'Administrador'].includes(currentUserRole)
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  )

  const openEdit = (user: User) => {
    setSelectedUser(user)
    setEditingUser({ ...user })
    setIsSheetOpen(true)
    setActiveTab('details')
  }

  const handleSaveDetails = async () => {
    if (!editingUser) return
    const { error } = await supabase
      .from('perfis')
      .update({
        nome: editingUser.name,
        email: editingUser.email,
        telefone: editingUser.phone,
        cpf: editingUser.document,
        logradouro: editingUser.address,
        papel: roleMapToDb[editingUser.role] || editingUser.role,
        status: editingUser.status,
        ...(isActualMaster && editingUser.escola_id ? { escola_id: editingUser.escola_id } : {}),
      } as any)
      .eq('id', editingUser.id)

    if (error) {
      toast.error('Erro ao atualizar cadastro')
      return
    }

    let auditDetails = `Perfil de ${editingUser.name} atualizado.`
    if (selectedUser?.role !== editingUser.role) {
      auditDetails = `Nível de acesso de ${editingUser.name} alterado de ${selectedUser?.role} para ${editingUser.role}.`
    }

    await logAudit('UPDATE', 'Usuários', auditDetails)
    toast.success('Cadastro atualizado com sucesso!')
    fetchUsers()
    setIsSheetOpen(false)
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) return
    if (deletePassword !== 'yedon123') {
      toast.error('Senha de autorização incorreta.')
      return
    }
    const { error } = await supabase.from('perfis').delete().eq('id', selectedUser.id)
    if (error) {
      toast.error('Erro ao excluir usuário')
      return
    }
    await logAudit('DELETE', 'Usuários', `Perfil de ${selectedUser.name} excluído.`)
    toast.success('Usuário excluído permanentemente.')
    fetchUsers()
    setIsSheetOpen(false)
    setDeletePassword('')
  }

  const handleSavePhoto = async (userId: string, newPhotoUrl: string) => {
    await supabase.from('perfis').update({ avatar: newPhotoUrl }).eq('id', userId)
    await logAudit('UPDATE', 'Usuários', `Foto de perfil atualizada.`)
    fetchUsers()
    if (selectedUser?.id === userId) {
      setSelectedUser((p) => (p ? { ...p, photo: newPhotoUrl } : p))
      setEditingUser((p) => (p ? { ...p, photo: newPhotoUrl } : p))
    }
    toast.success('Foto atualizada com sucesso!')
    setActiveTab('details')
  }

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error('Preencha os campos obrigatórios (Nome, Email, Senha).')
      return
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).{6,}$/
    if (!passwordRegex.test(newUser.password)) {
      toast.error(
        'A senha deve ter no mínimo 6 caracteres, contendo letras, números e caracteres especiais (@, &, ., %, etc).',
      )
      return
    }

    setIsCreating(true)
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()
      if (!authUser) throw new Error('Não autenticado')

      const { data: profile } = await supabase
        .from('perfis')
        .select('escola_id')
        .eq('id', authUser.id)
        .single()

      const tenantId = isActualMaster && newUser.escola_id ? newUser.escola_id : profile?.escola_id

      const res = await supabase.functions.invoke('create-user', {
        body: {
          email: newUser.email,
          password: newUser.password,
          name: newUser.name,
          role: roleMapToDb[newUser.role] || newUser.role,
          tenantId,
          userData: {
            cpf: newUser.document,
            telefone: newUser.phone,
            logradouro: newUser.address,
          },
        },
      })

      if (res.error) throw new Error(res.error.message || 'Erro ao criar usuário')

      await logAudit('CREATE', 'Usuários', `Novo usuário ${newUser.name} criado.`)
      toast.success('Usuário criado com sucesso!')
      setIsCreateSheetOpen(false)
      fetchUsers()
      setNewUser({
        name: '',
        email: '',
        password: '',
        role: 'Aluno',
        phone: '',
        document: '',
        address: '',
        escola_id: '',
      })
    } catch (err: any) {
      toast.error(err.message || 'Erro ao criar usuário')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in pt-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-blue-950 text-white p-4 rounded-xl border-l-4 border-yellow-500 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-900 rounded-lg">
            <ShieldAlert className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Controle de Acesso do Diretório</h3>
            <p className="text-xs text-blue-200 mt-0.5">
              {hasAccess
                ? 'Permissão concedida para gerenciar dados cadastrais. Ações críticas exigem senha.'
                : 'Acesso negado. Requer nível Master, Diretor ou Coordenador.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-blue-900/50 p-2 rounded-lg border border-blue-800">
          <span className="text-xs font-medium text-blue-200 whitespace-nowrap">
            Simular Nível:
          </span>
          <Select value={currentUserRole} onValueChange={setCurrentUserRole}>
            <SelectTrigger className="w-[140px] h-8 bg-blue-950 border-blue-800 text-xs text-white focus:ring-0 focus:ring-offset-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Master">Master</SelectItem>
              <SelectItem value="Diretor">Diretor</SelectItem>
              <SelectItem value="Coordenador">Coordenador</SelectItem>
              <SelectItem value="Professor">Professor</SelectItem>
              <SelectItem value="Aluno">Aluno</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {!hasAccess ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border rounded-xl bg-slate-50 border-dashed animate-fade-in">
          <Lock className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-blue-950">Acesso Restrito</h3>
          <p className="text-muted-foreground max-w-md mt-2 text-sm">
            Apenas usuários de gestão (<strong>Master, Diretor, Coordenador</strong>) têm permissão
            para visualizar e editar o diretório de usuários.
          </p>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou email..."
                className="pl-9 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button
              className="bg-blue-950 text-yellow-500 hover:bg-blue-900 w-full sm:w-auto"
              onClick={() => setIsCreateSheetOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" /> Novo Usuário
            </Button>
          </div>

          <div className="border rounded-xl bg-card overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[300px]">Usuário</TableHead>
                  <TableHead>Papel</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Nenhum usuário encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="flex items-center gap-3 py-4">
                        <Avatar className="h-10 w-10 border shadow-sm rounded-md">
                          <AvatarImage src={user.photo} className="object-cover" />
                          <AvatarFallback className="rounded-md bg-blue-50 text-blue-950 font-semibold">
                            {user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-xs text-muted-foreground">{user.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-slate-50">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.status === 'Ativo' ? 'default' : 'secondary'}
                          className={
                            user.status === 'Ativo' ? 'bg-green-600 hover:bg-green-700' : ''
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          onClick={() => openEdit(user)}
                        >
                          <Edit2 className="w-4 h-4 mr-2" /> Gerenciar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Sheet para Criar Novo Usuário */}
      <Sheet open={isCreateSheetOpen} onOpenChange={setIsCreateSheetOpen}>
        <SheetContent className="sm:max-w-xl w-full overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl text-blue-950">Novo Usuário</SheetTitle>
            <SheetDescription>
              Preencha os dados abaixo para cadastrar um novo usuário no sistema.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome Completo *</Label>
              <Input
                value={newUser.name}
                onChange={(e) => setNewUser((p) => ({ ...p, name: e.target.value }))}
                placeholder="Ex: João da Silva"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser((p) => ({ ...p, email: e.target.value }))}
                  placeholder="joao@exemplo.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Senha Temporária *</Label>
                <Input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser((p) => ({ ...p, password: e.target.value }))}
                  placeholder="Letras, números e especial (@,&,.)"
                />
                <p className="text-[10px] text-muted-foreground leading-tight">
                  Mín. 6 caracteres (letras, números e especial). O usuário será forçado a trocá-la
                  no primeiro acesso.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input
                  value={newUser.phone}
                  onChange={(e) => setNewUser((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="space-y-2">
                <Label>Documento (CPF/RG)</Label>
                <Input
                  value={newUser.document}
                  onChange={(e) => setNewUser((p) => ({ ...p, document: e.target.value }))}
                  placeholder="000.000.000-00"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nível de Acesso *</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(v) => setNewUser((p) => ({ ...p, role: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Master">Master</SelectItem>
                    <SelectItem value="Administrador">Administrador</SelectItem>
                    <SelectItem value="Diretor">Diretor</SelectItem>
                    <SelectItem value="Coordenador">Coordenador</SelectItem>
                    <SelectItem value="Professor">Professor</SelectItem>
                    <SelectItem value="Aluno">Aluno</SelectItem>
                    <SelectItem value="Responsável">Responsável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {isActualMaster && (
                <div className="space-y-2">
                  <Label>Organização (SaaS) *</Label>
                  <Select
                    value={newUser.escola_id}
                    onValueChange={(v) => setNewUser((p) => ({ ...p, escola_id: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a escola" />
                    </SelectTrigger>
                    <SelectContent>
                      {escolas.map((e) => (
                        <SelectItem key={e.id} value={e.id}>
                          {e.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Endereço Completo</Label>
              <Textarea
                value={newUser.address}
                onChange={(e) => setNewUser((p) => ({ ...p, address: e.target.value }))}
                rows={2}
                placeholder="Rua, Número, Bairro, Cidade - UF"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsCreateSheetOpen(false)}
                disabled={isCreating}
              >
                Cancelar
              </Button>
              <Button
                className="bg-blue-950 text-yellow-500 hover:bg-blue-900"
                onClick={handleCreateUser}
                disabled={isCreating}
              >
                {isCreating ? 'Criando...' : 'Criar Usuário'}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Sheet de Edição de Usuário */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-2xl w-full overflow-y-auto p-0 flex flex-col">
          <div className="p-6 border-b bg-muted/20">
            <SheetHeader>
              <SheetTitle className="text-2xl text-blue-950">Ficha de Cadastro</SheetTitle>
              <SheetDescription>
                Edite as informações detalhadas e a foto oficial do usuário.
              </SheetDescription>
            </SheetHeader>
          </div>

          {selectedUser && editingUser && (
            <div className="p-6 flex-1">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full h-full flex flex-col"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-muted rounded-lg">
                  <TabsTrigger value="details" className="rounded-md">
                    Dados Pessoais
                  </TabsTrigger>
                  <TabsTrigger
                    value="photo"
                    className="rounded-md data-[state=active]:bg-blue-950 data-[state=active]:text-yellow-500 flex items-center gap-2"
                  >
                    <ImageIcon className="w-4 h-4" /> Edição de Foto (3:4)
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="details"
                  className="space-y-4 animate-fade-in focus-visible:outline-none"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 flex-shrink-0 flex flex-col items-center gap-4">
                      <div className="w-full aspect-[3/4] rounded-xl border-2 border-blue-950/20 overflow-hidden bg-white relative shadow-sm">
                        {editingUser.photo ? (
                          <img
                            src={editingUser.photo}
                            alt={editingUser.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-slate-50">
                            <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
                            <span className="text-sm font-medium opacity-50">Sem foto</span>
                          </div>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-blue-950 border-blue-950/20 hover:bg-blue-50"
                        onClick={() => setActiveTab('photo')}
                      >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Alterar Foto
                      </Button>
                    </div>

                    <div className="flex-1 grid gap-4 bg-slate-50 p-5 rounded-xl border">
                      <div className="space-y-2">
                        <Label>Nome Completo</Label>
                        <Input
                          value={editingUser.name}
                          onChange={(e) =>
                            setEditingUser((p) => (p ? { ...p, name: e.target.value } : null))
                          }
                          className="bg-white"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input
                            value={editingUser.email}
                            onChange={(e) =>
                              setEditingUser((p) => (p ? { ...p, email: e.target.value } : null))
                            }
                            className="bg-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Telefone</Label>
                          <Input
                            value={editingUser.phone}
                            onChange={(e) =>
                              setEditingUser((p) => (p ? { ...p, phone: e.target.value } : null))
                            }
                            className="bg-white"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Documentos Pessoais (CPF/RG)</Label>
                          <Input
                            value={editingUser.document}
                            onChange={(e) =>
                              setEditingUser((p) => (p ? { ...p, document: e.target.value } : null))
                            }
                            className="bg-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Nível de Acesso</Label>
                          <Select
                            value={editingUser.role}
                            onValueChange={(v) =>
                              setEditingUser((p) => (p ? { ...p, role: v } : null))
                            }
                          >
                            <SelectTrigger className="bg-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Master">Master</SelectItem>
                              <SelectItem value="Administrador">Administrador</SelectItem>
                              <SelectItem value="Diretor">Diretor</SelectItem>
                              <SelectItem value="Coordenador">Coordenador</SelectItem>
                              <SelectItem value="Professor">Professor</SelectItem>
                              <SelectItem value="Aluno">Aluno</SelectItem>
                              <SelectItem value="Responsável">Responsável</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      {isActualMaster && (
                        <div className="space-y-2">
                          <Label>Organização (Tenant)</Label>
                          <Select
                            value={editingUser.escola_id}
                            onValueChange={(v) =>
                              setEditingUser((p) => (p ? { ...p, escola_id: v } : null))
                            }
                          >
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Sem organização" />
                            </SelectTrigger>
                            <SelectContent>
                              {escolas.map((e) => (
                                <SelectItem key={e.id} value={e.id}>
                                  {e.nome}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label>Endereço Completo</Label>
                        <Textarea
                          value={editingUser.address}
                          onChange={(e) =>
                            setEditingUser((p) => (p ? { ...p, address: e.target.value } : null))
                          }
                          className="bg-white resize-none"
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Status da Conta</Label>
                        <Select
                          value={editingUser.status}
                          onValueChange={(v: 'Ativo' | 'Inativo') =>
                            setEditingUser((p) => (p ? { ...p, status: v } : null))
                          }
                        >
                          <SelectTrigger className="bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ativo">Ativo</SelectItem>
                            <SelectItem value="Inativo">Inativo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-6">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                        >
                          Excluir Perfil
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Autorização Necessária</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação é irreversível. Todos os dados cadastrais do usuário{' '}
                            <strong>{selectedUser.name}</strong> serão permanentemente removidos.
                            <br />
                            <br />
                            Por motivos de segurança, insira sua senha de autorização (dica:
                            yedon123):
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="py-4">
                          <Input
                            type="password"
                            placeholder="Senha de autorização"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                          />
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteUser}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Sim, Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button
                      className="flex-1 bg-blue-950 hover:bg-blue-900 text-yellow-500"
                      onClick={handleSaveDetails}
                    >
                      Salvar Alterações
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="photo" className="focus-visible:outline-none h-full">
                  {activeTab === 'photo' && (
                    <PhotoEditor
                      initialImage={editingUser.photo}
                      onSave={(img) => handleSavePhoto(selectedUser.id, img)}
                      onCancel={() => setActiveTab('details')}
                    />
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
