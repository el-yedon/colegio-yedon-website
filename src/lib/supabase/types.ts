// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5'
  }
  public: {
    Tables: {
      assessments: {
        Row: {
          class_id: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          max_score: number | null
          teacher_id: string | null
          title: string
        }
        Insert: {
          class_id?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          max_score?: number | null
          teacher_id?: string | null
          title: string
        }
        Update: {
          class_id?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          max_score?: number | null
          teacher_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'assessments_class_id_fkey'
            columns: ['class_id']
            isOneToOne: false
            referencedRelation: 'classes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'assessments_teacher_id_fkey'
            columns: ['teacher_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      classes: {
        Row: {
          academic_year: number
          created_at: string
          grade_id: string | null
          id: string
          name: string
          shift_id: string | null
        }
        Insert: {
          academic_year: number
          created_at?: string
          grade_id?: string | null
          id?: string
          name: string
          shift_id?: string | null
        }
        Update: {
          academic_year?: number
          created_at?: string
          grade_id?: string | null
          id?: string
          name?: string
          shift_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'classes_grade_id_fkey'
            columns: ['grade_id']
            isOneToOne: false
            referencedRelation: 'grades'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'classes_shift_id_fkey'
            columns: ['shift_id']
            isOneToOne: false
            referencedRelation: 'shifts'
            referencedColumns: ['id']
          },
        ]
      }
      courses: {
        Row: {
          course_type: string
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          course_type?: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          course_type?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          class_id: string | null
          created_at: string
          id: string
          status: string
          student_id: string | null
        }
        Insert: {
          class_id?: string | null
          created_at?: string
          id?: string
          status?: string
          student_id?: string | null
        }
        Update: {
          class_id?: string | null
          created_at?: string
          id?: string
          status?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'enrollments_class_id_fkey'
            columns: ['class_id']
            isOneToOne: false
            referencedRelation: 'classes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'enrollments_student_id_fkey'
            columns: ['student_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      financial_invoices: {
        Row: {
          amount: number
          barcode: string | null
          created_at: string
          due_date: string
          id: string
          payer_id: string | null
          status: string
          student_id: string | null
        }
        Insert: {
          amount: number
          barcode?: string | null
          created_at?: string
          due_date: string
          id?: string
          payer_id?: string | null
          status?: string
          student_id?: string | null
        }
        Update: {
          amount?: number
          barcode?: string | null
          created_at?: string
          due_date?: string
          id?: string
          payer_id?: string | null
          status?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'financial_invoices_payer_id_fkey'
            columns: ['payer_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'financial_invoices_student_id_fkey'
            columns: ['student_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      grades: {
        Row: {
          course_id: string | null
          created_at: string
          id: string
          name: string
          sector_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          id?: string
          name: string
          sector_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string
          id?: string
          name?: string
          sector_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'grades_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'courses'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'grades_sector_id_fkey'
            columns: ['sector_id']
            isOneToOne: false
            referencedRelation: 'sectors'
            referencedColumns: ['id']
          },
        ]
      }
      grades_results: {
        Row: {
          assessment_id: string | null
          created_at: string
          feedback: string | null
          id: string
          score: number | null
          student_id: string | null
        }
        Insert: {
          assessment_id?: string | null
          created_at?: string
          feedback?: string | null
          id?: string
          score?: number | null
          student_id?: string | null
        }
        Update: {
          assessment_id?: string | null
          created_at?: string
          feedback?: string | null
          id?: string
          score?: number | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'grades_results_assessment_id_fkey'
            columns: ['assessment_id']
            isOneToOne: false
            referencedRelation: 'assessments'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'grades_results_student_id_fkey'
            columns: ['student_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      lessons: {
        Row: {
          class_id: string | null
          created_at: string
          description: string | null
          id: string
          is_synchronous: boolean | null
          scheduled_at: string | null
          teacher_id: string | null
          title: string
          video_url: string | null
        }
        Insert: {
          class_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_synchronous?: boolean | null
          scheduled_at?: string | null
          teacher_id?: string | null
          title: string
          video_url?: string | null
        }
        Update: {
          class_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_synchronous?: boolean | null
          scheduled_at?: string | null
          teacher_id?: string | null
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'lessons_class_id_fkey'
            columns: ['class_id']
            isOneToOne: false
            referencedRelation: 'classes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'lessons_teacher_id_fkey'
            columns: ['teacher_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string
          email: string
          id: string
          name: string
          role: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          email: string
          id: string
          name: string
          role?: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          role?: string
        }
        Relationships: []
      }
      sectors: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      shifts: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      student_parents: {
        Row: {
          parent_id: string
          student_id: string
        }
        Insert: {
          parent_id: string
          student_id: string
        }
        Update: {
          parent_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'student_parents_parent_id_fkey'
            columns: ['parent_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'student_parents_student_id_fkey'
            columns: ['student_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_is_admin: { Args: { user_id: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: assessments
//   id: uuid (not null, default: gen_random_uuid())
//   class_id: uuid (nullable)
//   teacher_id: uuid (nullable)
//   title: text (not null)
//   description: text (nullable)
//   due_date: timestamp with time zone (nullable)
//   max_score: numeric (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: classes
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   grade_id: uuid (nullable)
//   shift_id: uuid (nullable)
//   academic_year: integer (not null)
//   created_at: timestamp with time zone (not null, default: now())
// Table: courses
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   description: text (nullable)
//   course_type: text (not null, default: 'regular'::text)
//   created_at: timestamp with time zone (not null, default: now())
// Table: enrollments
//   id: uuid (not null, default: gen_random_uuid())
//   student_id: uuid (nullable)
//   class_id: uuid (nullable)
//   status: text (not null, default: 'active'::text)
//   created_at: timestamp with time zone (not null, default: now())
// Table: financial_invoices
//   id: uuid (not null, default: gen_random_uuid())
//   student_id: uuid (nullable)
//   payer_id: uuid (nullable)
//   amount: numeric (not null)
//   due_date: date (not null)
//   status: text (not null, default: 'pending'::text)
//   barcode: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: grades
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   course_id: uuid (nullable)
//   sector_id: uuid (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: grades_results
//   id: uuid (not null, default: gen_random_uuid())
//   assessment_id: uuid (nullable)
//   student_id: uuid (nullable)
//   score: numeric (nullable)
//   feedback: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: lessons
//   id: uuid (not null, default: gen_random_uuid())
//   class_id: uuid (nullable)
//   teacher_id: uuid (nullable)
//   title: text (not null)
//   description: text (nullable)
//   video_url: text (nullable)
//   is_synchronous: boolean (nullable, default: false)
//   scheduled_at: timestamp with time zone (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: profiles
//   id: uuid (not null)
//   name: text (not null)
//   email: text (not null)
//   role: text (not null, default: 'student'::text)
//   avatar: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: sectors
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   created_at: timestamp with time zone (not null, default: now())
// Table: shifts
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   created_at: timestamp with time zone (not null, default: now())
// Table: student_parents
//   student_id: uuid (not null)
//   parent_id: uuid (not null)

// --- CONSTRAINTS ---
// Table: assessments
//   FOREIGN KEY assessments_class_id_fkey: FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
//   PRIMARY KEY assessments_pkey: PRIMARY KEY (id)
//   FOREIGN KEY assessments_teacher_id_fkey: FOREIGN KEY (teacher_id) REFERENCES profiles(id) ON DELETE SET NULL
// Table: classes
//   FOREIGN KEY classes_grade_id_fkey: FOREIGN KEY (grade_id) REFERENCES grades(id) ON DELETE CASCADE
//   PRIMARY KEY classes_pkey: PRIMARY KEY (id)
//   FOREIGN KEY classes_shift_id_fkey: FOREIGN KEY (shift_id) REFERENCES shifts(id) ON DELETE SET NULL
// Table: courses
//   CHECK courses_course_type_check: CHECK ((course_type = ANY (ARRAY['regular'::text, 'livre'::text, 'mentoria'::text])))
//   PRIMARY KEY courses_pkey: PRIMARY KEY (id)
// Table: enrollments
//   FOREIGN KEY enrollments_class_id_fkey: FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
//   PRIMARY KEY enrollments_pkey: PRIMARY KEY (id)
//   UNIQUE enrollments_student_id_class_id_key: UNIQUE (student_id, class_id)
//   FOREIGN KEY enrollments_student_id_fkey: FOREIGN KEY (student_id) REFERENCES profiles(id) ON DELETE CASCADE
// Table: financial_invoices
//   FOREIGN KEY financial_invoices_payer_id_fkey: FOREIGN KEY (payer_id) REFERENCES profiles(id) ON DELETE SET NULL
//   PRIMARY KEY financial_invoices_pkey: PRIMARY KEY (id)
//   CHECK financial_invoices_status_check: CHECK ((status = ANY (ARRAY['pending'::text, 'paid'::text, 'overdue'::text, 'cancelled'::text])))
//   FOREIGN KEY financial_invoices_student_id_fkey: FOREIGN KEY (student_id) REFERENCES profiles(id) ON DELETE CASCADE
// Table: grades
//   FOREIGN KEY grades_course_id_fkey: FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
//   PRIMARY KEY grades_pkey: PRIMARY KEY (id)
//   FOREIGN KEY grades_sector_id_fkey: FOREIGN KEY (sector_id) REFERENCES sectors(id) ON DELETE SET NULL
// Table: grades_results
//   FOREIGN KEY grades_results_assessment_id_fkey: FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE CASCADE
//   UNIQUE grades_results_assessment_id_student_id_key: UNIQUE (assessment_id, student_id)
//   PRIMARY KEY grades_results_pkey: PRIMARY KEY (id)
//   FOREIGN KEY grades_results_student_id_fkey: FOREIGN KEY (student_id) REFERENCES profiles(id) ON DELETE CASCADE
// Table: lessons
//   FOREIGN KEY lessons_class_id_fkey: FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
//   PRIMARY KEY lessons_pkey: PRIMARY KEY (id)
//   FOREIGN KEY lessons_teacher_id_fkey: FOREIGN KEY (teacher_id) REFERENCES profiles(id) ON DELETE SET NULL
// Table: profiles
//   FOREIGN KEY profiles_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY profiles_pkey: PRIMARY KEY (id)
//   CHECK profiles_role_check: CHECK ((role = ANY (ARRAY['admin'::text, 'master'::text, 'director'::text, 'coordinator'::text, 'teacher'::text, 'parent'::text, 'student'::text])))
// Table: sectors
//   PRIMARY KEY sectors_pkey: PRIMARY KEY (id)
// Table: shifts
//   PRIMARY KEY shifts_pkey: PRIMARY KEY (id)
// Table: student_parents
//   FOREIGN KEY student_parents_parent_id_fkey: FOREIGN KEY (parent_id) REFERENCES profiles(id) ON DELETE CASCADE
//   PRIMARY KEY student_parents_pkey: PRIMARY KEY (student_id, parent_id)
//   FOREIGN KEY student_parents_student_id_fkey: FOREIGN KEY (student_id) REFERENCES profiles(id) ON DELETE CASCADE

// --- ROW LEVEL SECURITY POLICIES ---
// Table: assessments
//   Policy "Assessments read access" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (check_is_admin(auth.uid()) OR (teacher_id = auth.uid()) OR (EXISTS ( SELECT 1    FROM enrollments   WHERE ((enrollments.class_id = assessments.class_id) AND (enrollments.student_id = auth.uid())))))
//   Policy "Assessments write access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (check_is_admin(auth.uid()) OR (teacher_id = auth.uid()))
// Table: classes
//   Policy "Allow admin modify" (ALL, PERMISSIVE) roles={authenticated}
//     USING: check_is_admin(auth.uid())
//   Policy "Allow authenticated read" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: courses
//   Policy "Allow admin modify" (ALL, PERMISSIVE) roles={authenticated}
//     USING: check_is_admin(auth.uid())
//   Policy "Allow authenticated read" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: enrollments
//   Policy "Allow admin modify enrollments" (ALL, PERMISSIVE) roles={authenticated}
//     USING: check_is_admin(auth.uid())
//   Policy "Enrollments read access" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: ((student_id = auth.uid()) OR check_is_admin(auth.uid()) OR (( SELECT profiles.role    FROM profiles   WHERE (profiles.id = auth.uid())) = ANY (ARRAY['teacher'::text, 'coordinator'::text])) OR (EXISTS ( SELECT 1    FROM student_parents   WHERE ((student_parents.parent_id = auth.uid()) AND (student_parents.student_id = enrollments.student_id)))))
// Table: financial_invoices
//   Policy "Financial read access" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: ((student_id = auth.uid()) OR (payer_id = auth.uid()) OR check_is_admin(auth.uid()))
//   Policy "Financial write access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: check_is_admin(auth.uid())
// Table: grades
//   Policy "Allow admin modify" (ALL, PERMISSIVE) roles={authenticated}
//     USING: check_is_admin(auth.uid())
//   Policy "Allow authenticated read" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: grades_results
//   Policy "Grades Results read access" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: ((student_id = auth.uid()) OR check_is_admin(auth.uid()) OR (EXISTS ( SELECT 1    FROM assessments   WHERE ((assessments.id = grades_results.assessment_id) AND (assessments.teacher_id = auth.uid())))) OR (EXISTS ( SELECT 1    FROM student_parents   WHERE ((student_parents.parent_id = auth.uid()) AND (student_parents.student_id = grades_results.student_id)))))
//   Policy "Grades Results write access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (check_is_admin(auth.uid()) OR (EXISTS ( SELECT 1    FROM assessments   WHERE ((assessments.id = grades_results.assessment_id) AND (assessments.teacher_id = auth.uid())))))
// Table: lessons
//   Policy "Lessons read access" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (check_is_admin(auth.uid()) OR (teacher_id = auth.uid()) OR (EXISTS ( SELECT 1    FROM enrollments   WHERE ((enrollments.class_id = lessons.class_id) AND (enrollments.student_id = auth.uid())))))
//   Policy "Lessons write access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (check_is_admin(auth.uid()) OR (teacher_id = auth.uid()))
// Table: profiles
//   Policy "Profiles read access" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: ((id = auth.uid()) OR check_is_admin(auth.uid()) OR (EXISTS ( SELECT 1    FROM student_parents   WHERE ((student_parents.parent_id = auth.uid()) AND (student_parents.student_id = profiles.id)))) OR (( SELECT profiles_1.role    FROM profiles profiles_1   WHERE (profiles_1.id = auth.uid())) = ANY (ARRAY['teacher'::text, 'coordinator'::text])))
//   Policy "Profiles update access" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: ((id = auth.uid()) OR check_is_admin(auth.uid()))
// Table: sectors
//   Policy "Allow admin modify" (ALL, PERMISSIVE) roles={authenticated}
//     USING: check_is_admin(auth.uid())
//   Policy "Allow authenticated read" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: shifts
//   Policy "Allow admin modify" (ALL, PERMISSIVE) roles={authenticated}
//     USING: check_is_admin(auth.uid())
//   Policy "Allow authenticated read" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true

// --- WARNING: TABLES WITH RLS ENABLED BUT NO POLICIES ---
// These tables have Row Level Security enabled but NO policies defined.
// This means ALL queries (SELECT, INSERT, UPDATE, DELETE) will return ZERO rows
// for non-superuser roles (including the anon and authenticated roles used by the app).
// You MUST create RLS policies for these tables to allow data access.
//   - student_parents

// --- DATABASE FUNCTIONS ---
// FUNCTION check_is_admin(uuid)
//   CREATE OR REPLACE FUNCTION public.check_is_admin(user_id uuid)
//    RETURNS boolean
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   DECLARE
//     v_role TEXT;
//   BEGIN
//     SELECT role INTO v_role FROM public.profiles WHERE id = user_id;
//     RETURN v_role IN ('admin', 'master', 'director');
//   END;
//   $function$
//
// FUNCTION handle_new_user()
//   CREATE OR REPLACE FUNCTION public.handle_new_user()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//     INSERT INTO public.profiles (id, email, name, role)
//     VALUES (
//       NEW.id,
//       NEW.email,
//       COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
//       COALESCE(NEW.raw_user_meta_data->>'role', 'student')
//     );
//     RETURN NEW;
//   END;
//   $function$
//

// --- INDEXES ---
// Table: enrollments
//   CREATE UNIQUE INDEX enrollments_student_id_class_id_key ON public.enrollments USING btree (student_id, class_id)
// Table: grades_results
//   CREATE UNIQUE INDEX grades_results_assessment_id_student_id_key ON public.grades_results USING btree (assessment_id, student_id)
