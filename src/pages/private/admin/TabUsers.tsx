import { useState } from 'react'
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
import { Search, Edit2, ShieldAlert, Lock, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import PhotoEditor from '@/components/PhotoEditor'

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
}

const INITIAL_USERS: User[] = [
  {
    id: '1',
    name: 'Carlos Yedon',
    email: 'master@yedon.edu.br',
    phone: '(11) 99999-9999',
    document: '123.456.789-00',
    address: 'Av. Paulista, 1000 - SP',
    role: 'Master',
    status: 'Ativo',
    photo: 'https://img.usecurling.com/ppl/medium?gender=male&seed=10',
  },
  {
    id: '2',
    name: 'Ana Silva',
    email: 'ana.silva@yedon.edu.br',
    phone: '(11) 98888-8888',
    document: '987.654.321-11',
    address: 'Rua das Flores, 123 - SP',
    role: 'Administrador',
    status: 'Ativo',
    photo: 'https://img.usecurling.com/ppl/medium?gender=female&seed=22',
  },
  {
    id: '3',
    name: 'Roberto Mendes',
    email: 'roberto@yedon.edu.br',
    phone: '(11) 97777-7777',
    document: '111.222.333-44',
    address: 'Av. Brasil, 500 - RJ',
    role: 'Professor',
    status: 'Ativo',
    photo: 'https://img.usecurling.com/ppl/medium?gender=male&seed=33',
  },
  {
    id: '4',
    name: 'Juliana Costa',
    email: 'juliana@yedon.edu.br',
    phone: '(11) 96666-6666',
    document: '555.666.777-88',
    address: 'Rua do Sol, 89 - MG',
    role: 'Responsável',
    status: 'Inativo',
    photo: '',
  },
  {
    id: '5',
    name: 'Lucas Costa',
    email: 'lucas@yedon.edu.br',
    phone: '(11) 95555-5555',
    document: '999.888.777-66',
    address: 'Rua do Sol, 89 - MG',
    role: 'Aluno',
    status: 'Ativo',
    photo: 'https://img.usecurling.com/ppl/medium?gender=male&seed=55',
  },
]

export default function TabUsers() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS)
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('details')
  const [currentUserRole, setCurrentUserRole] = useState('Master')

  const hasAccess = currentUserRole === 'Master' || currentUserRole === 'Administrador'
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

  const handleSaveDetails = () => {
    if (!editingUser) return
    setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)))
    setSelectedUser(editingUser)
    toast.success('Cadastro atualizado com sucesso!')
    setIsSheetOpen(false)
  }

  const handleDeleteUser = () => {
    if (!selectedUser) return
    setUsers(users.filter((u) => u.id !== selectedUser.id))
    toast.success('Usuário excluído permanentemente.')
    setIsSheetOpen(false)
  }

  const handleSavePhoto = (userId: string, newPhotoUrl: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, photo: newPhotoUrl } : u)))
    if (selectedUser?.id === userId) {
      setSelectedUser((p) => (p ? { ...p, photo: newPhotoUrl } : p))
      setEditingUser((p) => (p ? { ...p, photo: newPhotoUrl } : p))
    }
    toast.success('Foto atualizada com sucesso!')
    setActiveTab('details')
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
                ? 'Permissão concedida para gerenciar dados cadastrais e padronizar fotos de identificação.'
                : 'Acesso negado. Requer nível Master ou Administrador.'}
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
              <SelectItem value="Administrador">Administrador</SelectItem>
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
            Apenas usuários com nível <strong>Master</strong> ou <strong>Administrador</strong> têm
            permissão para visualizar e editar o diretório de usuários.
          </p>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou email..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="flex items-center gap-3 py-4">
                      <Avatar className="h-10 w-10 border shadow-sm rounded-md">
                        <AvatarImage src={user.photo} className="object-cover" />
                        <AvatarFallback className="rounded-md bg-blue-50 text-blue-950 font-semibold">
                          {user.name.substring(0, 2)}
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
                        className={user.status === 'Ativo' ? 'bg-green-600 hover:bg-green-700' : ''}
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
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

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
                              <SelectItem value="Professor">Professor</SelectItem>
                              <SelectItem value="Aluno">Aluno</SelectItem>
                              <SelectItem value="Responsável">Responsável</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
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
                          <AlertDialogTitle>Confirmação de Exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação é irreversível. Todos os dados cadastrais do usuário{' '}
                            <strong>{selectedUser.name}</strong> serão permanentemente removidos.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
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
