import supabase from '../supabase';

export async function deleteUserAddresses(id: number) {
  const { data, error } = await supabase
    .from('userAddresses')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('User addresses could not be deleted');
  }

  return data;
}
