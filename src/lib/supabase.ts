import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kamrgpgptdljpredwlda.supabase.co';
const supabaseAnonKey = 'sb_publishable_Qv-kM2F4-Bi_eQVzFb7fAA_2czeMD-w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
