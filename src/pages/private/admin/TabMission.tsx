import { useContentStore } from '@/stores/useContentStore'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Save } from 'lucide-react'

export default function TabMission() {
  const { mission, updateMission } = useContentStore()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Missão Salva',
      description: 'As informações institucionais foram atualizadas.',
    })
  }

  const updateFeature = (index: number, field: 'title' | 'desc', value: string) => {
    const newFeatures = [...mission.features]
    newFeatures[index] = { ...newFeatures[index], [field]: value }
    updateMission({ features: newFeatures })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div className="flex justify-end">
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" /> Salvar Alterações
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nossa Essência</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Subtítulo</Label>
              <Input
                required
                value={mission.subtitle}
                onChange={(e) => updateMission({ subtitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Título Principal</Label>
              <Input
                required
                value={mission.title}
                onChange={(e) => updateMission({ title: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Descrição Completa</Label>
            <Textarea
              required
              rows={4}
              value={mission.desc}
              onChange={(e) => updateMission({ desc: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pilares (Características)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {mission.features.map((feature, i) => (
            <div key={i} className="p-4 border rounded-lg space-y-4 bg-slate-50">
              <div className="space-y-2">
                <Label>Pilar {i + 1}</Label>
                <Input
                  required
                  value={feature.title}
                  onChange={(e) => updateFeature(i, 'title', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Descrição do Pilar</Label>
                <Input
                  required
                  value={feature.desc}
                  onChange={(e) => updateFeature(i, 'desc', e.target.value)}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </form>
  )
}
