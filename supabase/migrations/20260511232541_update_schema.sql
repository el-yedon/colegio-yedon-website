-- Add status column for soft deletes / activity tracking on perfis
ALTER TABLE public.perfis ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'Ativo';

-- Add metadados to turmas for storing dynamic classroom configurations like subjects and teachers
ALTER TABLE public.turmas ADD COLUMN IF NOT EXISTS metadados JSONB DEFAULT '{}'::jsonb;

-- Create logs_auditoria table
CREATE TABLE IF NOT EXISTS public.logs_auditoria (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  escola_id UUID REFERENCES public.escolas(id) ON DELETE CASCADE,
  usuario_id UUID REFERENCES public.perfis(id) ON DELETE SET NULL,
  acao TEXT NOT NULL,
  recurso TEXT NOT NULL,
  detalhes TEXT,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for fast querying
CREATE INDEX IF NOT EXISTS logs_auditoria_escola_id_idx ON public.logs_auditoria(escola_id);
CREATE INDEX IF NOT EXISTS logs_auditoria_criado_em_idx ON public.logs_auditoria(criado_em DESC);

-- Enable RLS
ALTER TABLE public.logs_auditoria ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Master and Admin can read logs" ON public.logs_auditoria;
CREATE POLICY "Master and Admin can read logs" ON public.logs_auditoria
  FOR SELECT TO authenticated USING (check_is_admin(auth.uid()) OR is_master());

DROP POLICY IF EXISTS "System can insert logs" ON public.logs_auditoria;
CREATE POLICY "System can insert logs" ON public.logs_auditoria
  FOR INSERT TO authenticated WITH CHECK (true);
