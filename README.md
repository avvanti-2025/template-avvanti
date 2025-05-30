# AvvanTI Template
This is a Template Project

## Supabase
Supabase Configuration

#### Tables
```sql
-- Create ENUM
create type public.userprofile as enum ('admin', 'user', 'guest');

-- Profile Table
create table if not exists public.profile (
  id uuid not null,
  created_at timestamp with time zone not null default now(),
  name text null,
  email text null,
  profile public.userprofile null,
  constraint profile_pkey primary key (id),
  constraint profile_id_fkey foreign key (id) references auth.users (id) on delete cascade
);
```

#### Functions
```sql
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profile (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

#### Edge Function: create-user
```javascript
// Create User Supabase Edge Function
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req)=>{
  
  // CORS Config
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-application-name',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }

  try {
    // Verify request method
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({
        error: 'Method not allowed'
      }), {
        status: 405,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    // Get request body
    const { email, password } = await req.json();
    
    // Validar request body
    if (!email || !password) {
      return new Response(JSON.stringify({
        error: 'Email and password are required.'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    // Get Supabase Configuration
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    // Validate Supabase Configuration
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration is missing');
    }

    // Create Supabase client
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    // Create user
    const { data: user, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (userError) {
      return new Response(JSON.stringify({
        error: userError.message
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    // Return response
    return new Response(JSON.stringify({
      message: 'User created successfully',
      user: {
        id: user.user.id,
        email: user.user.email
      }
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Edge Function Error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      details: error.message
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});
```
#### Edge Function: delete-user
```javascript
// Delete User Supabase Edge Function
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req)=>{
  // CORS Configuration
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-application-name',
    'Access-Control-Allow-Methods': 'DELETE, OPTIONS'
  };

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }

  try {
    // Verify Method
    if (req.method !== 'DELETE') {
      return new Response(JSON.stringify({
        error: 'Method not allowed'
      }), {
        status: 405,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    // Get user ID from URL
    const url = new URL(req.url);
    const userId = url.pathname.split('/').pop();

    // Validate user ID
    if (!userId) {
      return new Response(JSON.stringify({
        error: 'ID do usuário é obrigatório'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    // Get Supabase Configuration
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    // Validate Supabase Configuration
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration is missing.');
    }
    
    // Create Supabase Client
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    // Delete User
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (authError) {
      return new Response(JSON.stringify({
        error: authError.message
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    // Return Response
    return new Response(JSON.stringify({
      message: 'Usuário deletado com sucesso'
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {

    console.error('Edge Function error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      details: error.message
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});
```

