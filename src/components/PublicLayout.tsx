import { Link, Outlet, useLocation } from 'react-router-dom'
import { GraduationCap, User, MessageCircle, MapPin, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function PublicLayout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="flex flex-col min-h-screen relative">
      <header className="fixed top-0 w-full z-50 glass-header">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="h-6 w-6 text-secondary" />
            </div>
            <span className="font-display font-bold text-2xl text-primary">Colégio Yedon</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/institucional"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Institucional
            </Link>
            <Link
              to="/ciclos"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Ciclos
            </Link>
            <Link
              to="/parceiros"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Parceiros
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="ghost"
              className="hidden lg:flex text-primary hover:text-primary hover:bg-primary/10"
            >
              <Link to="/matriculas">Matrículas 2027</Link>
            </Button>
            <Button
              asChild
              className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-subtle hover:scale-105 transition-transform duration-200"
            >
              <Link to="/login">
                <User className="mr-2 h-4 w-4" />
                Área Restrita
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Bar for Home */}
      {isHome && (
        <div className="fixed top-20 left-0 w-full h-1 bg-gray-100 z-50">
          <div className="h-full bg-secondary w-1/3 animate-pulse" />{' '}
          {/* Simple mock for progress */}
        </div>
      )}

      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      <footer className="bg-primary text-primary-foreground pt-16 pb-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="h-8 w-8 text-secondary" />
              <span className="font-display font-bold text-2xl">Colégio Yedon</span>
            </div>
            <p className="text-primary-foreground/70 text-sm mb-6">
              Transformando o futuro através de uma formação integral, inovadora e acolhedora.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-secondary">Contato</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> (11) 9999-9999
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> contato@colegioyedon.com.br
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Av. Educação, 1000 - SP
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-secondary">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link to="/institucional" className="hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/ciclos" className="hover:text-white transition-colors">
                  Nossos Ciclos
                </Link>
              </li>
              <li>
                <Link to="/trabalhe-conosco" className="hover:text-white transition-colors">
                  Trabalhe Conosco
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Portal do Aluno
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-secondary">Localização</h4>
            <div className="w-full h-32 bg-primary-foreground/10 rounded-lg flex items-center justify-center border border-primary-foreground/20">
              <span className="text-sm text-primary-foreground/50">Mapa Integrado</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/50">
            © 2026 Colégio Yedon. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 text-xs text-primary-foreground/50">
            <span>Parceiros Educacionais:</span>
            <span className="font-semibold text-white/80">Objetivo</span>
            <span className="font-semibold text-white/80">Edify</span>
          </div>
        </div>
      </footer>

      {/* FAB WhatsApp */}
      <a
        href="#"
        className="fixed bottom-24 right-6 md:bottom-6 md:right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50 animate-float"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  )
}
