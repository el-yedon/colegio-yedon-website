import { useContentStore } from '@/stores/useContentStore'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { handleImageUpload } from '@/lib/image-utils'
import { Plus, Trash } from 'lucide-react'

export default function TabPartners() {
  const { partners, addPartner, removePartner, updatePartner } = useContentStore()
  const { toast } = useToast()

  const handleAdd = () => {
    addPartner({
      id: Date.now().toString(),
      name: 'Novo Parceiro',
      logo: 'https://img.usecurling.com/i?q=company%20logo&color=solid-black',
    })
    toast({ title: 'Parceiro Adicionado', description: 'Edite os dados abaixo.' })
  }

  return (
    <div className="space-y-6 mt-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Gerencie os logos que aparecem no rodapé rotativo da Home.
        </p>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Novo Parceiro
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <Card key={partner.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Editar Parceiro</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removePartner(partner.id)}
                className="text-destructive -mr-2 -mt-2"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center p-4 bg-slate-50 border rounded-lg h-24">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-full object-contain mix-blend-multiply grayscale"
                />
              </div>
              <div className="space-y-2">
                <Label>Nome do Parceiro</Label>
                <Input
                  value={partner.name}
                  onChange={(e) => updatePartner(partner.id, { name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Alterar Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e, (url) => updatePartner(partner.id, { logo: url }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        ))}
        {partners.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-xl">
            Nenhum parceiro cadastrado.
          </div>
        )}
      </div>
    </div>
  )
}
