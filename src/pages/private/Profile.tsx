import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/useAuthStore'
import { fetchAddressByCep } from '@/lib/viacep'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

export default function Profile() {
  const user = useAuthStore((state) => state.user)
  const { toast } = useToast()
  const [isLoadingCep, setIsLoadingCep] = useState(false)
  const [formData, setFormData] = useState({
    nome: user?.name || '',
    cpf: '',
    rg: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: '',
    numero: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'cep') {
      const cleanCep = value.replace(/\D/g, '')
      if (cleanCep.length === 8) {
        handleCepLookup(cleanCep)
      }
    }
  }

  const handleCepLookup = async (cep: string) => {
    setIsLoadingCep(true)
    const address = await fetchAddressByCep(cep)
    setIsLoadingCep(false)

    if (address) {
      setFormData((prev) => ({
        ...prev,
        logradouro: address.logradouro,
        bairro: address.bairro,
        cidade: address.localidade,
        uf: address.uf,
      }))
      toast({
        title: 'CEP Encontrado',
        description: 'Endereço preenchido automaticamente.',
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'CEP Inválido',
        description: 'Não foi possível encontrar o endereço para o CEP informado.',
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Perfil Atualizado',
      description: 'Seus dados foram salvos com sucesso.',
      className: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Meu Perfil</h2>
        <p className="text-muted-foreground">
          Gerencie seus dados pessoais e informações de contato.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6 shadow-sm">
          <CardHeader>
            <CardTitle>Dados Pessoais</CardTitle>
            <CardDescription>Informações básicas de identificação do usuário.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                name="cpf"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rg">RG</Label>
              <Input
                id="rg"
                name="rg"
                placeholder="00.000.000-0"
                value={formData.rg}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 shadow-sm">
          <CardHeader>
            <CardTitle>Endereço Residencial</CardTitle>
            <CardDescription>
              Busca automática via integração com Correios (ViaCEP).
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-6">
            <div className="space-y-2 col-span-2 relative">
              <Label htmlFor="cep">CEP</Label>
              <div className="relative">
                <Input
                  id="cep"
                  name="cep"
                  placeholder="00000-000"
                  maxLength={9}
                  value={formData.cep}
                  onChange={handleChange}
                  required
                />
                {isLoadingCep && (
                  <Loader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
                )}
              </div>
            </div>
            <div className="space-y-2 col-span-4">
              <Label htmlFor="logradouro">Logradouro (Rua/Av)</Label>
              <Input
                id="logradouro"
                name="logradouro"
                value={formData.logradouro}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="numero">Número</Label>
              <Input
                id="numero"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 col-span-4">
              <Label htmlFor="bairro">Bairro</Label>
              <Input
                id="bairro"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 col-span-4">
              <Label htmlFor="cidade">Cidade</Label>
              <Input
                id="cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="uf">UF</Label>
              <Input
                id="uf"
                name="uf"
                value={formData.uf}
                onChange={handleChange}
                maxLength={2}
                required
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
          <Button type="submit">Salvar Alterações</Button>
        </div>
      </form>
    </div>
  )
}
