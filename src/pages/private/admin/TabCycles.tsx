import { useContentStore } from '@/stores/useContentStore'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { handleImageUpload } from '@/lib/image-utils'
import { Save, Trash } from 'lucide-react'

export default function TabCycles() {
  const { cycles, updateCycle } = useContentStore()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Ciclos Salvos',
      description: 'As alterações nos ciclos educacionais foram salvas.',
    })
  }

  const updateFeature = (cycleId: string, fIndex: number, value: string) => {
    const cycle = cycles.find((c) => c.id === cycleId)
    if (cycle) {
      const newFeatures = [...cycle.features]
      newFeatures[fIndex] = value
      updateCycle(cycleId, { features: newFeatures })
    }
  }

  const removeFeature = (cycleId: string, fIndex: number) => {
    const cycle = cycles.find((c) => c.id === cycleId)
    if (cycle) {
      const newFeatures = cycle.features.filter((_, i) => i !== fIndex)
      updateCycle(cycleId, { features: newFeatures })
    }
  }

  const addFeature = (cycleId: string) => {
    const cycle = cycles.find((c) => c.id === cycleId)
    if (cycle) {
      updateCycle(cycleId, { features: [...cycle.features, 'Novo diferencial'] })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div className="flex justify-end">
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" /> Salvar Alterações
        </Button>
      </div>

      {cycles.map((cycle) => (
        <Card key={cycle.id}>
          <CardHeader>
            <CardTitle>{cycle.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome do Ciclo</Label>
                <Input
                  required
                  value={cycle.name}
                  onChange={(e) => updateCycle(cycle.id, { name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtítulo</Label>
                <Input
                  required
                  value={cycle.subtitle}
                  onChange={(e) => updateCycle(cycle.id, { subtitle: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Descrição Curta (Cards Home)</Label>
              <Textarea
                required
                value={cycle.shortDesc}
                onChange={(e) => updateCycle(cycle.id, { shortDesc: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Descrição Longa (Página Ciclos)</Label>
              <Textarea
                required
                rows={3}
                value={cycle.longDesc}
                onChange={(e) => updateCycle(cycle.id, { longDesc: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Imagem Representativa</Label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img
                  src={cycle.image}
                  alt={cycle.name}
                  className="h-24 w-36 object-cover rounded-md border"
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e, (url) => updateCycle(cycle.id, { image: url }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <Label>Diferenciais (Lista)</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addFeature(cycle.id)}
                >
                  + Adicionar
                </Button>
              </div>
              <div className="space-y-2">
                {cycle.features.map((feature, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      required
                      value={feature}
                      onChange={(e) => updateFeature(cycle.id, i, e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(cycle.id, i)}
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </form>
  )
}
