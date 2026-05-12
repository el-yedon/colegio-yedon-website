// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      anos_escolares: {
        Row: {
          criado_em: string
          curso_id: string | null
          escola_id: string | null
          id: string
          nome: string
          setor_id: string | null
        }
        Insert: {
          criado_em?: string
          curso_id?: string | null
          escola_id?: string | null
          id?: string
          nome: string
          setor_id?: string | null
        }
        Update: {
          criado_em?: string
          curso_id?: string | null
          escola_id?: string | null
          id?: string
          nome?: string
          setor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grades_course_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grades_sector_id_fkey"
            columns: ["setor_id"]
            isOneToOne: false
            referencedRelation: "setores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grades_tenant_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      aulas: {
        Row: {
          agendada_para: string | null
          criado_em: string
          descricao: string | null
          e_sincrona: boolean | null
          escola_id: string | null
          id: string
          professor_id: string | null
          titulo: string
          turma_id: string | null
          url_video: string | null
        }
        Insert: {
          agendada_para?: string | null
          criado_em?: string
          descricao?: string | null
          e_sincrona?: boolean | null
          escola_id?: string | null
          id?: string
          professor_id?: string | null
          titulo: string
          turma_id?: string | null
          url_video?: string | null
        }
        Update: {
          agendada_para?: string | null
          criado_em?: string
          descricao?: string | null
          e_sincrona?: boolean | null
          escola_id?: string | null
          id?: string
          professor_id?: string | null
          titulo?: string
          turma_id?: string | null
          url_video?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_class_id_fkey"
            columns: ["turma_id"]
            isOneToOne: false
            referencedRelation: "turmas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_teacher_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_tenant_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      avaliacoes: {
        Row: {
          criado_em: string
          data_entrega: string | null
          descricao: string | null
          escola_id: string | null
          id: string
          nota_maxima: number | null
          professor_id: string | null
          titulo: string
          turma_id: string | null
        }
        Insert: {
          criado_em?: string
          data_entrega?: string | null
          descricao?: string | null
          escola_id?: string | null
          id?: string
          nota_maxima?: number | null
          professor_id?: string | null
          titulo: string
          turma_id?: string | null
        }
        Update: {
          criado_em?: string
          data_entrega?: string | null
          descricao?: string | null
          escola_id?: string | null
          id?: string
          nota_maxima?: number | null
          professor_id?: string | null
          titulo?: string
          turma_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessments_class_id_fkey"
            columns: ["turma_id"]
            isOneToOne: false
            referencedRelation: "turmas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessments_teacher_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessments_tenant_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      cursos: {
        Row: {
          criado_em: string
          descricao: string | null
          escola_id: string | null
          id: string
          nome: string
          tipo_curso: string
        }
        Insert: {
          criado_em?: string
          descricao?: string | null
          escola_id?: string | null
          id?: string
          nome: string
          tipo_curso?: string
        }
        Update: {
          criado_em?: string
          descricao?: string | null
          escola_id?: string | null
          id?: string
          nome?: string
          tipo_curso?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_tenant_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      custos_materiais: {
        Row: {
          criado_em: string
          escola_id: string | null
          id: string
          modalidade_pagamento: string
          nome: string
          quantidade_parcelas: number
          valor_total: number
        }
        Insert: {
          criado_em?: string
          escola_id?: string | null
          id?: string
          modalidade_pagamento: string
          nome: string
          quantidade_parcelas: number
          valor_total: number
        }
        Update: {
          criado_em?: string
          escola_id?: string | null
          id?: string
          modalidade_pagamento?: string
          nome?: string
          quantidade_parcelas?: number
          valor_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "custos_materiais_escola_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      disciplinas: {
        Row: {
          criado_em: string
          escola_id: string | null
          id: string
          nome: string
        }
        Insert: {
          criado_em?: string
          escola_id?: string | null
          id?: string
          nome: string
        }
        Update: {
          criado_em?: string
          escola_id?: string | null
          id?: string
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "subjects_tenant_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      escolas: {
        Row: {
          criado_em: string
          id: string
          nome: string
        }
        Insert: {
          criado_em?: string
          id?: string
          nome: string
        }
        Update: {
          criado_em?: string
          id?: string
          nome?: string
        }
        Relationships: []
      }
      faturas: {
        Row: {
          aluno_id: string | null
          codigo_barras: string | null
          criado_em: string
          data_vencimento: string
          escola_id: string | null
          id: string
          pagador_id: string | null
          status: string
          valor: number
        }
        Insert: {
          aluno_id?: string | null
          codigo_barras?: string | null
          criado_em?: string
          data_vencimento: string
          escola_id?: string | null
          id?: string
          pagador_id?: string | null
          status?: string
          valor: number
        }
        Update: {
          aluno_id?: string | null
          codigo_barras?: string | null
          criado_em?: string
          data_vencimento?: string
          escola_id?: string | null
          id?: string
          pagador_id?: string | null
          status?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "financial_invoices_payer_id_fkey"
            columns: ["pagador_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_invoices_student_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_invoices_tenant_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      frentes: {
        Row: {
          criado_em: string
          escola_id: string | null
          id: string
          nome: string
        }
        Insert: {
          criado_em?: string
          escola_id?: string | null
          id?: string
          nome: string
        }
        Update: {
          criado_em?: string
          escola_id?: string | null
          id?: string
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "fronts_tenant_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      historico_matriculas: {
        Row: {
          acao: string
          criado_em: string
          data_registro: string
          detalhes: string | null
          escola_id: string | null
          id: string
          matricula_id: string | null
          operador: string
        }
        Insert: {
          acao: string
          criado_em?: string
          data_registro?: string
          detalhes?: string | null
          escola_id?: string | null
          id?: string
          matricula_id?: string | null
          operador: string
        }
        Update: {
          acao?: string
          criado_em?: string
          data_registro?: string
          detalhes?: string | null
          escola_id?: string | null
          id?: string
          matricula_id?: string | null
          operador?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollment_history_enrollment_id_fkey"
            columns: ["matricula_id"]
            isOneToOne: false
            referencedRelation: "matriculas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_history_tenant_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      logs_auditoria: {
        Row: {
          acao: string
          criado_em: string
          detalhes: string | null
          escola_id: string | null
          id: string
          recurso: string
          usuario_id: string | null
        }
        Insert: {
          acao: string
          criado_em?: string
          detalhes?: string | null
          escola_id?: string | null
          id?: string
          recurso: string
          usuario_id?: string | null
        }
        Update: {
          acao?: string
          criado_em?: string
          detalhes?: string | null
          escola_id?: string | null
          id?: string
          recurso?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logs_auditoria_escola_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "logs_auditoria_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
        ]
      }
      matriculas: {
        Row: {
          aluno_id: string | null
          criado_em: string
          escola_id: string | null
          id: string
          plano_financeiro_id: string | null
          serie_id: string | null
          status: string
          turma_id: string | null
          turno_id: string | null
        }
        Insert: {
          aluno_id?: string | null
          criado_em?: string
          escola_id?: string | null
          id?: string
          plano_financeiro_id?: string | null
          serie_id?: string | null
          status?: string
          turma_id?: string | null
          turno_id?: string | null
        }
        Update: {
          aluno_id?: string | null
          criado_em?: string
          escola_id?: string | null
          id?: string
          plano_financeiro_id?: string | null
          serie_id?: string | null
          status?: string
          turma_id?: string | null
          turno_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_class_id_fkey"
            columns: ["turma_id"]
            isOneToOne: false
            referencedRelation: "turmas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_student_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_tenant_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matriculas_plano_financeiro_id_fkey"
            columns: ["plano_financeiro_id"]
            isOneToOne: false
            referencedRelation: "planos_financeiros"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matriculas_serie_id_fkey"
            columns: ["serie_id"]
            isOneToOne: false
            referencedRelation: "series"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matriculas_turno_id_fkey"
            columns: ["turno_id"]
            isOneToOne: false
            referencedRelation: "turnos"
            referencedColumns: ["id"]
          },
        ]
      }
      notificacoes: {
        Row: {
          criado_em: string
          dados: Json | null
          id: string
          lida: boolean
          mensagem: string
          tipo: string
          titulo: string
          usuario_id: string
        }
        Insert: {
          criado_em?: string
          dados?: Json | null
          id?: string
          lida?: boolean
          mensagem: string
          tipo?: string
          titulo: string
          usuario_id: string
        }
        Update: {
          criado_em?: string
          dados?: Json | null
          id?: string
          lida?: boolean
          mensagem?: string
          tipo?: string
          titulo?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notificacoes_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
        ]
      }
      parcelas: {
        Row: {
          criado_em: string
          data_pagamento: string | null
          data_vencimento: string
          escola_id: string | null
          id: string
          matricula_id: string | null
          numero: number
          status: string
          valor: number
        }
        Insert: {
          criado_em?: string
          data_pagamento?: string | null
          data_vencimento: string
          escola_id?: string | null
          id?: string
          matricula_id?: string | null
          numero: number
          status?: string
          valor: number
        }
        Update: {
          criado_em?: string
          data_pagamento?: string | null
          data_vencimento?: string
          escola_id?: string | null
          id?: string
          matricula_id?: string | null
          numero?: number
          status?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "installments_enrollment_id_fkey"
            columns: ["matricula_id"]
            isOneToOne: false
            referencedRelation: "matriculas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "installments_tenant_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      perfis: {
        Row: {
          avatar: string | null
          bairro: string | null
          cep: string | null
          cidade: string | null
          complemento: string | null
          cpf: string | null
          criado_em: string
          email: string
          escola_id: string | null
          estado: string | null
          id: string
          logradouro: string | null
          nome: string
          numero_endereco: string | null
          papel: string
          precisa_trocar_senha: boolean | null
          rg: string | null
          status: string
          telefone: string | null
        }
        Insert: {
          avatar?: string | null
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          complemento?: string | null
          cpf?: string | null
          criado_em?: string
          email: string
          escola_id?: string | null
          estado?: string | null
          id: string
          logradouro?: string | null
          nome: string
          numero_endereco?: string | null
          papel?: string
          precisa_trocar_senha?: boolean | null
          rg?: string | null
          status?: string
          telefone?: string | null
        }
        Update: {
          avatar?: string | null
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          complemento?: string | null
          cpf?: string | null
          criado_em?: string
          email?: string
          escola_id?: string | null
          estado?: string | null
          id?: string
          logradouro?: string | null
          nome?: string
          numero_endereco?: string | null
          papel?: string
          precisa_trocar_senha?: boolean | null
          rg?: string | null
          status?: string
          telefone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      permissoes_grupo: {
        Row: {
          criado_em: string | null
          editar: boolean | null
          escola_id: string | null
          excluir: boolean | null
          id: string
          inserir: boolean | null
          ler: boolean | null
          modulo: string
          papel: string
        }
        Insert: {
          criado_em?: string | null
          editar?: boolean | null
          escola_id?: string | null
          excluir?: boolean | null
          id?: string
          inserir?: boolean | null
          ler?: boolean | null
          modulo: string
          papel: string
        }
        Update: {
          criado_em?: string | null
          editar?: boolean | null
          escola_id?: string | null
          excluir?: boolean | null
          id?: string
          inserir?: boolean | null
          ler?: boolean | null
          modulo?: string
          papel?: string
        }
        Relationships: [
          {
            foreignKeyName: "permissoes_grupo_escola_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      planos_financeiros: {
        Row: {
          criado_em: string
          dia_vencimento_padrao: number | null
          escola_id: string | null
          id: string
          mensalidade: number
          mes_inicio: number | null
          nome: string
          quantidade_parcelas: number
          serie_id: string | null
          setor_id: string | null
          taxa_matricula: number
          validade_fim: string | null
          validade_inicio: string | null
          valor_total: number
        }
        Insert: {
          criado_em?: string
          dia_vencimento_padrao?: number | null
          escola_id?: string | null
          id?: string
          mensalidade: number
          mes_inicio?: number | null
          nome: string
          quantidade_parcelas: number
          serie_id?: string | null
          setor_id?: string | null
          taxa_matricula: number
          validade_fim?: string | null
          validade_inicio?: string | null
          valor_total: number
        }
        Update: {
          criado_em?: string
          dia_vencimento_padrao?: number | null
          escola_id?: string | null
          id?: string
          mensalidade?: number
          mes_inicio?: number | null
          nome?: string
          quantidade_parcelas?: number
          serie_id?: string | null
          setor_id?: string | null
          taxa_matricula?: number
          validade_fim?: string | null
          validade_inicio?: string | null
          valor_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "financial_plans_sector_id_fkey"
            columns: ["setor_id"]
            isOneToOne: false
            referencedRelation: "setores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_plans_series_id_fkey"
            columns: ["serie_id"]
            isOneToOne: false
            referencedRelation: "series"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_plans_tenant_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      responsaveis_alunos: {
        Row: {
          aluno_id: string
          escola_id: string | null
          responsavel_id: string
        }
        Insert: {
          aluno_id: string
          escola_id?: string | null
          responsavel_id: string
        }
        Update: {
          aluno_id?: string
          escola_id?: string | null
          responsavel_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_parents_parent_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_parents_student_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_parents_tenant_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      resultados_avaliacoes: {
        Row: {
          aluno_id: string | null
          avaliacao_id: string | null
          criado_em: string
          escola_id: string | null
          feedback: string | null
          id: string
          nota: number | null
        }
        Insert: {
          aluno_id?: string | null
          avaliacao_id?: string | null
          criado_em?: string
          escola_id?: string | null
          feedback?: string | null
          id?: string
          nota?: number | null
        }
        Update: {
          aluno_id?: string | null
          avaliacao_id?: string | null
          criado_em?: string
          escola_id?: string | null
          feedback?: string | null
          id?: string
          nota?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "grades_results_assessment_id_fkey"
            columns: ["avaliacao_id"]
            isOneToOne: false
            referencedRelation: "avaliacoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grades_results_student_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grades_results_tenant_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      series: {
        Row: {
          criado_em: string
          escola_id: string | null
          id: string
          nome: string
        }
        Insert: {
          criado_em?: string
          escola_id?: string | null
          id?: string
          nome: string
        }
        Update: {
          criado_em?: string
          escola_id?: string | null
          id?: string
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "series_tenant_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      setores: {
        Row: {
          criado_em: string
          escola_id: string | null
          id: string
          nome: string
        }
        Insert: {
          criado_em?: string
          escola_id?: string | null
          id?: string
          nome: string
        }
        Update: {
          criado_em?: string
          escola_id?: string | null
          id?: string
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "sectors_tenant_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      solicitacoes_acesso: {
        Row: {
          criado_em: string
          email: string
          id: string
          nome: string
          papel: string
          status: string
        }
        Insert: {
          criado_em?: string
          email: string
          id?: string
          nome: string
          papel?: string
          status?: string
        }
        Update: {
          criado_em?: string
          email?: string
          id?: string
          nome?: string
          papel?: string
          status?: string
        }
        Relationships: []
      }
      turmas: {
        Row: {
          ano_escolar_id: string | null
          ano_letivo: number
          criado_em: string
          escola_id: string | null
          id: string
          metadados: Json | null
          nome: string
          turno_id: string | null
        }
        Insert: {
          ano_escolar_id?: string | null
          ano_letivo: number
          criado_em?: string
          escola_id?: string | null
          id?: string
          metadados?: Json | null
          nome: string
          turno_id?: string | null
        }
        Update: {
          ano_escolar_id?: string | null
          ano_letivo?: number
          criado_em?: string
          escola_id?: string | null
          id?: string
          metadados?: Json | null
          nome?: string
          turno_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_grade_id_fkey"
            columns: ["ano_escolar_id"]
            isOneToOne: false
            referencedRelation: "anos_escolares"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_shift_id_fkey"
            columns: ["turno_id"]
            isOneToOne: false
            referencedRelation: "turnos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_tenant_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      turnos: {
        Row: {
          criado_em: string
          escola_id: string | null
          id: string
          nome: string
        }
        Insert: {
          criado_em?: string
          escola_id?: string | null
          id?: string
          nome: string
        }
        Update: {
          criado_em?: string
          escola_id?: string | null
          id?: string
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "shifts_tenant_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_is_admin: { Args: { user_id: string }; Returns: boolean }
      get_current_tenant_id: { Args: never; Returns: string }
      is_master: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
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
// Table: anos_escolares
//   id: uuid (not null, default: gen_random_uuid())
//   nome: text (not null)
//   curso_id: uuid (nullable)
//   setor_id: uuid (nullable)
//   criado_em: timestamp with time zone (not null, default: now())
//   escola_id: uuid (nullable)
// Table: aulas
//   id: uuid (not null, default: gen_random_uuid())
//   turma_id: uuid (nullable)
//   professor_id: uuid (nullable)
//   titulo: text (not null)
//   descricao: text (nullable)
//   url_video: text (nullable)
//   e_sincrona: boolean (nullable, default: false)
//   agendada_para: timestamp with time zone (nullable)
//   criado_em: timestamp with time zone (not null, default: now())
//   escola_id: uuid (nullable)
// Table: avaliacoes
//   id: uuid (not null, default: gen_random_uuid())
//   turma_id: uuid (nullable)
//   professor_id: uuid (nullable)
//   titulo: text (not null)
//   descricao: text (nullable)
//   data_entrega: timestamp with time zone (nullable)
//   nota_maxima: numeric (nullable)
//   criado_em: timestamp with time zone (not null, default: now())
//   escola_id: uuid (nullable)
// Table: cursos
//   id: uuid (not null, default: gen_random_uuid())
//   nome: text (not null)
//   descricao: text (nullable)
//   tipo_curso: text (not null, default: 'regular'::text)
//   criado_em: timestamp with time zone (not null, default: now())
//   escola_id: uuid (nullable)
// Table: custos_materiais
//   id: uuid (not null, default: gen_random_uuid())
//   escola_id: uuid (nullable)
//   nome: text (not null)
//   valor_total: numeric (not null)
//   modalidade_pagamento: text (not null)
//   quantidade_parcelas: integer (not null)
//   criado_em: timestamp with time zone (not null, default: now())
// Table: disciplinas
//   id: uuid (not null, default: gen_random_uuid())
//   escola_id: uuid (nullable)
//   nome: text (not null)
//   criado_em: timestamp with time zone (not null, default: now())
// Table: escolas
//   id: uuid (not null, default: gen_random_uuid())
//   nome: text (not null)
//   criado_em: timestamp with time zone (not null, default: now())
// Table: faturas
//   id: uuid (not null, default: gen_random_uuid())
//   aluno_id: uuid (nullable)
//   pagador_id: uuid (nullable)
//   valor: numeric (not null)
//   data_vencimento: date (not null)
//   status: text (not null, default: 'pending'::text)
//   codigo_barras: text (nullable)
//   criado_em: timestamp with time zone (not null, default: now())
//   escola_id: uuid (nullable)
// Table: frentes
//   id: uuid (not null, default: gen_random_uuid())
//   escola_id: uuid (nullable)
//   nome: text (not null)
//   criado_em: timestamp with time zone (not null, default: now())
// Table: historico_matriculas
//   id: uuid (not null, default: gen_random_uuid())
//   escola_id: uuid (nullable)
//   matricula_id: uuid (nullable)
//   data_registro: timestamp with time zone (not null, default: now())
//   operador: text (not null)
//   acao: text (not null)
//   detalhes: text (nullable)
//   criado_em: timestamp with time zone (not null, default: now())
// Table: logs_auditoria
//   id: uuid (not null, default: gen_random_uuid())
//   escola_id: uuid (nullable)
//   usuario_id: uuid (nullable)
//   acao: text (not null)
//   recurso: text (not null)
//   detalhes: text (nullable)
//   criado_em: timestamp with time zone (not null, default: now())
// Table: matriculas
//   id: uuid (not null, default: gen_random_uuid())
//   aluno_id: uuid (nullable)
//   turma_id: uuid (nullable)
//   status: text (not null, default: 'active'::text)
//   criado_em: timestamp with time zone (not null, default: now())
//   escola_id: uuid (nullable)
//   serie_id: uuid (nullable)
//   turno_id: uuid (nullable)
//   plano_financeiro_id: uuid (nullable)
// Table: notificacoes
//   id: uuid (not null, default: gen_random_uuid())
//   usuario_id: uuid (not null)
//   titulo: text (not null)
//   mensagem: text (not null)
//   lida: boolean (not null, default: false)
//   tipo: text (not null, default: 'sistema'::text)
//   dados: jsonb (nullable)
//   criado_em: timestamp with time zone (not null, default: now())
// Table: parcelas
//   id: uuid (not null, default: gen_random_uuid())
//   escola_id: uuid (nullable)
//   matricula_id: uuid (nullable)
//   numero: integer (not null)
//   data_vencimento: date (not null)
//   valor: numeric (not null)
//   status: text (not null, default: 'Pending'::text)
//   data_pagamento: date (nullable)
//   criado_em: timestamp with time zone (not null, default: now())
// Table: perfis
//   id: uuid (not null)
//   nome: text (not null)
//   email: text (not null)
//   papel: text (not null, default: 'student'::text)
//   avatar: text (nullable)
//   criado_em: timestamp with time zone (not null, default: now())
//   escola_id: uuid (nullable)
//   cpf: text (nullable)
//   rg: text (nullable)
//   telefone: text (nullable)
//   cep: text (nullable)
//   logradouro: text (nullable)
//   numero_endereco: text (nullable)
//   complemento: text (nullable)
//   bairro: text (nullable)
//   cidade: text (nullable)
//   estado: text (nullable)
//   precisa_trocar_senha: boolean (nullable, default: false)
//   status: text (not null, default: 'Ativo'::text)
// Table: permissoes_grupo
//   id: uuid (not null, default: gen_random_uuid())
//   escola_id: uuid (nullable)
//   papel: text (not null)
//   modulo: text (not null)
//   ler: boolean (nullable, default: false)
//   inserir: boolean (nullable, default: false)
//   editar: boolean (nullable, default: false)
//   excluir: boolean (nullable, default: false)
//   criado_em: timestamp with time zone (nullable, default: now())
// Table: planos_financeiros
//   id: uuid (not null, default: gen_random_uuid())
//   escola_id: uuid (nullable)
//   nome: text (not null)
//   setor_id: uuid (nullable)
//   serie_id: uuid (nullable)
//   valor_total: numeric (not null)
//   quantidade_parcelas: integer (not null)
//   taxa_matricula: numeric (not null)
//   mensalidade: numeric (not null)
//   validade_inicio: date (nullable)
//   validade_fim: date (nullable)
//   dia_vencimento_padrao: integer (nullable)
//   mes_inicio: integer (nullable)
//   criado_em: timestamp with time zone (not null, default: now())
// Table: responsaveis_alunos
//   aluno_id: uuid (not null)
//   responsavel_id: uuid (not null)
//   escola_id: uuid (nullable)
// Table: resultados_avaliacoes
//   id: uuid (not null, default: gen_random_uuid())
//   avaliacao_id: uuid (nullable)
//   aluno_id: uuid (nullable)
//   nota: numeric (nullable)
//   feedback: text (nullable)
//   criado_em: timestamp with time zone (not null, default: now())
//   escola_id: uuid (nullable)
// Table: series
//   id: uuid (not null, default: gen_random_uuid())
//   escola_id: uuid (nullable)
//   nome: text (not null)
//   criado_em: timestamp with time zone (not null, default: now())
// Table: setores
//   id: uuid (not null, default: gen_random_uuid())
//   nome: text (not null)
//   criado_em: timestamp with time zone (not null, default: now())
//   escola_id: uuid (nullable)
// Table: solicitacoes_acesso
//   id: uuid (not null, default: gen_random_uuid())
//   nome: text (not null)
//   email: text (not null)
//   papel: text (not null, default: 'teacher'::text)
//   status: text (not null, default: 'pendente'::text)
//   criado_em: timestamp with time zone (not null, default: now())
// Table: turmas
//   id: uuid (not null, default: gen_random_uuid())
//   nome: text (not null)
//   ano_escolar_id: uuid (nullable)
//   turno_id: uuid (nullable)
//   ano_letivo: integer (not null)
//   criado_em: timestamp with time zone (not null, default: now())
//   escola_id: uuid (nullable)
//   metadados: jsonb (nullable, default: '{}'::jsonb)
// Table: turnos
//   id: uuid (not null, default: gen_random_uuid())
//   nome: text (not null)
//   criado_em: timestamp with time zone (not null, default: now())
//   escola_id: uuid (nullable)

// --- CONSTRAINTS ---
// Table: anos_escolares
//   FOREIGN KEY grades_course_id_fkey: FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
//   PRIMARY KEY grades_pkey: PRIMARY KEY (id)
//   FOREIGN KEY grades_sector_id_fkey: FOREIGN KEY (setor_id) REFERENCES setores(id) ON DELETE SET NULL
//   FOREIGN KEY grades_tenant_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
// Table: aulas
//   FOREIGN KEY lessons_class_id_fkey: FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE
//   PRIMARY KEY lessons_pkey: PRIMARY KEY (id)
//   FOREIGN KEY lessons_teacher_id_fkey: FOREIGN KEY (professor_id) REFERENCES perfis(id) ON DELETE SET NULL
//   FOREIGN KEY lessons_tenant_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
// Table: avaliacoes
//   FOREIGN KEY assessments_class_id_fkey: FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE
//   PRIMARY KEY assessments_pkey: PRIMARY KEY (id)
//   FOREIGN KEY assessments_teacher_id_fkey: FOREIGN KEY (professor_id) REFERENCES perfis(id) ON DELETE SET NULL
//   FOREIGN KEY assessments_tenant_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
// Table: cursos
//   CHECK courses_course_type_check: CHECK ((tipo_curso = ANY (ARRAY['regular'::text, 'livre'::text, 'mentoria'::text])))
//   PRIMARY KEY courses_pkey: PRIMARY KEY (id)
//   FOREIGN KEY courses_tenant_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
// Table: custos_materiais
//   FOREIGN KEY custos_materiais_escola_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
//   CHECK custos_materiais_modalidade_pagamento_check: CHECK ((modalidade_pagamento = ANY (ARRAY['a_vista'::text, 'mensal'::text, 'trimestral'::text, 'semestral'::text])))
//   PRIMARY KEY custos_materiais_pkey: PRIMARY KEY (id)
// Table: disciplinas
//   PRIMARY KEY subjects_pkey: PRIMARY KEY (id)
//   FOREIGN KEY subjects_tenant_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
// Table: escolas
//   PRIMARY KEY tenants_pkey: PRIMARY KEY (id)
// Table: faturas
//   FOREIGN KEY financial_invoices_payer_id_fkey: FOREIGN KEY (pagador_id) REFERENCES perfis(id) ON DELETE SET NULL
//   PRIMARY KEY financial_invoices_pkey: PRIMARY KEY (id)
//   CHECK financial_invoices_status_check: CHECK ((status = ANY (ARRAY['pending'::text, 'paid'::text, 'overdue'::text, 'cancelled'::text])))
//   FOREIGN KEY financial_invoices_student_id_fkey: FOREIGN KEY (aluno_id) REFERENCES perfis(id) ON DELETE CASCADE
//   FOREIGN KEY financial_invoices_tenant_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
// Table: frentes
//   PRIMARY KEY fronts_pkey: PRIMARY KEY (id)
//   FOREIGN KEY fronts_tenant_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
// Table: historico_matriculas
//   FOREIGN KEY enrollment_history_enrollment_id_fkey: FOREIGN KEY (matricula_id) REFERENCES matriculas(id) ON DELETE CASCADE
//   PRIMARY KEY enrollment_history_pkey: PRIMARY KEY (id)
//   FOREIGN KEY enrollment_history_tenant_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
// Table: logs_auditoria
//   FOREIGN KEY logs_auditoria_escola_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
//   PRIMARY KEY logs_auditoria_pkey: PRIMARY KEY (id)
//   FOREIGN KEY logs_auditoria_usuario_id_fkey: FOREIGN KEY (usuario_id) REFERENCES perfis(id) ON DELETE SET NULL
// Table: matriculas
//   FOREIGN KEY enrollments_class_id_fkey: FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE
//   PRIMARY KEY enrollments_pkey: PRIMARY KEY (id)
//   UNIQUE enrollments_student_id_class_id_key: UNIQUE (aluno_id, turma_id)
//   FOREIGN KEY enrollments_student_id_fkey: FOREIGN KEY (aluno_id) REFERENCES perfis(id) ON DELETE CASCADE
//   FOREIGN KEY enrollments_tenant_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
//   FOREIGN KEY matriculas_plano_financeiro_id_fkey: FOREIGN KEY (plano_financeiro_id) REFERENCES planos_financeiros(id) ON DELETE SET NULL
//   FOREIGN KEY matriculas_serie_id_fkey: FOREIGN KEY (serie_id) REFERENCES series(id) ON DELETE SET NULL
//   FOREIGN KEY matriculas_turno_id_fkey: FOREIGN KEY (turno_id) REFERENCES turnos(id) ON DELETE SET NULL
// Table: notificacoes
//   PRIMARY KEY notificacoes_pkey: PRIMARY KEY (id)
//   FOREIGN KEY notificacoes_usuario_id_fkey: FOREIGN KEY (usuario_id) REFERENCES perfis(id) ON DELETE CASCADE
// Table: parcelas
//   FOREIGN KEY installments_enrollment_id_fkey: FOREIGN KEY (matricula_id) REFERENCES matriculas(id) ON DELETE CASCADE
//   PRIMARY KEY installments_pkey: PRIMARY KEY (id)
//   FOREIGN KEY installments_tenant_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
// Table: perfis
//   FOREIGN KEY profiles_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY profiles_pkey: PRIMARY KEY (id)
//   CHECK profiles_role_check: CHECK ((papel = ANY (ARRAY['admin'::text, 'master'::text, 'director'::text, 'coordinator'::text, 'teacher'::text, 'parent'::text, 'student'::text])))
//   FOREIGN KEY profiles_tenant_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
// Table: permissoes_grupo
//   FOREIGN KEY permissoes_grupo_escola_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
//   UNIQUE permissoes_grupo_escola_id_papel_modulo_key: UNIQUE (escola_id, papel, modulo)
//   PRIMARY KEY permissoes_grupo_pkey: PRIMARY KEY (id)
// Table: planos_financeiros
//   PRIMARY KEY financial_plans_pkey: PRIMARY KEY (id)
//   FOREIGN KEY financial_plans_sector_id_fkey: FOREIGN KEY (setor_id) REFERENCES setores(id) ON DELETE SET NULL
//   FOREIGN KEY financial_plans_series_id_fkey: FOREIGN KEY (serie_id) REFERENCES series(id) ON DELETE SET NULL
//   FOREIGN KEY financial_plans_tenant_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
// Table: responsaveis_alunos
//   FOREIGN KEY student_parents_parent_id_fkey: FOREIGN KEY (responsavel_id) REFERENCES perfis(id) ON DELETE CASCADE
//   PRIMARY KEY student_parents_pkey: PRIMARY KEY (aluno_id, responsavel_id)
//   FOREIGN KEY student_parents_student_id_fkey: FOREIGN KEY (aluno_id) REFERENCES perfis(id) ON DELETE CASCADE
//   FOREIGN KEY student_parents_tenant_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
// Table: resultados_avaliacoes
//   FOREIGN KEY grades_results_assessment_id_fkey: FOREIGN KEY (avaliacao_id) REFERENCES avaliacoes(id) ON DELETE CASCADE
//   UNIQUE grades_results_assessment_id_student_id_key: UNIQUE (avaliacao_id, aluno_id)
//   PRIMARY KEY grades_results_pkey: PRIMARY KEY (id)
//   FOREIGN KEY grades_results_student_id_fkey: FOREIGN KEY (aluno_id) REFERENCES perfis(id) ON DELETE CASCADE
//   FOREIGN KEY grades_results_tenant_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
// Table: series
//   PRIMARY KEY series_pkey: PRIMARY KEY (id)
//   FOREIGN KEY series_tenant_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
// Table: setores
//   PRIMARY KEY sectors_pkey: PRIMARY KEY (id)
//   FOREIGN KEY sectors_tenant_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
// Table: solicitacoes_acesso
//   PRIMARY KEY solicitacoes_acesso_pkey: PRIMARY KEY (id)
// Table: turmas
//   FOREIGN KEY classes_grade_id_fkey: FOREIGN KEY (ano_escolar_id) REFERENCES anos_escolares(id) ON DELETE CASCADE
//   PRIMARY KEY classes_pkey: PRIMARY KEY (id)
//   FOREIGN KEY classes_shift_id_fkey: FOREIGN KEY (turno_id) REFERENCES turnos(id) ON DELETE SET NULL
//   FOREIGN KEY classes_tenant_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE
// Table: turnos
//   PRIMARY KEY shifts_pkey: PRIMARY KEY (id)
//   FOREIGN KEY shifts_tenant_id_fkey: FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE

// --- ROW LEVEL SECURITY POLICIES ---
// Table: anos_escolares
//   Policy "Allow admin modify" (ALL, PERMISSIVE) roles={authenticated}
//     USING: check_is_admin(auth.uid())
//   Policy "Allow authenticated read" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
// Table: aulas
//   Policy "Lessons read access" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (check_is_admin(auth.uid()) OR (professor_id = auth.uid()) OR (EXISTS ( SELECT 1    FROM matriculas   WHERE ((matriculas.turma_id = aulas.turma_id) AND (matriculas.aluno_id = auth.uid())))))
//   Policy "Lessons write access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (check_is_admin(auth.uid()) OR (professor_id = auth.uid()))
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
// Table: avaliacoes
//   Policy "Assessments read access" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (check_is_admin(auth.uid()) OR (professor_id = auth.uid()) OR (EXISTS ( SELECT 1    FROM matriculas   WHERE ((matriculas.turma_id = avaliacoes.turma_id) AND (matriculas.aluno_id = auth.uid())))))
//   Policy "Assessments write access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (check_is_admin(auth.uid()) OR (professor_id = auth.uid()))
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
// Table: cursos
//   Policy "Allow admin modify" (ALL, PERMISSIVE) roles={authenticated}
//     USING: check_is_admin(auth.uid())
//   Policy "Allow authenticated read" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
// Table: custos_materiais
//   Policy "Custos materiais tenant isolation" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (escola_id = get_current_tenant_id())
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
// Table: disciplinas
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
//   Policy "Subjects tenant isolation" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (escola_id = get_current_tenant_id())
// Table: escolas
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
//   Policy "Tenants isolation" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (id = get_current_tenant_id())
// Table: faturas
//   Policy "Financial read access" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: ((aluno_id = auth.uid()) OR (pagador_id = auth.uid()) OR check_is_admin(auth.uid()))
//   Policy "Financial write access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: check_is_admin(auth.uid())
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
// Table: frentes
//   Policy "Fronts tenant isolation" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (escola_id = get_current_tenant_id())
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
// Table: historico_matriculas
//   Policy "Enrollment History tenant isolation" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (escola_id = get_current_tenant_id())
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
// Table: logs_auditoria
//   Policy "Master and Admin can read logs" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (check_is_admin(auth.uid()) OR is_master())
//   Policy "System can insert logs" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
// Table: matriculas
//   Policy "Allow admin modify enrollments" (ALL, PERMISSIVE) roles={authenticated}
//     USING: check_is_admin(auth.uid())
//   Policy "Enrollments read access" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: ((aluno_id = auth.uid()) OR check_is_admin(auth.uid()) OR (( SELECT perfis.papel AS role    FROM perfis   WHERE (perfis.id = auth.uid())) = ANY (ARRAY['teacher'::text, 'coordinator'::text])) OR (EXISTS ( SELECT 1    FROM responsaveis_alunos   WHERE ((responsaveis_alunos.responsavel_id = auth.uid()) AND (responsaveis_alunos.aluno_id = matriculas.aluno_id)))))
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
// Table: notificacoes
//   Policy "System can insert notificacoes" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Users can read own notificacoes" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (usuario_id = auth.uid())
//   Policy "Users can update own notificacoes" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (usuario_id = auth.uid())
// Table: parcelas
//   Policy "Installments tenant isolation" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (escola_id = get_current_tenant_id())
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
// Table: perfis
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
//   Policy "Profiles tenant isolation" (ALL, PERMISSIVE) roles={authenticated}
//     USING: ((escola_id = get_current_tenant_id()) OR (id = auth.uid()))
// Table: permissoes_grupo
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
//   Policy "Tenant isolation" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (escola_id = get_current_tenant_id())
// Table: planos_financeiros
//   Policy "Financial Plans tenant isolation" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (escola_id = get_current_tenant_id())
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
// Table: responsaveis_alunos
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
//   Policy "Student Parents tenant isolation" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (escola_id = get_current_tenant_id())
// Table: resultados_avaliacoes
//   Policy "Grades Results read access" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: ((aluno_id = auth.uid()) OR check_is_admin(auth.uid()) OR (EXISTS ( SELECT 1    FROM avaliacoes   WHERE ((avaliacoes.id = resultados_avaliacoes.avaliacao_id) AND (avaliacoes.professor_id = auth.uid())))) OR (EXISTS ( SELECT 1    FROM responsaveis_alunos   WHERE ((responsaveis_alunos.responsavel_id = auth.uid()) AND (responsaveis_alunos.aluno_id = resultados_avaliacoes.aluno_id)))))
//   Policy "Grades Results write access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (check_is_admin(auth.uid()) OR (EXISTS ( SELECT 1    FROM avaliacoes   WHERE ((avaliacoes.id = resultados_avaliacoes.avaliacao_id) AND (avaliacoes.professor_id = auth.uid())))))
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
// Table: series
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
//   Policy "Series tenant isolation" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (escola_id = get_current_tenant_id())
// Table: setores
//   Policy "Allow admin modify" (ALL, PERMISSIVE) roles={authenticated}
//     USING: check_is_admin(auth.uid())
//   Policy "Allow authenticated read" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
// Table: solicitacoes_acesso
//   Policy "Anyone can insert solicitacoes" (INSERT, PERMISSIVE) roles={anon,authenticated}
//     WITH CHECK: true
//   Policy "Master can manage solicitacoes" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
// Table: turmas
//   Policy "Allow admin modify" (ALL, PERMISSIVE) roles={authenticated}
//     USING: check_is_admin(auth.uid())
//   Policy "Allow authenticated read" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()
// Table: turnos
//   Policy "Allow admin modify" (ALL, PERMISSIVE) roles={authenticated}
//     USING: check_is_admin(auth.uid())
//   Policy "Allow authenticated read" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Master access" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_master()

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
//     SELECT papel INTO v_role FROM public.perfis WHERE id = user_id;
//     RETURN v_role IN ('admin', 'master', 'director');
//   END;
//   $function$
//   
// FUNCTION get_current_tenant_id()
//   CREATE OR REPLACE FUNCTION public.get_current_tenant_id()
//    RETURNS uuid
//    LANGUAGE sql
//    STABLE SECURITY DEFINER
//   AS $function$
//     SELECT escola_id FROM public.perfis WHERE id = auth.uid() LIMIT 1;
//   $function$
//   
// FUNCTION handle_new_user()
//   CREATE OR REPLACE FUNCTION public.handle_new_user()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   DECLARE
//     v_escola_id UUID;
//   BEGIN
//     INSERT INTO public.escolas (nome) 
//     VALUES (COALESCE(NEW.raw_user_meta_data->>'tenant_name', 'Minha Escola')) 
//     RETURNING id INTO v_escola_id;
//     
//     INSERT INTO public.perfis (id, email, nome, papel, escola_id)
//     VALUES (
//       NEW.id, 
//       NEW.email, 
//       COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
//       COALESCE(NEW.raw_user_meta_data->>'role', 'admin'),
//       v_escola_id
//     );
//     RETURN NEW;
//   END;
//   $function$
//   
// FUNCTION is_master()
//   CREATE OR REPLACE FUNCTION public.is_master()
//    RETURNS boolean
//    LANGUAGE sql
//    STABLE SECURITY DEFINER
//   AS $function$
//     SELECT papel = 'master' FROM public.perfis WHERE id = auth.uid() LIMIT 1;
//   $function$
//   
// FUNCTION notify_master_new_solicitacao()
//   CREATE OR REPLACE FUNCTION public.notify_master_new_solicitacao()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   DECLARE
//     v_master_id UUID;
//   BEGIN
//     FOR v_master_id IN SELECT id FROM public.perfis WHERE papel = 'master' LOOP
//       INSERT INTO public.notificacoes (usuario_id, titulo, mensagem, tipo, dados)
//       VALUES (
//         v_master_id,
//         'Nova solicitação de acesso',
//         NEW.nome || ' (' || NEW.email || ') solicitou acesso ao sistema como ' || NEW.papel || '.',
//         'solicitacao_acesso',
//         jsonb_build_object('solicitacao_id', NEW.id)
//       );
//     END LOOP;
//     RETURN NEW;
//   END;
//   $function$
//   

// --- TRIGGERS ---
// Table: solicitacoes_acesso
//   on_solicitacao_created: CREATE TRIGGER on_solicitacao_created AFTER INSERT ON public.solicitacoes_acesso FOR EACH ROW EXECUTE FUNCTION notify_master_new_solicitacao()

// --- INDEXES ---
// Table: logs_auditoria
//   CREATE INDEX logs_auditoria_criado_em_idx ON public.logs_auditoria USING btree (criado_em DESC)
//   CREATE INDEX logs_auditoria_escola_id_idx ON public.logs_auditoria USING btree (escola_id)
// Table: matriculas
//   CREATE UNIQUE INDEX enrollments_student_id_class_id_key ON public.matriculas USING btree (aluno_id, turma_id)
// Table: permissoes_grupo
//   CREATE UNIQUE INDEX permissoes_grupo_escola_id_papel_modulo_key ON public.permissoes_grupo USING btree (escola_id, papel, modulo)
// Table: resultados_avaliacoes
//   CREATE UNIQUE INDEX grades_results_assessment_id_student_id_key ON public.resultados_avaliacoes USING btree (avaliacao_id, aluno_id)

