import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Mail, Search, Star } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const MESSAGES = [
  {
    id: 1,
    sender: 'Coordenação Pedagógica',
    subject: 'Aviso Importante: Simulados do 2º Bimestre',
    preview: 'Prezados responsáveis e alunos, informamos que o calendário de simulados...',
    date: 'Hoje, 09:30',
    unread: true,
  },
  {
    id: 2,
    sender: 'Prof. Marcos (Física)',
    subject: 'Material complementar - Leis de Newton',
    preview: 'Conforme combinado em sala, segue o link com os exercícios extras para a P1.',
    date: 'Ontem',
    unread: false,
  },
  {
    id: 3,
    sender: 'Secretaria Escolar',
    subject: 'Documentação Pendente',
    preview: 'Identificamos a falta da cópia do comprovante de residência atualizado na sua pasta.',
    date: '12 Nov',
    unread: false,
  },
]

export default function Inbox() {
  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Caixa de Entrada</h2>
          <p className="text-muted-foreground">
            Comunicações oficiais, mensagens de professores e secretaria.
          </p>
        </div>
        <Button>
          <Mail className="mr-2 h-4 w-4" />
          Nova Mensagem
        </Button>
      </div>

      <Card className="flex-1 flex flex-col shadow-sm overflow-hidden border-t-4 border-t-blue-500">
        <div className="p-4 border-b bg-slate-50 flex items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar mensagens..." className="pl-8 bg-white" />
          </div>
        </div>
        <CardContent className="p-0 flex-1 overflow-y-auto">
          <div className="divide-y">
            {MESSAGES.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col sm:flex-row gap-4 p-4 hover:bg-slate-50 cursor-pointer transition-colors ${
                  msg.unread ? 'bg-blue-50/30' : ''
                }`}
              >
                <div className="flex items-start gap-3 sm:w-1/4 shrink-0">
                  <div className="mt-1">
                    {msg.unread ? (
                      <div className="h-2.5 w-2.5 bg-blue-500 rounded-full" />
                    ) : (
                      <Mail className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                  <div className="truncate">
                    <span
                      className={`text-sm truncate ${msg.unread ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}
                    >
                      {msg.sender}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row justify-between gap-2">
                  <div className="min-w-0">
                    <p
                      className={`text-sm truncate ${msg.unread ? 'font-semibold text-slate-900' : 'text-slate-800'}`}
                    >
                      {msg.subject}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">{msg.preview}</p>
                  </div>
                  <div className="text-xs text-slate-500 whitespace-nowrap shrink-0">
                    {msg.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
