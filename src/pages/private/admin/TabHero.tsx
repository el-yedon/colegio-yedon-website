import { useContentStore } from '@/stores/useContentStore'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { handleImageUpload } from '@/lib/image-utils'
import { Save } from 'lucide-react'

export default function TabHero() {
  const { heroSlides, updateHeroSlide } = useContentStore()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Banners Salvos',
      description: 'As alterações foram salvas com sucesso.',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div className="flex justify-end">
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" /> Salvar Alterações
        </Button>
      </div>
      <div className="grid gap-6">
        {heroSlides.map((slide, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>
                Slide {i + 1} - {slide.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    required
                    value={slide.title}
                    onChange={(e) => updateHeroSlide(i, { title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtítulo (Ciclo)</Label>
                  <Input
                    required
                    value={slide.subtitle}
                    onChange={(e) => updateHeroSlide(i, { subtitle: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea
                  required
                  value={slide.desc}
                  onChange={(e) => updateHeroSlide(i, { desc: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Imagem de Fundo (Banner)</Label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <img
                    src={slide.img}
                    alt="Banner"
                    className="h-24 w-48 object-cover rounded-md border"
                  />
                  <div className="flex-1 w-full">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(e, (url) => updateHeroSlide(i, { img: url }))
                      }
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      A imagem será convertida para Base64 para visualização imediata.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </form>
  )
}
