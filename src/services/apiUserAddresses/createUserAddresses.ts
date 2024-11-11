import supabase from '../supabase';
import { TablesInsert } from '../supabase.types';

export async function createUserAddresses(row: TablesInsert<'userAddresses'>) {
  const { data, error } = await supabase
    .from('userAddresses')
    .insert(row)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('User addresses could not be created');
  }

  return data;
}
