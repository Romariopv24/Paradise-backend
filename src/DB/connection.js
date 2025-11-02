import { createClient } from '@supabase/supabase-js'




    const supabaseUrl = process.env.SUPABASE_URL
    const supabasekey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !supabasekey) {
    throw new Error('Supabase URL and Service Role Key must be provided in .env file');
    }

    const supabase = createClient(supabaseUrl, supabasekey)

    export default supabase
  

