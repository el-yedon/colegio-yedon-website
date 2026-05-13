import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase/client'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [resetEmail, setResetEmail] = useState('')
  const [isResetting, setIsResetting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { signIn, resetPasswordForEmail } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const navigateBasedOnRole = async () => {
    const { data: userData } = await supabase.auth.getUser()
    if (userData.user) {
      const { data: profile } = await supabase
        .from('perfis')
        .select('papel, precisa_trocar_senha')
        .eq('id', userData.user.id)
        .single()

      if (profile?.precisa_trocar_senha) {
        navigate('/update-password')
        return
      }

      if (profile && ['admin', 'master', 'director'].includes(profile.papel)) {
        navigate('/app/admin')
      } else {
        navigate('/app')
      }
    } else {
      navigate('/app')
    }
  }

  const handleDemoLogin = async (role: string) => {
    setLoading(true)
    const demoEmail = `${role}@yedon.com.br`
    const { error } = await signIn(demoEmail, 'Skip@Pass')

    if (error) {
      setLoading(false)
      toast({ title: 'Erro de Autenticação', description: error.message, variant: 'destructive' })
    } else {
      await navigateBasedOnRole()
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await signIn(email, password)

    if (error) {
      setLoading(false)
      toast({
        title: 'Erro de Autenticação',
        description: 'Credenciais inválidas. Verifique seu email e senha.',
        variant: 'destructive',
      })
    } else {
      await navigateBasedOnRole()
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resetEmail) return

    setLoading(true)
    const { error } = await resetPasswordForEmail(resetEmail)
    setLoading(false)

    if (error) {
      toast({
        title: 'Erro ao enviar email',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Email enviado',
        description: 'Se o email estiver cadastrado, você receberá um link para redefinir a senha.',
      })
      setIsResetting(false)
    }
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
            <CardTitle>{isResetting ? 'Recuperar Senha' : 'Login'}</CardTitle>
            <CardDescription>
              {isResetting
                ? 'Informe seu email para receber um link de redefinição.'
                : 'Insira suas credenciais para acessar o sistema.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isResetting ? (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email Cadastrado</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="exemplo@email.com"
                      className="pl-10"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-2 pt-2">
                  <Button type="submit" disabled={loading} className="w-full h-11 bg-primary">
                    {loading ? 'Enviando...' : 'Enviar Link'}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsResetting(false)}
                    disabled={loading}
                    className="h-11"
                  >
                    Voltar ao Login
                  </Button>
                </div>
              </form>
            ) : (
              <>
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
                      <button
                        type="button"
                        onClick={() => setIsResetting(true)}
                        className="text-xs text-primary hover:underline font-medium bg-transparent border-none p-0 cursor-pointer"
                      >
                        Esqueceu a senha?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        className="pl-10 pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 text-base bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {loading ? 'Entrando...' : 'Entrar no Portal'}
                  </Button>
                </form>

                <div className="mt-8 pt-6 border-t">
                  <p className="text-xs text-center text-slate-500 mb-4 uppercase tracking-wider font-semibold">
                    Acesso Rápido (Demonstração)
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={loading}
                      onClick={() => handleDemoLogin('student')}
                      className="text-xs"
                    >
                      🧑‍🎓 Aluno
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={loading}
                      onClick={() => handleDemoLogin('parent')}
                      className="text-xs"
                    >
                      👨‍👩‍👧 Responsável
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={loading}
                      onClick={() => handleDemoLogin('teacher')}
                      className="text-xs"
                    >
                      👨‍🏫 Professor
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={loading}
                      onClick={() => handleDemoLogin('admin')}
                      className="text-xs"
                    >
                      ⚙️ Admin
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
