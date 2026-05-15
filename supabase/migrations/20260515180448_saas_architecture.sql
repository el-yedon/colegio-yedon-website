DO $$
BEGIN
  -- Create SAAS Tables
  CREATE TABLE IF NOT EXISTS public.saas_planos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    descricao TEXT,
    preco NUMERIC NOT NULL DEFAULT 0,
    recursos JSONB DEFAULT '[]'::jsonb,
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS public.saas_assinaturas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    escola_id UUID NOT NULL REFERENCES public.escolas(id) ON DELETE CASCADE,
    plano_id UUID NOT NULL REFERENCES public.saas_planos(id) ON DELETE RESTRICT,
    status TEXT NOT NULL DEFAULT 'ativa',
    data_inicio TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    data_fim TIMESTAMPTZ,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  -- Enable RLS
  ALTER TABLE public.saas_planos ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.saas_assinaturas ENABLE ROW LEVEL SECURITY;
END $$;

-- Drop existing policies if they exist before creating
DROP POLICY IF EXISTS "Planos read" ON public.saas_planos;
CREATE POLICY "Planos read" ON public.saas_planos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Planos master write" ON public.saas_planos;
CREATE POLICY "Planos master write" ON public.saas_planos FOR ALL USING (is_master());

DROP POLICY IF EXISTS "Assinaturas master all" ON public.saas_assinaturas;
CREATE POLICY "Assinaturas master all" ON public.saas_assinaturas FOR ALL USING (is_master());

DROP POLICY IF EXISTS "Assinaturas tenant read" ON public.saas_assinaturas;
CREATE POLICY "Assinaturas tenant read" ON public.saas_assinaturas FOR SELECT USING (escola_id = get_current_tenant_id());

-- Seed the initial master user if not exists
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'eledir.leo@yedon.com.br') THEN
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'eledir.leo@yedon.com.br',
      crypt('Skip@Pass', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Eledir Leo", "role": "master"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );

    INSERT INTO public.perfis (id, email, nome, papel, status)
    VALUES (new_user_id, 'eledir.leo@yedon.com.br', 'Eledir Leo', 'master', 'Ativo')
    ON CONFLICT (id) DO NOTHING;
  END IF;

  -- Also seed adim@yedon.com.br as master as per customer relations context
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'adim@yedon.com.br') THEN
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'adim@yedon.com.br',
      crypt('Admin@2024!', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Admin Master", "role": "master"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );

    INSERT INTO public.perfis (id, email, nome, papel, status, precisa_trocar_senha)
    VALUES (new_user_id, 'adim@yedon.com.br', 'Admin Master', 'master', 'Ativo', true)
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;
