import { Link } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import TabHero from './TabHero'
import TabMission from './TabMission'
import TabCycles from './TabCycles'
import TabPartners from './TabPartners'
import TabUsers from './TabUsers'
import TabAcademic from './TabAcademic'
import TabAudit from './TabAudit'
import TabTenants from './TabTenants'
import { useAuthStore } from '@/stores/useAuthStore'

export default function AdminDashboard() {
  const authUser = useAuthStore((state) => state.user)
  const isMaster = authUser?.role === 'master'

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

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="flex flex-wrap h-auto w-full max-w-5xl justify-start gap-1 p-1 bg-muted rounded-xl">
          {isMaster && (
            <TabsTrigger
              value="tenants"
              className="flex-1 min-w-[100px] rounded-lg bg-blue-950/5 text-blue-950 data-[state=active]:bg-blue-950 data-[state=active]:text-yellow-500"
            >
              Organizações (SaaS)
            </TabsTrigger>
          )}
          <TabsTrigger value="users" className="flex-1 min-w-[100px] rounded-lg">
            Usuários
          </TabsTrigger>
          <TabsTrigger value="academic" className="flex-1 min-w-[100px] rounded-lg">
            Acadêmico
          </TabsTrigger>
          <TabsTrigger value="hero" className="flex-1 min-w-[100px] rounded-lg">
            Banners
          </TabsTrigger>
          <TabsTrigger value="mission" className="flex-1 min-w-[100px] rounded-lg">
            Missão
          </TabsTrigger>
          <TabsTrigger value="cycles" className="flex-1 min-w-[100px] rounded-lg">
            Ciclos
          </TabsTrigger>
          <TabsTrigger value="partners" className="flex-1 min-w-[100px] rounded-lg">
            Parceiros
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex-1 min-w-[100px] rounded-lg">
            Auditoria
          </TabsTrigger>
        </TabsList>
        {isMaster && (
          <TabsContent value="tenants">
            <TabTenants />
          </TabsContent>
        )}
        <TabsContent value="users">
          <TabUsers />
        </TabsContent>
        <TabsContent value="academic">
          <TabAcademic />
        </TabsContent>
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
        <TabsContent value="audit">
          <TabAudit />
        </TabsContent>
      </Tabs>
    </div>
  )
}
