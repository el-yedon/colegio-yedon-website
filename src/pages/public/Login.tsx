import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore, UserRole } from '@/stores/useAuthStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Lock, Mail } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleDemoLogin = (role: UserRole) => {
    let name = 'Usuário'
    if (role === 'admin') name = 'Admin Sistema'
    if (role === 'teacher') name = 'Prof. Carlos Silva'
    if (role === 'parent') name = 'Maria Eduarda (Mãe)'
    if (role === 'student') name = 'João Pedro (Yedon Path)'

    login({
      name,
      email: `${role}@yedon.com.br`,
      role,
      avatar: `https://img.usecurling.com/ppl/thumbnail?seed=${role}`,
    })
    if (role === 'admin') {
      navigate('/app/admin')
    } else {
      navigate('/app')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock standard login as student for form submission
    handleDemoLogin('student')
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="inline-flex bg-primary p-3 rounded-xl mb-4 shadow-lg">
            <GraduationCap className="h-8 w-8 text-secondary" />
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Área Restrita</h1>
          <p className="text-slate-500 mt-2">Acesse o portal do Colégio Yedon</p>
        </div>

        <Card className="border-t-4 border-t-secondary shadow-xl">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Insira suas credenciais para acessar o sistema.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email ou Matrícula</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="text"
                    placeholder="exemplo@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <a href="#" className="text-xs text-primary hover:underline font-medium">
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full h-11 text-base bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Entrar no Portal
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t">
              <p className="text-xs text-center text-slate-500 mb-4 uppercase tracking-wider font-semibold">
                Acesso Rápido (Demonstração)
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('student')}
                  className="text-xs"
                >
                  🧑‍🎓 Aluno
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('parent')}
                  className="text-xs"
                >
                  👨‍👩‍👧 Responsável
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('teacher')}
                  className="text-xs"
                >
                  👨‍🏫 Professor
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('admin')}
                  className="text-xs"
                >
                  ⚙️ Admin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
