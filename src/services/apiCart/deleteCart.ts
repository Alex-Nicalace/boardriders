import supabase from '../supabase';

export async function deleteCart(productVariantId: number) {
  const { data, error } = await supabase
    .from('cart')
    .delete()
    .eq('productVariantId', productVariantId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Cart could not be deleted');
  }

  return data;
}
