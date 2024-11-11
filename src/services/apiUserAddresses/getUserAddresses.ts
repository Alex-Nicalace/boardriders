import supabase from '../supabase';

export async function getUserAddresses() {
  const { data, error } = await supabase
    .from('userAddresses')
    .select('*')
    .order('createdAt');

  if (error) {
    console.error(error);
    throw new Error('User addresses could not be loaded');
  }

  return data;
}
