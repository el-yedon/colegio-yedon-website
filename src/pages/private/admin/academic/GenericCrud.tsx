import { ReactNode } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { DeleteAction } from './DeleteAction'

interface Column {
  key: string
  label: string
  render?: (item: any) => ReactNode
}

interface GenericCrudProps {
  title: string
  description: string
  items: any[]
  columns: Column[]
  onDelete: (id: string) => void
  form: ReactNode
}

export function GenericCrud({
  title,
  description,
  items,
  columns,
  onDelete,
  form,
}: GenericCrudProps) {
  return (
    <Card className="shadow-sm border-t-4 border-t-blue-950 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-blue-950">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-slate-50 border rounded-xl border-slate-200">
          <h4 className="text-sm font-semibold mb-3 text-blue-950">Adicionar Novo</h4>
          {form}
        </div>

        <div className="border rounded-md overflow-hidden bg-white">
          <Table>
            <TableHeader className="bg-slate-50 border-b">
              <TableRow>
                {columns.map((c) => (
                  <TableHead key={c.key}>{c.label}</TableHead>
                ))}
                <TableHead className="w-[100px] text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="text-center text-muted-foreground py-8"
                  >
                    Nenhum registro encontrado.
                  </TableCell>
                </TableRow>
              )}
              {items.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((c) => (
                    <TableCell key={c.key} className="text-sm">
                      {c.render ? c.render(item) : item[c.key]}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <DeleteAction onConfirm={() => onDelete(item.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
