-- Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('admin', 'master', 'director', 'coordinator', 'teacher', 'parent', 'student')),
  avatar TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Helper function to check admin without infinite recursion
CREATE OR REPLACE FUNCTION public.check_is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_role TEXT;
BEGIN
  SELECT role INTO v_role FROM public.profiles WHERE id = user_id;
  RETURN v_role IN ('admin', 'master', 'director');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Educational Structure
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  course_type TEXT NOT NULL DEFAULT 'regular' CHECK (course_type IN ('regular', 'livre', 'mentoria')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.shifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  sector_id UUID REFERENCES public.sectors(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  grade_id UUID REFERENCES public.grades(id) ON DELETE CASCADE,
  shift_id UUID REFERENCES public.shifts(id) ON DELETE SET NULL,
  academic_year INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, class_id)
);

CREATE TABLE IF NOT EXISTS public.student_parents (
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  PRIMARY KEY (student_id, parent_id)
);

CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  is_synchronous BOOLEAN DEFAULT false,
  scheduled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ,
  max_score DECIMAL(5,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.grades_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID REFERENCES public.assessments(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  score DECIMAL(5,2),
  feedback TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(assessment_id, student_id)
);

CREATE TABLE IF NOT EXISTS public.financial_invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  payer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
  barcode TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Configuration
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grades_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_invoices ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Profiles read access" ON public.profiles;
CREATE POLICY "Profiles read access" ON public.profiles FOR SELECT TO authenticated USING (
  id = auth.uid() OR 
  public.check_is_admin(auth.uid()) OR
  EXISTS (SELECT 1 FROM public.student_parents WHERE parent_id = auth.uid() AND student_id = profiles.id) OR
  (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('teacher', 'coordinator')
);
DROP POLICY IF EXISTS "Profiles update access" ON public.profiles;
CREATE POLICY "Profiles update access" ON public.profiles FOR UPDATE TO authenticated USING (
  id = auth.uid() OR public.check_is_admin(auth.uid())
);

-- Common Public Read Data
DROP POLICY IF EXISTS "Allow authenticated read" ON public.courses;
CREATE POLICY "Allow authenticated read" ON public.courses FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Allow admin modify" ON public.courses;
CREATE POLICY "Allow admin modify" ON public.courses FOR ALL TO authenticated USING (public.check_is_admin(auth.uid()));

DROP POLICY IF EXISTS "Allow authenticated read" ON public.sectors;
CREATE POLICY "Allow authenticated read" ON public.sectors FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Allow admin modify" ON public.sectors;
CREATE POLICY "Allow admin modify" ON public.sectors FOR ALL TO authenticated USING (public.check_is_admin(auth.uid()));

DROP POLICY IF EXISTS "Allow authenticated read" ON public.shifts;
CREATE POLICY "Allow authenticated read" ON public.shifts FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Allow admin modify" ON public.shifts;
CREATE POLICY "Allow admin modify" ON public.shifts FOR ALL TO authenticated USING (public.check_is_admin(auth.uid()));

DROP POLICY IF EXISTS "Allow authenticated read" ON public.grades;
CREATE POLICY "Allow authenticated read" ON public.grades FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Allow admin modify" ON public.grades;
CREATE POLICY "Allow admin modify" ON public.grades FOR ALL TO authenticated USING (public.check_is_admin(auth.uid()));

DROP POLICY IF EXISTS "Allow authenticated read" ON public.classes;
CREATE POLICY "Allow authenticated read" ON public.classes FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Allow admin modify" ON public.classes;
CREATE POLICY "Allow admin modify" ON public.classes FOR ALL TO authenticated USING (public.check_is_admin(auth.uid()));

-- Enrollments Policies
DROP POLICY IF EXISTS "Enrollments read access" ON public.enrollments;
CREATE POLICY "Enrollments read access" ON public.enrollments FOR SELECT TO authenticated USING (
  student_id = auth.uid() OR
  public.check_is_admin(auth.uid()) OR
  (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('teacher', 'coordinator') OR
  EXISTS (SELECT 1 FROM public.student_parents WHERE parent_id = auth.uid() AND student_id = enrollments.student_id)
);
DROP POLICY IF EXISTS "Allow admin modify enrollments" ON public.enrollments;
CREATE POLICY "Allow admin modify enrollments" ON public.enrollments FOR ALL TO authenticated USING (public.check_is_admin(auth.uid()));

-- Lessons
DROP POLICY IF EXISTS "Lessons read access" ON public.lessons;
CREATE POLICY "Lessons read access" ON public.lessons FOR SELECT TO authenticated USING (
  public.check_is_admin(auth.uid()) OR
  teacher_id = auth.uid() OR
  EXISTS (SELECT 1 FROM public.enrollments WHERE class_id = lessons.class_id AND student_id = auth.uid())
);
DROP POLICY IF EXISTS "Lessons write access" ON public.lessons;
CREATE POLICY "Lessons write access" ON public.lessons FOR ALL TO authenticated USING (
  public.check_is_admin(auth.uid()) OR teacher_id = auth.uid()
);

-- Assessments
DROP POLICY IF EXISTS "Assessments read access" ON public.assessments;
CREATE POLICY "Assessments read access" ON public.assessments FOR SELECT TO authenticated USING (
  public.check_is_admin(auth.uid()) OR
  teacher_id = auth.uid() OR
  EXISTS (SELECT 1 FROM public.enrollments WHERE class_id = assessments.class_id AND student_id = auth.uid())
);
DROP POLICY IF EXISTS "Assessments write access" ON public.assessments;
CREATE POLICY "Assessments write access" ON public.assessments FOR ALL TO authenticated USING (
  public.check_is_admin(auth.uid()) OR teacher_id = auth.uid()
);

-- Grades Results
DROP POLICY IF EXISTS "Grades Results read access" ON public.grades_results;
CREATE POLICY "Grades Results read access" ON public.grades_results FOR SELECT TO authenticated USING (
  student_id = auth.uid() OR
  public.check_is_admin(auth.uid()) OR
  EXISTS (SELECT 1 FROM public.assessments WHERE id = grades_results.assessment_id AND teacher_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM public.student_parents WHERE parent_id = auth.uid() AND student_id = grades_results.student_id)
);
DROP POLICY IF EXISTS "Grades Results write access" ON public.grades_results;
CREATE POLICY "Grades Results write access" ON public.grades_results FOR ALL TO authenticated USING (
  public.check_is_admin(auth.uid()) OR
  EXISTS (SELECT 1 FROM public.assessments WHERE id = grades_results.assessment_id AND teacher_id = auth.uid())
);

-- Financial Invoices
DROP POLICY IF EXISTS "Financial read access" ON public.financial_invoices;
CREATE POLICY "Financial read access" ON public.financial_invoices FOR SELECT TO authenticated USING (
  student_id = auth.uid() OR
  payer_id = auth.uid() OR
  public.check_is_admin(auth.uid())
);
DROP POLICY IF EXISTS "Financial write access" ON public.financial_invoices;
CREATE POLICY "Financial write access" ON public.financial_invoices FOR ALL TO authenticated USING (
  public.check_is_admin(auth.uid())
);

-- Seeding Default Users
DO $$
DECLARE
  v_admin_id UUID := gen_random_uuid();
  v_teacher_id UUID := gen_random_uuid();
  v_parent_id UUID := gen_random_uuid();
  v_student_id UUID := gen_random_uuid();
  v_user_email_id UUID := gen_random_uuid();
BEGIN
  -- admin@yedon.com.br
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@yedon.com.br') THEN
    INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role, aud, confirmation_token, recovery_token, email_change_token_new, email_change, email_change_token_current, phone, phone_change, phone_change_token, reauthentication_token)
    VALUES (v_admin_id, '00000000-0000-0000-0000-000000000000', 'admin@yedon.com.br', crypt('Skip@Pass', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider": "email", "providers": ["email"]}', '{"name": "Admin Sistema", "role": "admin"}', false, 'authenticated', 'authenticated', '', '', '', '', '', NULL, '', '', '');
  END IF;

  -- teacher@yedon.com.br
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'teacher@yedon.com.br') THEN
    INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role, aud, confirmation_token, recovery_token, email_change_token_new, email_change, email_change_token_current, phone, phone_change, phone_change_token, reauthentication_token)
    VALUES (v_teacher_id, '00000000-0000-0000-0000-000000000000', 'teacher@yedon.com.br', crypt('Skip@Pass', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider": "email", "providers": ["email"]}', '{"name": "Prof. Carlos Silva", "role": "teacher"}', false, 'authenticated', 'authenticated', '', '', '', '', '', NULL, '', '', '');
  END IF;

  -- parent@yedon.com.br
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'parent@yedon.com.br') THEN
    INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role, aud, confirmation_token, recovery_token, email_change_token_new, email_change, email_change_token_current, phone, phone_change, phone_change_token, reauthentication_token)
    VALUES (v_parent_id, '00000000-0000-0000-0000-000000000000', 'parent@yedon.com.br', crypt('Skip@Pass', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider": "email", "providers": ["email"]}', '{"name": "Maria Eduarda", "role": "parent"}', false, 'authenticated', 'authenticated', '', '', '', '', '', NULL, '', '', '');
  END IF;

  -- student@yedon.com.br
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'student@yedon.com.br') THEN
    INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role, aud, confirmation_token, recovery_token, email_change_token_new, email_change, email_change_token_current, phone, phone_change, phone_change_token, reauthentication_token)
    VALUES (v_student_id, '00000000-0000-0000-0000-000000000000', 'student@yedon.com.br', crypt('Skip@Pass', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider": "email", "providers": ["email"]}', '{"name": "João Pedro", "role": "student"}', false, 'authenticated', 'authenticated', '', '', '', '', '', NULL, '', '', '');
  END IF;

  -- eledir.leo@yedon.com.br
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'eledir.leo@yedon.com.br') THEN
    INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role, aud, confirmation_token, recovery_token, email_change_token_new, email_change, email_change_token_current, phone, phone_change, phone_change_token, reauthentication_token)
    VALUES (v_user_email_id, '00000000-0000-0000-0000-000000000000', 'eledir.leo@yedon.com.br', crypt('Skip@Pass', gen_salt('bf')), NOW(), NOW(), NOW(), '{"provider": "email", "providers": ["email"]}', '{"name": "Eledir Leo", "role": "admin"}', false, 'authenticated', 'authenticated', '', '', '', '', '', NULL, '', '', '');
  END IF;
END $$;

-- Seeding Academic Structure
DO $$
DECLARE
  v_course_id UUID := 'c0000000-0000-0000-0000-000000000001'::uuid;
  v_sector_id UUID := 'd0000000-0000-0000-0000-000000000001'::uuid;
  v_shift_id UUID := 'e0000000-0000-0000-0000-000000000001'::uuid;
  v_grade_id UUID := 'f0000000-0000-0000-0000-000000000001'::uuid;
  v_class_id UUID := 'a0000000-0000-0000-0000-000000000001'::uuid;
  v_student_id UUID;
  v_parent_id UUID;
BEGIN
  INSERT INTO public.courses (id, name, description, course_type) VALUES (v_course_id, 'Ensino Regular', 'Currículo Nacional', 'regular') ON CONFLICT DO NOTHING;
  INSERT INTO public.sectors (id, name) VALUES (v_sector_id, 'Ensino Fundamental II') ON CONFLICT DO NOTHING;
  INSERT INTO public.shifts (id, name) VALUES (v_shift_id, 'Matutino') ON CONFLICT DO NOTHING;
  
  INSERT INTO public.grades (id, name, course_id, sector_id) VALUES (v_grade_id, '9º Ano', v_course_id, v_sector_id) ON CONFLICT DO NOTHING;
  
  INSERT INTO public.classes (id, name, grade_id, shift_id, academic_year) VALUES (v_class_id, '901-A', v_grade_id, v_shift_id, 2026) ON CONFLICT DO NOTHING;

  SELECT id INTO v_student_id FROM auth.users WHERE email = 'student@yedon.com.br' LIMIT 1;
  SELECT id INTO v_parent_id FROM auth.users WHERE email = 'parent@yedon.com.br' LIMIT 1;

  IF v_student_id IS NOT NULL AND v_parent_id IS NOT NULL THEN
    INSERT INTO public.student_parents (student_id, parent_id) VALUES (v_student_id, v_parent_id) ON CONFLICT DO NOTHING;
    INSERT INTO public.enrollments (student_id, class_id) VALUES (v_student_id, v_class_id) ON CONFLICT DO NOTHING;
  END IF;
END $$;
