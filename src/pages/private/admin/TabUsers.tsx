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
import { Search, Edit2, ShieldAlert, Lock } from 'lucide-react'
import { toast } from 'sonner'
import PhotoEditor from '@/components/PhotoEditor'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type User = {
  id: string
  name: string
  email: string
  role: string
  status: 'Ativo' | 'Inativo'
  photo: string
}

const INITIAL_USERS: User[] = [
  {
    id: '1',
    name: 'Carlos Yedon',
    email: 'master@yedon.edu.br',
    role: 'Master',
    status: 'Ativo',
    photo: 'https://img.usecurling.com/ppl/medium?gender=male&seed=10',
  },
  {
    id: '2',
    name: 'Ana Silva',
    email: 'ana.silva@yedon.edu.br',
    role: 'Administrador',
    status: 'Ativo',
    photo: 'https://img.usecurling.com/ppl/medium?gender=female&seed=22',
  },
  {
    id: '3',
    name: 'Roberto Mendes',
    email: 'roberto@yedon.edu.br',
    role: 'Professor',
    status: 'Ativo',
    photo: 'https://img.usecurling.com/ppl/medium?gender=male&seed=33',
  },
  {
    id: '4',
    name: 'Juliana Costa',
    email: 'juliana@yedon.edu.br',
    role: 'Responsável',
    status: 'Inativo',
    photo: '',
  },
  {
    id: '5',
    name: 'Lucas Costa',
    email: 'lucas@yedon.edu.br',
    role: 'Aluno',
    status: 'Ativo',
    photo: 'https://img.usecurling.com/ppl/medium?gender=male&seed=55',
  },
]

export default function TabUsers() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS)
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [currentUserRole, setCurrentUserRole] = useState('Master')

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  )

  const openEdit = (user: User) => {
    setSelectedUser(user)
    setIsSheetOpen(true)
  }

  const handleSavePhoto = (userId: string, newPhotoUrl: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, photo: newPhotoUrl } : u)))
    toast.success('Foto atualizada com sucesso!', {
      description: 'As alterações foram salvas localmente.',
    })
    setIsSheetOpen(false)
  }

  return (
    <div className="space-y-6 animate-fade-in pt-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-blue-950 text-white p-4 rounded-xl border-l-4 border-yellow-500 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-900 rounded-lg">
            <ShieldAlert className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">
              {currentUserRole === 'Master' ? 'Acesso Restrito: Nível Master' : 'Acesso Restrito'}
            </h3>
            <p className="text-xs text-blue-200 mt-0.5">
              {currentUserRole === 'Master'
                ? 'Permissão concedida para gerenciar dados sensíveis e padronizar fotos de identificação (Proporção 3:4).'
                : 'Você não tem permissão de nível Master para editar as fotos de identificação.'}
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
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou email..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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
                    <Edit2 className="w-4 h-4 mr-2" />
                    Gerenciar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-2xl w-full overflow-y-auto p-0 flex flex-col">
          <div className="p-6 border-b bg-muted/20">
            <SheetHeader>
              <SheetTitle className="text-2xl text-blue-950">Perfil do Usuário</SheetTitle>
              <SheetDescription>
                Edite as informações cadastrais e a foto oficial de identificação.
              </SheetDescription>
            </SheetHeader>
          </div>

          {selectedUser && (
            <div className="p-6 flex-1">
              <Tabs defaultValue="photo" className="w-full h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-muted rounded-lg">
                  <TabsTrigger value="details" className="rounded-md">
                    Dados Pessoais
                  </TabsTrigger>
                  <TabsTrigger
                    value="photo"
                    disabled={currentUserRole !== 'Master'}
                    className="rounded-md data-[state=active]:bg-blue-950 data-[state=active]:text-yellow-500 disabled:opacity-50 flex items-center gap-2"
                  >
                    {currentUserRole !== 'Master' && <Lock className="w-3 h-3" />}
                    Edição de Foto (3:4)
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="details"
                  className="space-y-4 animate-fade-in focus-visible:outline-none"
                >
                  <div className="grid gap-4 bg-slate-50 p-6 rounded-xl border">
                    <div className="space-y-2">
                      <Label>Nome Completo</Label>
                      <Input defaultValue={selectedUser.name} readOnly className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input defaultValue={selectedUser.email} readOnly className="bg-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Papel (Role)</Label>
                        <Input defaultValue={selectedUser.role} readOnly className="bg-white" />
                      </div>
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Input defaultValue={selectedUser.status} readOnly className="bg-white" />
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 bg-blue-950 hover:bg-blue-900 text-white"
                    onClick={() => toast.info('Edição de dados desabilitada nesta versão.')}
                  >
                    Salvar Alterações
                  </Button>
                </TabsContent>

                <TabsContent value="photo" className="focus-visible:outline-none h-full">
                  {currentUserRole === 'Master' ? (
                    <PhotoEditor
                      initialImage={selectedUser.photo}
                      onSave={(img) => handleSavePhoto(selectedUser.id, img)}
                      onCancel={() => setIsSheetOpen(false)}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[400px] text-center px-4 bg-slate-50 rounded-xl border border-dashed">
                      <Lock className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                      <h3 className="font-semibold text-lg text-blue-950">Acesso Negado</h3>
                      <p className="text-muted-foreground text-sm max-w-[300px] mt-2">
                        A edição de fotos de perfil com proporção estrita 3:4 é restrita apenas a
                        usuários com o nível hierárquico <strong>Master</strong>.
                      </p>
                    </div>
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
