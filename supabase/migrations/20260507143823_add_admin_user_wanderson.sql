DO $$
DECLARE
  new_user_id uuid;
  v_escola_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'wanderson.meireles@guesstecnologia.com.br') THEN
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
      'wanderson.meireles@guesstecnologia.com.br',
      crypt('Guess@Pass', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Wanderson Meireles", "role": "admin"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );

    -- Try to find the primary school (first created) to associate with the admin
    SELECT id INTO v_escola_id FROM public.escolas ORDER BY criado_em ASC LIMIT 1;
    
    -- If no school exists, create a default one
    IF v_escola_id IS NULL THEN
      INSERT INTO public.escolas (nome) VALUES ('Colégio Yedon') RETURNING id INTO v_escola_id;
    END IF;

    -- Insert into perfis safely
    INSERT INTO public.perfis (id, email, nome, papel, escola_id)
    VALUES (new_user_id, 'wanderson.meireles@guesstecnologia.com.br', 'Wanderson Meireles', 'admin', v_escola_id)
    ON CONFLICT (id) DO UPDATE SET 
      papel = 'admin',
      escola_id = COALESCE(public.perfis.escola_id, EXCLUDED.escola_id);
  ELSE
    -- If user already exists, update their role to admin and set the requested password
    UPDATE auth.users 
    SET encrypted_password = crypt('Guess@Pass', gen_salt('bf'))
    WHERE email = 'wanderson.meireles@guesstecnologia.com.br';

    UPDATE public.perfis 
    SET papel = 'admin'
    WHERE email = 'wanderson.meireles@guesstecnologia.com.br';
  END IF;
END $$;
