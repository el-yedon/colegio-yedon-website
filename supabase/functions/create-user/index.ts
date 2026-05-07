import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { email, password, name, role, tenantId, userData } = await req.json()

    // 1. Cria usuário na auth.users
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, role, tenant_name: 'Escola' }
    })

    if (authError) throw authError

    // Aguarda o trigger handle_new_user possivelmente agir
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 2. Atualiza perfil com os novos campos de pessoa e endereço
    const { error: profileError } = await supabase
      .from('perfis')
      .update({
        escola_id: tenantId,
        cpf: userData.cpf,
        rg: userData.rg,
        telefone: userData.telefone,
        cep: userData.cep,
        logradouro: userData.logradouro,
        numero_endereco: userData.numero_endereco,
        complemento: userData.complemento,
        bairro: userData.bairro,
        cidade: userData.cidade,
        estado: userData.estado,
        avatar: userData.avatar,
        papel: role
      })
      .eq('id', authData.user.id)

    if (profileError) {
      // Caso o trigger não tenha inserido o perfil
      const { error: insertError } = await supabase.from('perfis').insert({
        id: authData.user.id,
        email,
        nome: name,
        papel: role,
        escola_id: tenantId,
        cpf: userData.cpf,
        rg: userData.rg,
        telefone: userData.telefone,
        cep: userData.cep,
        logradouro: userData.logradouro,
        numero_endereco: userData.numero_endereco,
        complemento: userData.complemento,
        bairro: userData.bairro,
        cidade: userData.cidade,
        estado: userData.estado,
        avatar: userData.avatar
      })
      if(insertError) throw insertError
    }

    return new Response(JSON.stringify({ user: authData.user }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
