import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { useAuthStore } from '@/stores/useAuthStore'
import { Button } from '@/components/ui/button'
import {
  LogOut,
  Home,
  User,
  BookOpen,
  GraduationCap,
  DollarSign,
  Settings,
  Mail,
  Store,
} from 'lucide-react'
import { useEffect } from 'react'

export default function PrivateLayout() {
  const { user, signOut, loading } = useAuth()
  const authUser = useAuthStore((s) => s.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  if (loading || !user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        Carregando...
      </div>
    )

  const isAdminOrMaster = authUser?.role === 'admin' || authUser?.role === 'master'

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
        <div className="p-4 bg-slate-950 flex items-center justify-between">
          <Link to="/app" className="flex items-center gap-2 text-white group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold group-hover:bg-blue-500 transition-colors">
              Y
            </div>
            <span className="font-bold text-lg truncate group-hover:text-blue-100 transition-colors">
              {authUser?.tenantName || 'Colégio Yedon'}
            </span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link
            to="/app"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" /> Início
          </Link>
          <Link
            to="/app/profile"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
          >
            <User className="w-5 h-5" /> Meu Perfil
          </Link>
          <Link
            to="/app/ead"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
          >
            <BookOpen className="w-5 h-5" /> Aulas e EAD
          </Link>
          <Link
            to="/app/grades"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
          >
            <GraduationCap className="w-5 h-5" /> Notas e Freq.
          </Link>
          <Link
            to="/app/financial"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
          >
            <DollarSign className="w-5 h-5" /> Financeiro
          </Link>
          <Link
            to="/app/inbox"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" /> Mensagens
          </Link>
          <Link
            to="/app/marketplace"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Store className="w-5 h-5" /> Loja Virtual
          </Link>
          {isAdminOrMaster && (
            <div className="pt-4 mt-4 border-t border-slate-800">
              <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Administração
              </p>
              <Link
                to="/app/admin"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
              >
                <Settings className="w-5 h-5" /> Gestão Escolar
              </Link>
            </div>
          )}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-800 truncate">Portal do Aluno</h1>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-medium text-slate-900 leading-none">
                {authUser?.name}
              </span>
              <span className="text-xs text-slate-500 capitalize">{authUser?.role}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut()}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 font-medium ml-2"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
