import { Link, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Settings,
  LogOut,
  FileText,
  GraduationCap,
  Bell,
  Video,
  MessageSquare,
  CreditCard,
  ShieldCheck,
  Store,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuthStore, UserRole } from '@/stores/useAuthStore'
import { useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

export default function PrivateLayout() {
  const { user, logout, login } = useAuthStore()
  const { loading, session, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!loading && !session) {
      navigate('/login')
    }
  }, [loading, session, navigate])

  useEffect(() => {
    const isManagement =
      user?.role === 'admin' ||
      user?.role === 'master' ||
      user?.role === 'director' ||
      user?.role === 'coordinator'
    if (user && location.pathname.startsWith('/app/admin') && !isManagement) {
      navigate('/app')
    }
  }, [user, location, navigate])

  const handleLogout = useCallback(async () => {
    logout()
    await signOut()
    navigate('/')
  }, [logout, signOut, navigate])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const resetTimeout = () => {
      clearTimeout(timeoutId)
      // Bloqueio por Inatividade de 15 minutos (900000 ms)
      timeoutId = setTimeout(
        () => {
          handleLogout()
        },
        15 * 60 * 1000,
      )
    }

    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart']

    if (user) {
      resetTimeout()
      events.forEach((event) => {
        window.addEventListener(event, resetTimeout, { passive: true })
      })
    }

    return () => {
      clearTimeout(timeoutId)
      events.forEach((event) => {
        window.removeEventListener(event, resetTimeout)
      })
    }
  }, [user, handleLogout])

  if (loading || (!user && session)) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) return null

  const getNavItems = () => {
    const baseItems = [
      { title: 'Dashboard', url: '/app', icon: LayoutDashboard },
      { title: 'Mensagens', url: '/app/inbox', icon: MessageSquare },
      { title: 'Meu Perfil', url: '/app/profile', icon: Settings },
    ]

    if (user.role === 'student' || user.role === 'parent') {
      return [
        ...baseItems,
        { title: 'EAD Hub', url: '/app/ead', icon: Video },
        { title: 'Boletim & Notas', url: '/app/grades', icon: FileText },
        { title: 'Financeiro', url: '/app/financial', icon: CreditCard },
        { title: 'Cursos Extras', url: '/app/marketplace', icon: Store },
      ]
    }

    if (user.role === 'teacher') {
      return [
        ...baseItems,
        { title: 'Gestão de Notas', url: '/app/grades', icon: FileText },
        { title: 'Virtual Classroom', url: '/app/ead', icon: Video },
      ]
    }

    if (
      user.role === 'master' ||
      user.role === 'director' ||
      user.role === 'coordinator' ||
      user.role === 'admin'
    ) {
      return [
        { title: 'Gestão Acadêmica & CMS', url: '/app/admin', icon: ShieldCheck },
        ...baseItems,
      ]
    }

    return baseItems
  }

  const handleRoleSimulation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as UserRole
    login({ ...user, role: newRole })
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="border-b border-sidebar-border h-16 flex items-center justify-center px-4">
            <Link to="/app" className="flex items-center gap-2 group w-full overflow-hidden">
              <div className="bg-primary p-1.5 rounded-md shrink-0">
                <GraduationCap className="h-5 w-5 text-secondary" />
              </div>
              <span className="font-display font-bold text-lg text-primary truncate group-data-[collapsible=icon]:opacity-0 transition-opacity">
                Yedon Portal
              </span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {getNavItems().map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <Link to={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col truncate group-data-[collapsible=icon]:opacity-0 transition-opacity">
                <span className="text-sm font-medium truncate">{user.name}</span>
                <span className="text-xs text-muted-foreground capitalize truncate">
                  {user.role}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start mt-2 text-destructive hover:text-destructive hover:bg-destructive/10 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 md:mr-2" />
              <span className="group-data-[collapsible=icon]:hidden">Sair</span>
            </Button>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col min-w-0 bg-slate-50">
          <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="hidden md:flex items-center text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Bem-vindo(a),</span>&nbsp;
                {user.name.split(' ')[0]}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-md">
                <span className="text-xs font-semibold text-yellow-800">Simular Papel (RBAC):</span>
                <select
                  className="h-7 text-xs border-0 bg-transparent font-medium text-yellow-900 focus:ring-0 cursor-pointer outline-none"
                  value={user.role || ''}
                  onChange={handleRoleSimulation}
                >
                  <option value="master">Master</option>
                  <option value="director">Diretor</option>
                  <option value="coordinator">Coordenador</option>
                  <option value="teacher">Professor</option>
                  <option value="parent">Responsável</option>
                  <option value="student">Aluno</option>
                </select>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="relative h-9 w-9 rounded-full shrink-0"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
