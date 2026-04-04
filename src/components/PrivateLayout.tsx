import { Link, Outlet, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  LayoutDashboard,
  Settings,
  LogOut,
  FileText,
  GraduationCap,
  Bell,
  Search,
  Video,
  MessageSquare,
  CreditCard,
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
import { useAuthStore } from '@/stores/useAuthStore'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function PrivateLayout() {
  const { user, logout, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (user && location.pathname.startsWith('/app/admin') && user.role !== 'admin') {
      navigate('/app')
    }
  }, [user, location, navigate])

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
      ]
    }

    if (user.role === 'teacher') {
      return [
        ...baseItems,
        { title: 'Lançar Notas', url: '/app/grades', icon: FileText },
        { title: 'Aulas EAD', url: '/app/ead', icon: Video },
      ]
    }

    if (user.role === 'admin') {
      return [{ title: 'Gestão CMS', url: '/app/admin', icon: Settings }, ...baseItems]
    }

    return baseItems
  }

  const handleLogout = () => {
    logout()
    navigate('/')
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
                <span className="font-medium text-foreground">Bem-vindo de volta,</span>&nbsp;
                {user.name.split(' ')[0]}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar no portal..."
                  className="w-full h-9 pl-9 pr-4 rounded-md border border-input bg-transparent text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <Button variant="outline" size="icon" className="relative h-9 w-9 rounded-full">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
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
