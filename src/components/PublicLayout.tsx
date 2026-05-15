import { Outlet, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export default function PublicLayout() {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-950 rounded-lg flex items-center justify-center transition-colors group-hover:bg-blue-900">
              <span className="text-white font-bold">Y</span>
            </div>
            <span className="font-bold text-xl text-blue-950 group-hover:text-blue-900 transition-colors">
              Colégio Yedon
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/institucional"
              className="text-sm font-medium text-slate-600 hover:text-blue-950 transition-colors"
            >
              Institucional
            </Link>
            <Link
              to="/ciclos"
              className="text-sm font-medium text-slate-600 hover:text-blue-950 transition-colors"
            >
              Ciclos
            </Link>
            <Link
              to="/parceiros"
              className="text-sm font-medium text-slate-600 hover:text-blue-950 transition-colors"
            >
              Parceiros
            </Link>
            <Link
              to="/matriculas"
              className="text-sm font-medium text-slate-600 hover:text-blue-950 transition-colors"
            >
              Matrículas 2027
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Button
                  asChild
                  variant="outline"
                  className="hidden sm:flex border-blue-950 text-blue-950 hover:bg-blue-50"
                >
                  <Link to="/app">Área Restrita</Link>
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 font-medium"
                  onClick={() => signOut()}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair do Site
                </Button>
              </>
            ) : (
              <Button asChild className="bg-blue-950 text-white hover:bg-blue-900">
                <Link to="/login">Área Restrita</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-slate-900 py-12 mt-auto">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>&copy; 2027 Colégio Yedon. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
