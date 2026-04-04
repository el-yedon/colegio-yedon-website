import { Link } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import TabHero from './TabHero'
import TabMission from './TabMission'
import TabCycles from './TabCycles'
import TabPartners from './TabPartners'

export default function AdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestão de Conteúdo (CMS)</h2>
          <p className="text-muted-foreground">Gerencie os textos e imagens do site público.</p>
        </div>
        <Button asChild variant="outline">
          <Link to="/" target="_blank">
            Ver Site <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="hero">Banners</TabsTrigger>
          <TabsTrigger value="mission">Missão</TabsTrigger>
          <TabsTrigger value="cycles">Ciclos</TabsTrigger>
          <TabsTrigger value="partners">Parceiros</TabsTrigger>
        </TabsList>
        <TabsContent value="hero">
          <TabHero />
        </TabsContent>
        <TabsContent value="mission">
          <TabMission />
        </TabsContent>
        <TabsContent value="cycles">
          <TabCycles />
        </TabsContent>
        <TabsContent value="partners">
          <TabPartners />
        </TabsContent>
      </Tabs>
    </div>
  )
}
