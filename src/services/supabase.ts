import { createClient } from '@supabase/supabase-js';
import { Database } from './supabase.types';
export const supabaseUrl = import.meta.env.VITE_DATABASE_URL;
const supabaseKey = import.meta.env.VITE_DATABASE_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
