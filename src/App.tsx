import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/hooks/use-auth'
import NotFound from './pages/NotFound'
import PublicLayout from './components/PublicLayout'
import PrivateLayout from './components/PrivateLayout'

import Home from './pages/public/Home'
import Login from './pages/public/Login'
import Ciclos from './pages/public/Ciclos'

import Dashboard from './pages/private/Dashboard'
import Profile from './pages/private/Profile'
import EAD from './pages/private/EAD'
import Grades from './pages/private/Grades'
import Financial from './pages/private/Financial'
import Marketplace from './pages/private/Marketplace'
import Inbox from './pages/private/Inbox'
import AdminDashboard from './pages/private/admin/AdminDashboard'

const App = () => (
  <AuthProvider>
    <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ciclos" element={<Ciclos />} />
            <Route
              path="/institucional"
              element={
                <div className="container py-24 text-center">
                  <h1 className="text-4xl font-bold">Institucional</h1>
                  <p className="mt-4">Página em construção</p>
                </div>
              }
            />
            <Route
              path="/parceiros"
              element={
                <div className="container py-24 text-center">
                  <h1 className="text-4xl font-bold">Parceiros</h1>
                  <p className="mt-4">Página em construção</p>
                </div>
              }
            />
            <Route
              path="/matriculas"
              element={
                <div className="container py-24 text-center">
                  <h1 className="text-4xl font-bold">Matrículas 2027</h1>
                  <p className="mt-4">Página em construção</p>
                </div>
              }
            />
          </Route>

          {/* Private Routes (App) */}
          <Route path="/app" element={<PrivateLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="ead" element={<EAD />} />
            <Route path="grades" element={<Grades />} />
            <Route path="financial" element={<Financial />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </AuthProvider>
)

export default App
