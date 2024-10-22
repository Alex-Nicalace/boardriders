import supabase from '../supabase';
import { Database } from '../supabase.types';

export async function createOrder(
  args: Database['public']['Functions']['createOrder']['Args']
) {
  const { data, error } = await supabase.rpc('createOrder', args).single();

  if (error) {
    console.error(error);
    throw new Error('Order could not be created');
  }

  return data;
}
