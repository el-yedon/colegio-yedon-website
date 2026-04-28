import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function UpdatePassword() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { updatePassword } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await updatePassword(password)
    setLoading(false)

    if (error) {
      toast({
        title: 'Erro ao atualizar',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Senha atualizada',
        description: 'Sua senha foi alterada com sucesso.',
      })
      navigate('/login')
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md animate-fade-in-up border-t-4 border-t-primary shadow-xl">
        <CardHeader>
          <CardTitle>Nova Senha</CardTitle>
          <CardDescription>Digite sua nova senha abaixo para atualizar seu acesso.</CardDescription>
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
            </div>
            <Button type="submit" disabled={loading} className="w-full h-11 text-base bg-primary">
              {loading ? 'Atualizando...' : 'Atualizar Senha'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
