import supabase from '../supabase';

export async function getOrderById(id: number) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Order could not be loaded');
  }

  return data;
}
