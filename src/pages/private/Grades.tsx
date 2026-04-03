import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default function Grades() {
  const grades = [
    { subject: 'Matemática', b1: 8.5, b2: 7.0, b3: '-', b4: '-', average: 7.7, status: 'Na média' },
    {
      subject: 'Língua Portuguesa',
      b1: 9.0,
      b2: 8.5,
      b3: '-',
      b4: '-',
      average: 8.7,
      status: 'Excelente',
    },
    { subject: 'História', b1: 6.5, b2: 7.5, b3: '-', b4: '-', average: 7.0, status: 'Atenção' },
    { subject: 'Geografia', b1: 8.0, b2: 8.0, b3: '-', b4: '-', average: 8.0, status: 'Bom' },
    {
      subject: 'Ciências / Biologia',
      b1: 9.5,
      b2: 9.0,
      b3: '-',
      b4: '-',
      average: 9.2,
      status: 'Excelente',
    },
    { subject: 'Inglês', b1: 10.0, b2: 9.5, b3: '-', b4: '-', average: 9.7, status: 'Excelente' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excelente':
        return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
      case 'Bom':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
      case 'Na média':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
      case 'Atenção':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-100'
      default:
        return 'bg-slate-100 text-slate-800 hover:bg-slate-100'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Boletim Escolar</h2>
        <p className="text-muted-foreground">Acompanhe o desempenho acadêmico (Ano Letivo 2026).</p>
      </div>

      <Card className="shadow-sm overflow-hidden border-t-4 border-t-primary">
        <CardHeader className="bg-slate-50/50">
          <CardTitle className="text-lg">Notas por Disciplina</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100/50">
                <TableHead className="font-semibold text-slate-900">Disciplina</TableHead>
                <TableHead className="text-center">1º Bim</TableHead>
                <TableHead className="text-center">2º Bim</TableHead>
                <TableHead className="text-center text-slate-400">3º Bim</TableHead>
                <TableHead className="text-center text-slate-400">4º Bim</TableHead>
                <TableHead className="text-center font-bold">Média Parcial</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item.subject}</TableCell>
                  <TableCell className="text-center">{item.b1}</TableCell>
                  <TableCell className="text-center">{item.b2}</TableCell>
                  <TableCell className="text-center text-slate-400">{item.b3}</TableCell>
                  <TableCell className="text-center text-slate-400">{item.b4}</TableCell>
                  <TableCell className="text-center font-bold text-primary">
                    {item.average}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary" className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
