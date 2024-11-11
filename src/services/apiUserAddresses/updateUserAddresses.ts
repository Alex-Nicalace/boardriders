import supabase from '../supabase';
import { TablesUpdate } from '../supabase.types';

export async function updateUserAddresses(
  id: number,
  row: TablesUpdate<'userAddresses'>
) {
  const { data, error } = await supabase
    .from('userAddresses')
    .update(row)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('User addresses could not be updated');
  }

  return data;
}
