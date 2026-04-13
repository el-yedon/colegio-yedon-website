import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'

export function DeleteAction({ onConfirm }: { onConfirm: () => void }) {
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState('')

  const handleConfirm = () => {
    if (password === 'master123') {
      onConfirm()
      setOpen(false)
      setPassword('')
      toast.success('Registro excluído com autorização master.')
    } else {
      toast.error('Senha master incorreta!')
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-blue-950">Autorização Necessária</DialogTitle>
            <DialogDescription>
              A exclusão de registros acadêmicos requer privilégios elevados.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-slate-600">
              Por favor, insira a senha master para confirmar a exclusão. (Dica: master123)
            </p>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha Master"
              className="border-slate-300 focus-visible:ring-amber-500"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Confirmar Exclusão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
