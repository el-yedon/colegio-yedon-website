DO $$
DECLARE
  new_user_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'adm@yedon.com.br') THEN
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
      'adm@yedon.com.br',
      crypt('Yedon@123', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Administrador Master", "role": "master"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );

    INSERT INTO public.perfis (id, email, nome, papel, precisa_trocar_senha, status)
    VALUES (new_user_id, 'adm@yedon.com.br', 'Administrador Master', 'master', true, 'Ativo')
    ON CONFLICT (id) DO UPDATE SET precisa_trocar_senha = true, papel = 'master';
  ELSE
    UPDATE public.perfis 
    SET precisa_trocar_senha = true, papel = 'master'
    WHERE email = 'adm@yedon.com.br';
  END IF;
END $$;
