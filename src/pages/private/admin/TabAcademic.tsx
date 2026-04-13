import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AcademicProvider } from './academic/AcademicContext'
import { TabCursos, TabSetores, TabTurnos } from './academic/AcademicBasics'
import { TabSeries, TabTurmas } from './academic/AcademicAssociations'
import { TabSalas } from './academic/TabSalas'
import { TabMatriculas } from './academic/TabMatriculas'
import { TabAuditoriaLocal } from './academic/TabAuditoriaLocal'
import { GraduationCap } from 'lucide-react'

export default function TabAcademic() {
  return (
    <AcademicProvider>
      <div className="animate-fade-in pt-4">
        <div className="mb-6 pb-4 border-b">
          <h2 className="text-xl font-bold text-blue-950 flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-amber-500" />
            Gestão Acadêmica
          </h2>
          <p className="text-muted-foreground mt-1">
            Organize os cursos, setores, turnos, turmas e estruture as salas de aula.
          </p>
        </div>

        <Tabs defaultValue="cursos" className="w-full flex flex-col md:flex-row gap-6">
          <TabsList className="flex flex-col h-auto w-full md:w-56 justify-start gap-1 p-2 bg-slate-50 border border-slate-200 rounded-xl items-stretch shrink-0 shadow-sm">
            <h3 className="px-3 py-2 text-xs font-bold text-blue-950/70 uppercase tracking-wider">
              Estrutura Básica
            </h3>
            <TabsTrigger
              value="cursos"
              className="justify-start data-[state=active]:bg-white data-[state=active]:text-blue-950 data-[state=active]:shadow-sm"
            >
              Cursos
            </TabsTrigger>
            <TabsTrigger
              value="setores"
              className="justify-start data-[state=active]:bg-white data-[state=active]:text-blue-950 data-[state=active]:shadow-sm"
            >
              Setores Pedagógicos
            </TabsTrigger>
            <TabsTrigger
              value="series"
              className="justify-start data-[state=active]:bg-white data-[state=active]:text-blue-950 data-[state=active]:shadow-sm"
            >
              Séries
            </TabsTrigger>
            <TabsTrigger
              value="turnos"
              className="justify-start data-[state=active]:bg-white data-[state=active]:text-blue-950 data-[state=active]:shadow-sm"
            >
              Turnos
            </TabsTrigger>
            <TabsTrigger
              value="turmas"
              className="justify-start data-[state=active]:bg-white data-[state=active]:text-blue-950 data-[state=active]:shadow-sm"
            >
              Turmas
            </TabsTrigger>

            <h3 className="px-3 py-2 mt-3 text-xs font-bold text-blue-950/70 uppercase tracking-wider border-t pt-4">
              Operações
            </h3>
            <TabsTrigger
              value="salas"
              className="justify-start data-[state=active]:bg-white data-[state=active]:text-blue-950 data-[state=active]:shadow-sm"
            >
              Salas (Builder)
            </TabsTrigger>
            <TabsTrigger
              value="matriculas"
              className="justify-start data-[state=active]:bg-white data-[state=active]:text-blue-950 data-[state=active]:shadow-sm"
            >
              Regras de Matrícula
            </TabsTrigger>

            <h3 className="px-3 py-2 mt-3 text-xs font-bold text-blue-950/70 uppercase tracking-wider border-t pt-4">
              Sistema
            </h3>
            <TabsTrigger
              value="auditoria"
              className="justify-start data-[state=active]:bg-white data-[state=active]:text-blue-950 data-[state=active]:shadow-sm"
            >
              Auditoria
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 min-w-0">
            <TabsContent value="cursos" className="m-0 focus-visible:ring-0">
              <TabCursos />
            </TabsContent>
            <TabsContent value="setores" className="m-0 focus-visible:ring-0">
              <TabSetores />
            </TabsContent>
            <TabsContent value="series" className="m-0 focus-visible:ring-0">
              <TabSeries />
            </TabsContent>
            <TabsContent value="turnos" className="m-0 focus-visible:ring-0">
              <TabTurnos />
            </TabsContent>
            <TabsContent value="turmas" className="m-0 focus-visible:ring-0">
              <TabTurmas />
            </TabsContent>
            <TabsContent value="salas" className="m-0 focus-visible:ring-0">
              <TabSalas />
            </TabsContent>
            <TabsContent value="matriculas" className="m-0 focus-visible:ring-0">
              <TabMatriculas />
            </TabsContent>
            <TabsContent value="auditoria" className="m-0 focus-visible:ring-0">
              <TabAuditoriaLocal />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AcademicProvider>
  )
}
