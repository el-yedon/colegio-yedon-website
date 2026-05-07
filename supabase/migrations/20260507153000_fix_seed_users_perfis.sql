DO $$
DECLARE
  v_user RECORD;
  v_escola_id UUID;
BEGIN
  SELECT id INTO v_escola_id FROM public.escolas ORDER BY criado_em ASC LIMIT 1;
  IF v_escola_id IS NULL THEN
    INSERT INTO public.escolas (nome) VALUES ('Colégio Yedon') RETURNING id INTO v_escola_id;
  END IF;

  -- Create missing demo users if they don't exist
  -- admin
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@yedon.com.br') THEN
    INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role, aud, confirmation_token, recovery_token, email_change_token_new, email_change, email_change_token_current, phone, phone_change, phone_change_token, reauthentication_token)
    VALUES (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'admin@yedon.com.br', crypt('Skip@Pass', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider": "email", "providers": ["email"]}', '{"name": "Admin Sistema", "role": "admin"}', false, 'authenticated', 'authenticated', '', '', '', '', '', NULL, '', '', '');
  ELSE
    UPDATE auth.users SET encrypted_password = crypt('Skip@Pass', gen_salt('bf')) WHERE email = 'admin@yedon.com.br';
  END IF;

  -- teacher
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'teacher@yedon.com.br') THEN
    INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role, aud, confirmation_token, recovery_token, email_change_token_new, email_change, email_change_token_current, phone, phone_change, phone_change_token, reauthentication_token)
    VALUES (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'teacher@yedon.com.br', crypt('Skip@Pass', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider": "email", "providers": ["email"]}', '{"name": "Prof. Carlos Silva", "role": "teacher"}', false, 'authenticated', 'authenticated', '', '', '', '', '', NULL, '', '', '');
  ELSE
    UPDATE auth.users SET encrypted_password = crypt('Skip@Pass', gen_salt('bf')) WHERE email = 'teacher@yedon.com.br';
  END IF;

  -- parent
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'parent@yedon.com.br') THEN
    INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role, aud, confirmation_token, recovery_token, email_change_token_new, email_change, email_change_token_current, phone, phone_change, phone_change_token, reauthentication_token)
    VALUES (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'parent@yedon.com.br', crypt('Skip@Pass', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider": "email", "providers": ["email"]}', '{"name": "Maria Eduarda", "role": "parent"}', false, 'authenticated', 'authenticated', '', '', '', '', '', NULL, '', '', '');
  ELSE
    UPDATE auth.users SET encrypted_password = crypt('Skip@Pass', gen_salt('bf')) WHERE email = 'parent@yedon.com.br';
  END IF;

  -- student
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'student@yedon.com.br') THEN
    INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role, aud, confirmation_token, recovery_token, email_change_token_new, email_change, email_change_token_current, phone, phone_change, phone_change_token, reauthentication_token)
    VALUES (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', 'student@yedon.com.br', crypt('Skip@Pass', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider": "email", "providers": ["email"]}', '{"name": "João Pedro", "role": "student"}', false, 'authenticated', 'authenticated', '', '', '', '', '', NULL, '', '', '');
  ELSE
    UPDATE auth.users SET encrypted_password = crypt('Skip@Pass', gen_salt('bf')) WHERE email = 'student@yedon.com.br';
  END IF;

  -- For each demo user, ensure they exist in perfis
  FOR v_user IN SELECT id, email, raw_user_meta_data FROM auth.users WHERE email IN ('admin@yedon.com.br', 'teacher@yedon.com.br', 'parent@yedon.com.br', 'student@yedon.com.br', 'wanderson.meireles@guesstecnologia.com.br') LOOP
    INSERT INTO public.perfis (id, email, nome, papel, escola_id)
    VALUES (
      v_user.id, 
      v_user.email, 
      COALESCE(v_user.raw_user_meta_data->>'name', split_part(v_user.email, '@', 1)), 
      COALESCE(v_user.raw_user_meta_data->>'role', 'student'), 
      v_escola_id
    )
    ON CONFLICT (id) DO UPDATE SET
      papel = COALESCE(v_user.raw_user_meta_data->>'role', public.perfis.papel),
      nome = COALESCE(v_user.raw_user_meta_data->>'name', public.perfis.nome);
  END LOOP;

  -- Also ensure wanderson has the correct password and role
  UPDATE auth.users SET encrypted_password = crypt('Guess@Pass', gen_salt('bf')) WHERE email = 'wanderson.meireles@guesstecnologia.com.br';
  UPDATE public.perfis SET papel = 'admin' WHERE email = 'wanderson.meireles@guesstecnologia.com.br';

END $$;
