import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase/client'

export default function UpdatePassword() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { updatePassword } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).{6,}$/
    if (!passwordRegex.test(password)) {
      toast({
        title: 'Senha fraca',
        description:
          'A senha deve ter no mínimo 6 caracteres, contendo letras, números e caracteres especiais (@, &, ., %, etc).',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    const { error } = await updatePassword(password)

    if (error) {
      setLoading(false)
      toast({
        title: 'Erro ao atualizar',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      const { data: userData } = await supabase.auth.getUser()
      if (userData.user) {
        await supabase
          .from('perfis')
          .update({ precisa_trocar_senha: false })
          .eq('id', userData.user.id)
      }

      setLoading(false)
      toast({
        title: 'Senha atualizada',
        description: 'Sua senha foi alterada com sucesso. Faça login novamente.',
      })
      await supabase.auth.signOut()
      navigate('/login')
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md animate-fade-in-up border-t-4 border-t-primary shadow-xl">
        <CardHeader>
          <CardTitle>Nova Senha Necessária</CardTitle>
          <CardDescription>
            Para sua segurança, é necessário definir uma nova senha para o seu acesso.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Nova Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <p className="text-xs text-muted-foreground flex items-start gap-1 mt-2">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                Mínimo de 6 caracteres, contendo letras, números e caracteres especiais (ex: @, &,
                ., %).
              </p>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 text-base bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? 'Atualizando...' : 'Atualizar e Acessar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
