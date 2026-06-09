import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tpmiuigqzhhuhcjiebah.supabase.co' // FIXED URL
const supabaseKey = 'sb_publishable_dBw67K7fTuoPoLS8XJJmOQ_01XKwOAA'

export const supabase = createClient(supabaseUrl, supabaseKey)