import supabase from '../supabase';

export async function getTotalItemsCart(): Promise<number> {
  const { data, error } = await supabase
    .from('cart')
    .select('quantity:quantity.sum()')
    .single();

  if (error) {
    console.error(error);
    throw new Error('Cart could not be loaded');
  }

  return (data as any).quantity || 0;
}
