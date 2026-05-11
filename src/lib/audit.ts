import { supabase } from '@/lib/supabase/client'

export async function logAudit(acao: string, recurso: string, detalhes: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return

  const { data: profile } = await supabase
    .from('perfis')
    .select('escola_id')
    .eq('id', user.id)
    .single()

  await supabase.from('logs_auditoria').insert({
    usuario_id: user.id,
    escola_id: profile?.escola_id,
    acao,
    recurso,
    detalhes,
  })
}
